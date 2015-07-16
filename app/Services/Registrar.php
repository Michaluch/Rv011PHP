<?php namespace App\Services;

use App\User;
use Validator;
use Illuminate\Contracts\Auth\Registrar as RegistrarContract;
use Illuminate\Support\Facades\Mail;

class Registrar implements RegistrarContract {

	/**
	 * Get a validator for an incoming registration request.
	 *
	 * @param  array  $data
	 * @return \Illuminate\Contracts\Validation\Validator
	 */
	public function validator(array $data)
	{
		return Validator::make($data, [
			'email'       => 'required|email|max:255|unique:users',
			'password'    => 'required|min:6|unique:users',
			"facebook_id" => 'unique:users',
            "google_id"   => 'unique:users',
            "avatar_url"  =>  'url'

		]);
	}

	/**
	 * Create a new user instance after a valid registration.
	 *
	 * @param  array  $data
	 * @return User
	 */
	public function create(array $data)
	{
		$salt = str_random(8);
		try
		{
		$user = User::create([
			'email' => $data['email'],
			'password' => bcrypt($data['password']),
			"facebook_id" => "",
            "google_id"   => "",
            "role_id"     => 1,
            "status_id"   =>  1,
            "avatar_url"  =>"",
            "language_id" => 1,
            "salt"		  => $salt
		]);
		}
		catch (Exception $e) {
				
		}
		$toEmail = $data['email'];
		Mail::send('emails.email', array('msg' => $salt), function($message)use($toEmail){
			$message->from('aleksandr.semenyuk@gmail.com', 'Bawl');
            $message->to($toEmail)->subject('Verify your email address');
        	});	
		return $user;
	}
}
