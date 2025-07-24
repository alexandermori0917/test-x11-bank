<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Card;
use Illuminate\Validation\ValidationException;

class CardController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'message' => 'Cards fetched successfully',
            'data' => Card::all()
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'card_number' => 'required|digits:16|unique:cards,card_number',
            'exp_month' => 'required|digits:2|integer|between:1,12',
            'exp_year' => 'required|digits:2|integer|min:' . date('y'),
            'cvv' => 'required|digits:3|integer',
        ]);
        $card = Card::create($validated);
        return response()->json([
            'success' => true,
            'message' => 'Card created successfully',
            'data' => $card
        ], 201);
    }

}
