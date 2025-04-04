<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemRequest;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;


// use Illuminate\Pagination\Paginator;

class ItemController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    // List all items
    public function index(): JsonResponse
    {
        $userItems = Item::query()
            ->where('user_id', Auth::id())->get();

        return response()->json([
            'data' => $userItems,
            'status' => 'success'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ItemRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();

        $item = Item::create($data);
        return new ItemResource($item);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): ItemResource
    {
        $item = Item::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        return new ItemResource($item);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ItemRequest $request, string $id)
    {
        $item = Item::findOrFail($id);

        $item->update($request->validated());

        return new ItemResource($item);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $item = Item::findOrFail($id);
        $item->delete();

        return response()->json([
            'message' => 'Item deleted successfully',
            'status' => 'success'
        ], 204);
    }
}
