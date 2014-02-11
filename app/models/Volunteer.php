<?php

class Volunteer extends Illuminate\Database\Eloquent\Model {
	protected $table = 'volunteers';
	public $timestamps = true;

	public function subscriber() {
        return $this->belongsTo('Subscriber', 'subno');
    }

}

?>
