<?php

class Department extends Illuminate\Database\Eloquent\Model
{
    	protected $table = 'tbl_departments';
    	protected $primaryKey = "department_no";
    	protected $key = "department_no";
	public $timestamps = false;

}

?>
