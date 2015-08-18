<?php namespace App\Http\Controllers;
use App\Models\Users;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Crypt;
use App\User as User;


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
			$fetchAllAttr[] = $model->attriutes;
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
		
		$salt = str_random(8);
		$pass = Crypt::encrypt($request->password.$salt);
			//throw 
			try {
			   Users::create(array (
               "email"       =>$request->email,
			   "password"    =>$pass,
               "facebook_id" =>"",
               "google_id"   =>"",
               "role_id"     =>1,
               "status_id"   =>1,
               "avatar_url"  =>"",
               "language_id" =>1,
               "salt"		 =>$salt
			   )); 
			}
			catch (Exception $e) {
				
			}

			$toEmail = $request->email;
			
			Mail::send('emails.email', array('msg' => $salt), function($message)use($toEmail){
			$message->from(env('MAIL_USERNAME'), 'Bawl');
            $message->to($toEmail)->subject('Verify your email address');
        	});	
			return response()->json(['code' =>'11200', 'message' => 'You sign up successfully check email','data' => $issues],200);	
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

	/**
	 * Reset pass and send email with link to change pass
	 * @param  email
	 * @return [type]     [description]
	 */
	public function resetPass(Request $request) //
	{
		$result=User::where("email", '=', $request->email )->first();
		if($result!=null)
		{
			$toEmail = $result['email'];
			Mail::send('emails.reset', array('msg' => $result['salt']), function($message)use($toEmail){
			$message->from(env('MAIL_USERNAME'), 'Bawl');
        	$message->to($toEmail)->subject('Reset Password');
        	});
			return response()->json(['code' =>'11200', 'message' => 'Check email and reset password'],200);
		}
		else
		{
			return response()->json(['code' =>'11400', 'message' => 'No such user to reset password'],200);	
		}
	} 
}