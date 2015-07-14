<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIssuesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		
		Schema::create('issues', function(Blueprint $table){
			$table->increments('id');
			$table->string('name', 256);
			$table->text('description')->nullable();
			$table->string('map_pointer');
			$table->integer('category_id')->unsigned()->nullable();
			$table->smallInteger('severity')->nullable()->default(null);

			// foreign keys
			//$table->foreign('category_id')->references('id')->on('issuescategory');
		});
		Schema::table('issues', function(Blueprint $table) {
			$table->foreign('category_id')->references('id')->on('issuescategory');
   		});   
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('issues');
	}

}
