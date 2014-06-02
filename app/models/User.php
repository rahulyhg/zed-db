<?php

class User extends Illuminate\Database\Eloquent\Model {
    protected $table = 'users';
    protected $primaryKey = "id";
    protected $key = "id";
	protected $guarded = array('id');
	public $timestamps = false;


	public function role() {
        return $this->belongsTo('Role', 'role_id');
    }
}

?>

