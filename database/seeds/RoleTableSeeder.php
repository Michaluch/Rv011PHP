<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class RoleTableSeeder extends Seeder {

    public function run()
    {
        //DB::table('Roles')->delete();
		
		DB::table('Roles')->insert([
				['name' => 'admin'],
				['name' => 'visitor'],
			   ]);   
    }

}