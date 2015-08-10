<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('email',80)->unique();
			$table->string('password', 550);
			$table->rememberToken();
			$table->string('facebook_id',256)->nullable()->default(null);
			$table->string('google_id',256)->nullable()->default(null);
			$table->integer('role_id')->unsigned()->default(1);
			$table->integer('status_id')->unsigned()->default(1);
			$table->string('avatar_url',500)->nullable()->default(null);
			$table->integer('language_id')->unsigned()->default(1);
			$table->string('salt',32)->unique();

			// foreign keys
			$table->foreign('role_id')->references('id')->on('roles');
			$table->foreign('status_id')->references('id')->on('userstatuses');
			$table->foreign('language_id')->references('id')->on('languages');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('users');
	}

}
