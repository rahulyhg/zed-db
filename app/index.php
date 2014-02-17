<?php
require '../vendor/autoload.php';
$twigView = new \Slim\Extras\Views\Twig();
use Hautelook\Phpass\PasswordHash;

date_default_timezone_set('Australia/Brisbane');

$app = new \Slim\Slim(array(
	'debug' => true,
    	'view' => $twigView,
    	'templates.path' => './app/views',
));

$conn = array(
        'driver'    => 'pgsql',
        'host'      => 'localhost',
        'database'  => 'zeddb',
        'username'  => 'zeddbuser',
        'password'  => 'P4u97Ar3',
        'charset' => 'utf8',
        'prefix'    => '',
);


// Make a new connection
$app->db = Capsule\Database\Connection::make('default', $conn, true);

use \Slim\Extras\Middleware\HttpBasicAuth;




$api_prefix = "/api/v1/";

$app->post($api_prefix.'auth/login', 'getLogin');

$app->get($api_prefix.'artist/:artist', 'getArtist');

$app->get($api_prefix.'artistsuggest/:artist', 'getTypeaheadArtist');
$app->get($api_prefix.'subsuggest/:name', 'getTypeaheadSub');
$app->get($api_prefix.'volsuggest/:name', 'getTypeaheadVol');
$app->get($api_prefix.'subsuggesta/:lname/:fname', 'getTypeaheadSubA');
$app->get($api_prefix.'relcheck/:artist/:title', 'releaseCheck');
$app->get($api_prefix.'concheck/:org_nm', 'contactCheck');

$app->get($api_prefix.'suburbsuggest/:name', 'getTypeaheadSuburb');
$app->get($api_prefix.'postcodesuggest/:id', 'getTypeaheadPostcode');
$app->get($api_prefix.'titlesuggest/:name', 'getTypeaheadTitle');
$app->get($api_prefix.'contactsuggest/:key', 'getTypeaheadContact');
$app->get($api_prefix.'labelsuggest/:key', 'getTypeaheadLabel');
$app->get($api_prefix.'aprasuggest/:key', 'getTypeaheadApra');
$app->get($api_prefix.'hometownsuggest/:key', 'getTypeaheadHome');
$app->get($api_prefix.'countrysuggest/:key', 'getTypeaheadCountry');

// search releases - mutiple fields
$app->get($api_prefix.'releases', 'getReleases');
$app->get($api_prefix.'subscribers', 'getSubscribers');
$app->get($api_prefix.'volunteers', 'getSubscribers');

$app->get($api_prefix.'subscribers/expired/:start(/:end)', 'getSubscribersExp');
$app->get($api_prefix.'subscribers/active/', 'getSubscribersActive');
$app->get($api_prefix.'subscribers/unpaid/', 'getSubscribersUnpaid');
$app->get($api_prefix.'subscribers/paid/', 'getSubscribersPaid');
$app->get($api_prefix.'subscribers/pledgenew/', 'getPledgeOut');
$app->get($api_prefix.'subscribers/notposted/', 'getSubscribersNotPosted');
$app->get($api_prefix.'subscribers/notposted/:id', 'getSubscriberNotPosted');
$app->get($api_prefix.'subscriber/types/', 'getSubTypeCount');
$app->get($api_prefix.'subscribers/lastrec/', 'getLastRec');
$app->get($api_prefix.'subscriber/emaillist/', 'getSubscribersEmail');
$app->get($api_prefix.'subscribers/band/:name', 'getBandSubscribers');
$app->get($api_prefix.'band/:id', 'getBandMembers');
$app->get($api_prefix.'roles/', 'getRoles');
$app->get($api_prefix.'users', 'getUsers');

$app->get($api_prefix.'contacts', 'getContacts');
$app->get($api_prefix.'contact/report', 'getContacts');

$app->get($api_prefix.'subscribers/:id', 'getSubscriber');
$app->get($api_prefix.'volunteers/:id', 'getVolunteer');
//$app->get($api_prefix.'subscriber/report', 'getSubNew');
$app->post($api_prefix.'testfs/', 'getFs');


$app->post($api_prefix.'subscriber/report/', 'getSubNew');

$app->get($api_prefix.'releases/:id', 'getRelease');
$app->get($api_prefix.'contacts/:id', 'getContact');
$app->get($api_prefix.'pledge/:subno', 'getPledge');

$app->get($api_prefix.'subclears/', 'getSubclears');
$app->get($api_prefix.'subscribers/band/:name', 'getBandSubscribers');
$app->get($api_prefix.'subscribers/reports/pledge/:prize', 'getSubsByPrize');

#$app->get($api_prefix.'addcsv', 'addCsv');

function addCsv(){
$app = \Slim\Slim::getInstance();

$csvFile = new Keboola\Csv\CsvFile(__DIR__ . '/pc.csv');
	foreach($csvFile as $row) {
		$suburb = new Suburb();
		$suburb->postcode = $row[0];
		$suburb->state = $row[2];
		$suburb->suburb = $row[1];
		$suburb->save();
		echo  $row[1];
	}
}


$app->get($api_prefix.'themes/', 'getThemes');
$app->get($api_prefix.'departments/', 'getDepartments');
$app->get($api_prefix.'genres/', 'getGenres');
$app->get($api_prefix.'genresnew/', 'getGenresNew');
$app->get($api_prefix.'interests/', 'getInterests');
$app->get($api_prefix.'contactcats/', 'getContactCats');
$app->get($api_prefix.'subtypes/', 'getSubtypes');
$app->get($api_prefix.'skills/', 'getSkills');
$app->get($api_prefix.'qualifications/', 'getQualifications');
$app->get($api_prefix.'skillsnew/', 'getSkillsNew');
$app->get($api_prefix.'skills/:id', 'getSkill');
$app->get($api_prefix.'programs/', 'getPrograms');
$app->get($api_prefix.'prizes/', 'getPrizes');
$app->get($api_prefix.'prizetypes/', 'getPrizetypes');
$app->get($api_prefix.'subform', 'getFormsite');

$app->put($api_prefix.'users/:id', 'saveUser');
$app->put($api_prefix.'releases/:id', 'saveRelease');
$app->put($api_prefix.'contacts/:id', 'saveContact');
$app->put($api_prefix.'subscribers/:id', 'saveSubscriber');
$app->put($api_prefix.'volunteers/:id', 'saveVolunteer');
$app->put($api_prefix.'skills/:id', 'saveSkill');
$app->put($api_prefix.'genresnew/:id', 'saveGenre');
$app->put($api_prefix.'themes/:id', 'saveTheme');
$app->put($api_prefix.'subtypes/:id', 'saveSubtype');
$app->put($api_prefix.'departments/:id', 'saveCategory');
$app->put($api_prefix.'interests/:id', 'saveSubCategory');
$app->put($api_prefix.'programs/:id', 'saveProgram');
$app->put($api_prefix.'prizes/:id', 'savePrize');
$app->put($api_prefix.'pledge/:id', 'savePledge');
$app->put($api_prefix.'pledge/clearing/:subno', 'updatePledgeClearing');
$app->put($api_prefix.'band/:id', 'saveBand');

$app->post($api_prefix.'users/', 'addUser');
$app->post($api_prefix.'releases/', 'addRelease');
$app->post($api_prefix.'subscribers/', 'addSubscriber');
$app->post($api_prefix.'contacts/', 'addContact');
$app->post($api_prefix.'skills/', 'addSkill');
$app->post($api_prefix.'genresnew/', 'addGenre');
$app->post($api_prefix.'themes/', 'addTheme');
$app->post($api_prefix.'subtypes/', 'addSubtype');
$app->post($api_prefix.'departments/', 'addCategory');
$app->post($api_prefix.'interests/', 'addSubcategory');
$app->post($api_prefix.'programs/', 'addProgram');
$app->post($api_prefix.'prizes/', 'addPrize');
$app->post($api_prefix.'pledge/', 'addPledge');
$app->post($api_prefix.'subform/join', 'saveFormsite');
#Jotfomr test

$app->delete($api_prefix.'users/:id', 'deleteUser');
$app->delete($api_prefix.'releases/:id', 'deleteRelease');
$app->delete($api_prefix.'subscribers/:id', 'deleteSubscriber');
$app->delete($api_prefix.'contacts/:id', 'deleteContact');
$app->delete($api_prefix.'skills/:id', 'deleteSkill');
$app->delete($api_prefix.'genresnew/:id', 'deleteGenre');
$app->delete($api_prefix.'themes/:id', 'deleteTheme');
$app->delete($api_prefix.'subtypes/:id', 'deleteSubtype');
$app->delete($api_prefix.'departments/:id', 'deleteCategory');
$app->delete($api_prefix.'interests/:id', 'deleteSubcategory');
$app->delete($api_prefix.'programs/:id', 'deleteProgram');
$app->delete($api_prefix.'prizes/:id', 'deletePrize');
$app->delete($api_prefix.'subform/:id', 'deleteFormsite');
$app->delete($api_prefix.'pledge/:subno', 'deletePledgeBySub');
$app->delete($api_prefix.'bandmembers/:subno', 'deleteBandBySub');


