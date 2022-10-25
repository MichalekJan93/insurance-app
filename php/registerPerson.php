<?php

require "classes/databes.php";

Databes::connect('localhost','root',"",'insurance_app');

$sql = Databes::fetchDataFromPerson($_POST['email']);


if($sql != null){
    echo 'false';
}
else{
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
    Databes::sendPersonIntoDtb($date, $firstName, $lastName, $birthdate, $city, $address, $NIP, $phone, $email, $insurerID);
    if( mb_strlen($_POST['passwordFirst']) > 4){
        $password = password_hash($_POST['passwordFirst'],PASSWORD_DEFAULT);
        $dataFromPersons = Databes::fetchDataFromPerson($_POST['email']);
        $idPerson = $dataFromPersons[0]['id'];
        Databes::sendInsurersIntoDtbUsers($email, $password, 2, NULL, $idPerson);
    }
    echo 'true';
}