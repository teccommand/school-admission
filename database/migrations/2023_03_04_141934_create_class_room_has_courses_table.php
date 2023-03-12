<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('class_room_has_courses', function (Blueprint $table) {
            $table->id();

            // Class room
            $table->unsignedBigInteger('class_rooms_id');
            $table->foreign('class_rooms_id')->references('id')->on('class_rooms');

            // Course
            $table->unsignedBigInteger('courses_id');
            $table->foreign('courses_id')->references('id')->on('courses');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('class_room_has_courses');
    }
};
