<?php
/**
 * This file is used to register insurance
 */

require "classes/databes.php";

/* Connecting to a SQL database */
Databes::connect('localhost','root',"",'insurance_app');

/* Checking if we received any data in the post method */
if(!isset($_POST)){
    echo 'false';
}
else{
    /* Sending data about the registered insurance to the database */
    Databes::sendInsuranceIntoDtb($_POST['type'], $_POST['amount'], $_POST['subject'], $_POST['validFrom'], $_POST['validUntil'], $_POST['personID'], $_POST['insurerID']);

    echo 'true';
}