$app->options($api_prefix.'releases/:id', 'optReleases');
$app->options($api_prefix.'releases/', 'optReleases');
$app->options($api_prefix.'subscribers/:id', 'optReleases');
$app->options($api_prefix.'subscribers/', 'optReleases');
$app->options($api_prefix.'contacts/:id', 'optReleases');
$app->options($api_prefix.'contacts/', 'optReleases');
$app->options($api_prefix.'skills/:id', 'optReleases');
$app->options($api_prefix.'genres/:id', 'optReleases');
$app->options($api_prefix.'themes/:id', 'optReleases');
$app->options($api_prefix.'subtypes/:id', 'optReleases');
$app->options($api_prefix.'departments/:id', 'optReleases');
$app->options($api_prefix.'interests/:id', 'optReleases');
$app->options($api_prefix.'programs/:id', 'optReleases');
$app->options($api_prefix.'prizes/:id', 'optReleases');
$app->options($api_prefix.'skills/', 'optReleases');
$app->options($api_prefix.'genres/', 'optReleases');
$app->options($api_prefix.'themes/', 'optReleases');
$app->options($api_prefix.'subtypes/', 'optReleases');
$app->options($api_prefix.'departments/', 'optReleases');
$app->options($api_prefix.'interests/', 'optReleases');
$app->options($api_prefix.'programs/', 'optReleases');
$app->options($api_prefix.'prizes/', 'optReleases');
$app->options($api_prefix.'subscriber/report/', 'optReleases');

$app->options($api_prefix.'subform/:id', 'optReleases');
$app->options($api_prefix.'band/:id', 'optReleases');
$app->options($api_prefix.'auth/login', 'optReleases');
$app->options($api_prefix.'pledge/:subno', 'optReleases');
$app->options($api_prefix.'bandmembers/:subno', 'optReleases');

$app->options($api_prefix.'users/', 'optReleases');
$app->options($api_prefix.'users/:id', 'optReleases');
$app->options($api_prefix.'testfs/', 'optReleases');

$app->options($api_prefix.'newhuh/:user/:pass', 'optReleases');
$app->get($api_prefix.'newhuh/:user/:pass', 'createP');

$app->get($api_prefix.'copycats', 'copyCats');


function createP($r, $pass) {
    $app = \Slim\Slim::getInstance();
    $passwordHasher = new PasswordHash(8,false);
    $hash = $passwordHasher->HashPassword($pass);
    $user = new User();
	$user->username = $r;
	$user->password = $hash;
	$user->role_id = 2;
    $user->save();
    $res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($user);


}

function copyCats() {
    $cts = Contact::get();

    foreach ($cts as $ct) {
        if ($ct->dept_sun) {
            $d = Department::where('department_no', '=', $ct->dept_sun)->get();
            $cc = Contactcategory::where('category', '=', $d[0]->department_nm)->get();
            $foo = [$cc[0]->id];
            echo "ctc: ".$ct->contact_no." ".$cc[0]->id."<br/>";
            $ct->contactcategories()->sync($foo);
        }
    }
}


$authenticateForRole = function ( $role = 'member' ) {
    return function () use ( $role ) {
        $user = User::fetchFromDatabaseSomehow();
        if ( $user->belongsToRole($role) === false ) {
            $app = \Slim\Slim::getInstance();
            $app->flash('error', 'Login required');
            $app->redirect('/login');
        }
    };
};

function getLoginX() {
    $app = \Slim\Slim::getInstance();
    $qs = json_decode(file_get_contents('php://input'));
    $q = (array) $qs;
    $q = array_filter($q);
    $user = User::with('role')->where('username', '=', $q['username'])->where('password', '=', $q['password'])->first();
    $res = $app->response();
    $res['Content-Type'] = 'application/json';
    if ($user) {
        $res->body($user);
    } else {
        $res->setStatus(401);
        $res->body('Invalid user.');
    }
}

function getLogin() {
    $app = \Slim\Slim::getInstance();
    $passwordHasher = new PasswordHash(8,false);
    $qs = json_decode(file_get_contents('php://input'));
    $q = (array) $qs;
    $q = array_filter($q);

    $user = User::with('role')->where('username', '=', $q['username'])->first();
    $res = $app->response();
    $res['Content-Type'] = 'application/json';

    $passwordMatch = $passwordHasher->CheckPassword($q['password'], $user->password);

    if ($passwordMatch) {
        $res->body($user);
    } else {
        $res->setStatus(401);
        $res->body('Invalid user.');
    }
}




function optReleases() {

	$app = \Slim\Slim::getInstance();

}

function releaseCheck($artist, $title) {
        $app = \Slim\Slim::getInstance();
        $release = Music::where('artist_nm','=',urldecode($artist))
                ->where('title', '=', urldecode($title))
                ->select('library_no', 'artist_nm', 'title', 'release_year')->distinct()->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($release);
}

function contactCheck($org_nm) {
        if (strlen($org_nm) >= 3) {
        $app = \Slim\Slim::getInstance();
        $contact = Contact::where('org_nm','=',urldecode($org_nm))
                ->select('contact_no', 'org_nm', 'email', 'contact_nm')->distinct()->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($contact);
	}
}

function getJotform() {
        $app = \Slim\Slim::getInstance();
        $req = $app->request();
        $postVars = $req->post();
	foreach($postVars as $k => $v) {
		echo $k.' '.$v.'<br>';

	}
}

function getFsx() {
        $app = \Slim\Slim::getInstance();
// parse raw POST data
#$form = json_decode(file_get_contents("php://input"));
$form = file_get_contents("php://input");

$file = '/tmp/fs.log';
file_put_contents($file, $form);

print_r($form);
}

function updateSubID($subscriber) {
    $existingSub = Subscriber::find($subscriber->prev_subnumber);
    $existingSub->fill($subscriber->toArray());
    $existingSub->posted = ($existingSub->posted === false) ? 0 : 1;
    if ($existingSub->save()) {
       return $existingSub->sublastname;
    }
}

