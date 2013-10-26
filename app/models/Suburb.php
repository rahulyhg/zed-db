<?php

class Suburb extends Illuminate\Database\Eloquent\Model
{
    	protected $table = 'tbl_suburb';
    	protected $primaryKey = "suburbid";
    	protected $key = "suburbid";
	protected $guarded = array('suburbid', 'created');
	public $timestamps = false;


public function subscribers()
    {
        return $this->hasMany('Subscriber', 'suburbid');
    }

}

?>
