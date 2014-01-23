
<?php

$fields = array (  array(     'field_value' => 'Community Group ($0.01 AUD)',     'field_name' => 'Subscription Type',     'field_id' => 299923,     'field_datatype' => 'option',  ),  array(     'field_value' => 'damon.black@gmail.com',     'field_name' => 'Email',     'field_id' => 299921,     'field_datatype' => 'email',  ),  array(     'field_value' => 'DEmon',     'field_name' => 'First Name',     'field_id' => 301235,     'field_datatype' => 'name',  ),  array(     'field_value' => 'Black',     'field_name' => 'Last Name',     'field_id' => 301236,     'field_datatype' => 'name',  ),  array(     'field_value' => 'Male',     'field_name' => 'Gender',     'field_id' => 301237,     'field_datatype' => 'option',  ),    array(     'field_value' => 'my com group',     'field_name' => 'Name',     'field_id' => 301997,     'field_datatype' => 'textline',  ),    array(     'field_value' => '44 goo st',     'field_name' => 'Postal Address',     'field_id' => 301238,     'field_datatype' => 'alphanum',  ),    array(     'field_value' => '4005',     'field_name' => 'Postcode',     'field_id' => 301239,     'field_datatype' => 'number',  ),    array(     'field_value' => 'New Farm',     'field_name' => 'Suburb',     'field_id' => 301242,     'field_datatype' => 'name',  ),    array(     'field_value' => 'Queensland',     'field_name' => 'State',     'field_id' => 301241,     'field_datatype' => 'option',  ),    array(     'field_value' => 'AU',     'field_name' => 'Country',     'field_id' => 301240,     'field_datatype' => 'country',  ),    array(     'field_value' => '61414984134',     'field_name' => 'Phone Number',     'field_id' => 301243,     'field_datatype' => 'phone',  ),    array(     'field_value' => 'No',     'field_name' => 'Previous Subscription?',     'field_id' => 301244,     'field_datatype' => 'option',  ),    array(     'field_value' => '',     'field_name' => 'Sub Number',     'field_id' => 301247,     'field_datatype' => 'posint',  ),    array(     'field_value' => '',     'field_name' => 'Donation ($ AUD)',     'field_id' => 301245,     'field_datatype' => 'number',  ),    array(     'field_value' => 'Asphodel Meadows',     'field_name' => 'Favourite Show',     'field_id' => 301246,     'field_datatype' => 'option',  ),   array(     'field_value' => '1',     'field_name' => 'No. of cards required',     'field_id' => 303415,     'field_datatype' => 'option',  ),   array(     'field_value' => '',     'field_name' => 'Band Member 1',     'field_id' => 301999,     'field_datatype' => 'name',  ),  array(     'field_value' => '',     'field_name' => 'Band Member 2',     'field_id' => 302000,     'field_datatype' => 'name',  ),  array(     'field_value' => '',     'field_name' => 'Band Member 3',     'field_id' => 302001,     'field_datatype' => 'name',  ),  array(     'field_value' => '',     'field_name' => 'Band Member 4',     'field_id' => 302002,     'field_datatype' => 'name',  ),  array(     'field_value' => 'Male',     'field_name' => '4ZZZ T-Shirt',     'field_id' => 303417,     'field_datatype' => 'option',  ),  array(     'field_value' => 'Small',     'field_name' => 'Size',     'field_id' => 303418,     'field_datatype' => 'option',  ),  array(     'field_value' => '4ZZZ Sunglasses',     'field_name' => 'Merch',     'field_id' => 303419,     'field_datatype' => 'option',  ),   array(     'field_value' => 'I will pick up my pack from the station ($0.00 AUD)',     'field_name' => 'Passionate Merch Postage',     'field_id' => 306991,     'field_datatype' => 'option',  ),);



echo $fields[2]->{'field_value'};

