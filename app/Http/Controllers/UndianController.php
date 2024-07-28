<?php

namespace App\Http\Controllers;

use App\Models\Undian;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUndianRequest;
use App\Http\Requests\UpdateUndianRequest;

class UndianController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $page_title = "Undian";

        $data = [
            'page_title' => $page_title,
        ];

        return view('welcome', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUndianRequest $request)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Undian $undian)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUndianRequest $request, Undian $undian)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Undian $undian)
    {
        //
    }

    public function show_peserta($is_winner = 0)
    {
        $undians = Undian::select('nomor')->where('is_winner', $is_winner)->orderBy('updated_at', 'desc')->get();

        return response()->json([
            'undians' => $undians,
        ], 200);
    }

    public function store_peserta(Request $request)
    {
        // truncate table
        Undian::truncate();

        // explode $request->list with separator Enter
        $list = explode("\n", $request->list);

        foreach ($list as $l) {
            if (trim($l) == "") continue;
            Undian::create([
                'nomor'     => $l,
                'is_winner' => false,
            ]);
        }

        return response()->json([
            'message' => 'Simpan Peserta Berhasil',
        ]);
    }

    public function store_pemenang(Request $request)
    {
        Undian::where('nomor', $request->nomor)->update([
            'is_winner' => 1,
        ]);

        return response()->json([
            'message' => 'Pemenang Undian: ' . $request->nomor . ' Berhasil disimpan',
        ]);
    }
}
