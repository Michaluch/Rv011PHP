<?php namespace App\Http\Controllers;

use App\Http\Requests;

use App\Http\Controllers\Controller;
use App\Models\Attachments as Attachment;
use Symfony\Component\HttpFoundation\File\File as File;
use App\User as User;



use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AttachmentController extends Controller {

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(Request $request)
	{
		$file = $request->file('attachments');
		$allowed_mime = array('image/jpeg', 'image/gif', 'image/pjpeg', 'image/png');
		$upload_dir = 'uploaded/';
		if ($file->isValid() && in_array($file->getMimeType(), $allowed_mime)){
			$original_name = $file->getClientOriginalName();
			$file_name = $original_name;
			if (file_exists($upload_dir . $original_name)){
				$file_name ='attach_' . mt_rand (1000000, 9999999) . '.' . $file->guessClientExtension();
			}
			$file->move($upload_dir, $file_name);
		}

		/*
		This block to separate attachments for User from  attch for Issue 
		 */ 
		if ($request->input('type')=="User")
		{
			$user = User::where('email', $request->input('email'))->first();
			$user->avatar_url=$upload_dir . $file_name;
	
			$user->save();
			return response()->json(['code' => $file, 'msg' => $user->email]);
		}
		else if ($request->input('type')=="Issue")
		{
			$attachment = new Attachment();
			//$attachment->url = $_SERVER['HTTP_HOST'] . '/uploaded/' . $file_name;
			$attachment->url = $file_name;
	    	$attachment->issue_id = $request->issue_id;
	    	$attachment->save();
		}
		return response()->json(['code' => $file, 'msg' => 'Stored!']);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
        $attachment = Attachment::where('id', '=', $id)->first();
        return $attachment;
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
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
	    $upload_dir = 'uploaded/';
		$attachment = Attachment::where('id', '=', $id)->first();
		$url = $attachment->url;
		try{
		    $result = $attachment->delete();
		    unlink(getcwd().'/'.$upload_dir.$url);
		}
		catch (Exception $e) {
		    $result=false;
	    }
		return [
    		'code' =>'11111', 
    		'message' => 'Attachment '.$id.' and file '.getcwd().'/'.$upload_dir.$url.' deleted.',
    		'result' => $result,
	    ];	
	}

}
