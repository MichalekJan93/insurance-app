<?php
    require "classes/databes.php";

    $newSql = array();

    $con = Databes::connect('localhost','root',"",'insurance_app');

    $sql = Databes::fetchAllDataFromInsurance();

    foreach($sql as $insurer){
        $name = Databes::fetchNameFromPerson($insurer['insuredPersonID']);
        $insurer['personName'] = $name;
        /* Pokud je pojisteni stale platne, tak ho nechame vypsat do stranky */
        if($insurer['validUntil'] > date("Y-m-d")){
            array_push($newSql, $insurer);
        }
    }

    echo json_encode($newSql);