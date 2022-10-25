<?php
    require "classes/databes.php";

    $con = Databes::connect('localhost','root',"",'insurance_app');

    $personID = $_POST['ID'];

    $sql = Databes::fetchDatafromInsurersID($personID);
 
    $numberRowsFromInsurance = Databes::numberOfRowsfromInsurance();

    $numbersRowsFromOneUserInsurance = Databes::numberOfRowsfromOneUserInsurance($personID);

    $numberRowsFromInsuredPersons = Databes::numberOfRowsfromInsuredPersons();
    
    $numbersRowsFromOneUserInsuredPersons = Databes::numberOfRowsfromOneUserInsuredPersons($personID);

    $sql[0]['RowsFromInsurance'] = $numberRowsFromInsurance[0]['COUNT(*)'];
    $sql[0]['RowsFromOneUserInsurance'] = $numbersRowsFromOneUserInsurance[0]['COUNT(*)'];
    $sql[0]['RowsFromInsuredPersons'] = $numberRowsFromInsuredPersons[0]['COUNT(*)'];
    $sql[0]['RowsFromOneInsuredPersons'] = $numbersRowsFromOneUserInsuredPersons[0]['COUNT(*)']; 

   echo json_encode($sql);