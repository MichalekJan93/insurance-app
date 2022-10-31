<?php
/**
 * This file is used for updated insurance
 */

require "classes/databes.php";

/* Connecting to a SQL database */
Databes::connect('localhost','root',"",'insurance_app');

/* If there is an ID value in the post method, we send the found data from the database back to the JS file, where it is inserted into the form */
if(isset($_POST['ID'])){
    $sqlFirst = Databes::fetchAllDataFromInsuranceID($_POST['ID']);
    $name = Databes::fetchNameFromPerson($sqlFirst[0]['insuredPersonID']);
    $sqlFirst[0]['personName'] = $name;
    echo json_encode($sqlFirst);
}

/* If there is a type value in the post method, we know that we are receiving new data about the insurance.*/
if(isset($_POST['type'])){
    /* Data from the form sent in the POST method */
    $id = $_POST['id'];
    $type = $_POST['type'];
    $amount = $_POST['amount'];
    $subject = $_POST['subject'];
    $validUntil = $_POST['validUntil'];
    $sql = Databes::updateInsurance($type, $amount, $subject, $validUntil, $id);

    echo ('true');
}