<?php namespace App\Http\Controllers;
use App\Models\Issues;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class IssuesController extends Controller {
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		/*
		$result = Issues::with('category', 'history', 'history.status')->get();
		return $result->toArray();
		*/
		return $this->getIssuesCollection();
	}

	public function search(Request $request)
	{
		/*
		$result = Issues::with('category', 'history', 'history.status')
		->search($request->search)->get();
		return $result->toArray();
		*/
		return $this->getIssuesCollection($request->search);
	}

	private function getIssuesCollection($keywords = null){
		$result = Issues::with('category', 'history', 'history.status');
		if($keywords) {
			$result->search($keywords);
		}
		return $result->get()->toArray();
	}
	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create(Request $request)
	{

	}
	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{

	}
	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$result=Issues::where('id', '=', $id)
		->with('category', 'history', 'history.status', 'attachments')->first();
		return $result;
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