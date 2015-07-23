<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class History extends Model {


    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'history';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
   // protected $fillable = ['name', 'email', 'password'];
    public function issue()
    {
    	return $this->hasOne('App\Models\Issues', 'id', 'issue_id');
    }
    public function status()
    {
    	return $this->hasOne('App\Models\IssueStatus', 'id', 'status_id');
    }
   

}
