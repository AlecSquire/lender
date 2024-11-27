<?php

namespace Database\Seeders;

use App\Models\Borrower;
use App\Models\Item;
use App\Models\Lender;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create users
        $users = User::factory(10)->create();

        // Create borrowers
        $borrowers = Borrower::factory(50)->create();

        // Create lenders
        $lenders = Lender::factory(50)->create();

        // Create items and associate them with users and borrowers
        Item::factory(50)->create([
            'user_id' => $users->random()->id, // Randomly associate with a user
            'borrower_id' => $borrowers->random()->id, // Randomly associate with a borrower
        ]);
    }
}
