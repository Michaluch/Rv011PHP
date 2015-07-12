<?php namespace App\Observers;

use Illuminate\Contracts\Events\Dispatcher;
use App\Models\Attachments as Attachment;

class IssuesObserver {
	
	public function deleted($model)
	{
		$id = $model->id;
		if (!is_null($attachment = Attachment::where('issue_id', '=', $id)->first())){
			$attachment->all()->each(function($attach){
				$attach->delete();
			});
		}	
		
		
	}
}