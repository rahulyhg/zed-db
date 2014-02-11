<?php

class Contactcategory extends Illuminate\Database\Eloquent\Model {
	protected $table = 'contactcategories';
	protected $primaryKey = "id";
	protected $key = "id";
	public $timestamps = false;

	public function contacts() {
		return $this->belongsToMany('Contact', 'contactcategories_contacts', 'contact_id', 'category_id');
	}

}

?>