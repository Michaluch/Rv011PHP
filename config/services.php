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
    'client_id' => '404231896432923',
    'client_secret' => '67df320c3883956ea730488e77b1225f',
    'redirect' => 'http://academy.com/auth/facebook',
],

'google' => [
    'client_id' => '1017304995584-c0bar7sna64f07ttpm4qgd0fdo934ven.apps.googleusercontent.com',
    'client_secret' => '664SJxLswUYUrmx_SugRNmRb',
    'redirect' => 'http://academy.com/auth/google',
],

];
