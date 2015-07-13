<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHistoryTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('history', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('user_id')->unsigned();
			$table->integer('issue_id')->unsigned();
			$table->integer('status_id')->unsigned();
			$table->date('date');

			// foreign keys
			$table->foreign('user_id')->references('id')->on('users');
			$table->foreign('issue_id')->references('id')->on('issues');
			$table->foreign('status_id')->references('id')->on('issuestatus');
		
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('history');
	}

}
