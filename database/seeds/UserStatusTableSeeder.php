<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class UserStatusTableSeeder extends Seeder {

    public function run()
    {
        //DB::table('userstatuses')->delete();
		
		DB::table('usestatuses')->insert([
				['name' => 'active'],
				['name' => 'not-active'],
			   ]);   
    }

}