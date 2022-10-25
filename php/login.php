<?php

require "classes/databes.php";

Databes::connect('localhost','root',"",'insurance_app');

$sql = Databes::fetchDataFromUser($_POST['user-email']);

if($sql){
    if(password_verify($_POST['user-password'],$sql[0]['password'])){
        $user = (object)[
            'login' => true,
            'role' => $sql[0]['role'],
            'insurer' => $sql[0]['insurer'],
            'person' => $sql[0]['person']
        ];
        echo json_encode($user);
    }
    else{
        echo false;
    };
}




