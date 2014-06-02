<?php

class Newgenre extends Illuminate\Database\Eloquent\Model {
	protected $table = 'genres';
	protected $primaryKey = "id";
	protected $key = "id";
	public $timestamps = false;

	public function releases() {
		return $this->belongsToMany('Music', 'genres_releases', 'genre_id', 'release_id');
	}
}

?>
