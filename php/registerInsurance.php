<?php

require "classes/databes.php";

Databes::connect('localhost','root',"",'insurance_app');

print_r($_POST['type']);

if(!isset($_POST)){
    echo 'false';
}
else{
    Databes::sendInsuranceIntoDtb($_POST['type'], $_POST['amount'], $_POST['subject'], $_POST['validFrom'], $_POST['validUntil'], $_POST['personID'], $_POST['insurerID']);
    echo 'true';
}

