<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class UserTableSeeder extends Seeder {

    public function run()
    {
        DB::table('Users')->delete();
		
		DB::table('Users')->insert([
				['email' => 'foo@bar.com',
				"password"    =>"testpass",
			   "facebook_id" =>"",
			   "google_id"   =>"",
			   "role_id"     =>1,
			   "status_id"   =>1,
			   "avatar_url"  =>"",
			   "language_id" =>1,],
			   [
			   'email' => 'test@bar.com2',
				"password"    =>"testpass2",
			   "facebook_id" =>"",
			   "google_id"   =>"",
			   "role_id"     =>1,
			   "status_id"   =>1,
			   "avatar_url"  =>"",
			   "language_id" =>1,
			   ],
			   ]);
    }

}