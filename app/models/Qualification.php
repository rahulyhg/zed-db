<?php

class Qualification extends Illuminate\Database\Eloquent\Model {
	protected $table = 'qualifications';
	protected $primaryKey = "id";
	protected $key = "id";
	public $timestamps = false;

	public function subscribers() {
		return $this->belongsToMany('Subscriber', 'qualifications_subscribers', 'qualification_id', 'subscriber_id');
	}

}


?>