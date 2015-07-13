<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateATTCHTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('attachments', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('url',500)->nullable();
			$table->integer('issue_id')->unsigned();
		});

		Schema::table('attachments', function(Blueprint $table) {
			$table->foreign('issue_id')->references('id')->on('issues');
   		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('attachments');
	}

}
