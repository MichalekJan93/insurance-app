<?php

require "classes/databes.php";

Databes::connect('localhost','root',"",'insurance_app');

$sql = Databes::deletePerson($_POST['ID']);

$sqlControl = Databes::fetchDataFromPersonID($_POST['ID']);

if($sqlControl == null){
    echo 'true';
}
else{
    echo 'false';
}