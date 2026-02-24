<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        return Inertia::render('Profile/Index', [
            'user' => Auth::user(),
        ]);
    }

    public function update(Request $request)
    {
        $userId = Auth::user()->id;
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $userId,
        ]);

        $user = User::findOrFail($userId);
        $user->name = $request->name;
        $user->email = $request->email;

        try {
            $user->save();
        } catch (\Exception $e) {
            return redirect()->route('profile.index')->with('error', 'Failed to update profile: ' . $e->getMessage());
        }

        return redirect()->route('profile.index')->with('success', 'Profile updated successfully.');
    }

    public function changePassword()
    {
        return Inertia::render('Profile/ChangePassword');
    }

    public function updatePassword(Request $request)
    {
        $userId = Auth::user()->id;
        $request->validate([
            'current_password'  => 'required|string',
            'password'          => 'required|string|min:8|confirmed',
        ]);

        $user = User::findOrFail($userId);

        if (!Hash::check($request->current_password, $user->password)) {
            return redirect()->route('profile.password.index')
                ->withErrors(
                    ['current_password' => 'Current password is incorrect.']
                );
        }

        if (Hash::check($request->password, $user->password)) {
            return redirect()->route('profile.password.index')
                ->withErrors(
                    ['password' => 'New password must be different from current password.']
                );
        }

        $user->password = bcrypt($request->password);

        try {
            $user->save();
        } catch (\Exception $e) {
            return redirect()->route('profile.password.index')->with('error', 'Failed to update password: ' . $e->getMessage());
        }

        return redirect()->route('profile.password.index')->with('success', 'Password updated successfully.');
    }
}
