<?php
/**
 * PHP file designed to remove insured
 */

require "classes/databes.php";

/* Connecting to a SQL database */
Databes::connect('localhost','root',"",'insurance_app');

/* The insured id we want to remove. */
$ID = $_POST['ID'];

/* Call the static method deletePerson in the tride Database to delete the insured */
$sql = Databes::deletePerson($ID);

/* For verification, we will try to find the insured that we want to remove. If the insured is found, the array is returned to us. */
$sqlControl = Databes::fetchDataFromPersonID($ID);

/* If there is no field in the sqlControl variable, we return true to the asynchronous function in JS, otherwise false */
if($sqlControl == null){
    echo 'true';
}
else{
    echo 'false';
}