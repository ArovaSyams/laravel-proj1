<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CertificateController extends Controller
{
    public function store(Request $request) {
        Certificate::create([
            'identity_id' => $request->id,
            'certificate' => $request->file('certificate')->store('certificate')
        ]);
    }

    public function update(Request $request) {
        $certif = Certificate::where('id', $request->id)->first();

        Storage::delete($certif->certificate);

        Certificate::find($request->id)->update([
            'certificate' => $request->file('certificate')->store('certificate')
        ]);

        return redirect()->back();
    }
    
    public function destroy($id) {
        $certif = Certificate::find($id)->first();
        
        Storage::delete($certif->certificate);
        
        $certif->delete();

        return redirect()->back();
    }
}
