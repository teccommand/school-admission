<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Course;
use App\Models\ClassRoom;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
        ]);

        $courses = [
            [
                "id" => 1,
                "name" => "หลักสูตรพื้นฐาน",
                "description" => "หลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน"
            ],
            [
                "id" => 2,
                "name" => "หลักสูตรวิทย์-คณิต",
                "description" => "หลักสูตรแกนกลางการศึกษาขั้นพื้นฐานเน้นวิทยาศาสตร์-คณิตศาสตร์"
            ],
        ];

        foreach ($courses as $course) {
            Course::create($course);
        }

        $classrooms = [
            [
                "id" => 1,
                "name" => "ม.1",
                "description" => "มัธยมศึกษาปีที่ 1"
            ],
            [
                "id" => 2,
                "name" => "ม.2",
                "description" => "มัธยมศึกษาปีที่ 2"
            ],
            [
                "id" => 3,
                "name" => "ม.3",
                "description" => "มัธยมศึกษาปีที่ 3"
            ],
        ];

        foreach ($classrooms as $classroom) {
            $class = ClassRoom::create($classroom);
            $class->courses()->attach([1, 2]);
        }
    }
}
