<?php
/**
 * This file finds information about the insured and all his insurances from the database
 */
require "classes/databes.php";

/* Connecting to a SQL database */
$con = Databes::connect('localhost','root',"",'insurance_app');

/* We will find out all data about the insured from the database according to his id */
$sqlInsurer = Databes::fetchAllDataFromInsurancePersonID($_POST['ID']);

/* We will find out all the insurances owned by the insured from the database according to his id */
$sqlPerson = Databes::fetchDataFromPersonID($_POST['ID']);

/* We will create a $sql variable in which we will store a new field containing information about the insured and all his insurances */
$sql = array_merge($sqlPerson, $sqlInsurer);

/* Let's return the array with the insureds as JSON to the JS file from which the PHP file is called */
echo json_encode($sql);