<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class UserStatusTableSeeder extends Seeder {

    public function run()
    {
        //DB::table('UserStatuses')->delete();
		
		DB::table('UserStatuses')->insert([
				['name' => 'active'],
				['name' => 'not-active'],
			   ]);   
    }

}