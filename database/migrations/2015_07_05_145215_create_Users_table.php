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
		Schema::create('Users', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('email',80)->unique();
			$table->string('password', 550);
			$table->string('facebook_id',256)->nullable()->default(null);
			$table->string('google_id',256)->nullable()->default(null);
			$table->integer('role_id')->unsigned();
			$table->integer('status_id')->unsigned();
			$table->string('avatar_url',500)->nullable()->default(null);
			$table->integer('language_id')->unsigned();
			$table->string('salt',32);

			// foreign keys
			$table->foreign('role_id')->references('id')->on('Roles');
			$table->foreign('status_id')->references('id')->on('UserStatuses');
			$table->foreign('language_id')->references('id')->on('Languages');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('Users');
	}

}
