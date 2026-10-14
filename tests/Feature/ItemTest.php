<?php

namespace Tests\Feature;

use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ItemTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_cannot_use_the_items_api(): void
    {
        $item = Item::factory()->create();

        $this->getJson('/api/items')->assertUnauthorized();
        $this->getJson("/api/items/{$item->id}")->assertUnauthorized();
        $this->deleteJson("/api/items/{$item->id}")->assertUnauthorized();
    }

    public function test_users_only_see_their_own_items(): void
    {
        $user = User::factory()->create();
        $mine = Item::factory()->for($user)->create();
        Item::factory()->create(); // belongs to someone else

        Sanctum::actingAs($user);

        $this->getJson('/api/items')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.id', $mine->id);
    }

    public function test_users_cannot_view_update_or_delete_someone_elses_item(): void
    {
        $theirs = Item::factory()->create();

        Sanctum::actingAs(User::factory()->create());

        $this->getJson("/api/items/{$theirs->id}")->assertForbidden();
        $this->patchJson("/api/items/{$theirs->id}", ['isReturned' => true])->assertForbidden();
        $this->deleteJson("/api/items/{$theirs->id}")->assertForbidden();

        $this->assertDatabaseHas('items', ['id' => $theirs->id, 'isReturned' => false]);
    }

    public function test_a_new_item_always_belongs_to_whoever_created_it(): void
    {
        $user = User::factory()->create();
        $someoneElse = User::factory()->create();

        Sanctum::actingAs($user);

        $this->postJson('/api/items', [
            'item_name' => 'Cordless Drill',
            'contact_name' => 'Sam',
            'contact_email' => 'sam@example.com',
            'transaction_type' => 'lending',
            'return_date' => now()->addWeek()->toDateString(),
            'user_id' => $someoneElse->id, // should be ignored
        ])
            ->assertCreated()
            ->assertJsonPath('data.isReturned', false);

        $this->assertDatabaseHas('items', ['item_name' => 'Cordless Drill', 'user_id' => $user->id]);
    }

    public function test_creating_an_item_requires_the_core_fields(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $this->postJson('/api/items', [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['item_name', 'contact_name', 'contact_email', 'transaction_type', 'return_date']);
    }

    public function test_owners_can_mark_an_item_returned(): void
    {
        $user = User::factory()->create();
        $item = Item::factory()->for($user)->create();

        Sanctum::actingAs($user);

        $this->patchJson("/api/items/{$item->id}", ['isReturned' => true])
            ->assertOk()
            ->assertJsonPath('data.isReturned', true);

        $this->assertTrue($item->fresh()->isReturned);
    }
}
