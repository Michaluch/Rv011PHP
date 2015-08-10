<?php namespace App\Http\Controllers;
use App\Models\Issues;
use App\Models\IssueStatus as Statuses;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;


use App\Models\Issues as Issue;
use App\Models\Atachments as Attachment;
use App\Models\History as History;
use App\Models\IssuesCategory as IssuesCategory;
use App\Models\IssuesCategory as Categry;
use App\Models\IssueStatus as IssueStatus;
use App\User as User;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

use Validator;




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
		switch($id) {
        case 'all':
            return $this->showAllForManager();
            break;
        case 'new':
            return $this->showNewForManager();
            break;
        case 'solved':
            return $this->showSolvedForManager();
            break;
        default :
        	return $this->showById($id);
        	break;
        }	

		
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
		$user = $auth->user();
		if (!is_null($user)){
			$issue = Issues::where('id', $id)->first();
			if (!is_null($request->input('status'))){
				$history = new History();
				$history->user_id = $user->id;
				$history->status_id = $request->input('status');
				$history->date = date('Y-m-d H:i');
				try {
					$issue->history()->save($history);
				} catch (Exception $e) {
					//
				}
			}
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


	private function showAllForManager()
	{
		$data = Issue::with('category','historyUpToDate','historyUpToDate.status')->get();
        return $data;
	}


	private function showById($id)
	{
		$result=Issues::where('id', '=', $id)
		->with('category', 'history', 'history.status', 'attachments')->first();
		return $result;

		//$data = Issue::where('id', '=', $id)->first();
		//if (!is_null($data)){
		//	$atach = array();
		//	$category = array();
		//	foreach ($data->attachments->all() as $attachment)
		//	{
		//		$atach[] =  $attachment->url;
		//	};
		//	$issue_data = $data->toArray();
		//	$issue_data['attachments'] = $atach;
		//	//$issue_data['category'] = !is_null($cat = $data->category) ? $cat->name : null;
		//	//$issue_data['status'] = $data->history->status->name;
		//	$issue_data['author_id'] = $data->history->user_id;
		//	return response()->json(['code' => '12202', 'data' => $issue_data]);
		//} else {
		//	return response()->json(['code' => '12501', 'msg' => 'Issue is not exist!']);
		//}
	}
	public function getIssueStatuses(){
		$statuses=Statuses::all();
		return $statuses;
	}
}