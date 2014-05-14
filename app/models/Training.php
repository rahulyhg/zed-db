<?php

class Training extends Illuminate\Database\Eloquent\Model {
	protected $table = 'training';
	protected $primaryKey = "id";
	protected $key = "id";
	public $timestamps = false;

	public function subscribers() {
		return $this->belongsToMany('Subscriber', 'training_subscribers', 'training_id', 'subscriber_id');
	}

}

?>