<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;

// use Illuminate\Pagination\Paginator;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // List all items
    public function index(): Response
    {
        $items = DB::table('items')->paginate(15);
        return response($items);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'contact_name' => 'required|string|max:225',
                'transaction_type' => 'required|in:lending,borrowing',
                'item_name' => 'required|string|max:225',
                'return_date' => 'required|date',
                'contact_email' => 'required|email',
                'item_description' => 'nullable|string|max:500',
            ]);

            // Create a new item in the database
            $item = Item::create($validated);

            return response()->json([
                'message' => 'Item created successfully!',
                'item' => $item
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors() // This will return the validation error messages
            ], 422); // Unprocessable Entity HTTP status code
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
