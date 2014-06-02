<?php

class Volunteer extends Illuminate\Database\Eloquent\Model {
    protected $table = 'volunteers';
    public $timestamps = true;
    protected $guarded = array('id');

    public function subscriber() {
        return $this->belongsTo('Subscriber', 'subno');
    }
}

?>
