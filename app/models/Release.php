<?php

class Release extends Illuminate\Database\Eloquent\Model
{
    protected $table = 'releases';
    protected $primaryKey = "id";
    protected $key = "id";
	protected $guarded = array('id');
	public $timestamps = true;


public function subscriber()
	{
		return $this->belongsTo('Subscriber', 'subbandname');
	}
public function submusicianname()
	{
		return $this->belongsTo('Subscriber', 'submusicianname');
	}
    
public function artist()
	{
		return $this->belongsTo('Artist');
	}


 public function scopeDefaultSearch($query)
    {
        return $query->select('artist', 'title', 'release_year');
    }


}
?>
