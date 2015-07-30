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

Route::post('/search', 'SearchController@postSearch');
//Route::post('/auth/register', 'auth@postRegister');

Route::get('register/verify/{confirmationCode}', 'RegistrationController@confirm');
Route::resource('issue', 'IssueController');
Route::post('attachment','AttachmentController@store');
Route::get('category', function(){
	$categories = App\Models\IssuesCategory::all();
	$response = new Illuminate\Http\Response;
	return response()->json(['code' => '16200', 'data' => $categories->toArray()]);
});
/**
 * Route for attachments avatar
 */

