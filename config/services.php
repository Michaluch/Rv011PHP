<?php

return [

	/*
	|--------------------------------------------------------------------------
	| Third Party Services
	|--------------------------------------------------------------------------
	|
	| This file is for storing the credentials for third party services such
	| as Stripe, Mailgun, Mandrill, and others. This file provides a sane
	| default location for this type of information, allowing packages
	| to have a conventional place to find your various credentials.
	|
	*/

	'mailgun' => [
		'domain' => '',
		'secret' => '',
	],

	'mandrill' => [
		'secret' => '',
	],

	'ses' => [
		'key' => '',
		'secret' => '',
		'region' => 'us-east-1',
	],

	'stripe' => [
		'model'  => 'App\User',
		'secret' => '',
	],

	'facebook' => [
    'client_id' => '1668647973380478',
    'client_secret' => 'b4de6811cd16be9e976305c8ceb47a74',
    'redirect' => 'http://bawl.dev/auth/facebook',
],

'google' => [
    'client_id' => '1067510084405-hlq549egqurlutttjfeu5f6jhgkn97el.apps.googleusercontent.com',
    'client_secret' => 'j4rNbKoHp_ucY4pMTxHNqyxa',
    'redirect' => 'http://bawl.dev/auth/google',
],

];
