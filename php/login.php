<?php
/**
 * This file is used to log in the user
 */

require "classes/databes.php";

/* Connecting to a SQL database */
Databes::connect('localhost','root',"",'insurance_app');

/* Using the email from the login form, we can find users in the database */
$sql = Databes::fetchDataFromUser($_POST['user-email']);

/* If we find the user in the database, we will verify the password. */
if($sql){
    if(password_verify($_POST['user-password'],$sql[0]['password'])){
        /* We create an object that we return as JSON to the JS file from which the PHP file is called */
        $user = (object)[
            'login' => true,
            'role' => $sql[0]['role'],
            'insurer' => $sql[0]['insurer'],
            'person' => $sql[0]['person']
        ];
        echo json_encode($user);
    }
    else{
        echo 'false';
    };
}
else{
    echo 'false';
}




