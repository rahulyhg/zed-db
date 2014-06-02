<?php

class Genre extends Illuminate\Database\Eloquent\Model {
	protected $table = 'tbl_musicgenres';
	protected $primaryKey = "genre_id";
	protected $key = "genre_id";
	public $timestamps = false;

}

?>


