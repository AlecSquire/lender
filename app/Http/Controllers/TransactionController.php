<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateTransaction Request $request): Response
    {
        // check
    }

    /**
     * Display the specified resource.
     */
    public function show(TransactionController $transactionController)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TransactionController $transactionController)
    {
        //validate
        //authorize
        //update
        //and persist
        //redirect to somewhere
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TransactionController $transactionController)
    {
        //
    }
}
