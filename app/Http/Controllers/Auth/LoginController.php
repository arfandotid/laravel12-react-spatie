<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LoginController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        // return inertia
        return inertia('Auth/Login');
    }

    /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
        // set validation
        $request->validate([
            'email'     => 'required|email',
            'password'  => 'required',
        ]);

        // get email and password from request
        $credentials = $request->only('email', 'password');

        // attempt to login
        if (auth()->attempt($credentials)) {

            // regenerate session
            $request->session()->regenerate();

            // redirect route dashboard
            return redirect()->route('dashboard');
        }

        // if login fails
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    /**
     * logout
     *
     * @return void
     */
    public function logout(Request $request)
    {
        // logout user
        auth()->logout();

        // invalidate session
        $request->session()->invalidate();

        // regenerate token
        $request->session()->regenerateToken();

        // force redirect ke halaman login
        return redirect()->to('/login');
    }
}
