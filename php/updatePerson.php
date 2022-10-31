<?php
/**
 * This file is used for updated insureds
 */

require "classes/databes.php";

/* Connecting to a SQL database */
Databes::connect('localhost','root',"",'insurance_app');

/* If there is an ID value in the post method, we send the found data from the database back to the JS file, where it is inserted into the form */
if(isset($_POST['ID'])){
    $sql = Databes::fetchDataFromPersonID($_POST['ID']);

    echo json_encode($sql);
}

/* If there is a firstName value in the post method, we know that we are receiving new data about the insured.*/
if(isset($_POST['firstName'])){
    /* Data from the form sent in the POST method */
    $id = $_POST['id'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $birthdate = $_POST['birthdate'];
    $city = $_POST['city'];
    $address = $_POST['address'];
    $NIP = $_POST['NIP'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    /* Send new data to the database*/
    $sql = Databes::updateInsured($firstName, $lastName, $birthdate, $city, $address, $NIP, $phone, $email, $id);

    echo 'true';
}