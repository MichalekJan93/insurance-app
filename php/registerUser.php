<?php
/**
 * This file is used to register user (insurer)
 */

require "classes/databes.php";

/* Connecting to a SQL database */
Databes::connect('localhost','root',"",'insurance_app');

/* Verification of whether the insurer with this email address is in the database */
$sql = Databes::fetchDatafromInsurers($_POST['email']);

/* If the method returned us some data about the user in the $sql variable, we will return false.
 */
if(count($sql) == 0){
    /* Data from the form sent in the POST method */
    $userFirstName = $_POST['firstName']; 
    $userLastName = $_POST['lastName']; 
    $userEmail = $_POST['email'];
    $password = password_hash($_POST['password'],PASSWORD_DEFAULT);
    /* Sending data about the insurer to the database */
    Databes::sendInsurersIntoDtb ($userFirstName, $userLastName, $userEmail, $password);
    /* We find out the id from the insurer from the database */
    $dataFromInsurers = Databes::fetchDatafromInsurers($_POST['email']);
    $idInsurers = $dataFromInsurers[0]['id'];
    /* Sending data to the database */
    Databes::sendInsurersIntoDtbUsers($userEmail, $password, 1, $idInsurers, NULL);
    echo true;
}
else{
    echo false;
}

