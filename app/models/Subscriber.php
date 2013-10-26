<?php

class Subscriber extends Illuminate\Database\Eloquent\Model
{
    	protected $table = 'tbl_subscribers';
    	protected $primaryKey = "subnumber";
    	protected $key = "subnumber";
	protected $guarded = array('subnumber', 'created');
	public $timestamps = true;


public function music()
    {
        return $this->hasMany('Music', 'artist_nm');
    }

public function suburb()
    {
        return $this->belongsTo('Suburb', 'suburbid');
    }
	
public function pledge() {
        return $this->hasOne('Pledge', 'subno');
    }

public function subscription() {
        return $this->belongsTo('Subscription', 'subtypeid');
    }

public function bandmembers() {
        return $this->hasMany('Subbandmember', 'subid');
    }

}

?>
