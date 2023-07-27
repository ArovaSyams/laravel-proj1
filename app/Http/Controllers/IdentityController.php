<?php

namespace App\Http\Controllers;

use App\Models\Identity;
use App\Http\Requests\StoreIdentityRequest;
use App\Http\Requests\UpdateIdentityRequest;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class IdentityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreIdentityRequest $request)
    {
        $uniqId = uniqid();

        $request->validate([
            'name' => ['required'],
            'qualification' => ['required'],
            'gender' => ['required'],
        ]);

        Identity::create([
            'uniq_id' => $uniqId,
            'name' => $request->name,
            'qualification' => $request->qualification,
            'gender' => $request->gender,
        ]);
        
        // $imgValidate = $request->validate([
        //     'certificate' => ['image', 'file', 'max:4024']
        // ]);
            
        if($request->file('certificate')) {
            // $imgValidate['certificate'] = $request->file('certificate')->store('certificate');
            foreach($request->certificate as $certif) {
                // $certif->store('certificate');
                $certificate = new Certificate();
                $certificate->certificate = $certif->store('certificate');
                $certificate->identity_id = $uniqId;
                $certificate->save();
            }

        }


        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Identity $identity)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $identity, $id)
    {   
        $identity = Identity::where('uniq_id', $id)->first();
        $certificate = Certificate::where('identity_id', $id)->get();
        
        return Inertia::render('EditIdentity', [
            'identity' => $identity,
            'certificates' => $certificate
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateIdentityRequest $request, $identity)
    {
        Identity::find($identity)->update([
            'name' => $request->name,
            'qualification' => $request->qualification,
            'gender' => $request->gender
        ]);
        
        return to_route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $certificate = Certificate::where('identity_id', $id)->get();
        $identity = Identity::where('uniq_id', $id)->first();

        if($certificate) {
            foreach($certificate as $certif) {
                Storage::delete($certif->certificate);
                $certif->delete();
            } 
        }
            
        $identity->delete();

        return redirect()->back();
    }
}
