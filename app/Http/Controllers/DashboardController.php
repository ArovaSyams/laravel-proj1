<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Identity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index() {
        $identity = Identity::all();
        $certificate = Certificate::all();
        return Inertia::render('Dashboard', [
            'identities' => $identity,
            'certificates' => $certificate
        ]);        
    }
}