function getFs() {
    $app = \Slim\Slim::getInstance();

    $req = $app->request();
    $formraw = file_get_contents("php://input");
    $now = date('Y-m-d');
    $then = date('Y-m-d', strtotime('+1 Year'));
    $form = json_decode($formraw);

    $handle = fopen("/tmp/newfs.log","w");
    fwrite($handle,var_export($form,true));
    fclose($handle);


    $fields = $form->{'fields'};

    $subscriber = new Subscriber();
    $subscriber->receiptnumber = $form->{'fs_ref_num'};
    $subscriber->subfirstname = strtoupper($fields[2]->{'field_value'});
    $subscriber->sublastname = strtoupper($fields[3]->{'field_value'});
    $trimSubtype = explode(' (', $fields[0]->{'field_value'});
    $subtype = Subtype::where('subtypecode', '=', $trimSubtype[0])->first();
    $subscriber->subtypeid = $subtype->subtypeid;

    $handle = fopen("/tmp/sub.log","w");
    fwrite($handle,$trimSubtype[0]);
    fwrite($handle,var_export($fields, true));
    fclose($handle);


    // Attempts to match on suburb and postcode
    // If no match proceeds to match on postcode only
    if (!$suburb = Suburb::where('postcode', '=', $fields[7]->{'field_value'})->where('suburb', '=', strtoupper($fields[8]->{'field_value'}))->first()) {
        $suburb = Suburb::where('postcode', '=', $fields[7]->{'field_value'})->first();
    }
    $subscriber->suburbid = $suburb->suburbid;
    $subscriber->submobile = $fields[11]->{'field_value'};
    $subscriber->paymentdate = $now;
    $subscriber->expirydate = $then;
    $subscriber->subemail = $fields[1]->{'field_value'};
    $subscriber->subaddress1 = $fields[6]->{'field_value'};
    $program = Program::where('programname', '=', $fields[15]->{'field_value'})->first();

    $subscriber->programid = ($program) ? $program->programid : 1;

    if ($fields[14]->{'field_value'} != '') {
      $subscriber->donation = $fields[14]->{'field_value'};
    }

    if ($fields[4]->{'field_value'} != 'Select an Option:') {
      switch ($fields[4]->{'field_value'}) {
            case 'Male':
                    $subscriber->gender = 1;
                    break;

            case 'Female':
                    $subscriber->gender = 2;
                    break;

            case 'Transgender':
                    $subscriber->gender = 3;
                        break;
      }
    }

    if($trimSubtype[0] == 'Passionate') {
        $subscriber->subcomment .= "\nShirt - ".$fields[21]->{'field_value'};
        $subscriber->subcomment .= "\nSize - ".$fields[22]->{'field_value'};
        $subscriber->subcomment .= "\nGimme - ".$fields[23]->{'field_value'};
        $subscriber->subcomment .= "\nPost - ".$fields[24]->{'field_value'};
    }

    if ($fields[5]->{'field_value'} != '') {

      switch ($trimSubtype[0]) {
          case 'Band':
            $subscriber->subbandname = $fields[5]->{'field_value'};
            break;
          case 'Solo Musician':
            $subscriber->submusicianname = $fields[5]->{'field_value'};
            break;
          case 'Business':
            $subscriber->subbusinessname = $fields[5]->{'field_value'};
            $subscriber->subcomment .= "\nCards required ".$fields[16]->{'field_value'};
            break;
          case 'Artworker':
            $subscriber->subartistname = $fields[5]->{'field_value'};
            $subscriber->subcomment .= "\nCards required ".$fields[16]->{'field_value'};
            break;
          case 'Community Group':
            $subscriber->subcommunitygroup = $fields[5]->{'field_value'};
            $subscriber->subcomment .= "\nCards required ".$fields[16]->{'field_value'};
            break;
          case 'Pets':
            $subscriber->petname = $fields[5]->{'field_value'};
          break;
      }

    }

    $message = "Dear ".$subscriber->subfirstname." ".$subscriber->sublastname."\n\nCongratulations on making the wisest investment of your life and supporting independent media! Your subscription has been received and is currently being processed by our dedicated volunteers.\n\nNow that you are a full fledged subscriber you have access to all the benefits of being part of the 4ZZZ community. Not only do you get the warm inner glow from keeping independent radio on-air you also receive discounts at participating 4ZZZ Subscriber Outlets and gigs. For a complete list of 4ZZZ Subscriber Outlets visit http://www.4zzzfm.org.au/subscriber-discount-outlets\n\nExclusively available for our subscribers is the opportunity to win awesome prizes on air and in our weekly e-news - ZEDLETTER sent to this email each Thursday!\n\nSubscribers can request songs on programs that put the call out for requests just email reception@4zzz.org.au with your request or call (07) 3252 1555 and speak with the on-air announcer.\n\nYour subscriber card will be in the mail shortly!\n\nSee you at the next 4ZZZ Fundraiser!\n\nLove the 4ZZZ Family";

    //prev subscription
    if ($fields[13]->{'field_value'}) {
        $subscriber->prev_subnumber = $fields[13]->{'field_value'};
        $existingSub = Subscriber::where('subnumber', '=', $subscriber->prev_subnumber)->first();
        if (($existingSub) && ($existingSub->sublastname == $subscriber->sublastname)) {
            $updatedSub = updateSubID($subscriber);
            if ($updatedSub) {
                mail($subscriber->subemail, 'Welcome back to 4ZZZ!', $message, 'From:reception@4zzz.org.au');
                return;
            }
        } else {
            $subscriber->subcomment .= "\nPlease check this sub, it had subnumber ".$subscriber->prev_subnumber." entered in the form but Last Name did not match.";
        }
    }


   if ($subscriber->save()) {
        mail($subscriber->subemail, 'Welcome to 4ZZZ. You are now a Subscriber!', $message, 'From:reception@4zzz.org.au');
        if($subscriber->subbandname) {
            for ($x=17; $x<=21; $x++){
                $expSub = explode(' ', $fields[$x]->{'field_value'});

                $bm = new Subbandmember();
                $bm->subbandmemberfirstname = $expSub[0];
                $bm->subbandmemberlastname = $expSub[1];
                $bm->subid = $subscriber->subnumber;
                $bm->save();
            }
        }
    }
}

function saveFormsite() {
        $app = \Slim\Slim::getInstance();
        $req = $app->request();
        $postVars = $req->post();
        if ($postVars['result_status'] == 'Confirmed') {
            $subclear = new Subclear();
            $program = Program::where('programname', '=', $postVars['program'])->first();
            $trimSubtype = explode(' $', $postVars['subtype']);
            $subtype = Subtype::where('subtypecode', '=', $trimSubtype[0])->first();
            $suburb = Suburb::where('postcode', '=', $postVars['postcode'])->first();

            $subclear->programid = $program->programid;
            $subclear->subtypeid = $subtype->subtypeid;
            $subclear->suburbid = $suburb->suburbid;

            $subclear->subfirstname = $postVars['subfirstname'];
            $subclear->sublastname = $postVars['sublastname'];
            $subclear->subaddress1 = $postVars['subaddress1'];
            $subclear->subaddress2 = $postVars['subaddress2'];
            $subclear->submobile = $postVars['submobile'];
            $subclear->subemail = $postVars['subemail'];
            $subclear->donation = $postVars['donation'];
            switch ($postVars['gender']) {
                case 'Male':
                        $subclear->gender = 1;
                        break;

                case 'Female':
                        $subclear->gender = 2;
                        break;

                case 'Transgender':
                        $subclear->gender = 3;
                        break;
            }
        }

if (strpos($postVars['subtype'], 'Passionate') !== false) {
        $subclear->subcomment .= "\nShirt - ".$postVars['shirt'];
        $subclear->subcomment .= "\nSize - ".$postVars['size'];
        $subclear->subcomment .= "\nGimme - ".$postVars['merch'];
        $subclear->subcomment .= "\nPost - ".$postVars['postage'];
        if ($postVars['postage']=='Please post my passionate pack ($10.00)') {
                $subclear->merch_posted=1;
        }
}

        $subclear->save();

}



function getReleasesNEWDB() {
	$app = \Slim\Slim::getInstance();
	$req = $app->request();
	$paramsDirty = $req->params();
	$params = array_filter($paramsDirty);
	//convert to ints
	if ($req->params('cont_genre')) { $params['cont_genre'] = (int) $params['cont_genre']; }
	if ($req->params('cont_subgenre')) { $params['cont_subgenre'] = (int) $params['subcont_genre']; }

	$returnFields = array('id','artist_id','title','release_year', 'created_at');
	#get first params - set as first where
	$keys = array_keys($params);
	$alphaSearch = reset($params);
	$alphaKey = key($params);
	unset($params[$alphaKey]);

	if (!is_int($alphaSearch)){
		$alphaSearch = '%'.$alphaSearch.'%';
		$query = Release::with('artist')->where($alphaKey,'like',$alphaSearch);
	} else {
		$query = Release::with('artist')->where($alphaKey,'=',$alphaSearch);
	}

	foreach($params as $key => $val) {
		if (is_int($val)) {
			$query->where($key, '=', $val);
		} else {
			$val = '%'.$val.'%';
			$query->where($key, 'like', $val);
		}
	}

	$query->select($returnFields);
	$releases = $query->get();

	$res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($releases);

}

function getReleases() {
	$app = \Slim\Slim::getInstance();
	$req = $app->request();
	$returnFields = array('artist_nm','title','library_no','release_year', 'entered_dt');

	#parse and flatten qstring
	$q = properParseQstr($_SERVER['QUERY_STRING']);
    $q = array_filter($q);

    // $genres = array();
    // foreach ($q as $k => $v) {
    //     if (is_array($v) && $k == 'genre') {
    //         $genres = $v;
    //     }
    // }
    // unset($q['genre']);

	#get first params - set as first where
	$alpha = arrayKshift($q);
    $checkEndDate = array_key_exists('entered_dtend', $q);

	foreach ($alpha as $key => $value) {

		$keycheck = $key;
		if (gettype($value) == 'array') {

			$f = array_shift($value);
			if ($keycheck == 'cont_genre' || $keycheck == 'cont_subgenre') { $f = (int) $f; }
			if (!is_int($f)){
				$f = '%'.urldecode($f).'%';
				$query = Music::with('genres')->where($key,'ilike',$f);
				//echo 'select from music where '.$key.' like '.$f;
			} else {
				$query = Music::with('genres')->where($key,'=',$f);
			}

			foreach ($value as $k => $val) {
				if ($keycheck == 'cont_genre' || $keycheck == 'cont_subgenre') { $val = (int) $val; }
				if (is_int($val)) {
					$query->orWhere($keycheck, '=', $val);
				} else {
					$val = '%'.$val.'%';
					$query->orWhere($keycheck, 'ilike', $val);
				}
			}

		} else {
			if ($keycheck == 'cont_genre' || $keycheck == 'cont_subgenre') { $value = (int) $value; }
			if (($keycheck != 'entered_dt') && (!is_int($value))){
				$value = '%'.urldecode($value).'%';
				$query = Music::with('genres')->where($key,'ilike',$value);
				//echo 'select from music where '.$key.' like '.$value;

			} else {
                if ($checkEndDate) {
                    $query = Music::with('genres')->where($key,'>=',$value);
                } else {
                    $query = Music::with('genres')->where($key,'=',$value);
                }
			}


		}
	}

	foreach ($q as $key => $value) {

		if (gettype($value) == 'array') {
			$i=0;
			foreach ($value as $k => $val) {

				if ($key == 'cont_genre' || $key == 'cont_subgenre') { $value = (int) $value; }
				if ($i==0) {
					if (is_int($value)) {
						$query->where($key, '=', $value);
					} else {
						$val = '%'.urldecode($val).'%';
						$query->where($key, 'like', $value);
					}

				} else {
					$query->orWhere($key, '=', $val);
					if (is_int($value)) {
						$query->orWhere($key, '=', $value);
					} else {
						$val = '%'.urldecode($val).'%';
						$query->orWhere($key, 'like', $value);
					}
				}
				$i++;
			}
		} else {

			if ($key == 'cont_genre' || $key == 'cont_subgenre') { $value = (int) $value; }
			if (($key == 'entered_dt') || ($key == 'entered_dtend') || is_int($value)) {
                $op = '=';
                switch ($key) {
                    case 'entered_dt':
                        $op = '>=';
                        break;

                    case 'entered_dtend':
                        $key = 'entered_dt';
                        $op = '<=';
                        break;
                }

				$query->where($key, $op, $value);
			} else {
				$value = '%'.urldecode($value).'%';
				$query->where($key, 'like', $value);
			}
		}

	}

	$query->select($returnFields);
	$releases = $query->get();
	$res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($releases);

}

