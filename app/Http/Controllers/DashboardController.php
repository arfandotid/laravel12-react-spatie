<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class DashboardController extends Controller
{

    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        return inertia('Dashboard/Index');
    }
}