/*
  
  array(
     'field_value' => 'damon.black@gmail.com',
     'field_name' => 'Email',
     'field_id' => 299921,
     'field_datatype' => 'email',
  ),
  
  array(
     'field_value' => 'DEmon',
     'field_name' => 'First Name',
     'field_id' => 301235,
     'field_datatype' => 'name',
  ),
  
  array(
     'field_value' => 'Black',
     'field_name' => 'Last Name',
     'field_id' => 301236,
     'field_datatype' => 'name',
  ),
  
  array(
     'field_value' => 'Male',
     'field_name' => 'Gender',
     'field_id' => 301237,
     'field_datatype' => 'option',
  ),
  
  array(
     'field_value' => 'DEmon Black',
     'field_name' => 'Name',
     'field_id' => 301997,
     'field_datatype' => 'textline',
  ),
  
  array(
     'field_value' => '44 goo st',
     'field_name' => 'Postal Address',
     'field_id' => 301238,
     'field_datatype' => 'alphanum',
  ),
  
  array(
     'field_value' => '4005',
     'field_name' => 'Postcode',
     'field_id' => 301239,
     'field_datatype' => 'number',
  ),
  
  array(
     'field_value' => 'New Farm',
     'field_name' => 'Suburb',
     'field_id' => 301242,
     'field_datatype' => 'name',
  ),
  
  array(
     'field_value' => 'Queensland',
     'field_name' => 'State',
     'field_id' => 301241,
     'field_datatype' => 'option',
  ),
  1
  array(
     'field_value' => 'AU',
     'field_name' => 'Country',
     'field_id' => 301240,
     'field_datatype' => 'country',
  ),
  1
  array(
     'field_value' => '61414984134',
     'field_name' => 'Phone Number',
     'field_id' => 301243,
     'field_datatype' => 'phone',
  ),
  1
  array(
     'field_value' => 'No',
     'field_name' => 'Previous Subscription?',
     'field_id' => 301244,
     'field_datatype' => 'option',
  ),
  1
  array(
     'field_value' => '',
     'field_name' => 'Sub Number',
     'field_id' => 301247,
     'field_datatype' => 'posint',
  ),
  1
  array(
     'field_value' => '',
     'field_name' => 'Donation ($ AUD)',
     'field_id' => 301245,
     'field_datatype' => 'number',
  ),
  1
  array(
     'field_value' => 'Asphodel Meadows',
     'field_name' => 'Favourite Show',
     'field_id' => 301246,
     'field_datatype' => 'option',
  ),
  1
  array(
     'field_value' => '1',
     'field_name' => 'No. of cards required',
     'field_id' => 303415,
     'field_datatype' => 'option',
  ),
  1
  array(
     'field_value' => '',
     'field_name' => 'Band Member 1',
     'field_id' => 301999,
     'field_datatype' => 'name',
  ),
  1
  array(
     'field_value' => '',
     'field_name' => 'Band Member 2',
     'field_id' => 302000,
     'field_datatype' => 'name',
  ),
  1
  array(
     'field_value' => '',
     'field_name' => 'Band Member 3',
     'field_id' => 302001,
     'field_datatype' => 'name',
  ),
  2
  array(
     'field_value' => '',
     'field_name' => 'Band Member 4',
     'field_id' => 302002,
     'field_datatype' => 'name',
  ),
  2
  array(
     'field_value' => 'Male',
     'field_name' => '4ZZZ T-Shirt',
     'field_id' => 303417,
     'field_datatype' => 'option',
  ),
  2
  array(
     'field_value' => 'Small',
     'field_name' => 'Size',
     'field_id' => 303418,
     'field_datatype' => 'option',
  ),
  2
  array(
     'field_value' => '4ZZZ Sunglasses',
     'field_name' => 'Merch',
     'field_id' => 303419,
     'field_datatype' => 'option',
  ),
  2
  array(
     'field_value' => 'I will pick up my pack from the station ($0.00 AUD)',
     'field_name' => 'Passionate Merch Postage',
     'field_id' => 306991,
     'field_datatype' => 'option',
  ),
)

*/
?>