<?php

namespace App\Http\Controllers;

use App\Http\Resources\ItemResource;
use Illuminate\Http\Request;
use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
            $user = Auth::user();
            $userId = Auth::id();
            Log::debug($user);
            Log::debug($userId);
            $userItems = Item::where('user_id',)->get();
            // $userItems = Item::all();

            return response()->json([
                'data' => $userItems,
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

            // Add the authenticated user's ID to the validated data
            $validated['user_id'] = Auth::id();
            Log::debug($validated);
            Log::debug('Validated data:', $validated);

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
        $item = Item::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        return response()->json([
            'data' => new ItemResource($item),
            'status' => 'success'
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {}
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

            $item = Item::where('id', $id)->firstOrFail();

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
    public function destroy(string $id): JsonResponse
    {
        try {
            $item = Item::findOrFail($id);
            $item->delete();

            return response()->json([
                'message' => 'Item deleted successfully',
                'status' => 'success'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting item',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
