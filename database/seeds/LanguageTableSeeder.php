<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class LanguageTableSeeder extends Seeder {

    public function run()
    {
        //DB::table('Languages')->delete();
		
		DB::table('Languages')->insert([
				['name' => 'english'],
				['name' => 'ukranian'],
			   ]);   
    }

}