<?php

namespace App\Http\Controllers;

use App\Models\ClassRoom;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class ClassRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $classRooms = QueryBuilder::for(ClassRoom::class)
            ->allowedIncludes('courses')
            ->defaultSort('-created_at')
            ->where('name', 'like', '%' . request()->get("search") . '%')
            ->orWhere('description', 'like', '%' . request()->get("search") . '%')
            ->paginate(request()->get("pageSize"))
            ->appends(request()->query());

        return response()->json($classRooms);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $model = new ClassRoom();
        $model->name = $request->name;
        $model->description = $request->description;
        $model->save();
        $model->courses()->attach($request->courses);
        
        return response()->json([
            "isSuccess" => true,
            "message" => ""
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $course = ClassRoom::findOrFail($id);
        $course->name = $request->name;
        $course->description = $request->description;
        $course->save();
        $course->courses()->sync($request->courses);

        return response()->json([
            "isSuccess" => true,
            "message" => ""
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $course = ClassRoom::findOrFail($id);
        $course->courses()->detach();
        $course->delete();

        return response()->json([
            "isSuccess" => true,
            "message" => ""
        ]);
    }
}
