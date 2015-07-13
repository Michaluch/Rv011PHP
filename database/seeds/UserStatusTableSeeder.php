<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class UserStatusTableSeeder extends Seeder {

    public function run()
    {
        //DB::table('userStatuses')->delete();
		
		DB::table('userStatuses')->insert([
				['name' => 'active'],
				['name' => 'not-active'],
			   ]);   
    }

}