<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class HistoryTableSeeder extends Seeder {

    public function run()
    {
        DB::table('history')->delete();
		
        DB::table('history')->insert([
            [
                'user_id' => '1',
                'issue_id' => '1',
                'status_id' => '1',
                'date' => date('Y-m-d'),
            ],		
            [
                'user_id' => '2',
                'issue_id' => '2',
                'status_id' => '1',
                'date' => date('Y-m-d'),
            ],
        ]);   
    }
}
