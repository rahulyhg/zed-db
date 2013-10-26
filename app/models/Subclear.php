<?php

class Subclear extends Illuminate\Database\Eloquent\Model
{
    protected $table = 'tbl_subclearing';
    protected $primaryKey = "id";
    protected $key = "id";
	protected $guarded = array('subnumber', 'created');
	public $timestamps = true;


    public function music() {
        return $this->hasMany('Music', 'artist_nm');
    }

    public function suburb() {
        return $this->belongsTo('Suburb', 'suburbid');
    }

    public function pledge() {
        return $this->hasOne('Pledge', 'subno');
    }

	public function bandmembers() {
        return $this->hasMany('Subbandmember', 'subid');
    }

    public function subscription() {
        return $this->belongsTo('Subscription', 'subtypeid');
    }

}


?>
