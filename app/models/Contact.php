<?php

class Contact extends Illuminate\Database\Eloquent\Model
{
    	protected $table = 'tbl_contacts';
    	protected $primaryKey = "contact_no";
    	protected $key = "contact_no";
	protected $guarded = array('contact_no', 'created');
	public $timestamps = true;


}

?>
