import { PostAjax } from "../ajax/postAjax.js";
import { Message } from "./message.js";
import { Information } from "./information.js";
import { SessionStorage } from "./sessionStorage.js";
import { InsurancePersonBox } from "./insurancePersonBox.js";
/**
 * Třída, pomocí, které vymažeme dané pojišění.
 */
export class DeleteInsurance{
    /**
     * @param {number} insuranceID - ID pojistitele
     * @param {number} page - Zjištění na které stránce se nachází uživatel
     */
    constructor(insuranceID, page){
        this.insuranceID = insuranceID;
        this.page = page;
        this.delete(this.insuranceID, this.page);
    }

    /**
     * Metoda, která odešlě id pojištění, které chceme odstranit do souboru PHP
     * @param {number} insuranceID - id pojištění
     * @returns data z databáze
     */
    InsuranceFromDTB(insuranceID) {
        let callDtbObject = {
            'ID' : insuranceID
        }
        // Vytvoříme objekt PostAjax s metodou POST a trasou k souboru php
        let postData = new PostAjax('POST', './php/deleteInsurance.php', true);
        // Zavoláme metodu AJAX pro odeslání dat do souboru PHP
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    /**
     * Asynchornní metoda pro práci s daty z databáze
     * @param {number} insuranceID - ID pojištěnce
     * @param {number} page - stránka na které se nacházíme
     */
    delete(insuranceID, page){
        //Odešleme id pojištění do metody InsuranceFromDTB
        let dataDtb = this.InsuranceFromDTB(insuranceID);
        dataDtb.then(function (result) {
            if(result == true){
                //Ověříme na jaké stránce se nachází uživatel
                if(page){
                    //Odstraníme všechny information-boxy s daty o pojištění
                    let infoBoxes = document.querySelectorAll('.information-box');
                    for (let oneBox of infoBoxes) {
                        oneBox.remove();
                    }
                    //Odstraníme ovládací tlačítka pro stránkování
                    document.querySelector('.control').remove();
                    //Vytvoříme nový objekt a vypíše znovu všechna data o pojištění do stránky i s nově přidaným pojištěním
                    let contentBox = new InsurancePersonBox();
                    contentBox.control()
                }
                else{
                    console.log('aaa')
                    //Odstraníme všechny information-boxy s daty o pojištění
                    let infoBoxes = document.querySelectorAll('.information-box-dialog');
                    for (let oneBox of infoBoxes) {
                        oneBox.remove();
                    }
                    //Odstraníme tlačítka pro strankování
                    document.querySelector('.control-dialog').remove();
                    //Vytvoříme nový objekt pro ziskání id pojištěnce ze session storage
                    let sessionStorage = new SessionStorage();
                    //Vytvoříme nový objekt a vypíše znovu všechna data o pojištění do dialogu i s nově přidaným pojištěním
                    let contentBox = new Information();
                    contentBox.control(sessionStorage.getSessionData())
                }
                // Vypíše potvrzovací zprávu uživateli
                let message = new Message('Pojištění bylo úspěšně odstraněno');
            }
        })
    }
}