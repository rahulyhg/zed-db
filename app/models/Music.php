<?php

class Music extends Illuminate\Database\Eloquent\Model {
    protected $table = 'tbl_musiclibrary';
    protected $primaryKey = "library_no";
    protected $key = "library_no";
	protected $guarded = array('library_no', 'created');
	public $timestamps = true;

	public function subscriber() {
		return $this->belongsTo('Subscriber', 'subbandname');
	}

	public function submusicianname() {
		return $this->belongsTo('Subscriber', 'submusicianname');
	}

	 public function scopeDefaultSearch($query) {
        return $query->select('artist_nm', 'title', 'release_year');
    }

	public function genres() {
		return $this->belongsToMany('Newgenre', 'genres_releases', 'release_id', 'genre_id');
	}

}
?>
