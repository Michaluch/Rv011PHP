<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class RoleTableSeeder extends Seeder {

    public function run()
    {
        //DB::table('roles')->delete();
		
		DB::table('roles')->insert([
				['name' => 'visitor'],
				['name' => 'manager'],
				['name' => 'admin'],
			   ]);   
    }

}