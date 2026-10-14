<?php

namespace Tests\Feature;

use App\Jobs\SendOverdueItemReminders;
use App\Mail\ItemDue;
use App\Mail\ItemReturned;
use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ReminderTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_daily_job_only_reminds_about_overdue_unreturned_items(): void
    {
        Mail::fake();

        $overdue = Item::factory()->overdue()->create();
        Item::factory()->overdue()->returned()->create();
        Item::factory()->create(['return_date' => now()->addWeek()]);

        (new SendOverdueItemReminders)->handle();

        Mail::assertSent(ItemDue::class, 1);
        Mail::assertSent(ItemDue::class, fn (ItemDue $mail) => $mail->hasTo($overdue->contact_email));
    }

    public function test_owners_can_send_a_reminder_for_their_own_item(): void
    {
        Mail::fake();

        $user = User::factory()->create();
        $item = Item::factory()->for($user)->create();

        Sanctum::actingAs($user);

        $this->postJson('/api/notify', ['id' => $item->id])->assertOk();

        Mail::assertSent(ItemDue::class, fn (ItemDue $mail) => $mail->hasTo($item->contact_email));
    }

    public function test_users_cannot_send_reminders_for_someone_elses_item(): void
    {
        Mail::fake();

        $theirs = Item::factory()->create();

        Sanctum::actingAs(User::factory()->create());

        $this->postJson('/api/notify', ['id' => $theirs->id])->assertForbidden();

        Mail::assertNothingSent();
    }

    public function test_the_signed_email_link_marks_the_item_returned_and_tells_the_owner(): void
    {
        Mail::fake();

        $item = Item::factory()->create();

        $this->get(URL::signedRoute('item.return.notify', ['item' => $item]))->assertOk();

        $this->assertTrue($item->fresh()->isReturned);
        Mail::assertSent(ItemReturned::class, fn (ItemReturned $mail) => $mail->hasTo($item->user->email));
    }

    public function test_the_returned_link_does_not_work_without_a_valid_signature(): void
    {
        $item = Item::factory()->create();

        $this->get("/items/{$item->id}/returned")->assertForbidden();

        $this->assertFalse($item->fresh()->isReturned);
    }
}
