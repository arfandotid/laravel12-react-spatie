<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class UserController extends Controller implements HasMiddleware
{
    /**
     * middleware
     *
     * @return array
     */
    public static function middleware(): array
    {
        return [
            new Middleware(['permission:users.index'], only: ['index']),
            new Middleware(['permission:users.create'], only: ['create', 'store']),
            new Middleware(['permission:users.edit'], only: ['edit', 'update']),
            new Middleware(['permission:users.delete'], only: ['destroy']),
        ];
    }

    /**
     * index
     *
     * @return Response
     */
    public function index(): Response
    {
        $users = User::query()
            ->with('roles:id,name')
            ->when(request()->q, function ($users) {
                $users->where(function ($q) {
                    $q->where('name', 'like', '%' . request()->q . '%')
                        ->orWhere('email', 'like', '%' . request()->q . '%');
                });
            })
            ->latest()
            ->paginate(5);

        $users->appends(['q' => request()->q]);

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * create
     *
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Users/Create', [
            'roles' => Role::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    /**
     * store
     *
     * @param  Request $request
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'roles'    => 'required|array',
            'roles.*'  => 'exists:roles,id',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // assign role
        $user->syncRoles($request->roles);

        return redirect()
            ->route('users.index')
            ->with('success', 'User created successfully.');
    }

    /**
     * edit
     *
     * @param  User $user
     * @return Response
     */
    public function edit(User $user): Response
    {
        $user->load('roles');

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => Role::select('id', 'name')->orderBy('name')->get(),
            'userRoles' => $user->roles->pluck('id'),
        ]);
    }

    /**
     * update
     *
     * @param  Request $request
     * @param  User $user
     * @return RedirectResponse
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:8',
            'roles'    => 'required|array',
            'roles.*'  => 'exists:roles,id',
        ]);

        $user->update([
            'name'  => $request->name,
            'email' => $request->email,
        ]);

        // update password jika diisi
        if ($request->password) {
            $user->update([
                'password' => Hash::make($request->password),
            ]);
        }

        // sync role
        $user->syncRoles($request->roles);

        return redirect()
            ->route('users.index')
            ->with('success', 'User updated successfully.');
    }

    /**
     * destroy
     *
     * @param  User $user
     * @return RedirectResponse
     */
    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return redirect()
            ->route('users.index')
            ->with('success', 'User deleted successfully.');
    }
}
