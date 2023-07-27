<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Identity extends Model
{
    protected $fillable = [
        'name', 'gender', 'qualification', 'uniq_id'
    ];
    use HasFactory;
}
