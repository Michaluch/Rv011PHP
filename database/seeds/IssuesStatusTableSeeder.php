<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class IssuesStatusTableSeeder extends Seeder {

    public function run()
    {
        DB::table('issuestatus')->delete();
		
		DB::table('issuestatus')->insert([
				['name' => 'New'],
				['name' => 'To resolve'],
				['name' => 'Approved'],
				['name' => 'Resolved'],
			   ]);   
    }

}