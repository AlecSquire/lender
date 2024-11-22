<?php

namespace Database\Factories;

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
            'name' => fake()->name(),
            'description' => fake()->text(50),
            'is_returned' => fake()->boolean(),
            // 'borrower_id' => fake()->numberBetween(1, 50),
            // 'user_id' => fake()->numberBetween(1, 50),
            'expiry_date' => fake()->date(),
        ];
    }
}
