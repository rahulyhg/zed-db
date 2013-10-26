<?php

class Subbandmember extends Illuminate\Database\Eloquent\Model
{
    protected $table = 'tbl_subbandmember';
    protected $primaryKey = "subbandmemberid";
    protected $key = "subbandmemberid";
	public $timestamps = false;



public function subscriber() {
        return $this->belongsTo('Subscriber', 'subno');
    }

}

?>