function getContactsT() {
    $app = \Slim\Slim::getInstance();
	$req = $app->request();
    $contacts = Contact::find(1);
    $res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($contacts);

}

function getContacts() {
	$app = \Slim\Slim::getInstance();
	$req = $app->request();
	$returnFields = array('contact_no','org_nm','contact_nm','email');

	#parse and flatten qstring
	$q = properParseQstr($_SERVER['QUERY_STRING']);
	$q = array_filter($q);

	#get first params - set as first where
	$alpha = arrayKshift($q);

	foreach ($alpha as $key => $value) {

		$keycheck = $key;
		if (gettype($value) == 'array') {

			$f = array_shift($value);
			if ($keycheck == 'dept_sun' || $keycheck == 'interest_sun') { $f = (int) $f; }
			if (!is_int($f)){
				$f = '%'.$f.'%';
				$query = Contact::where($key,'like',$f);
				//echo 'select from music where '.$key.' like '.$f;
			} else {
				$query = Contact::where($key,'=',$f);

			}

			foreach ($value as $k => $val) {
				if ($keycheck == 'dept_sun' || $keycheck == 'interest_sun') { $val = (int) $val; }
				if (is_int($val)) {
					$query->orWhere($keycheck, '=', $val);
				} else {
					$val = '%'.$val.'%';
					$query->orWhere($keycheck, 'like', $val);
				}
			}

		} else {
			if ($keycheck == 'dept_sun' || $keycheck == 'interest_sun') { $value = (int) $value; }


			if (!is_int($value)){

				switch ($key) {

					case "entered_dt":
					$query = Contact::where('entered_dt', '=', $value);
					break;

					case "date_end":
					$query = Contact::where('created_at', '<', $value);
					break;

					case "date_start":
					$query = Contact::where('created_at', '>', $value);
					break;

					default:
					$value = '%'.$value.'%';
					$query = Contact::where($key, 'like', $value);
				}



			} else {


				$query = Contact::where($key,'=',$value);
			}

		}


	}

	foreach ($q as $key => $value) {


		if (gettype($value) == 'array') {
			$i=0;
			foreach ($value as $k => $val) {

				if ($key == 'dept_sun' || $key == 'interest_sun') { $value = (int) $value; }
				if ($i==0) {
					if (is_int($value)) {
						$query->where($key, '=', $value);
					} else {
						$val = '%'.$val.'%';
						$query->where($key, 'like', $value);
					}

				} else {
					$query->orWhere($key, '=', $val);
					if (is_int($value)) {
						$query->orWhere($key, '=', $value);
					} else {
						$val = '%'.$val.'%';
						$query->orWhere($key, 'like', $value);
					}
				}
				$i++;
			}
		} else {

			if ($key == 'dept_sun' || $key == 'interest_sun') { $value = (int) $value; }
			if (is_int($value)) {

				$query->where($key, '=', $value);
			} else {

				switch ($key) {

					case "entered_dt":
					$query->where('entered_dt', '=', $value);
					break;

					case "date_end":
					$query->where('created_at', '<', $value);
					break;

					case "date_start":
					$query->where('created_at', '>', $value);
					break;

					default:
					$value = '%'.$value.'%';
					$query->where($key, 'like', $value);
				}


			}
		}

	}

	$query->select($returnFields);
	$contacts = $query->get();
	$res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($contacts);

}


function getContactsReport() {
	$app = \Slim\Slim::getInstance();
	$req = $app->request();
	$paramsDirty = $req->params();
	$params = array_filter($paramsDirty);
	$returnFields = array('contact_no','org_nm','contact_nm','email', 'work_ph');
	//convert to ints
	if (array_key_exists('dept_sun', $params)) { $params['dept_sun'] = (int) $params['dept_sun']; }
	if (array_key_exists('interest_sun', $params)) { $params['interest_sun'] = (int) $params['interest_sun']; }

	$query  = explode('&', $_SERVER['QUERY_STRING']);
	$params = array();

	foreach( $query as $param )
	{
	  list($name, $value) = explode('=', $param);
	  $params[urldecode($name)][] = urldecode($value);
	}

	$alphaKey = key($params);
	$alphaSearch = array_shift($params);


	$iq=0;
	foreach ($alphaSearch as $key => $value) {
		if ($iq==0) {
				$query = Contact::where($alphaKey,'=',$value);
			} else {
				$query->orWhere($alphaKey, '=', $value);
			}
		$iq++;
	}

	foreach ($params as $key => $value) {

		if (gettype($value) == 'array') {
			$i=0;
			foreach ($value as $k => $val) {
				if ($i==0) {
					$query->where($key, '=', $val);
				} else {
					$query->orWhere($key, '=', $val);
				}
				$i++;
			}
		}

	}

	$query->select($returnFields);
	$contacts = $query->get();
	$res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($contacts);

}

function getSubscribers() {
	$app = \Slim\Slim::getInstance();
	$req = $app->request();
	$paramsDirty = $req->params();
	$params = array_filter($paramsDirty);
	$returnFields = array('subfirstname', 'sublastname', 'subnumber', 'createddate');
	if ($req->params('operator')) { $operator = array_shift($params); }
	if ($req->params('subnumber')) { $params['subnumber'] = (int) $params['subnumber']; }

	#get first params - set as first where
	$keys = array_keys($params);
	$alphaSearch = reset($params);
	$alphaKey = key($params);
	unset($params[$alphaKey]);
	if ($alphaKey == "subName") {
		$alphaKey = "sublastname";
	}


	if (!is_int($alphaSearch)){
		$alphaSearch = '%'.$alphaSearch.'%';
		$query = Subscriber::with('subscription')->where($alphaKey,'like',$alphaSearch);
	} else {
		$query = Subscriber::with('subscription')->where($alphaKey,'=',$alphaSearch);
	}
	if (sizeof($params) > 0) {
		foreach($params as $key => $val) {
			$val = '%'.$val.'%';
			if ($operator == "AND") {
			if (is_int($val)) {
					$query->where($key, '=', $val);
				} else {
					$query->where($key, 'like', $val);

				}
			} elseif ($operator == "OR") {
			if (is_int($val)) {
					$query->orWhere($key, '=', $val);
				} else {
					$query->orWhere($key, 'like', $val);
				}
			}
		}
	}

	$subscribers = $query->get();
	$res = $app->response();
    $res['Content-Type'] = 'application/json';
	$res->body($subscribers);

}

