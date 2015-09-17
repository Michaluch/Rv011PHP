<?php namespace App\Http\Controllers;


use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Models\IssuesCategory as IssuesCategory;
use Validator;

class CategoriesController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
		$data = IssuesCategory::all();
		return $data;
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
		//
		$data = $request->all();
        $category_model = new IssuesCategory;
        $input_category_name = $data['name'];
        $input_category_confirmed = $data['confirmed'];
        $category_to_check = $category_model->where('name', '=', $input_category_name)->first();        
        if (is_null($category_to_check)){
            $new_category = new IssuesCategory;
            $new_category->name = $input_category_name;
            $new_category->confirmed = $input_category_confirmed;
            $new_category->save();
            return [
					'code' =>'13150', 
					'message' => "Category succesfully created",
					'result' => $new_category,
				];	
        } else {
        	return "This category is already exist";
        }
            
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$data = IssuesCategory::where('id', '=', $id)->first();
		return $data;
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
	public function update(Guard $auth, Request $request, $id)
	{
		//
		$user = $auth->user();
		if (!is_null($user)){
			$category = IssuesCategory::where('id', $id)->first();

			$changed_fields = "";
			
			if(!is_null($request->input('name'))){
				$category->name=$request->input('name');
				$changed_fields .= "name, ";
			}
			if(!is_null($request->input('confirmed'))){
				$category->confirmed=$request->input('confirmed');
				$changed_fields .= "confirmed, ";
			}

			$result=$category->save();
			
			$changed_fields = rtrim($changed_fields, ", ");
			return [
					'code' =>'12150', 
					'message' => 'Category fields ('.$changed_fields.') was updated',
					'result' => $result,
				];	
			}
			
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
