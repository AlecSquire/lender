<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;


// use Illuminate\Pagination\Paginator;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // List all items
    public function index(): JsonResponse
    {
        try {
            $items = Item::all();

            return response()->json([
                'data' => $items,
                'status' => 'success'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching items',
                'error' => $e->getMessage()
            ], 500);
        }
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
        $item = Item::findOrFail($id);
        return response()->json([
            'data' => $item,
            'status' => 'success'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        return ('    public function edit(string $id) to edit this baby');
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
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

            $item = Item::where('id', $id);

            $item->update($validated);

            return response()->json([
                'data' => $item,
                'status' => 'success'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching items',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return ('    public function destroy(string $id) to destroy this baby');
    }
}
