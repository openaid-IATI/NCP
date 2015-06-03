<?php
$base_url = 

// check if connected
include($base_url . '');

// 
$if (!$identified){
	// load form to connect to server 
	include('');
} else {
	// load start angular, leave the logic to angular
	include('app.php');
}