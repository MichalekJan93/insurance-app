<?php
class Databes{

	private static $connection;

	private static $options = array(
		PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING,
		PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
		PDO::ATTR_EMULATE_PREPARES => false,
	);

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

	public static function query ($sql, $parameters = array()){
        $query = self::$connection->prepare($sql);
        $query->execute($parameters);
        return $query;
    }

	public static function fetchAllDataFromInsuredPersons($firstName, $lastName, $NIP){
        $query = Databes::query("SELECT * FROM `insured_persons` 
        WHERE firstName LIKE '$firstName%' AND lastName LIKE '$lastName%' AND NIP LIKE '$NIP%'");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    public static function fetchAllDataFromInsurance(){
        $query = Databes::query("SELECT * FROM `insurance`");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    public static function fetchAllDataFromInsurancePersonID($personID){
        $query = Databes::query("SELECT * FROM `insurance` 
        WHERE `insuredPersonID` LIKE '%$personID%'
        ");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    public static function fetchAllDataFromInsuranceID($ID){
        $query = Databes::query("SELECT * FROM `insurance` WHERE `id` = '$ID'");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /* Vyhledani uzivatele podle emailu v tabulce insurers*/
    public static function fetchDatafromInsurers($email){
        $query = Databes::query("SELECT * FROM `insurers` WHERE `email` = '$email'");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /* Vyhledani uzivatele podle ID v tabulce insurers*/
    public static function fetchDatafromInsurersID($id){
        $query = Databes::query("SELECT `firstName`,`lastName`, `email` FROM `insurers` WHERE `id` = '$id'");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /* Vyhledani uzivatele podle emailu v tabulce insured_persons*/
    public static function fetchDataFromPerson($email){
        $query = Databes::query("SELECT * FROM `insured_persons` WHERE `email` = '$email'");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /* Vyhledani jmena a prijmeni pojistnika podle id v tabulce insured_persons*/
    public static function fetchNameFromPerson($id){
        $query = Databes::query("SELECT `firstName`,`lastName` FROM `insured_persons` WHERE `id` = '$id'");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /* Vyhledani uzivatele podle jeho ID v tabulce insured_persons*/
    public static function fetchDataFromPersonID($id){
        $query = Databes::query("SELECT * FROM `insured_persons` WHERE `id` = '$id'");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /* Vyhledani uzivatele podle emailu v tabulce users*/
    public static function fetchDataFromUser($email){
        $query = Databes::query("SELECT * FROM `users` WHERE `email` = '$email'");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /* Uložení nového pojistnika do databáze */
    public static function sendPersonIntoDtb($date, $personFirstName, $personLastName, $personBirthdate, $personCity, $personAddress, $personNIP, $personPhone, $personEmail, $personInsurerID){
        Databes::query('
        INSERT INTO `insured_persons`
        (`dateRegistration`, `firstName`, `lastName`, `birthdate`, `city`, `address`, `NIP`, `phone`, `email`, `insurerID`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ', array($date, $personFirstName, $personLastName, $personBirthdate, $personCity, $personAddress, $personNIP, $personPhone, $personEmail, $personInsurerID));
        return true;
    }

    /* Uložení nového uživatele do databáze */
    public static function sendInsurersIntoDtb ($userFirstName, $userLastName,$userEmail, $password){
        Databes::query('
        INSERT INTO `insurers`
        (`firstName`, `lastName`, `email`, `password`)
        VALUES (?, ?, ?, ?)
        ', array($userFirstName, $userLastName,$userEmail, $password));
    }

    /* Uložení nového uživatele do databáze */
    public static function sendInsurersIntoDtbUsers ($userEmail, $password, $role, $insurer, $person){
        Databes::query('
        INSERT INTO `users`
        (`email`,`password`,`role`,`insurer`,`person`)
        VALUES (?, ?, ?, ?, ?)
        ', array($userEmail, $password, $role, $insurer, $person));
    }

    /* Update pojistnika v databazi*/
    public static function updateInsurer($personFirstName, $personLastName, $personBirthdate, $personCity, $personAddress, $personNIP, $personPhone, $personEmail, $id){
        Databes::query('
        UPDATE `insured_persons`
        SET firstName = ?, lastName = ?, birthdate = ?, city = ?, address = ?, NIP = ?, phone = ?, email = ?
        WHERE id = ?
        ', array($personFirstName, $personLastName, $personBirthdate, $personCity, $personAddress, $personNIP, $personPhone, $personEmail, $id));
    }

    /* Odstraneni pojistnika z databaze */
    public static function deletePerson ($personID){
        $query = Databes::query("DELETE FROM `insured_persons` WHERE `id` = '$personID'");
    }

    /* Vlozeni noveho pojisteni do databaze */
    public static function sendInsuranceIntoDtb ($type, $amount, $subject, $validFrom, $validUntil, $insuredPersonID, $insurerID){
        Databes::query('
        INSERT INTO `insurance`
        (`type`,`amount`,`subject`,`validFrom`,`validUntil`,`insuredPersonID`,`insurerID`)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ', array($type, $amount, $subject, $validFrom, $validUntil, $insuredPersonID, $insurerID));
    }

    /* Update pojisteni v databazi*/
    public static function updateInsurance($type, $amount, $subject, $validUntil, $id){
        Databes::query('
        UPDATE `insurance`
        SET type = ?, amount = ?, subject = ?, validUntil = ?
        WHERE id = ?
        ', array($type, $amount, $subject, $validUntil, $id));
    }

    /* Odstraneni pojisteni z databaze */
    public static function deleteInsurance ($ID){
        $query = Databes::query("DELETE FROM `insurance` WHERE `id` = '$ID' ");
    }

    /* Vrati pocet vsech pojisteni z tabulky insruance */
    public static function numberOfRowsfromInsurance(){
        $query = Databes::query("SELECT COUNT(*) FROM `insurance` WHERE MONTH(`validFrom`) = MONTH(NOW())");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /* Vrati pocet pojisteni z tabulky insurance u daneho pojistitele */
    public static function numberOfRowsfromOneUserInsurance($id){
        $query = Databes::query("SELECT COUNT(*) FROM `insurance`
        WHERE `insurerID` = '$id' AND MONTH(`validFrom`) = MONTH(NOW())");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /* Vrati pocet vsech pojistencu z tabulky insured_persons */
    public static function numberOfRowsfromInsuredPersons(){
        $query = Databes::query("SELECT COUNT(*) FROM `insured_persons` WHERE MONTH(`dateRegistration`) = MONTH(NOW())");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }

    /* Vrati pocet pojistencu z tabulky insured_persons u daneho pojistitele */
    public static function numberOfRowsfromOneUserInsuredPersons($id){
        $query = Databes::query("SELECT COUNT(*) FROM `insured_persons`
        WHERE `insurerID` = '$id' AND MONTH(`dateRegistration`) = MONTH(NOW())");
        return $query->fetchALL(PDO::FETCH_ASSOC);
    }
}

?>