function getSubNew() {
	$app = \Slim\Slim::getInstance();
	$req = $app->request();

	//$returnFields = array('subfirstname', 'sublastname', 'subnumber', 'createddate', 'expirydate', 'subemail', 'submobile', 'programid', 'posted');
	$returnFields = array('subnumber', 'subfirstname', 'sublastname', 'expirydate', 'subemail', 'subaddress1', 'subaddress2', 'subtypeid', 'submobile');
	$qs = file_get_contents('php://input');
	$q = json_decode($qs);
	$q = (array) $q;
    $q = array_filter($q);


    //pop off first
    $keys = array_keys($q);
    $alphaSearch = reset($q);
    $alphaKey = key($q);
    unset($q[$alphaKey]);


    //deal with first seach element. is it an array or single?;

    if (gettype($alphaSearch) == 'array') {

        if (count($alphaSearch) > 0) {
            $query = Subscriber::with('suburb', 'subscription')->where(function($query) use ($alphaSearch, $alphaKey) {
                        //var_dump($alphaSearch);
                foreach ($alphaSearch as $k => $val) {
                   // echo $val;
                    if ($alphaKey == 'suburbid' || $alphaKey == 'subskill' || $alphaKey == 'subtypeid' || $alphaKey == 'programid') { $val = (int) $val; }
                    $query->orWhere($alphaKey, '=', $val);
                }
            });
        }

    } else {
        //not array - process
        if ($alphaKey == 'suburbid' || $alphaKey == 'subskill' || $alphaKey == 'subtypeid' || $alphaKey == 'programid') { $alphaSearch = (int) $alphaSearch; }
            if ((is_int($alphaSearch)) || ($alphaKey == 'expirydate')){
                $query = Subscriber::with('suburb', 'subscription')->where($alphaKey,'=',$alphaSearch);
            } else {
                $op = '=';
                switch ($alphaKey) {
                    case 'pdate_start':
                        $alphaKey = 'paymentdate';
                        $op = '>=';
                        break;

                    case 'pdate_end':
                        $alphaKey = 'paymentdate';
                        $op = '<=';
                        break;

                    case 'edate_start':
                        $alphaKey = 'expirydate';
                        $op = '>=';
                        break;

                    case 'edate_end':
                        $alphaKey = 'expirydate';
                        $op = '<=';
                        break;
                }
                //echo $alphaKey." ".$op." ".$alphaSearch;
                $f = '%'.$alphaSearch.'%';
                $query = Subscriber::with('suburb', 'subscription')->where($alphaKey, $op, $alphaSearch);

            }
    }

	foreach ($q as $key => $value) {

        if (gettype($value) == 'array') {

                // array - open query and loop through, adding (nested or)

                $query->where(function($query) use ($value, $key) {

                    foreach ($value as $k => $val) {
                        if ($key == 'suburbid' || $key == 'subskill' || $key == 'subtypeid' || $key == 'programid') { $val = (int) $val; }
                        $query->orWhere($key, '=', $val);
                    }
                });
        } else {

            if ($key == 'suburbid' || $key == 'subskill' || $key == 'subtypeid' || $key == 'programid') { $value = (int) $value; }
            if (is_int($value)) {

                $query->where($key, '=', $value);
            } else {

               $op = '=';
                switch ($key) {
                    case 'pdate_start':
                        $key = 'paymentdate';
                        $op = '>=';
                        break;

                    case 'pdate_end':
                        $key = 'paymentdate';
                        $op = '<=';
                        break;

                    case 'edate_start':
                        $key = 'expirydate';
                        $op = '>=';
                        break;

                    case 'edate_end':
                        $key = 'expirydate';
                        $op = '<=';
                        break;
                }
                //echo $key." ".$op." ".$value;
                $query->where($key, $op, $value);


            }
        }

    }

//	$query->select($returnFields);
	$subs = $query->get();

    $res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($subs);

}


function getArtist($artist) {
	$artist = strtoupper($artist);
	$app = \Slim\Slim::getInstance();
	$music = Music::where('artist_nm','=',$artist)->get();
	$res = $app->response();
    	$res['Content-Type'] = 'application/json';
    	$res->body($music);
}


function getTypeaheadArtist($artist) {
	$artist = strtoupper($artist);
	if (strlen($artist) >= 3) {
	$artist = '%'.$artist.'%';
	$app = \Slim\Slim::getInstance();
	$music = Music::where('artist_nm','like',$artist)->select('artist_nm')->distinct()->get();
	$res = $app->response();
    	$res['Content-Type'] = 'application/json';
    	#$res->body($music);
	$foo='[';
	foreach ($music as $ar){
                $foo .= '"'.$ar->artist_nm.'",';

        }
	$foo = rtrim($foo, ",");
	$foo .= ']';
	$res->body($foo);
	}
}

// key: searchfirld, $val: searchfield, $type: table
function getTypeaheadTitle($val) {
	$key = 'title';
        $val = strtoupper($val);
        if (strlen($val) >= 3) {
        $val = '%'.$val.'%';
        $app = \Slim\Slim::getInstance();
        $result = Music::where($key,'like',$val)->select($key)->distinct()->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        #$res->body($music);
        $foo='[';
        foreach ($result as $ar){
                $foo .= '"'.$ar->{$key}.'",';

        }
        $foo = rtrim($foo, ",");
        $foo .= ']';
        $res->body($foo);
        }
}

function getTypeaheadLabel($val) {
    $key = 'album_label';
    $val = strtoupper($val);
    if (strlen($val) >= 3) {
    $val = '%'.$val.'%';
    $app = \Slim\Slim::getInstance();
    $result = Music::where($key,'like',$val)->select($key)->distinct()->get();
    $res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($result);

        //parse object to array
        $foo='[';
        foreach ($result as $ar){
                $foo .= '"'.$ar->{$key}.'",';

        }
        $foo = rtrim($foo, ",");
        $foo .= ']';
        $res->body($foo);
    }
}

function getTypeaheadApra($val) {
    $key = 'apra_code';
    $val = strtoupper($val);
    if (strlen($val) >= 3) {
    $val = '%'.$val.'%';
    $app = \Slim\Slim::getInstance();
    $result = Music::where($key,'like',$val)->select($key)->distinct()->get();
    $res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($result);

        //parse object to array
        $foo='[';
        foreach ($result as $ar){
                $foo .= '"'.$ar->{$key}.'",';

        }
        $foo = rtrim($foo, ",");
        $foo .= ']';
        $res->body($foo);
    }
}

function getTypeaheadHome($val) {
    $key = 'artist_hometown';
    $val = strtoupper($val);
        if (strlen($val) >= 3) {
        $val = '%'.$val.'%';
        $app = \Slim\Slim::getInstance();
        $result = Music::where($key,'like',$val)->select($key)->distinct()->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($result);
    }
}

function getTypeaheadCountry($val) {
    $key = 'album_origin';
    $val = strtoupper($val);
    if (strlen($val) >= 3) {
        $val = '%'.$val.'%';
        $app = \Slim\Slim::getInstance();
        $result = Music::where($key,'like',$val)->select($key)->distinct()->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($result);
    }
}


function getTypeaheadContact($val) {
        $key = 'org_nm';
        $val = '%'.strtoupper($val).'%';
        $app = \Slim\Slim::getInstance();
        $result = Contact::where($key,'like',$val)->select($key)->distinct()->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($result);
}


function getTypeaheadSuburb($val) {
	$key = 'suburb';
        if (strlen($val) >= 3) {
        $val = strtoupper($val);
        $val = '%'.$val.'%';
        $app = \Slim\Slim::getInstance();
        $result = Suburb::where($key,'like',$val)->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($result);
        }
}

function getTypeaheadPostcodeiOLD($val) {
	$key = 'postcode';
        if (strlen($val) >= 2) {
        $val .= "%";
        $val = (int) $val;
        $app = \Slim\Slim::getInstance();
        $result = Suburb::where('postcode::text', 'like', $val)->select($key)->distinct()->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($result);
        }
}

function getTypeaheadPostcode($val) {

        if (strlen($val) >= 2) {
        $val = (int) $val;
        $app = \Slim\Slim::getInstance();
        $result = Suburb::where('postcode', '=', $val)->distinct()->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($result);
        }
}
function getTypeaheadSub($name) {
        $name = strtoupper($name);
        if (strlen($name) >= 3) {
        $name = '%'.$name.'%';
        $app = \Slim\Slim::getInstance();
        $sub = Subscriber::where('sublastname','like',$name)
		->orWhere('subfirstname', 'like', $name)
		->select('subfirstname', 'sublastname')->distinct()->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        #$res->body($sub);
        $foo='[';
        foreach ($sub as $ar){
                $foo .= '"'.$ar->sublastname.', '.$ar->subfirstname.'",';

        }
        $foo = rtrim($foo, ",");
        $foo .= ']';
        $res->body($foo);
        }
}

function getTypeaheadVol($name) {
        $name = strtoupper($name);
        if (strlen($name) >= 3) {
            $name = '%'.$name.'%';
            $app = \Slim\Slim::getInstance();

            $query = Subscriber::where('fl_volunteer', '=', true)->where(function($query) use ($name) {
                $query->where('sublastname','like',$name)
                      ->orWhere('subfirstname', 'like', $name);
            });
            $volunteers = $query->get();

            $res = $app->response();
            $res['Content-Type'] = 'application/json';
            $foo='[';
            foreach ($volunteers as $ar){
                $foo .= '"'.$ar->sublastname.', '.$ar->subfirstname.'",';
                }
            $foo = rtrim($foo, ",");
            $foo .= ']';
            $res->body($foo);
        }
}


