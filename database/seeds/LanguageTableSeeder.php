<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class LanguageTableSeeder extends Seeder {

    public function run()
    {
        //DB::table('languages')->delete();
		
		DB::table('languages')->insert([
				['name' => 'english'],
				['name' => 'ukranian'],
			   ]);   
    }

}