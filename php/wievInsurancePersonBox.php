<?php
    require "classes/databes.php";

    $con = Databes::connect('localhost','root',"",'insurance_app');

    $personID = $_POST['ID'];

    $sqlInsurer = Databes::fetchAllDataFromInsurancePersonID($personID);

    $sqlPerson = Databes::fetchDataFromPersonID($personID);

    $sql = array_merge($sqlPerson, $sqlInsurer);


   echo json_encode($sql);