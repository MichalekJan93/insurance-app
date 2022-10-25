<?php

require "classes/databes.php";

Databes::connect('localhost','root',"",'insurance_app');

$sql = Databes::deleteInsurance($_POST['ID']);

$sqlControl = Databes::fetchAllDataFromInsuranceID($_POST['ID']);

if($sqlControl == null){
    echo 'true';
}
else{
    echo 'false';
}