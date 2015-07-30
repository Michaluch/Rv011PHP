<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Validator;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\Models\Issues as Issue;

class SearchController extends Controller {

    public function postSearch(Request $request){
    $search = $request->all();
    $searchName=$request['search'];
    $sql=Issue::where('name', 'like', '%'.$searchName.'%')->get();
    $filteredSql=json_decode($sql, true);
    if(empty($filteredSql)){
        return array(
            'status'=>'error',
            'message'=>'Nothing found according to your search result',
        );
    }
    else{
        return array(
            'status' => 'ok',
            'response'=>$sql,
            );
        }
    }

}