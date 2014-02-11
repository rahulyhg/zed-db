<?php

class Newskill extends Illuminate\Database\Eloquent\Model {
	protected $table = 'skills';
	protected $primaryKey = "id";
	protected $key = "id";
	public $timestamps = false;

	public function subscribers() {
		return $this->belongsToMany('Subscriber', 'skills_subscribers', 'skill_id', 'subscriber_id');
	}

}


?>