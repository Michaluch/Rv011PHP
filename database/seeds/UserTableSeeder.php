<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class UserTableSeeder extends Seeder {

    public function run()
    {
        DB::table('users')->delete();
		
		DB::table('users')->insert([
				['email' => 'bawlapp.mail@gmail.com',
				"password"    =>bcrypt('b0412597dcea813655574dc54a5b74967cf85317f0332a2591be7953a016f8de56200eb37d5ba593b1e4aa27cea5ca27100f94dccd5b04bae5cadd4454dba67d'),
			   "facebook_id" =>"",
			   "google_id"   =>"",
			   "role_id"     =>2,
			   "status_id"   =>2,
			   "avatar_url"  =>"uploads/manager.jpg",
			   "language_id" =>1,
			   "salt"        =>str_random(8)],
			   [
			   'email' => 'visitor@gmail.com',
				"password"    =>bcrypt('b0412597dcea813655574dc54a5b74967cf85317f0332a2591be7953a016f8de56200eb37d5ba593b1e4aa27cea5ca27100f94dccd5b04bae5cadd4454dba67d'),
			   "facebook_id" =>"",
			   "google_id"   =>"",
			   "role_id"     =>1,
			   "status_id"   =>2,
			   "avatar_url"  =>"",
			   "language_id" =>1,
			   "salt"        =>str_random(8)
			   ],
			   			   [
			   'email' => 'visitor2@gmail.com',
				"password"    =>bcrypt('b0412597dcea813655574dc54a5b74967cf85317f0332a2591be7953a016f8de56200eb37d5ba593b1e4aa27cea5ca27100f94dccd5b04bae5cadd4454dba67d'),
			   "facebook_id" =>"",
			   "google_id"   =>"",
			   "role_id"     =>1,
			   "status_id"   =>2,
			   "avatar_url"  =>"",
			   "language_id" =>1,
			   "salt"        =>str_random(8)
			   ]
			   ]);
    }

}