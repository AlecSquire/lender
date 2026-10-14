<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemRequest;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use App\Traits\ApiResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ItemController extends Controller
{
    use ApiResponses;

    public function index(Request $request): JsonResponse
    {
        $items = $request->user()->items()->orderBy('return_date')->get();

        return $this->ok('Items fetched successfully', ItemResource::collection($items));
    }

    public function store(ItemRequest $request): ItemResource
    {
        $item = $request->user()->items()->create($request->validated());

        return new ItemResource($item);
    }

    public function show(Item $item): ItemResource
    {
        Gate::authorize('view', $item);

        return new ItemResource($item);
    }

    public function update(ItemRequest $request, Item $item): ItemResource
    {
        Gate::authorize('update', $item);

        $item->update($request->validated());

        return new ItemResource($item);
    }

    public function destroy(Item $item): JsonResponse
    {
        Gate::authorize('delete', $item);

        $item->delete();

        return $this->ok('Item deleted successfully');
    }
}
