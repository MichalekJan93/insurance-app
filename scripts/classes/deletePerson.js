import { PostAjax } from "../ajax/postAjax.js";
import { Message } from "./message.js";
import { InsuredPersonBox } from "./insuredPersonBox.js";
/**
 * Třída, pomocí, které vymažeme pojištěnce z databáze
 */
export class DeletePerson{
    /**
     * @param {number} personID - id pojištěnce, kterého chceme odstranit
     */
    constructor(personID){
        this.personID = personID;
        this.delete(this.personID);
    }

    /**
     * Metoda, která odešlě id pojištěnce, kterého chceme odstranit do souboru PHP
     * @param {number} personID - id pojištěnce
     * @returns data z databáze
     */
    InsuranceFromDTB(personID) {
        let callDtbObject = {
            'ID' : personID
        }
        // Vytvoříme objekt PostAjax s metodou POST a trasou k souboru php
        let postData = new PostAjax('POST', './php/deletePerson.php', true);
        // Zavoláme metodu AJAX pro odeslání dat do souboru PHP
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }
    /**
     * Metoda, která pracuje s asynchroními daty z databáze
     * @param {number} personID - id pojištěnce, kterého chceme odstranit
     */
    delete(personID){
        //Odešleme id pojištěnce do metody InsuranceFromDTB
        let dataDtb = this.InsuranceFromDTB(personID);
        dataDtb.then(function (result) {
            //Pokud nám z php souboru příjde true, jako že došlo k odstranění daného pojištěnce, tak provedeme následující příkazy.
            if(result == 'true'){
                //Odstraníme všechny information-boxy s daty pojištěnců
                let infoBoxes = document.querySelectorAll('.information-box');
                for (let oneBox of infoBoxes) {
                    oneBox.remove();
                }
                //Odstraníme ovládací tlačítka pro stránkování
                document.querySelector('.control').remove();
                //Vytvoříme nový objekt a vypíše znovu všechna data o pojištěncích do stránky bez odstraněného pojištěnce
                let contentBox = new InsuredPersonBox();
                contentBox.control();
                // Vypíše potvrzovací zprávu uživateli
                let message = new Message('Pojistník byl úspěšně odstraněn');
            }
        })
    }
}