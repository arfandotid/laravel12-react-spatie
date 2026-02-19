<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    /**
     * fillable
     *
     * @var array
     */
    protected $fillable = [
        'app_name',
        'app_logo',
    ];
}
