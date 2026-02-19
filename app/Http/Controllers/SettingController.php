<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Setting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\FileUploadTrait;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class SettingController extends Controller implements HasMiddleware
{
    use FileUploadTrait;
    /**
     * middleware
     *
     * @return array
     */
    public static function middleware(): array
    {
        return [
            new Middleware(['permission:settings.index'], only: ['index']),
            new Middleware(['permission:settings.update'], only: ['update']),
        ];
    }

    /**
     * index
     *
     * @return Response
     */
    public function index(): Response
    {
        // setting hanya 1 data
        $setting = Setting::first();

        // return inertia
        return Inertia::render('Settings/Index', [
            'setting' => $setting,
        ]);
    }

    /**
     * update
     *
     * @param  Request $request
     * @return RedirectResponse
     */
    public function update(Request $request): RedirectResponse
    {
        // setting hanya 1 data
        $setting = Setting::firstOrFail();

        // set validation
        $request->validate([
            'app_name'  => 'required|string',
            'app_logo'  => 'nullable',
        ]);

        $data = $request->only([
            'app_name',
            'app_logo',
        ]);

        // upload logo desa jika ada
        if ($request->hasFile('app_logo')) {

            // hapus logo lama
            if ($setting->app_logo) {
                $this->deleteFile($setting->app_logo);
            }

            // simpan logo baru
            $data['app_logo'] = $this->uploadFile($request, 'app_logo', 'uploads/settings/logo');
        }

        // update setting
        $setting->update($data);

        // kembali ke halaman setting
        return redirect()
            ->route('settings.index')
            ->with('success', 'Setting updated successfully.');
    }
}
