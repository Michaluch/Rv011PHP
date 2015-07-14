<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Issues extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'issues';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    //protected $fillable = ['name', 'description', 'map_pointer'];
    public function category()
    {
    	return $this->hasOne('App\Models\IssuesCategory', 'id');
    }
    
    public function attachments()
    {
    	return $this->hasMany('App\Models\Attachments', 'issue_id');
    }
    
    public function history()
    {
    	return $this->hasOne('App\Models\History', 'issue_id');
    }
}
