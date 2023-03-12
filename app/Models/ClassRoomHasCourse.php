<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ClassRoomHasCourse extends Pivot
{
    use HasFactory;

    public function ClassRooom(): HasOne
    {
        return $this->hasOne(ClassRooom::class);
    }

    public function Courses(): HasOne
    {
        return $this->hasOne(Courses::class);
    }
}
