# Lender

Borrowed, but never forgotten.

Lender keeps track of the things you lend to people (and the things you've borrowed). You log the item, who has it and when it's due back. If it goes overdue, Lender emails them a reminder, and they can mark it as returned straight from that email without needing an account.

![Dashboard](https://github.com/user-attachments/assets/db6f01d0-9b89-481f-a459-56d3eda068e4)

![Adding an item](https://github.com/user-attachments/assets/38e530da-a0aa-4766-a877-4628d52b63af)
![Item page](https://github.com/user-attachments/assets/4b17e4ec-bca5-4434-8555-098a20612fa8)

## Stack

- **Backend:** Laravel 11, PHP 8.2+, Sanctum (SPA cookie auth), queued jobs, the task scheduler
- **Frontend:** React 18 with Inertia, Tailwind CSS, shadcn/ui
- **Database:** SQLite locally, MySQL works too
- **Tests:** PHPUnit feature tests

## How it works

A few parts are worth calling out:

- **Items are private to whoever logged them.** `ItemPolicy` checks ownership on every view, update and delete, and new items are always created through `$user->items()->create()`, so `user_id` can't be posted in from outside. There are tests for both.
- **Borrowers don't need an account.** The reminder email has a "Mark as Returned" button that points to a [signed URL](https://laravel.com/docs/11.x/urls#signed-urls). Laravel rejects the link if anything in it has been changed, so someone can't just swap the ID to mark another person's item as returned.
- **Reminders run on a schedule.** `SendOverdueItemReminders` is a queued job that runs every morning at 9am and emails anyone holding something past its return date. The owner can also send a reminder by hand from the item page.

```
app/
├── Http/Controllers/ItemController.php          CRUD for the JSON API
├── Http/Controllers/NotificationController.php  manual reminders and the signed "returned" link
├── Http/Requests/ItemRequest.php                validation (strict on create, partial on update)
├── Jobs/SendOverdueItemReminders.php            the daily reminder run
├── Models/Item.php                              includes an overdue() query scope
└── Policies/ItemPolicy.php                      who can touch what
routes/
├── api.php       everything behind auth:sanctum
├── web.php       Inertia pages and the signed link
└── console.php   the schedule
```

## Running it locally

You'll need PHP 8.2+, Composer and Node.

```bash
git clone https://github.com/AlecSquire/lender.git
cd lender

composer install
npm install

cp .env.example .env
php artisan key:generate

touch database/database.sqlite
php artisan migrate --seed
```

Then in two terminals:

```bash
php artisan serve
npm run dev
```

Open http://localhost:8000 and log in with `test@example.com` / `password`. The seeder gives that user a list of items, some of them overdue.

Mail goes to the log by default (`MAIL_MAILER=log`), so reminder emails end up in `storage/logs/laravel.log` instead of anyone's inbox. To try the reminder run without waiting for 9am:

```bash
php artisan schedule:test
```

If you serve the app on a different host or port, update `APP_URL` in `.env` to match. Sanctum uses it to decide which frontends get cookie auth, and the API will return 401s if it doesn't match.

## Tests

```bash
php artisan test
```

The ones I care most about are in `tests/Feature/ItemTest.php` and `tests/Feature/ReminderTest.php`. They cover guests being locked out, users not being able to see or change each other's items, the daily job only picking up items that are overdue and not yet returned, and the signed link refusing to work once it's been tampered with.

## What I'd do next

- Stop the daily job from emailing the same person every day forever. Probably record when the last reminder went out and back off.
- The item page has a notes box, but there's no notes column yet, so notes don't save.
- Let borrowers ask for more time from the email, not just mark the item as returned.
