<?php namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\Guard;

use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Http\Request;
use App\Services\Registrar;
use App\User;


class AuthController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Registration & Login Controller
	|--------------------------------------------------------------------------
	|
	| This controller handles the registration of new users, as well as the
	| authentication of existing users. By default, this controller uses
	| a simple trait to add these behaviors. Why don't you explore it?
	|
	*/

	use AuthenticatesAndRegistersUsers;
	public $timestamps = false;

	/**
	 * Create a new authentication controller instance.
	 *
	 * @param  \Illuminate\Contracts\Auth\Guard  $auth
	 * @param  \Illuminate\Contracts\Auth\Registrar  $registrar
	 * @return void
	 */
	public function __construct(Guard $auth, Registrar $registrar)
	{
		$this->auth = $auth;
		$this->registrar = $registrar;

		$this->middleware('guest', ['except' => 'getLogout']);
	}

	public function postRegister(Request $request)
	{
		$validator = $this->registrar->validator($request->all());

		if ($validator->fails())
		{
			$this->throwValidationException(
				$request, $validator
			);
		}

		$this->auth->login($this->registrar->create($request->all()));
	
        
		return response()->json(['code' =>'11200', 'message' => 'You sign up successfully check email'],200);	
		//	if($request->ajax()) {
		//	$result = array(
		//		'status' => 'error',
		//		'msg' => $this->getFailedLoginMessage(),
		//		);
		//	
		//	return $result;
		//} else {
//
//		//	return redirect($this->loginPath())
//		//			->withInput($request->only('email', 'remember'))
//		//			->withErrors([
//		//				'email' => $this->getFailedLoginMessage(),
//		//			]);
		//}

		//return redirect($this->redirectPath());
	}

/**
	 * Handle a login request to the application.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function postLogin(Request $request)
	{
		
		$this->validate($request, [
			'email' => 'required|email', 'password' => 'required',
		]);

		$credentials = $request->only('email', 'password');

		if ($this->auth->attempt($credentials, $request->has('remember')))
		{
			if($request->ajax()) {
				return array(
					'status' => 'ok',
					'response'=>'10200',
					);
			}
			else {
				return redirect()->intended($this->redirectPath());
			}
		};

		if($request->ajax()) {
			$result = array(
				'status' => 'error',
				'errors' => $this->getFailedLoginMessage(),
				'response'=>'10400',
				);
			
			return $result;
		} else {

			return redirect($this->loginPath())
					->withInput($request->only('email', 'remember'))
					->withErrors([
						'email' => $this->getFailedLoginMessage(),
					]);
		}
	}
	public function postLogout()
	{
		$this->auth->logout();
		$result=array(
			'status' => 'ok'
			);
		return $result;
	}

	public function postLogged()
	{
		return array('user' => $this->auth->user());
	}

	public function getFacebook(){
		return $this->authSocialize('facebook');
	}

	public function getGoogle(){
		return $this->authSocialize('google');
	}

	private function authSocialize($type){

		$provider = \Socialize::with($type);      
	    if (\Input::has('code'))
	    {
	        $userSocialite = $provider->user();
	        $this->auth->login($this->createOrFindUser($userSocialite, $type), false);

	        return redirect('/#');
	    } else {
	        return $provider->scopes(['email'])->redirect();
	    }
	}

	private function createOrFindUser(\Laravel\Socialite\AbstractUser $userSocialite, $type){
		if($user = User::where('email', '=', $userSocialite->getEmail())->first()) {
			$user->{$type . '_id'} = $userSocialite->getId();
			$user->avatar_url = $userSocialite->getAvatar();
			$user->save();

			return $user;
		} elseif($user = User::where($type . '_id', '=', $userSocialite->getId())->first()) {
			return $user;
		} else {
			$user = User::create([
				'email' => $userSocialite->getEmail(),
				'avatar_url' => $userSocialite->getAvatar(),
				$type . '_id' => $userSocialite->getId(),
				'password' => bcrypt(str_random(32)),
			]);

			return $user;
		}
	}
}
