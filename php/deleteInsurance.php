<?php
/**
 * This file is used to remove insurance
 */

require "classes/databes.php";

/* Connecting to a SQL database */
Databes::connect('localhost','root',"",'insurance_app');

/* The insurance id we want to remove. */
$ID = $_POST['ID'];

/* Call the static method deleteInsurance in the tride Database to delete the insurance */
$sql = Databes::deleteInsurance($ID);

/* For verification, we will try to find the insurance that we want to remove. If the insurance is found, the array is returned to us. */
$sqlControl = Databes::fetchAllDataFromInsuranceID($ID);

/* If there is no field in the sqlControl variable, we return true to the asynchronous function in JS, otherwise false */
if($sqlControl == null){
    echo 'true';
}
else{
    echo 'false';
}