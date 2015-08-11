<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Faker\Factory as Faker;

class HistorySeeder extends Seeder {

    public function run()
    {
    	$faker = Faker::create();
        DB::table('history')->delete();		
		DB::table('history')->insert([
				['user_id' => 3, 'issue_id' => 1, 'status_id' => 1, 'date' => $faker->dateTime()],
				['user_id' => 3, 'issue_id' => 2, 'status_id' => 1, 'date' => $faker->dateTime()],
			   ]);   
    }

}