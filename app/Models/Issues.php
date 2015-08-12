<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\History as History;

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
    	return $this->hasOne('App\Models\IssuesCategory', 'id', 'category_id');
    }
    
    public function attachments()
    {
    	return $this->hasMany('App\Models\Attachments', 'issue_id', 'id');
    }
    
    public function history()
    {
    	return $this->hasMany('App\Models\History', 'issue_id', 'id');
    }

    public function historyUpToDate()
    {
        return $this->hasOne('App\Models\History', 'issue_id', 'id')->orderBy('date', 'desc');
    }

    public function historyNew()
    {
        return $this->hasMany('App\Models\History', 'issue_id', 'id')->where('status_id', '1');
    }
    
    public function scopeSearch($query, $keywords)
    {
        return $query->where('name', 'like', '%'.$keywords.'%');
    }

    public function scopeGetNew($query)
    {
        $modelHistory = new History();
        $query->where( $modelHistory->status_id, '=', 1);

    }

}
