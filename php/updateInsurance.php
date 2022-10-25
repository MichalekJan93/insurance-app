<?php

require "classes/databes.php";

Databes::connect('localhost','root',"",'insurance_app');

if(isset($_POST['ID'])){
    $sqlFirst = Databes::fetchAllDataFromInsuranceID($_POST['ID']);
    $name = Databes::fetchNameFromPerson($sqlFirst[0]['insuredPersonID']);
    $sqlFirst[0]['personName'] = $name;
    echo json_encode($sqlFirst);
}
/* id, type, amount, subject, validUntil*/
if(isset($_POST['type'])){
    $id = $_POST['id'];
    $type = $_POST['type'];
    $amount = $_POST['amount'];
    $subject = $_POST['subject'];
    $validUntil = $_POST['validUntil'];
    $sql = Databes::updateInsurance($type, $amount, $subject, $validUntil, $id);

    echo ('true');
}