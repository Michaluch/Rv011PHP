<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Issues as Issue;
use App\Models\Atachments as Attachment;
use App\Models\History as History;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class IssueController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$data = Issue::all();
		
		$issues_collection =  $data->filter(function($issue){
			// show active issues only
			if ($issue->history()->first()->status_id !== 2){
				return true;	
			}
			return false;
		});
		$issues_array = $issues_collection->toArray();
		$issues = array();
		foreach ($issues_array as $issue)
		{
			$issues[] = array(
				'id' => $issue['id'],
				'title' =>	$issue['name'],
				'location' => $issue['map_pointer'],
			);
		};
		return response()->json(['code' => '12200', 'data' => $issues]);
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
		
		$issue = new Issue;
		$issue->name = $data['name'];
		if (isset($data['description'])){
			$issue->description = $data['description'];
		}
		$issue->map_pointer = json_encode($data['location']);
		$issue->category_id = $data['category'];
		$issue->severity = $data['severity'];
		if ($issue->save()){
			$issue_id = $issue->id;
			
			$history = new History;
			// get current user id
			$history->user_id = 1;
			$history->issue_id = $issue_id;
			// default value
			$history->status_id = 1; 
			$history->date = date('Y-d-m H:i:s');
			$history->save();
			
			// attachments
			if (isset($data['attachments'])){
				foreach($data['attachments'] as $attachment){
					// save attachments
					$attachment = new Attachment;
					$attachment->issue_id = $issue_id; 
					$attachment->url = 'url';
				    $attachment->save();
				}
			}
		}
		return response()->json(['code' => '12201', 'msg' => 'Created!']);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$data = Issue::find($id);
		if (!is_null($data)){
			$atach = array();
			$category = array();
			foreach ($data->attachments()->get()->all() as $attachment)
			{
				$atach[] =  $attachment->url;
			};
			$issue_data = $data->toArray();
			$issue_data['attachments'] = $atach;
			$issue_data['category'] = !is_null($cat = $data->category()->get()->first()) ? $cat->name : null;
			$issue_data['status'] = $data->history()->first()->status()->first()->name;
			return response()->json(['code' => '12202', 'data' => $issue_data]);
		} else {
			return response()->json(['code' => '12501', 'msg' => 'Issue is not exist!']);
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

}