function getTypeaheadSubA($lname, $fname) {
        #$name = '%'.$lname.'%';
        $app = \Slim\Slim::getInstance();
        $sub = Subscriber::where('sublastname','=',$lname)
                ->where('subfirstname', '=', $fname)
                ->select('subnumber', 'subfirstname', 'sublastname')->distinct()->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($sub);
}



function getTitle($title) {
        $title = strtoupper($title);
        $title = '%'.$title.'%';
        $app = \Slim\Slim::getInstance();
        $release = Release::where('title','like',$title)->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($music);
}

function getRelease($id) {
        $app = \Slim\Slim::getInstance();
        //$release = Release::with('artist')->find($id);
        $release = Music::with('genres')->find($id);
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($release);
}

function getBandSubscribers($name) {
        $app = \Slim\Slim::getInstance();
        $sub = Subscriber::where('subbandname','=',url_decode($name))->first();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($sub);
}

function getSubscriber($id) {
        $app = \Slim\Slim::getInstance();
        $sub = Subscriber::with('bandmembers','suburb', 'pledge', 'subscription', 'volunteer')->find($id);
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($sub);
}

function getVolunteer($id) {
        $app = \Slim\Slim::getInstance();
        $sub = Subscriber::with('skills','volunteer','qualifications')->find($id);
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($sub);
}

function getBandMembers($id) {
        $app = \Slim\Slim::getInstance();
        $sub = Subbandmember::where('subid','=',$id)->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($sub);
}

function getSubTypeCount() {
    $app = \Slim\Slim::getInstance();
    $counts = array();
    $now = date('Y-m-d');
    $types = Subtype::All();
    foreach ($types as $key => $value) {
        $subc = Subscriber::where('expirydate', '>=', $now)->where('subtypeid', '=', $value->subtypeid)->count();
        $count = (object) array('subtype' => $value->subtypecode, 'subtypecount' => $subc);
        $counts[] = $count;
    }
    $res = $app->response();
    $res['Content-Type'] = 'application/json';

    ksort($counts);
    $c = json_encode($counts);
    $res->body($c);

}

function getSubscribersExp($start, $end=NULL) {
        $app = \Slim\Slim::getInstance();

        if ($end != NULL) {
        	$sub = Subscriber::with('suburb', 'subscription')->where('expirydate', '>', $start)->where('expirydate', '<', $end)->get();
        } else {
        	$sub = Subscriber::with('suburb', 'subscription')->where('expirydate', '=', $start)->get();
        }

        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($sub);
}

function getSubscribersEmail() {
        $app = \Slim\Slim::getInstance();

        $future = strtotime('+5 years');
        $past = strtotime('-2 years');
        $fd = date('Y-m-d', $future);
        $pd = date('Y-m-d', $past);
        $returnFields = array('subemail');

        $sub = Subscriber::where('expirydate', '>', $pd)->where('expirydate', '<', $fd)->select($returnFields)->get();

        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($sub);
}

function getSubscribersActive() {
        $app = \Slim\Slim::getInstance();
        $now = date('Y-m-d');

//	$returnFields = array('subnumber', 'subfirstname', 'sublastname', 'expirydate', 'subemail', 'subaddress1', 'subaddress2', 'subtypeid', 'submobile');
	$sub = Subscriber::with('suburb', 'subscription')->where('expirydate', '>', $now)->orderBy('sublastname')->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($sub);
}

function getSubscribersUnpaid() {
        $app = \Slim\Slim::getInstance();
        $now = date('Y-m-d');
        $then = date('Y-m-d', strtotime('-2 months'));
	$returnFields = array('subnumber', 'subfirstname', 'sublastname', 'expirydate', 'subemail', 'subaddress1', 'subaddress2', 'subtypeid', 'submobile');
        $sub = Subscriber::with('suburb', 'subscription')->where('createddate', '<', $now)->orWhere('createddate', '<', $now)->where('paymentdate', '=', NULL)->select($returnFields)->orderBy('sublastname')->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
 		$res->body($sub);
}

function getSubscribersPaid() {
        $app = \Slim\Slim::getInstance();
        $date = date('Y-m-d');
        $sub = Subscriber::with('suburb', 'subscription')->where('paymentdate', '=', $date)->orderBy('sublastname')->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
 		$res->body($sub);
}

function getPledgeOut() {
        $app = \Slim\Slim::getInstance();
        $now = date('Y-m-d');
        $pledge = Pledge::with('subscriber.subscription')->where('created_at', '>=', '2013-08-23')->get();

	//$pledge = Pledge::with(array('subscriber' => function($query) {
	//$query->where('paymentdate', NULL);
	//$query->where('subnumber', '=', 56518);
 //}))->where('created_at', '>=', $now)->get();

//},'subscriber.subscription'))->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
 		$res->body($pledge);
}

function getSubclears() {
        $app = \Slim\Slim::getInstance();
        $subs = Subclear::with('suburb', 'pledge', 'bandmembers', 'subscription')->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($subs);
}


function getSubsByPrize($prize) {
    $app = \Slim\Slim::getInstance();
    $d = date('Y-m-d');

    $sub = Pledge::with('subscriber')->where('radiothonprizeid', '=', $prize)->orWhere('radiothonprize2', '=', $prize)->get();
    // $sub = Pledge::with('subscriber')->where('radiothonprizeid', '=', $prize)->get();
    $res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($sub);
}

function getSubscribersNotPosted() {
    $app = \Slim\Slim::getInstance();
    $sub = Subscriber::with('suburb', 'subscription', 'pledge', 'pledge.prizes', 'pledge.subprizes', 'bandmembers')->where('posted', '=', 0)->orderBy('sublastname')->get();
    $res = $app->response();
    $res['Content-Type'] = 'application/json';
		$res->body($sub);
}

function getSubscriberNotPosted($id) {
    $app = \Slim\Slim::getInstance();
    $sub = Subscriber::with('suburb', 'pledge', 'bandmembers', 'subscription')->find($id);
    //        $sub = Subscriber::with('suburb', 'subscription', 'pledge', 'pledge.prizes', 'pledge.subprizes', 'bandmembers')->find($id);
    //   $sub = Subscriber::with('suburb', 'subscription', 'pledge.prizes', 'bandmembers')->where('posted', '=', 0)->orderBy('sublastname')->get();
    $res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($sub);
}

function getContact($id) {
    $app = \Slim\Slim::getInstance();
    $contact = Contact::with('contactcategories')->find($id);
    //$deps = $contact->departments;
    $res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($contact);
}

function saveReleaseNEWDB($id) {
    $app = \Slim\Slim::getInstance();
	$req = $app->request();
	$body = $req->getBody();
	$nb = json_decode($body, true);
    $release = Release::where('id','=',$id)->first();
	#$release->title = $nb['title'];
	$release->fill($nb);

	## hack alert - eloquent to postgres bool problem
	for ($i = 1; $i <= 4; $i++) {
	#$i = 1;
	$boolCheckL = 'track'.$i.'_language';
	$boolCheckC = 'track'.$i.'_concept';
	if ($release->{$boolCheckL} == false) { $release->{$boolCheckL} = null; }
	if ($release->{$boolCheckC} == false) { $release->{$boolCheckC} = null; }
	}

	$release->save();

}

function saveRelease($id) {
    $app = \Slim\Slim::getInstance();
	$req = $app->request();
	$body = $req->getBody();
	$jsonBody = json_decode($body, true);
    $releaseGenres = $jsonBody['genres'];
    unset($jsonBody['genres']);

    $release = Music::where('library_no','=',$id)->first();
	$release->fill($jsonBody);

	## hack alert - eloquent to postgres bool problem
	for ($i = 1; $i <= 4; $i++) {
    	$boolCheckL = 'track'.$i.'_language';
    	$boolCheckC = 'track'.$i.'_concept';
    	if ($release->{$boolCheckL} == false) { $release->{$boolCheckL} = 0; }
    	if ($release->{$boolCheckC} == false) { $release->{$boolCheckC} = 0; }
	}

	$release->save();
    $release->genres()->sync($releaseGenres);

}


function saveContact($id) {
    $app = \Slim\Slim::getInstance();
	$req = $app->request();
	$body = $req->getBody();
	$jsonBody = json_decode($body, true);
    //$depArr = $nb['departments'];
    //unset($nb['departments']);
    $contactCategories = $jsonBody['contactcategories'];
    unset($jsonBody['contactcategories']);

    $contact = Contact::where('contact_no','=',$id)->first();
    $contact->fill($jsonBody);
	$contact->save();
    $contact->contactcategories()->sync($contactCategories);
    //$contact->departments()->sync($depArr);

}

function saveSkill($id) {
    $app = \Slim\Slim::getInstance();
	$req = $app->request();
	$body = $req->getBody();
	$nb = json_decode($body, true);
    $skill = Skill::where('skillid','=',$id)->first();
    $skill->fill($nb);
	$skill->save();
}

