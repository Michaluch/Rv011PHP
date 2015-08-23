<?php namespace App\Http\Controllers;
use App\Models\Issues;
use App\Models\IssueStatus as Statuses;
use App\Models\IssuesCategory as Categories;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;


use App\Models\Issues as Issue;
use App\Models\Atachments as Attachment;
use App\Models\History as History;
use App\Models\IssuesCategory as IssuesCategory;

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
        $keyword=$request->input('search');
		return $this->getIssuesCollection($keyword);
	}

	private function getIssuesCollection($keywords = null){
		//$result = Issues::with('category', 'history', 'history.status');
        $result = Issue::with('historyUpToDate');
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
	public function store(Guard $auth, Request $request)
	{
	    $user = $auth->user();
        // validation block
	    $validator = $this->validator($request->all());

        if ($validator->fails())
        {
            $this->throwValidationException($request, $validator);
        }
        $data = $request->all();
        $issue = new Issues;
        $issue->name = $data['name'];
        if (isset($data['description'])){
            $issue->description = $data['description'];
        }
        $issue->map_pointer = json_encode($data['map_pointer']);
        
        $categoryModel = new IssuesCategory;
        $input_cat = strtolower($data['category']);
        $category = $categoryModel->where('name', '=', $input_cat)->first();
        if (is_null($category)){
            $new_cat = new IssuesCategory;
            $new_cat->name = $input_cat;
            $cat_id = $issue->category()->save($new_cat)->id;
        } else {
            $cat_id = $category->id;
        } 
        $issue->category_id = $cat_id;
        
        $issue->severity = 1;
        $issue->save();
        $history = new History;
        $history->user_id = $user->id;
        $history->status_id = 1;
        $history->issue_id = $issue->id;
        $history->date = date('Y-m-d H:i:s');
        $issue->history()->save($history);


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
            return $this->showCustomForManager(1);
            break;
        case 'solved':
            return $this->showCustomForManager(4);
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

			$changed_fields = "";
			
			if (!is_null($request->input('status'))){
				$history = new History();
				$history->user_id = $user->id;
				$history->status_id = $request->input('status');
				$history->date = date('Y-m-d H:i');
				try {
					$status_change_result=$issue->history()->save($history);
					$changed_fields .= "status, ";
				}catch (Exception $e) {
					//
				}
			}
			else $status_change_result = true;

            if(!is_null($request->input('category_id'))){
				$issue->category_id=$request->input('category_id');
				$changed_fields .= "category_id, ";
			}

            if(!is_null($request->input('name'))){
				$issue->name=$request->input('name');
				$changed_fields .= "name, ";
			}
			
    		if(!is_null($request->input('description'))){
				$issue->description=$request->input('description');
				$changed_fields .= "description, ";
			}
			
    		if(!is_null($request->input('severity'))){
				$issue->severity=$request->input('severity');
				$changed_fields .= "severity, ";
			}			
			
			$result=$issue->save();
			
			$changed_fields = rtrim($changed_fields, ", ");
			return [
					'code' =>'12150', 
					'message' => 'Issue fields ('.$changed_fields.') was updated',
					'result' => $result && $status_change_result,
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

	public function validator(array $data)
	{
	    return Validator::make($data, [
	        'name'     => 'required|max:256',
	        'map_pointer' => 'required',
	        'severity' =>  'Integer|between:1,5'
        ]);
	}


	private function showAllForManager()
	{
		$data = Issue::with('historyUpToDate')->get();
		return $data;
	}

	private function showCustomForManager($id)
	{
		$data = Issue::with('historyUpToDate')->get();
		$toSend = array();
		foreach ($data as $el) 
		{

            if ($el->historyUpToDate->status_id == $id)
			{
				array_push($toSend, $el);
			}
		}
		return $toSend;
	}

	private function showById($id)
	{
		$result=Issues::where('id', '=', $id)
		->with('category', 'history', 'history.status', 'attachments', 'historyUpToDate')->first();
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
	
    public function showUserIssues($user)
    {
        // Take Issues where first initiator was $user
        $data = Issue::with('historyFirst')->get();
        //
        $toSendIssue = array();
        foreach ($data as $el) 
        {
           if ($el->historyFirst->user_id == $user)
           {
               array_push($toSendIssue, $el->historyFirst->issue_id);
            }
        }
        // Take Update Issues  and find Issues which is array of User Initiation
        $dataUpToDate = Issue::with('historyUpToDate')->get();
        $toSend = array();
        foreach ($dataUpToDate as $el) 
        {
            if (in_array($el->historyUpToDate->issue_id, $toSendIssue))
            {
               array_push($toSend, $el);
            }
        }

        return $toSend;
    }

	public function getIssueStatusesAndCategories(){

		$statuses=Statuses::all();
		$categories=Categories::all();
		return [
			'statuses' => $statuses,
			'categories' => $categories,
		];
	}

}