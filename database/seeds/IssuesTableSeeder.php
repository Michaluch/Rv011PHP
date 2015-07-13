<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class IssuesTableSeeder extends Seeder {

    public function run()
    {
        DB::table('issues')->delete();
		
		DB::table('issues')->insert([
				['name' => 'Issue1',
				'text'=>'some text',
				'map-pointer'=>'{"lat": 50.614290662525036, "lng": 26.253376007080078}',
				'category_id'=>'1',
				'severity'=>'1'],
				
				['name' => 'Issue2',
				'text'=>'some text2',
				'map-pointer'=>'{"lat": 50.61331032168081, "lng": 26.256637573242188}',
				'category_id'=>'2',
				'severity'=>'2'],
			   ]);   
    }

}