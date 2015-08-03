<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class IssueStatusTableSeeder extends Seeder {

    public function run()
    {
        DB::table('issuestatus')->delete();
		
        DB::table('issuestatus')->insert([
            [
                'name' => 'Active',
            ],
            [
                'name' => 'Not Active',
            ],
        ]);   
    }
}
