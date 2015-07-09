<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'WelcomeController@index');

Route::get('home', 'HomeController@index');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
Route::get('get/{id}', function($id){
  if ($id !== null){
    return $id;
  } else {
    return 'Hello world this is test';
  }
})->where('id', '^\d{2}-\d{2}-\d{4}$');

Route::get('fb', function ($facebook = "facebook")
{
    $provider = \Socialize::with($facebook);      
    if (Input::has('code'))
    {
        $user = $provider->user();
        return var_dump($user);
    } else {
        return $provider->scopes(['email'])->redirect();
    }
});

Route::get('gp', function ($google = "google")
{
    $provider = \Socialize::with($google);      
    if (Input::has('code'))
    {
        $user = $provider->user();
        return var_dump($user);
    } else {
        return $provider->scopes(['email'])->redirect();
    }
});