<?php
/**
 * This file finds information about the insured and all his insurances from the database
 */
require "classes/databes.php";

/* Connecting to a SQL database */
$con = Databes::connect('localhost','root',"",'insurance_app');

/* A new field in which the found data from the database will be stored */
$newSql = array();

/* We will store all insurances from the database in the variable */
$sql = Databes::fetchAllDataFromInsurance();

/* Using a foreach loop, we store information about the insurance and its owner in the $newSql variable */
foreach($sql as $insurer){
    /* We will find out the name of the owner of the insurance */
    $name = Databes::fetchNameFromPerson($insurer['insuredPersonID']);
    $insurer['personName'] = $name;
    /* If the insurance is valid, we store it in the $newSql variable */
    if($insurer['validUntil'] > date("Y-m-d")){
        array_push($newSql, $insurer);
    }
}
/* Let's return the array with the insureds as JSON to the JS file from which the PHP file is called */
echo json_encode($newSql);