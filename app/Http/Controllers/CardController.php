<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Card;
use Illuminate\Validation\ValidationException;
use Carbon\Carbon;

class CardController extends Controller
{
    public function index()
    {
        $cards = Card::select('id', 'card_number', 'exp_month', 'exp_year', 'created_at', 'updated_at')->get();
        return response()->json([
            'success' => true,
            'message' => 'Cards fetched successfully',
            'data' => $cards
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'card_number' => 'required|digits:16|unique:cards,card_number',
            'exp_month'   => ['required', 'regex:/^(0[1-9]|1[0-2])$/'],
            'exp_year' => 'required|digits:2|integer|min:' . date('y'),
            'cvv' => 'required|digits:3',
        ]);
        $exp_date = Carbon::createFromDate('20' . $validated['exp_year'], $validated['exp_month'], 1)->endOfMonth();
        $now = Carbon::now();
        if ($exp_date->lt($now)) {
            return response()->json([
                'success' => false,
                'message' => 'Card expired',
                'errors' => [
                    'card_number' => 'Card expired'
                ]
            ], 400);
        }
        $card = Card::create($validated);
        return response()->json([
            'success' => true,
            'message' => 'Card created successfully',
            'data' => $card
        ], 201);
    }

    public function check(Request $request)
    {
        $validated = $request->validate([
            'card_number' => 'required|digits:16|exists:cards,card_number',
            'exp_month'   => ['required', 'regex:/^(0[1-9]|1[0-2])$/'],
            'exp_year' => 'required|digits:2|integer|min:' . date('y'),
            'cvv' => 'required|digits:3',
        ]);
        $card = Card::where('card_number', $validated['card_number'])->where('exp_month', $validated['exp_month'])->where('exp_year', $validated['exp_year'])->first();
        if (!$card) {
            return response()->json([
                'success' => false,
                'message' => 'No card found',
                'errors' => [
                    'card_number' => 'No card found'
                ]
            ], 404);
        }
        if ($card->cvv != $validated['cvv']) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid CVV',
                'errors' => [
                    'cvv' => 'Invalid CVV'
                ]
            ], 400);
        }
        $exp_date = Carbon::createFromDate('20' . $validated['exp_year'], $validated['exp_month'], 1)->endOfMonth();
        $now = Carbon::now();
        if ($exp_date->lt($now)) {
            return response()->json([
                'success' => false,
                'message' => 'Card expired',
                'errors' => [
                    'card_number' => 'Card expired'
                ]
            ], 400);
        }
        return response()->json([
            'success' => true,
            'message' => 'CVV is valid',
            'data' => $card
        ], 200);
    }

}
