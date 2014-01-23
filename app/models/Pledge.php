<?php

class Pledge extends Illuminate\Database\Eloquent\Model
{
    protected $table = 'tbl_pledge';
    protected $primaryKey = "pledgeid";
    protected $key = "pledgeid";
 	public $timestamps = true;

public function subscriber() {
        return $this->belongsTo('Subscriber', 'subno');
    }

public function prizes() {
        return $this->belongsTo('Prize', 'radiothonprizeid');
    }

public function subprizes() {
        return $this->belongsTo('Prize', 'radiothonprize2');
    }

}

?>