function saveGenre($id) {
    $app = \Slim\Slim::getInstance();
	$req = $app->request();
	$body = $req->getBody();
	$nb = json_decode($body, true);
    $genre = Genre::where('genre_id','=',$id)->first();
    $genre->fill($nb);
	$genre->save();
}

function saveTheme($id) {
    $app = \Slim\Slim::getInstance();
	$req = $app->request();
	$body = $req->getBody();
	$nb = json_decode($body, true);
    $theme = Theme::where('theme_id','=',$id)->first();
    $theme->fill($nb);
	$theme->save();
}

function saveSubtype($id) {
    $app = \Slim\Slim::getInstance();
	$req = $app->request();
	$body = $req->getBody();
	$nb = json_decode($body, true);
    $subtype = Subtype::where('subtypeid','=',$id)->first();
    $subtype->fill($nb);
	$subtype->save();
}

function saveCategory($id) {
    $app = \Slim\Slim::getInstance();
	$req = $app->request();
	$body = $req->getBody();
	$nb = json_decode($body, true);
    $department = Department::where('department_no','=',$id)->first();
    $department->fill($nb);
	$department->save();
}

function saveSubcategory($id) {
    $app = \Slim\Slim::getInstance();
	$req = $app->request();
	$body = $req->getBody();
	$nb = json_decode($body, true);
    $interest = Interest::where('interest_no','=',$id)->first();
    $interest->fill($nb);
	$interest->save();
}

function saveUser($id) {
    $app = \Slim\Slim::getInstance();
    $req = $app->request();
    $body = $req->getBody();
    $passwordHasher = new PasswordHash(8,false);
    $nb = json_decode($body, true);
    $user = User::where('id','=',$id)->first();
    $hash = $passwordHasher->HashPassword($nb['password']);
    $user->username = $nb['username'];
    $user->role_id = $nb['role_id'];
    $user->password = $hash;
    $user->save();
    $res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($user);
}

function saveProgram($id) {
    $app = \Slim\Slim::getInstance();
	$req = $app->request();
	$body = $req->getBody();
	$nb = json_decode($body, true);
    $program = Program::where('programid','=',$id)->first();
    $program->fill($nb);
	$program->save();
}


function savePrize($id) {
    $app = \Slim\Slim::getInstance();
	$req = $app->request();
	$body = $req->getBody();
	$nb = json_decode($body, true);
    $prize = Prize::where('radiothonprizeid','=',$id)->first();
    $prize->fill($nb);
	$prize->save();
}

function savePledge($id) {
    $app = \Slim\Slim::getInstance();
	$req = $app->request();
	$body = $req->getBody();
	$nb = json_decode($body, true);


    $pledge = Pledge::where('pledgeid','=', $nb['pledgeid'])->first();
    $pledge->fill($nb);
	$pledge->save();
}

function updatePledgeClearing($subno) {
    $app = \Slim\Slim::getInstance();
        $req = $app->request();
        $body = $req->getBody();
        $nb = json_decode($body, true);


    $pledge = Pledge::where('subno','=', $subno)->first();
    $pledge->fill($nb);
        $pledge->save();
}


function saveBand($id) {
    $app = \Slim\Slim::getInstance();
	$req = $app->request();
	$body = $req->getBody();
	$nb = json_decode($body, true);
    $sub = Subbandmember::where('subid','=', $id)->first();
    $sub->fill($nb);
	$sub->save();
}

function saveSubscriber($id) {
    $app = \Slim\Slim::getInstance();
	$req = $app->request();
	$body = $req->getBody();

	$sb = json_decode($body, true);
    $sub = Subscriber::with('pledge', 'bandmembers','volunteer')->where('subnumber','=',$id)->first();
    //$bandmembers = $sub->bandmembers;

	if (isset($sb['pledge'])) {
		$pledge = ($sub->pledge) ? Pledge::where('subno', '=', $id)->first() : new Pledge();
		$pledge->subno = $id;
        $pledge->fill($sb['pledge']);
    	$pledge->save();
	}

	if (isset($sb['bandmembers'])) {
        $dm = Subbandmember::where('subid', '=', $id)->delete();
        foreach ($sb['bandmembers'] as $arr) {

            $bm = new Subbandmember();
            $bm->fill($arr);
            $bm->save();

        };
    }

    if (isset($sb['volunteer'])) {
        if (!$sub->volunteer) {
            $volunteer =  new Volunteer();
            $volunteer->subscriber_id = $id;
            $comment = $volunteer->save();
        }
    }

	$sub->fill($sb);
	//$sub->pledge()->save();
	unset($sub->bandmembers);
	unset($sub->pledge);
    unset($sub->volunteer);
    // crappy hack due to inability to save related models due to eloq 1.1/php 5.2 issue
	if ($sub->fl_volunteer == "") { $sub->fl_volunteer = NULL; }
	if ($sub->fl_announcer == "") { $sub->fl_announcer = NULL; }
    #if ($sub->posted == 0) { $sub->posted = false; }
	#if ($sub->subscription_update == "") { $sub->subscription_update = NULL; }

	$sub->save();
    $res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($sub);

}

function saveVolunteer($id) {
    $app = \Slim\Slim::getInstance();
    $req = $app->request();
    $body = $req->getBody();

    $jsonBody = json_decode($body, true);
    $sub = Subscriber::with('volunteer')->where('subnumber','=',$id)->first();

    if (isset($jsonBody['volunteer'])) {
        $volunteer = ($sub->volunteer) ? Volunteer::where('subscriber_id', '=', $id)->first() : new Volunteer();
        $volunteer->subscriber_id = $id;
        $volunteer->fill($jsonBody['volunteer']);
        if ($volunteer->completed_orientation == "") {
            $volunteer->completed_orientation = 0;
        }
        $volunteer->save();
    }


    $skills = $jsonBody['skills'];
    $sub->skills()->sync($skills);

    $qualifications = $jsonBody['qualifications'];
    $sub->qualifications()->sync($qualifications);

    $res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($sub);

}

function saveSubscriberOLD($id) {
    $app = \Slim\Slim::getInstance();
	$req = $app->request();
	$body = $req->getBody();
	$sjb = json_decode($body, true);
        $sub = Subscriber::where('subnumber','=',$id)->first();
	$sub->fill($sb);

	if ($sub->fl_volunteer == "") { $sub->fl_volunteer = NULL; }
	if ($sub->fl_announcer == "") { $sub->fl_announcer = NULL; }
#	if ($sub->subscription_update == "") { $sub->subscription_update = NULL; }
	$sub->save();
}

function addRelease() {
    $app = \Slim\Slim::getInstance();
	$req = $app->request();
	$body = $req->getBody();
	$jsonBody = json_decode($body, true);
    $releaseGenres = $jsonBody['genres'];
    unset($jsonBody['genres']);

	$release = Music::create($jsonBody);
    $release->genres()->sync($releaseGenres);
    $res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($release);

}

function addSubscriber() {
    $app = \Slim\Slim::getInstance();
	$req = $app->request();
	$body = $req->getBody();
	$nb = json_decode($body, true);

    if (isset($nb['pledge'])) {
        $pledgeArr = $nb['pledge'];
        unset($nb['pledge']);
    }
	if (isset($nb['id'])) {
        $mailOut = $nb['id'];
        unset($nb['id']);
    }

	$subscriber = Subscriber::create($nb);

    if ($subscriber) {
        if (isset($pledgeArr)) {
            $pledge = new Pledge();
            $pledge->fill($pledgeArr);
            $pledge->subno = $subscriber->subnumber;
            $pledge->save();
        }

	    if (isset($mailOut)) {
		      $message = "Dear ".$subscriber->subfirstname." ".$subscriber->sublastname."\n\nCongratulations on making the wisest investment of your life and supporting independent media!  Your subscription has been received and is currently being processed by our dedicated volunteers.\n\nNow that you are a full fledged subscriber you have access to all the benefits of being part of the 4ZZZ community. Not only do you get the warm inner glow from keeping independent radio on-air you also receive discounts at participating 4ZZZ Subscriber Outlets and gigs. For a complete list of 4ZZZ Subscriber Outlets visit http://www.4zzzfm.org.au/subscriber-discount-outlets\n\nExclusively available for our subscribers is the opportunity to win awesome prizes on air and in our weekly e-news - ZEDLETTER sent to this email each Thursday!\n\nSubscribers can request songs on programs that put the call out for requests just email reception@4zzz.org.au with your request or call (07) 3252 1555 and speak with the on-air announcer.\n\nYour subscriber card will be in the mail shortly!\n\nSee you at the next 4ZZZ Fundraiser!\n\nLove the 4ZZZ Family";
                mail($subscriber->subemail, 'You are a Sub!', $message, 'From:reception@4zzz.org.au');
		}

    }

    $res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($subscriber);

}

