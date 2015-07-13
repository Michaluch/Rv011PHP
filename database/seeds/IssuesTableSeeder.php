<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class IssuesTableSeeder extends Seeder {

    public function run()
    {
        DB::table('Issues')->delete();
		
		DB::table('Issues')->insert([
				['name' => 'Issue1',
				'text'=>'some text',
				'map-pointer'=>'some coordinates',
				'category_id'=>'1',
				'severity'=>'1'],
				
				['name' => 'Issue2',
				'text'=>'some text2',
				'map-pointer'=>'some coordinates2',
				'category_id'=>'2',
				'severity'=>'2'],
			   ]);   
    }

}