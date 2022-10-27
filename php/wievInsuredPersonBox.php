<?php
/**
 * This file is used to log in the user
 */

require "classes/databes.php";

/* Connecting to a SQL database */
$con = Databes::connect('localhost','root',"",'insurance_app');

/* We find all insured persons according to the specified parameters */
$sql = Databes::fetchAllDataFromInsuredPersons($_POST['firstName'], $_POST['lastName'], $_POST['NIP']);

/* Let's return the array with the insureds as JSON to the JS file from which the PHP file is called */
echo json_encode($sql);
