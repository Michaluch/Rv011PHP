<?php namespace App\Http\Controllers;

use App\Models\Users;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;



class RegistrationController extends Controller {

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
        $user = Users::where('salt', $confirmation_code)->first();
        if ( ! $user)
        {
            throw new InvalidConfirmationCodeException;
        }

        $user->status_id = 2;
        $user->save();

        return redirect('/');
	}
}
