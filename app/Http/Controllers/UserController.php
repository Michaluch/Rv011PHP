<?php namespace App\Http\Controllers;
use App\Models\Users;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
class UserController extends Controller {
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$fetchAll = Users::all();
		$fetchAllAttr = array ();
		foreach ($fetchAll as $model) {
			$fetchAllAttr[]=$model->attriutes;
		}
		return json_encode($fetchAll);
	}
	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create(Request $request)
	{
		//dd(request);
	
			//throw 
			try {
			   Users::create(array (
               "email"       =>$request->email,
			   "password"    =>$request->password,
               "facebook_id" =>"",
               "google_id"   =>"",
               "role_id"     =>1,
               "status_id"   =>1,
               "avatar_url"  =>"",
               "language_id" =>1
			   )); 
			}
			catch (Exception $e) {
				
			}	
			return response()->json(['code' =>'11200', 'message' => 'You sign up successfully'],200);
			
		
	}
	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}
	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}
	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}
	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}
	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}
}