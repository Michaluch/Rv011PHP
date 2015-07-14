<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class IssuesCategorySeeder extends Seeder {

    public function run()
    {
        DB::table('issuescategory')->delete();
		
		DB::table('issuescategory')->insert([
				['name' => 'Categoty 1'],
				['name' => 'Category 2'],
			   ]);   
    }

}