<?php

class Voldepartment extends Illuminate\Database\Eloquent\Model {
	protected $table = 'vol_departments';
	protected $primaryKey = "id";
	protected $key = "id";
	public $timestamps = false;

	public function subscribers() {
		return $this->belongsToMany('Subscriber', 'vol_departments_subscribers', 'department_id', 'subscriber_id');
	}
}

?>