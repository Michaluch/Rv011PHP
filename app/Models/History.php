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
    	return $this->hasMany('App\Models\IssueStatus', 'id', 'status_id')->where('id', '=', 1);
    }

       public function user()
    {
        return $this->hasOne('App\User', 'id', 'user_id');
    }

     public function scopeGetNew($query)
    {
        $query->where('status_id', '=', 1);

    }
   

}
