<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Issues as Issue;
use App\Models\Atachments as Attachment;
use App\Models\History as History;
use App\Models\IssuesCategory as IssuesCategory;
use App\Models\IssuesCategory as Categry;
use App\Models\IssueStatus as IssueStatus;
use App\User as User;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

use Validator;

class IssueController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{

		//= Issue::all();
		//$data = DB::table('issues')
		//->join('issuescategory', 'issuescategory.id', '=', 'issues.category_id')
        //->join('history', 'issues.id', '=', 'history.issue_id')
        //->join('issuestatus', 'issuestatus.id', '=', 'history.status_id')
        //->select('issues.id', 'issues.name','issuescategory.name as category' ,
        //  'issues.description','history.date','issuestatus.name as status')
        //->orderBy('issues.id', 'desc')
        //->get();


		//$issues_collection =  $data->filter(function($issue){
		//	// show active issues only
		//	if ($issue->history()->first()->status_id !== 100){
		//		return true;	
		//	}
		//	return false;
		//});
		//$issues_array = $data->toArray();//$issues_collection->toArray();
		//$issues = array();
		//foreach ($issues_array as $issue)
		//{
		//	$issues[] = array(
		//		'id' => $issue['id'],
		//		'title' =>	$issue['name'],
		//		'location' => json_decode($issue['map_pointer']),
		//		'name' =>	$issue['name'],
		//		'description' =>	$issue['description']
		//	);
		//};
		//if ($data->first()) { } 
		//if ($data->isEmpty()) {return "Empty"; }
		//if ($data->count()) { return $data->count();}
		//return $data;//($issues);
		//return response()->json(['code' => '12200', 'data' => $issues]);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
		$data = $request->json()->all();
		if (empty($data)){
			// error
		}

		// validation block
		$validator = validator($request->all());

		if ($validator->fails())
		{
			$this->throwValidationException(
				$request, $validator
			);
		}

		$issue = new Issue;
		$issue->name = $data['name'];
		if (isset($data['description'])){
			$issue->description = $data['description'];
		}
		$issue->map_pointer = json_encode($data['location']);
				//TO FIX Categry
		$categoryModel = new Categry; 
		$input_cat = strtolower($data['category']);
		$category = $categoryModel->where('name', '=', $input_cat)->first();
		if (is_null($category)){
			$new_cat = new Categry;
			$new_cat->name = $input_cat;
			$new_cat->save();
			$cat_id = $new_cat->id;
		} else {
			$cat_id = $category->id;
		}
		$issue->category_id = $cat_id;
		//$issue->severity = $data['severity'];
		if ($issue->save()){
			$issue_id = $issue->id;
			
			$history = new History;
			// get current user id
			$history->user_id = 1;
			$history->issue_id = $issue_id;
			// default value
			$history->status_id = 1; 
			$history->date = date('Y-m-d H:i:s');
			$history->save();
		}
		return response()->json(['code' => '12201', 'msg' => 'Created!', 'data' => array('issue_id' => $issue_id)]);
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

  public function showUserIssues($uid)
	{
		$data = Issue::whereHas('history', function($q){
			$q->where('user_id', '=', $uid);
		})->get()->all();	
		
		if (!is_null($data)){
			$issues = array();
			foreach($data as $issue){
				$atach = array();
				$category = array();
				foreach ($data->attachments->all() as $attachment)
				{
					$atach[] =  $attachment->url;
				};
				$issue_data = $data->toArray();
				$issue_data['attachments'] = $atach;
				$issue_data['category'] = !is_null($cat = $data->category) ? $cat->name : null;
				$issue_data['status'] = $data->history->status->name;
				$issue_data['author_id'] = $data->history->user_id;
				$issues[] = $issue_data; 
			}
			return response()->json(['code' => '12212', 'data' => $issues]);
		} else {
			return response()->json(['code' => '12511', 'msg' => 'Issue is not exist!']);
		}
	}
	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		// get user permission
		
		if (!'validate issue') {
			return response()->json(['code' => '12500', 'msg' => 'Validation error! Issue can not be updated!']);
		}
		
		// end of validate
		return response()->json(['code' => '12202', 'msg' => 'Issue has been successfully updated']);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		 Issue::where('id', '=', $id)->delete();
		 return response()->json(['code' => '13200', 'msg' => 'Deleted!']);
	}

	public function validator(array $data)
	{
		return Validator::make($data, [
			'name'       => 'required|max:256',
			'location'    => 'required',
            'severity'  =>  'Integer|between:1,5'

		]);
	}
	/**
	 * Return
	 * @return [type] [description]
	 */
	private function showAllForManager()
	{
		//$data = Issue::with('category','historyUpToDate','historyUpToDate.status')->get();
        return $data;
	}

	private function showNewForManager()
	{
		//$data = Issue::with(['category','historyUpToDate.status','historyUpToDate'=>
		//	    function ($q) { $q ->where('status_id','1')}])	
		//->get();
		
//
//		//$data1;
//
//		//foreach ($data as $el) 
//		//{
//		//	if ($el->history_up_to_date->status->name=="New")
//		//	//	array_push($data1,$el);
//		//	$data1+=$el;
		//}
        

       // echo $picnic->name . ' ' . $picnic->taste_level;

		//$data = 
//		    ->join('issuescategory', 'issuescategory.id', '=', 'issues.category_id')
//            ->join('history', 'issues.id', '=', 'history.issue_id')
//            ->join('issuestatus', 'issuestatus.id', '=', 'history.status_id')
//            ->where('issuestatus.name','=','new')
//            ->select('issues.id', 'issues.name','issuescategory.name as category' ,
//              'issues.description','history.date','issuestatus.name as status')
//            ->orderBy('issues.id', 'desc')
//            ->get();
            return $data;
	}

	private function showSolvedForManager()
	{
		//$data = Issue::all()->with('issuescategory' , 'history','issuestatus')
		$data = DB::table('issues')
		    ->join('issuescategory', 'issuescategory.id', '=', 'issues.category_id')
            ->join('history', 'issues.id', '=', 'history.issue_id')
            ->join('issuestatus', 'issuestatus.id', '=', 'history.status_id')
            ->where('issuestatus.name','=','solved')
            ->select('issues.id', 'issues.name','issuescategory.name as category' ,
              'issues.description','history.date','issuestatus.name as status')
            ->orderBy('issues.id', 'desc')
            ->get();
            return $data;
	}


	private function showById($id)
	{
		$data = Issue::where('id', '=', $id)->first();
		if (!is_null($data)){
			$atach = array();
			$category = array();
			foreach ($data->attachments->all() as $attachment)
			{
				$atach[] =  $attachment->url;
			};
			$issue_data = $data->toArray();
			$issue_data['attachments'] = $atach;
			//$issue_data['category'] = !is_null($cat = $data->category) ? $cat->name : null;
			//$issue_data['status'] = $data->history->status->name;
			$issue_data['author_id'] = $data->history->user_id;
			return response()->json(['code' => '12202', 'data' => $issue_data]);
		} else {
			return response()->json(['code' => '12501', 'msg' => 'Issue is not exist!']);
		}
	}

}
