<?php
    require "classes/databes.php";

    $con = Databes::connect('localhost','root',"",'insurance_app');

    $sql = Databes::filter('ja', 'mich', '1');



   foreach($sql as $value){
    print_r('jmeno: ' . $value['firstName']);
    echo('  ----------  ');
    print_r('Prijmeni: ' . $value['lastName']);
    echo('  ----------  ');
    print_r('NIP: ' . $value['NIP']);
    echo('<br>');
   }