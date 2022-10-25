<?php
    require "classes/databes.php";

    $con = Databes::connect('localhost','root',"",'insurance_app');

    $personID = $_POST['ID'];

    $sql = Databes::fetchDataFromPersonID($personID);

    echo json_encode($sql);