<?php namespace App\Http\Controllers;

//use App\Models\Users;
use App\User as User;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Auth as Auth;
use Illuminate\Contracts\Auth\Guard;



class RegistrationController extends Controller {

    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function confirm($confirmation_code)
	{
		if( ! $confirmation_code)
        {
            throw new InvalidConfirmationCodeException;
        }
        $user = User::where('salt', $confirmation_code)->first();
        if ( ! $user)
        {
            throw new InvalidConfirmationCodeException;
        }

        $user->status_id = 2;
        $user->save();

        return redirect('/');
	}

    public function changePass($confirmation_code)
    {
        if( ! $confirmation_code)
        {
            throw new InvalidConfirmationCodeException;
        }
        $user = User::where('salt', $confirmation_code)->first();
        if ( ! $user)
        {
            throw new InvalidConfirmationCodeException;
        }

        $this->auth->loginUsingId($user->id);

        return redirect('/#profile');
    }
}
