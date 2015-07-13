<?php namespace App\Http\Controllers;

use App\Http\Requests;

use App\Http\Controllers\Controller;
use App\Models\Attachments as Attachment;
use Symfony\Component\HttpFoundation\File\File as File;



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
		$upload_dir = $_SERVER['DOCUMENT_ROOT'] . '/uploaded/';
		if ($file->isValid() && in_array($file->getMimeType(), $allowed_mime)){
			$original_name = $file->getClientOriginalName();
			$file_name = $original_name;
			if (file_exists($upload_dir . $original_name)){
				$file_name ='attach_' . mt_rand (1000000, 9999999) . '.' . $file->guessClientExtension();
			}
			$file->move($upload_dir, $file_name);
		}
		$attachment = new Attachment();
		$attachment->url = $_SERVER['HTTP_HOST'] . '/uploaded/' . $file_name;
	    $attachment->issue_id = $request->issue_id;
	    $attachment->save();
		
		return response()->json(['code' => '18200', 'msg' => 'Stored!']);
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
