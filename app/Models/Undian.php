<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Undian extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomor',
        'is_winner',
    ];
}
