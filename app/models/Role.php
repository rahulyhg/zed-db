<?php

class Role extends Illuminate\Database\Eloquent\Model {
    protected $table = 'roles';
    protected $primaryKey = "id";
    protected $key = "id";
	protected $guarded = array('id');
	public $timestamps = false;

	public function users() {
        return $this->hasMany('User');
    }
}

?>

