<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
      Model::unguard();
      $this->call('RoleTableSeeder');
      $this->call('UserStatusTableSeeder');
      $this->call('LanguageTableSeeder');
      $this->call('UserTableSeeder');
      $this->call('IssuesCategorySeeder');
      $this->call('IssuesTableSeeder');
	  $this->call('IssuesStatusTableSeeder');
	}

}
