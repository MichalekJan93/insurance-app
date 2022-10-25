<?php

require "classes/databes.php";

Databes::connect('localhost','root',"",'insurance_app');

$sql = Databes::fetchDatafromInsurers($_POST['email']);

if(count($sql) == 0){
    $userFirstName = $_POST['firstName']; 
    $userLastName = $_POST['lastName']; 
    $userEmail = $_POST['email'];
    $password = password_hash($_POST['password'],PASSWORD_DEFAULT);
    Databes::sendInsurersIntoDtb ($userFirstName, $userLastName, $userEmail, $password);
    $dataFromInsurers = Databes::fetchDatafromInsurers($_POST['email']);
    $idInsurers = $dataFromInsurers[0]['id'];
    Databes::sendInsurersIntoDtbUsers($userEmail, $password, 1, $idInsurers, NULL);
    echo true;
}
else{
    echo false;
}

