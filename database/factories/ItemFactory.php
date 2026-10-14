<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'item_name' => fake()->words(2, true),
            'item_description' => fake()->sentence(),
            'contact_name' => fake()->name(),
            'contact_email' => fake()->safeEmail(),
            'transaction_type' => fake()->randomElement(['lending', 'borrowing']),
            'return_date' => fake()->dateTimeBetween('-2 weeks', '+4 weeks'),
            'isReturned' => false,
        ];
    }

    public function overdue(): static
    {
        return $this->state(fn () => ['return_date' => now()->subDays(3)]);
    }

    public function returned(): static
    {
        return $this->state(fn () => ['isReturned' => true]);
    }
}
