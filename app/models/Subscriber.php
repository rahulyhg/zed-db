<?php

class Subscriber extends Illuminate\Database\Eloquent\Model
{
	protected $table = 'tbl_subscribers';
	protected $primaryKey = "subnumber";
	protected $key = "subnumber";
        #protected $fillable = array('subemail', 'subtypeid', 'gender', 'submobile', 'subaddress1', 'suburbid', 'subfirstname', 'sublastname', 'receiptnumber', 'donation', 'programid', 'paymentdate', 'expirydate');
	protected $guarded = array('subnumber', 'created');
	public $timestamps = true;


		public function music() {
				return $this->hasMany('Music', 'artist_nm');
		}

		public function suburb() {
				return $this->belongsTo('Suburb', 'suburbid');
		}

		public function pledge() {
				return $this->hasOne('Pledge', 'subno');
		}

		public function volunteer() {
				return $this->hasOne('Volunteer', 'subscriber_id');
		}

		public function subscription() {
				return $this->belongsTo('Subscription', 'subtypeid');
		}

		public function bandmembers() {
				return $this->hasMany('Subbandmember', 'subid');
		}

		public function skills() {
			return $this->belongsToMany('Newskill', 'skills_subscribers', 'subscriber_id', 'skill_id');
		}

		public function qualifications() {
			return $this->belongsToMany('Qualification', 'qualifications_subscribers', 'subscriber_id', 'qualification_id');
		}

		public function voldepartments() {
			return $this->belongsToMany('Voldepartment', 'vol_departments_subscribers', 'subscriber_id', 'department_id');
		}

		public function training() {
			return $this->belongsToMany('Training', 'training_subscribers', 'subscriber_id', 'training_id');
		}
}

?>
