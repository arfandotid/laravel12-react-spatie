<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan hanya ada 1 data setting
        DB::table('settings')->truncate();
        DB::table('settings')->insert([
            'app_name'      => env('APP_NAME'),
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);
    }
}
