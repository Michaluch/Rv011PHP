<?php namespace App\Http\Controllers;
use App\Models\User;
use App\Http\Controllers\Controller;
class UserController extends Controller {

    /**
     * [index description]
     * Fetch all user from DB
     * @return [type] [description]
     * json all users attr
     */
    public function index()
    {
        /**
         * Fetch all Users from DB
         */
        $fetchedAllUsers=User::all();
        $fetchedAllAttributes=array();
        /**
         * As we fetched not necessery data, lets take
         * onle attr
         */
        foreach ($fetchedAllUsers as $model) {
            $fetchedAllAttributes[]=$model->attributes;
        }
        
        return json_encode($fetchedAllAttributes);
    }

    /**
     * Show the profile for the given user.
     */
    public function showProfile($id)
    {
        $user = User::find($id);

        return View::make('user.profile', array('user' => $user));
    }

    /**
    * 
    */
    public function createUser()
    {
        //$input = Input::json();
        $salt = function ()
            {
               return 0;
            };
        $passw = function ()
            {
                return 0;
            };
            User::create(array(
                
                'email'      =>'TEST@DD.DD', //=>$input->email,
                'password'   =>'TEST', //=>$input->password,
                'facebook_id'=>'TEST', //=>$input->facebook_id,
                'google_id'  =>'TEST', //=>$input->google_id  ,
                'role_id'    =>1, //=>1,
                'status_id'  =>1, //=>1,
                'avatar_url' =>'TEST', //=>$input->avatar_url ,
                'language_id'=>1, //=>1,
                'salt'       =>'TEST' //=>"blabla"       
        ));
    }
  /**
   * 
   */
    public function editUser($id)
    {
        $user = User::find($id);
        return View::make('user.profile', array('user' => $user));
    }
   /**
     * 
     */


    public function hi()
    {
        return 'hi';
    }

}