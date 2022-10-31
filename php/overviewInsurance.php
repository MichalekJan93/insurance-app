<?php
/**
 * This file is used to obtain data about the registered policyholder and his statistics
 */
require "classes/databes.php";

/* Connecting to a SQL database */
$con = Databes::connect('localhost','root',"",'insurance_app');

/* ID of the login insurer */
$personID = $_POST['ID'];

/* All data about the insurer according to its ID */
$sql = Databes::fetchDatafromInsurersID($personID);

/* Number of all insurances created this month */
$numberRowsFromInsurance = Databes::numberOfRowsfromInsurance();

/* The number of all policies created by the given insurer this month */
$numbersRowsFromOneUserInsurance = Databes::numberOfRowsfromOneUserInsurance($personID);

/* The number of all registered insured persons this month */
$numberRowsFromInsuredPersons = Databes::numberOfRowsfromInsuredPersons();

/* The number of all registered policyholders registered by the given insurer this month */
$numbersRowsFromOneUserInsuredPersons = Databes::numberOfRowsfromOneUserInsuredPersons($personID);

/* Adding all statistics added for $sql variables */
$sql[0]['RowsFromInsurance'] = $numberRowsFromInsurance[0]['COUNT(*)'];
$sql[0]['RowsFromOneUserInsurance'] = $numbersRowsFromOneUserInsurance[0]['COUNT(*)'];
$sql[0]['RowsFromInsuredPersons'] = $numberRowsFromInsuredPersons[0]['COUNT(*)'];
$sql[0]['RowsFromOneInsuredPersons'] = $numbersRowsFromOneUserInsuredPersons[0]['COUNT(*)']; 

/* Let's return the array with the insureds as JSON to the JS file from which the PHP file is called */
echo json_encode($sql);