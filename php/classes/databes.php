<?php
class Databes{

    /* private variable for connection */
	private static $connection;

    /**
     * Private static method for create Array with PDO option
     * @param array $options array with PDO option
     */
	private static $options = array(
		PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING,
		PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
		PDO::ATTR_EMULATE_PREPARES => false,
	);

    /**
     * Static method for create connection with SQL databes using the PDO method.
     * @param string $host server address
     * @param string $user server user
     * @param string $password server password
     * @param string $databes sql database name
     * @return $connection PDO object
     */
    public static function connect ($host, $user, $password, $databes){
        if(!isset(self::$connection)){
            self::$connection = new PDO(
                "mysql:host=$host;dbname=$databes",
                $user,
                $password,
                self::$options
            );
        }
        return self::$connection;
    }

    /**
     * Static method for entering a query with its parameters
     * @param string $sql sql database query
     * @param array $parametrs query parameters
     */
	public static function query ($sql, $parameters = array()){
        $query = self::$connection->prepare($sql);
        $query->execute($parameters);
        return $query;
    }

    /**
     * Static method for finding all data from the insured_persons table conditionally according to the parameters firstName, LastName, NIP.
     * @param string $firstName person firstName
     * @param string $lastName person lastName
     * @param number $NIPperson firstName
     * @return array found data from the SQL database, if any
     */
	public static function fetchAllDataFromInsuredPersons($firstName, $lastName, $NIP){
        $query = Databes::query("SELECT * FROM `insured_persons` 
        WHERE firstName LIKE '$firstName%' AND lastName LIKE '$lastName%' AND NIP LIKE '$NIP%'");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /**
     * Static method for finding all data from the insurance table
     *  @return array found data from the SQL database, if any
     */
    public static function fetchAllDataFromInsurance(){
        $query = Databes::query("SELECT * FROM `insurance`");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /**
     * Static method for finding all data from the insurance table that owns the person with the id inserted in the parameter.
     * @param number $personID id of the person from whom we find all their insurance
     *  @return array found data from the SQL database, if any
     */
    public static function fetchAllDataFromInsurancePersonID($personID){
        $query = Databes::query("SELECT * FROM `insurance` 
        WHERE `insuredPersonID` LIKE '%$personID%'
        ");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /**
     * Found insurance by ID
     * @param number $ID insurance id
     * @return array found data from the SQL database, if any
     */
    public static function fetchAllDataFromInsuranceID($ID){
        $query = Databes::query("SELECT * FROM `insurance` WHERE `id` = '$ID'");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /**
     * Searching for the insurer by his email
     * @param string $email email address of the insurer
     * @return array found data from the SQL database, if any
     */
    public static function fetchDatafromInsurers($email){
        $query = Databes::query("SELECT * FROM `insurers` WHERE `email` = '$email'");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /**
     * Searching the insurer's firstname, lastname and email according to his id
     * @param number $id insurer id
     * @return array found data from the SQL database, if any
     */
    public static function fetchDatafromInsurersID($id){
        $query = Databes::query("SELECT `firstName`,`lastName`, `email` FROM `insurers` WHERE `id` = '$id'");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /**
     * Searching for the insured by his email
     * @param string $email email address of the insured
     * @return array found data from the SQL database, if any
     */
    public static function fetchDataFromPerson($email){
        $query = Databes::query("SELECT * FROM `insured_persons` WHERE `email` = '$email'");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /**
     * Searching the insured's firstname, and lastname according to his id
     * @param number $id insured id
     * @return array found data from the SQL database, if any
     */
    public static function fetchNameFromPerson($id){
        $query = Databes::query("SELECT `firstName`,`lastName` FROM `insured_persons` WHERE `id` = '$id'");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /**
     * Obtaining all data of the insured according to his ID.
     * @param number $id insured id
     * @return array found data from the SQL database, if any
     */
    public static function fetchDataFromPersonID($id){
        $query = Databes::query("SELECT * FROM `insured_persons` WHERE `id` = '$id'");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /* Vyhledani uzivatele podle emailu v tabulce users*/
    /**
     * Searching for a user from the users table by his email
     * @param string $email user email
     * @return array found data from the SQL database, if any
     */
    public static function fetchDataFromUser($email){
        $query = Databes::query("SELECT * FROM `users` WHERE `email` = '$email'");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /**
     * Saving a new insured in the database
     * @param date $date registration date
     * @param string $personFirstName first name of the insured
     * @param string $personLastName last name of the insured
     * @param date $personBirthdate date of birth of the insured
     * @param string $personCity city where the insured lives
     * @param string $personAddress address where the insured lives
     * @param number $personNIP NIP of the city where the insured lives
     * @param number $personPhone telephone contact of the insured
     * @param string $personEmail email contact of the insured
     * @param number $personInsurerID id of the insurer who registers the insured
     */
    public static function sendPersonIntoDtb($date, $personFirstName, $personLastName, $personBirthdate, $personCity, $personAddress, $personNIP, $personPhone, $personEmail, $personInsurerID){
        Databes::query('
        INSERT INTO `insured_persons`
        (`dateRegistration`, `firstName`, `lastName`, `birthdate`, `city`, `address`, `NIP`, `phone`, `email`, `insurerID`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ', array($date, $personFirstName, $personLastName, $personBirthdate, $personCity, $personAddress, $personNIP, $personPhone, $personEmail, $personInsurerID));
    }

    /**
     * Saving a new insurer in the database
     * @param string @userFirstName first name of the insurer
     * @param string @userLastName last name of the insurer
     * @param string @userEmailName email contact of the insurer
     * @param string @password login password from the insurer
     */
    public static function sendInsurersIntoDtb ($userFirstName, $userLastName,$userEmail, $password){
        Databes::query('
        INSERT INTO `insurers`
        (`firstName`, `lastName`, `email`, `password`)
        VALUES (?, ?, ?, ?)
        ', array($userFirstName, $userLastName,$userEmail, $password));
    }

    /**
     * Saving a new user in the database
     * @param string @userEmail first name of the user
     * @param string @password login password from the user
     * @param number $role determines what role the user has. 1 insure, 2 insured
     * @param number $insurer id insurer
     * @param number $person id insured
     */
    public static function sendInsurersIntoDtbUsers ($userEmail, $password, $role, $insurer, $person){
        Databes::query('
        INSERT INTO `users`
        (`email`,`password`,`role`,`insurer`,`person`)
        VALUES (?, ?, ?, ?, ?)
        ', array($userEmail, $password, $role, $insurer, $person));
    }

    /**
     * Update the insured's data in the database
     * @param $personFist
     * @param string $personFirstName first name of the insured
     * @param string $personLastName last name of the insured
     * @param date $personBirthdate date of birth of the insured
     * @param string $personCity city where the insured lives
     * @param string $personAddress address where the insured lives
     * @param number $personNIP NIP of the city where the insured lives
     * @param number $personPhone telephone contact of the insured
     * @param string $personEmail email contact of the insured
     * @param number $id ID of the insured person we want to update
     */
    public static function updateInsured($personFirstName, $personLastName, $personBirthdate, $personCity, $personAddress, $personNIP, $personPhone, $personEmail, $id){
        Databes::query('
        UPDATE `insured_persons`
        SET firstName = ?, lastName = ?, birthdate = ?, city = ?, address = ?, NIP = ?, phone = ?, email = ?
        WHERE id = ?
        ', array($personFirstName, $personLastName, $personBirthdate, $personCity, $personAddress, $personNIP, $personPhone, $personEmail, $id));
    }

    /**
     * Removing the insured from the database
     * @param number @personID id of the insured person we want to delete
     */
    public static function deletePerson ($personID){
        $query = Databes::query("DELETE FROM `insured_persons` WHERE `id` = '$personID'");
    }

    /**
     * Inserting a new insurance into the database
     * @param string $type type of insurance
     * @param number $amount the part for which the subject is insured
     * @param string $subject subject insurance
     * @param date $validFrom insurance valid from
     * @param date $validUntil insurance valid until
     * @param number $insuredPersonID Id of the insured who owns the insurance
     * @param number $insurerID id of the insurer that created the insurance
     */
    public static function sendInsuranceIntoDtb ($type, $amount, $subject, $validFrom, $validUntil, $insuredPersonID, $insurerID){
        Databes::query('
        INSERT INTO `insurance`
        (`type`,`amount`,`subject`,`validFrom`,`validUntil`,`insuredPersonID`,`insurerID`)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ', array($type, $amount, $subject, $validFrom, $validUntil, $insuredPersonID, $insurerID));
    }

    /**
     * Insurance update
     * @param string $type type of insurance
     * @param number $amount the part for which the subject is insured
     * @param string $subject subject insurance
     * @param date $validUntil insurance valid until
     * @param number $id insurance id
     */
    public static function updateInsurance($type, $amount, $subject, $validUntil, $id){
        Databes::query('
        UPDATE `insurance`
        SET type = ?, amount = ?, subject = ?, validUntil = ?
        WHERE id = ?
        ', array($type, $amount, $subject, $validUntil, $id));
    }

    /**
     * Removing the insurance from the database
     * @param number @ID id of the insurance we want to delete
     */
    public static function deleteInsurance ($ID){
        $query = Databes::query("DELETE FROM `insurance` WHERE `id` = '$ID' ");
    }

    /**
     * The method finds the total number of insurances in the current month
     * @return array found data from the SQL database, if any
     */
    public static function numberOfRowsfromInsurance(){
        $query = Databes::query("SELECT COUNT(*) FROM `insurance` WHERE MONTH(`validFrom`) = MONTH(NOW())");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /**
     * The method finds the total number of of insurances in the current month from the given insurer
     * @param number $id insurer id
     * @return array found data from the SQL database, if any
     */
    public static function numberOfRowsfromOneUserInsurance($id){
        $query = Databes::query("SELECT COUNT(*) FROM `insurance`
        WHERE `insurerID` = '$id' AND MONTH(`validFrom`) = MONTH(NOW())");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /**
     * The method finds the total number of insured persons registered in the current month
     * @return array found data from the SQL database, if any
     */
    public static function numberOfRowsfromInsuredPersons(){
        $query = Databes::query("SELECT COUNT(*) FROM `insured_persons` WHERE MONTH(`dateRegistration`) = MONTH(NOW())");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /**
     * The method finds the total number of insured persons registered in the current month from the given insurer
     * @param number $id insurer id
     * @return array found data from the SQL database, if any
     */
    public static function numberOfRowsfromOneUserInsuredPersons($id){
        $query = Databes::query("SELECT COUNT(*) FROM `insured_persons`
        WHERE `insurerID` = '$id' AND MONTH(`dateRegistration`) = MONTH(NOW())");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }
}

?>