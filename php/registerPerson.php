<?php
/**
 * This file is used to register insureds
 */

require "classes/databes.php";

/* Connecting to a SQL database */
Databes::connect('localhost','root',"",'insurance_app');

/* Verification of whether the insured with this email address is in the database */
$sql = Databes::fetchDataFromPerson($_POST['email']);

/* If the method returned us some data about the user in the $sql variable, we will return false.
 */
if($sql != null){
    echo 'false';
}
else{
    /* Data from the form sent in the POST method */
    $date = date("Y-m-d H:i:s");
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $birthdate = $_POST['birthdate'];
    $city = $_POST['city'];
    $address = $_POST['address'];
    $NIP = $_POST['NIP'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $insurerID = $_POST['insurerID'];
    /* Sending data about the insured to the database */
    Databes::sendPersonIntoDtb($date, $firstName, $lastName, $birthdate, $city, $address, $NIP, $phone, $email, $insurerID);
    /* If we also send a password in the POST method, we will register the insured in the users table, which is used for user login */
    if( mb_strlen($_POST['passwordFirst']) > 4){
        $password = password_hash($_POST['passwordFirst'],PASSWORD_DEFAULT);
        /* We find out the id from the insured person from the database */
        $dataFromPersons = Databes::fetchDataFromPerson($_POST['email']);
        $idPerson = $dataFromPersons[0]['id'];
        /* Sending data to the database */
        Databes::sendInsurersIntoDtbUsers($email, $password, 2, NULL, $idPerson);
    }
    echo 'true';
}