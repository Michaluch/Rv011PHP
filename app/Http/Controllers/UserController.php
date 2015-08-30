<?php namespace App\Http\Controllers;
use App\Models\Users;
use App\Models\UserStatuses as Statuses;
use App\Models\Roles as Roles;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Auth\Guard;
use App\User as User;


class UserController extends Controller {
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$fetchAll = Users::select('id', 'email', 'role_id', 'status_id', 'avatar_url')->get();;
		return $fetchAll;
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
	public function store(Request $request)
	{
		$data = $request->all();
        $user = new User;
        $user->email = $data['email'];
        $user->password = $data['password'];
        $user->avatar_url=$data['avatar_url'];
        $user->role_id=1;
        $user->status_id=2;
        $user->salt=str_random(8);
        $user->save();
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
	public function destroy(Guard $auth, $id)
	{
	    $user_admin = $auth->user();
	    if ($user_admin->role_id == 3) {
    	    $user=User::where("id", '=', $id)->first();
    	    if ($user->role_id == 3 && User::where('role_id', '=', 3)->where('status_id', '=', 2)->count()<2){
    	        return response()->json(['status' => 'error',
    	        	'message' => 'STOP! You can\'t do it! You are the last one of mega super admins!!!',
    	            ]);
    	    }
    	    else {
        	    $user->status_id = 3;
        	    $user->save();
        		return ['status' => 'success', 'message' => "user $id destroyed!"];
    	    }
	    }
	    else{
	        return ['status' => 'error', 'message' => 'STOP! You have no permission to do it!'];
	    }
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

	
	public function getUserStatusesAndRoles(){

		$statuses=Statuses::all();
		$roles=Roles::all();
		return [
			'statuses' => $statuses,
			'roles' => $roles,
		];
	}
}