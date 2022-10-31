<?php
/**
 * This file is used to obtain information about the insured
 */

require "classes/databes.php";

/* Connecting to a SQL database */
$con = Databes::connect('localhost','root',"",'insurance_app');

/* ID of the insured */
$personID = $_POST['ID'];

/**
 * Obtaining data about the insured from the database
 */
$sql = Databes::fetchDataFromPersonID($personID);

/* Let's return the array with the insureds as JSON to the JS file from which the PHP file is called */
echo json_encode($sql);