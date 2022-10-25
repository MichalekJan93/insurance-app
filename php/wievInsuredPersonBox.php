<?php
    require "classes/databes.php";

    $con = Databes::connect('localhost','root',"",'insurance_app');

    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $NIP = $_POST['NIP'];

    $sql = Databes::fetchAllDataFromInsuredPersons($firstName, $lastName, $NIP);

   echo json_encode($sql);