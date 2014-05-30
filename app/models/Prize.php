<?php

class Prize extends Illuminate\Database\Eloquent\Model {
    protected $table = 'tbl_radiothon';
    protected $primaryKey = "radiothonprizeid";
    protected $key = "radiothonprizeid";
    public $timestamps = false;

    public function subtypes() {
        return $this->belongsToMany('Subtype', 'prize_subtype', 'prize_id', 'subtype_id');
    }


    public function prizetype() {
        return $this->belongsTo('Prizetype', 'prizetypeid');
    }


}

?>
