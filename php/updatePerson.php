<?php

require "classes/databes.php";

Databes::connect('localhost','root',"",'insurance_app');

if(isset($_POST['ID'])){
    $sql = Databes::fetchDataFromPersonID($_POST['ID']);

    echo json_encode($sql);
}

if(isset($_POST['firstName'])){
    $id = $_POST['id'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $birthdate = $_POST['birthdate'];
    $city = $_POST['city'];
    $address = $_POST['address'];
    $NIP = $_POST['NIP'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $sql = Databes::updateInsurer($firstName, $lastName, $birthdate, $city, $address, $NIP, $phone, $email, $id);
    
    echo 'true';
}