function addContact() {
    $app = \Slim\Slim::getInstance();
    $req = $app->request();
    $body = $req->getBody();
    $jsonBody = json_decode($body, true);

    $contactCategories = $jsonBody['contactcategories'];
    unset($jsonBody['contactcategories']);

    $contact = Contact::create($jsonBody);
    $contact->contactcategories()->sync($contactCategories);
    $res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($contact);
}

function addSkill() {
        $app = \Slim\Slim::getInstance();
        $req = $app->request();
        $body = $req->getBody();
        $nb = json_decode($body, true);
        $skill = Skill::create($nb);
}

function addGenre() {
        $app = \Slim\Slim::getInstance();
        $req = $app->request();
        $body = $req->getBody();
        $nb = json_decode($body, true);
        $genre = Newgenre::create($nb);
}

function addTheme() {
        $app = \Slim\Slim::getInstance();
        $req = $app->request();
        $body = $req->getBody();
        $nb = json_decode($body, true);
        $theme = Theme::create($nb);
}

function addSubtype() {
        $app = \Slim\Slim::getInstance();
        $req = $app->request();
        $body = $req->getBody();
        $nb = json_decode($body, true);
        $subtype = Subtype::create($nb);
}

function addCategory() {
        $app = \Slim\Slim::getInstance();
        $req = $app->request();
        $body = $req->getBody();
        $nb = json_decode($body, true);
        $department = Department::create($nb);
}

function addSubcategory() {
        $app = \Slim\Slim::getInstance();
        $req = $app->request();
        $body = $req->getBody();
        $nb = json_decode($body, true);
        $interest = Interest::create($nb);
}

function addProgram() {
        $app = \Slim\Slim::getInstance();
        $req = $app->request();
        $body = $req->getBody();
        $nb = json_decode($body, true);
        $program = Program::create($nb);
}

function addPrize() {
        $app = \Slim\Slim::getInstance();
        $req = $app->request();
        $body = $req->getBody();
        $nb = json_decode($body, true);
        $prize = Prize::create($nb);
}

function addPledge() {
        $app = \Slim\Slim::getInstance();
        $req = $app->request();
        $body = $req->getBody();
        $nb = json_decode($body, true);
        $prize = Pledge::create($nb);
}


//delete
function deleteRelease($id) {
        $app = \Slim\Slim::getInstance();
        $release = Music::find($id);
        $release->delete();
}

function deleteSubscriber($id) {
        $app = \Slim\Slim::getInstance();
        $subscriber = Subscriber::find($id);
        $subscriber->delete();
}

function deleteContact($id) {
        $app = \Slim\Slim::getInstance();
        $contact = Contact::find($id);
        $contact->delete();
}

function deleteUser($id) {
        $app = \Slim\Slim::getInstance();
        $user = User::find($id);
        $user->delete();
}

function deleteSkill($id) {
        $app = \Slim\Slim::getInstance();
        $skill = Skill::find($id);
        $skill->delete();
}

function deleteGenre($id) {
        $app = \Slim\Slim::getInstance();
        $genre = Newgenre::find($id);
        $genre->delete();
}

function deleteTheme($id) {
        $app = \Slim\Slim::getInstance();
        $theme = Theme::find($id);
        $theme->delete();
}

function deleteSubtype($id) {
        $app = \Slim\Slim::getInstance();
        $subtype = Subtype::find($id);
        $subtype->delete();
}

function deleteCategory($id) {
        $app = \Slim\Slim::getInstance();
        $department = Department::find($id);
        $department->delete();
}

function deleteSubcategory($id) {
        $app = \Slim\Slim::getInstance();
        $interest = Interest::find($id);
        $interest->delete();
}

function deleteProgram($id) {
        $app = \Slim\Slim::getInstance();
        $program = Program::find($id);
        $program->delete();
}

function deletePrize($id) {
        $app = \Slim\Slim::getInstance();
        $prize = Prize::find($id);
        $prize->delete();
}

function deleteFormsite($id) {
        $app = \Slim\Slim::getInstance();
        $sub = Subclear::find($id);
        $sub->delete();
}

function deletePledgeBySub($subno){
    $app = \Slim\Slim::getInstance();
    $pledges = Pledge::where('subno', '=', $subno)->delete();
}

function deleteBandBySub($subno){
    $app = \Slim\Slim::getInstance();
    $subb = Subbandmember::where('subid', '=', $subno)->delete();

}

function getGenres() {
        $app = \Slim\Slim::getInstance();
        $genres = Genre::orderBy('genre_desc')->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($genres);
}

function getGenresNew() {
        $app = \Slim\Slim::getInstance();
        $genres = Newgenre::orderBy('genre')->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($genres);
}

function getThemes() {
        $app = \Slim\Slim::getInstance();
        $themes = Theme::orderBy('theme_desc')->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($themes);
}

function getPledge($subno) {
        $app = \Slim\Slim::getInstance();
        $pledge = Pledge::where('subno', '=', $subno)->first();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($pledge);
}


function getDepartments() {
        $app = \Slim\Slim::getInstance();
        $departments = Department::orderBy('department_nm')->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($departments);
}

function getInterests() {
        $app = \Slim\Slim::getInstance();
        $interests = Interest::orderBy('interest_nm')->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($interests);
}

function getContactCats() {
        $app = \Slim\Slim::getInstance();
        $cats = Contactcategory::orderBy('category')->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($cats);
}

function getSubtypes() {
        $app = \Slim\Slim::getInstance();
        $subtypes = Subtype::orderBy('subtypecode')->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($subtypes);
}

function getPrizes() {
        $app = \Slim\Slim::getInstance();
	$prizes = Prize::with('prizetype', 'subtypes')->where('currentyear', '=', true)->orderBy('radiothonprize')->get();
	$res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($prizes);
}

function getRoles() {
        $app = \Slim\Slim::getInstance();
        $roles = Role::get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($roles);
}

function getUsers() {
    $app = \Slim\Slim::getInstance();
    $req = $app->request();
    $users = User::select('id', 'username', 'role_id')->get();
    $res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($users);
}

function addUser() {
    $app = \Slim\Slim::getInstance();
    $req = $app->request();
    $body = $req->getBody();
    $passwordHasher = new PasswordHash(8,false);
    $user = new User;
    $nb = json_decode($body, true);
    $hash = $passwordHasher->HashPassword($nb['password']);
    $user->username = $nb['username'];
    $user->role_id = $nb['role_id'];
    $user->password = $hash;
    $user->save();
    $res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($user);
}

function getPrizetypes() {
        $app = \Slim\Slim::getInstance();
        $prizetypes = Prizetype::orderBy('id')->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($prizetypes);
}

function getSkills() {
        $app = \Slim\Slim::getInstance();
        $skills = Skill::orderBy('skilldescription')->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($skills);
}

function getSkillsNew() {
        $app = \Slim\Slim::getInstance();
        $skills = Newskill::orderBy('skill')->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($skills);
}

function getQualifications() {
        $app = \Slim\Slim::getInstance();
        $qualifications = Qualification::orderBy('qualification')->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($qualifications);
}

function getSkill($id) {
        $app = \Slim\Slim::getInstance();
        $skill = Skill::find($id)->orderBy('skillid');
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($skill);
}

function getPrograms() {
        $app = \Slim\Slim::getInstance();
        $programs = Program::where('active', '=', true)->orderBy('programname')->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($programs);
}


function getFormsite() {
        $app = \Slim\Slim::getInstance();
        $subs = Subclear::with('subscription')->orderBy('subnumber')->get();
        $res = $app->response();
        $res['Content-Type'] = 'application/json';
        $res->body($subs);
}

function getLastRec() {
    $app = \Slim\Slim::getInstance();
    $sub = Subscriber::where('receiptnumber', 'like', '%FD-%')->select('receiptnumber')->get();
    //$sub = Subscriber::where('receiptnumber', 'like', '%FD%')->orderBy('subnumber', 'desc')->first();
    $res = $app->response();
    $res['Content-Type'] = 'application/json';
    $res->body($sub);
}

// helper funcs

function arrayKshift(&$arr) {
        list($k) = array_keys($arr);
        $r  = array($k=>$arr[$k]);
        unset($arr[$k]);
        return $r;
}

function properParseQstr($str) {
      # result array
      $arr = array();

      # split on outer delimiter
      $pairs = explode('&', $str);

      # loop through each pair
      foreach ($pairs as $i) {
        # split into name and value
        list($name,$value) = explode('=', urldecode($i), 2);

        if( isset($arr[$name]) ) {
          # stick multiple values into an array
          if( is_array($arr[$name]) ) {
            $arr[$name][] = $value;
          } else {
            $arr[$name] = array($arr[$name], $value);
          }
        } else {
          $arr[$name] = $value;
        }
      }

      # return result array
      return $arr;
    }


$app->run();

?>

