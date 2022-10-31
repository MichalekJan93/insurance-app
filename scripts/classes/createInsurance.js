import { PostAjax } from "../ajax/postAjax.js";
import { Information } from "./information.js";
import { InsurancePersonBox } from "./insurancePersonBox.js";
import { Message } from "./message.js";
import { SessionStorage } from "./sessionStorage.js";

/**
 * Třída, pomocí, které vytváříme dialog a jeho model DOM pro vytvoření pojištění.
 * Třída také ověřuje správnost vstupů od uživatele a následně hodnoty ze vstupů odesílá do souboru php, kde jsou hodnoty dále spracovávány.
 */
export class CreateInsurance{

    constructor(){
        // Pole s hodnotami, pro input s výběrem typu pojištění.
        this.insurances = ['Pojištění vozidla', 'Pojištění nemovitosti', 'Životní pojištění', 'Cestovní pojištění'];
    }

    /**
     * Metoda pro aktuální měsíc v číselné formě
     * @param {number} m - číslo měsíce počítané od 0
     * @returns - aktuální číslo měsíce
     */
    getMonth(m){
        m += 1;
        return m<10? '0'+m:m;
    }

    /**
     * Vytvoření divu pro výběr pojistníka.
     * @returns div s jeho odelem DOM
     */
    createSelectInsuranceDiv(){
        let selectInsurance = document.createElement('div');
        let img = document.createElement('img');
        let selectedInsurance = document.createElement('div');
        let selectInsurances = document.createElement('div');

        selectInsurance.setAttribute('class', 'select-insurance');
        selectedInsurance.setAttribute('class', 'selected-insurance');
        selectInsurances.setAttribute('class', 'select-insurances');

        img.setAttribute('src', 'img/arrow.png');
        img.setAttribute('alt', 'Vybrat uživatele, pojištění APP');

        selectInsurance.appendChild(selectedInsurance);
        selectInsurance.appendChild(img);
        selectInsurance.appendChild(selectInsurances);

        return selectInsurance;
    }

    /**
     * Metoda pro vytvoření dialogu a jeho modelu DOM
     * @returns vrátí kompletní element dialog
     */
    createDialog() {
        let today = new Date();
        today = today.getFullYear() + '-' + this.getMonth(today.getMonth()) + '-' + today.getDate();
        let dialog = document.createElement('dialog');
        let dialogInsured = document.createElement('div');
        let dialogImg = document.createElement('div');
        let img = document.createElement('img');
        let insuredInformation= document.createElement('div');
        let dialogTitle = document.createElement('h2');
        let form = document.createElement('form');
        let dialogOff = document.createElement('div');
        let formParagraphOne = document.createElement('p');
        let errorMessage = document.createElement('p');

        let personalInformation = document.createElement('div');
        let formSpanOneBlockFirst = document.createElement('span');
        let labelFirstName = document.createElement('label');
        let inputFirstName = document.createElement('input');

        let formSpanOneBlockSecond = document.createElement('span');
        let labelLastName = document.createElement('label');
        let inputLastName = document.createElement('input');

        let formParagraphTwo = document.createElement('p');

        let insuredFirst = document.createElement('div');
        let insuredSecond = document.createElement('div');
        let formSpanOneBlockThird = document.createElement('span');
        let labelType = document.createElement('label');

        let formSpanOneBlockObject = document.createElement('span');
        let labelObject = document.createElement('label');
        let inputObject = document.createElement('input');

        let formSpanOneBlockFourth = document.createElement('span');
        let labelAmount = document.createElement('label');
        let inputAmount = document.createElement('input');

        let formSpanOneBlockFifth = document.createElement('span');
        let labelValidFrom = document.createElement('label');
        let inputValidFrom = document.createElement('input');

        let formSpanOneBlockSixth = document.createElement('span');
        let labelValidUntil = document.createElement('label');
        let inputValidUntil = document.createElement('input');

        let button = document.createElement('input');

        dialog.setAttribute('class', 'insured-dialog');
        dialogInsured.setAttribute('class', 'dialog-insurance dialog')
        dialogImg.setAttribute('class', 'dialog-img');
        img.setAttribute('src', './img/insured.jpg');
        img.setAttribute('alt', 'User registration, pojisteni app');
        insuredInformation.setAttribute('class', 'insured-information');
        dialogOff.setAttribute('class', 'dialog-off');
        errorMessage.setAttribute('class', 'error-message');
        dialogTitle.setAttribute('class', 'dialog-title');
        form.setAttribute('class', 'section-form');
        personalInformation.setAttribute('class', 'personal-information');

        formSpanOneBlockFirst.setAttribute('class', 'one-block');
        inputFirstName.setAttribute('type', 'text');
        inputFirstName.setAttribute('name', 'firstName');
        inputFirstName.setAttribute('class', 'personFirstName');
        inputFirstName.setAttribute('disabled', '');

        formSpanOneBlockSecond.setAttribute('class', 'one-block');
        inputLastName.setAttribute('type', 'text');
        inputLastName.setAttribute('name', 'lastName');
        inputLastName.setAttribute('class', 'personLastName');
        inputLastName.setAttribute('disabled', '');

        insuredFirst.setAttribute('class', 'insured-info');
        insuredSecond.setAttribute('class', 'insured-info');
        formSpanOneBlockThird.setAttribute('class', 'one-block');

        formSpanOneBlockObject.setAttribute('class', 'one-block');
        inputObject.setAttribute('type', 'text');
        inputObject.setAttribute('name', 'object');
        inputObject.setAttribute('class', 'insuranceObject');

        formSpanOneBlockFourth.setAttribute('class', 'one-block');
        inputAmount.setAttribute('type', 'number');
        inputAmount.setAttribute('name', 'insuranceAmount');
        inputAmount.setAttribute('class', 'insuranceAmount');
        inputAmount.setAttribute('value', '0');

        formSpanOneBlockFifth.setAttribute('class', 'one-block');
        inputValidFrom.setAttribute('name', 'insuranceValidFrom');
        inputValidFrom.setAttribute('class', 'insuranceValidFrom');
        inputValidFrom.setAttribute('type', 'date');
        inputValidFrom.setAttribute('disabled', '');
        inputValidFrom.value = today;

        formSpanOneBlockSixth.setAttribute('class', 'one-block');
        inputValidUntil.setAttribute('type', 'date');
        inputValidUntil.setAttribute('name', 'insuranceValidUntil');
        inputValidUntil.setAttribute('class', 'insuranceValidUntil');

        button.setAttribute('class', 'btn-send-data');
        button.setAttribute('type', 'button');
        button.setAttribute('value', 'Uložit');

        dialogTitle.innerHTML = 'Registrace pojištění';
        formParagraphOne.innerHTML = 'Osobní informace';
        labelFirstName.innerHTML = 'Jméno';
        labelLastName.innerHTML = 'Příjmení';
        formParagraphTwo.innerHTML = 'Informace o pojištění';
        labelType.innerHTML = 'Typ pojištění';
        labelObject.innerHTML = 'Objekt pojištění'
        labelAmount.innerHTML = 'Částka';
        labelValidFrom.innerHTML = 'Platné od';
        labelValidUntil.innerHTML = 'Platné do';

        document.body.appendChild(dialog);
        dialog.appendChild(dialogInsured)
        dialogInsured.appendChild(dialogImg);
        dialogImg.appendChild(img);
        dialogInsured.appendChild(insuredInformation);
        insuredInformation.appendChild(dialogOff);
        insuredInformation.appendChild(dialogTitle);
        insuredInformation.appendChild(form);
        form.appendChild(formParagraphOne);
        form.appendChild(personalInformation);
        personalInformation.appendChild(formSpanOneBlockFirst);
        formSpanOneBlockFirst.appendChild(labelFirstName);
        formSpanOneBlockFirst.appendChild(inputFirstName);
        personalInformation.appendChild(formSpanOneBlockSecond);
        formSpanOneBlockSecond.appendChild(labelLastName);
        formSpanOneBlockSecond.appendChild(inputLastName);

        form.appendChild(formParagraphTwo);
        form.appendChild(insuredFirst);
        form.appendChild(insuredSecond);
        insuredFirst.appendChild(formSpanOneBlockThird);
        formSpanOneBlockThird.appendChild(labelType);
        formSpanOneBlockThird.appendChild(this.createSelectInsuranceDiv());
        insuredFirst.appendChild(formSpanOneBlockObject);
        formSpanOneBlockObject.appendChild(labelObject);
        formSpanOneBlockObject.appendChild(inputObject);
        insuredFirst.appendChild(formSpanOneBlockFourth);
        formSpanOneBlockFourth.appendChild(labelAmount);
        formSpanOneBlockFourth.appendChild(inputAmount);
        insuredSecond.appendChild(formSpanOneBlockFifth);
        formSpanOneBlockFifth.appendChild(labelValidFrom);
        formSpanOneBlockFifth.appendChild(inputValidFrom);
        insuredSecond.appendChild(formSpanOneBlockSixth);
        formSpanOneBlockSixth.appendChild(labelValidUntil);
        formSpanOneBlockSixth.appendChild(inputValidUntil);
        form.appendChild(errorMessage);
        form.appendChild(button);

        inputValidFrom.valueAsDate = new Date();

        return dialog;
    }

    /* Metoda pro hover efekt při kliknutí na výběr pojstníka v divu .select-insurance */
    hoverEfect(){
        let selectInsurance = document.querySelector('.select-insurance');
        let selectInsurances = document.querySelector('.select-insurances');
        selectInsurance.addEventListener('click', function(){
            selectInsurances.style.visibility = 'visible';
            selectInsurances.style.opacity = '1';
            selectInsurance.childNodes[1].style.transform = 'rotate(180deg)';
        })
        selectInsurances.addEventListener('mouseleave', function(){
            selectInsurances.style.visibility = 'hidden';
            selectInsurances.style.opacity = '0';
            selectInsurance.childNodes[1].style.transform = 'rotate(0deg)';
        })
    }

    /* Metoda pro vložení typu pojištění do divu s třídou .select-insurances*/
    insetInsurance(){
        let selectInsurances = document.querySelector('.select-insurances');
        for(let oneInsurance of this.insurances){
            let oneInsuranceDiv = document.createElement('div');
            oneInsuranceDiv.setAttribute('class', 'one-insurance');
            oneInsuranceDiv.innerHTML = oneInsurance;
            selectInsurances.append(oneInsuranceDiv);
        }
    }

    /* Metoda pro zachyceni kliknuti na typ pojištění ve vstupu Typ pojištění v dialogu a jeho následném vložení do divu .selected-insurance*/
    selectInsurance(){
        /* Zachycení kliknutí na typ pojištění z divu .select-insuranes */
        let allInsurances = document.querySelectorAll('.one-insurance');
        for(let i = 0; i < allInsurances.length; i++){
            allInsurances[i].addEventListener('click', function(event){
                document.querySelector('.selected-insurance').innerHTML = this.innerText;
                // Zneviditelnění divu
                let selectInsurances = document.querySelector('.select-insurances');
                selectInsurances.style.visibility = 'hidden';
                selectInsurances.style.opacity = '0';
            })
        }
    }

    /* Metoda pro odstranění dialogu */
    deleteDialog() {
        document.body.removeChild(document.querySelector('.insured-dialog'));
    }

    /* Metoda pro zobrazení dialogu */
    showDialog() {
        let dialogUser = document.querySelector('.insured-dialog');
        dialogUser.showModal();
        this.hoverEfect();
        this.insetInsurance();
        this.selectInsurance();
    }

    /**
     * Metoda pro stylování elementu při špatně zadaném vstupu do formuláře.
     * @param {string} text - text chybové hlášky, zobrazené uživateli
     * @param {DOM element} model - element pro stylování
     */
    controlInput(text, model) {
        let p = document.querySelector('.error-message');
        p.innerHTML = text;
        p.style.visibility = 'visible';
        document.querySelector(model).style.borderColor = '#FF5436';
    }

    /**
     * Metoda pro stylování elementu při správném vstupu ve formuláři.
     * @param {DOM element} model - element pro stylování 
     */
    correctInput(model) {
        document.querySelector(model).style.borderColor = '#e2e2ff';
    }

    /**
     * Metoda pro ověření správnosti vyplnění vstupu s názvem typ
     * @returns při správném vyplnění vstupu se vrátí hodnota vstupu. Při nesprávném vstupu se zavolá metoda controlInput() a vrátí se false.
     */
    inputType() {
        let value = document.querySelector('.selected-insurance').innerText;
        let selectInsurance = document.querySelector('.select-insurance');
        if (value.length > 1) {
            this.correctInput('.select-insurance');
            return value;
        }
        else {
            this.controlInput('Neplatné údaje!', '.select-insurance');
            return false;
        }
    }

    /**
     * Metoda pro ověření správnosti vyplnění vstupu s názvem částka
     * @returns při správném vyplnění vstupu se vrátí hodnota vstupu. Při nesprávném vstupu se zavolá metoda controlInput() a vrátí se false.
     */
    inputAmount() {
        let correctValue = document.querySelector('.insuranceAmount').value;
        if (correctValue > 0) {
            this.correctInput('.insuranceAmount');
            return correctValue;
        }
        else {
            this.controlInput('Neplatné údaje!', '.insuranceAmount');
            return false;
        }
    }

    /**
     * Metoda pro ověření správnosti vyplnění vstupu s názvem objekt pojištění
     * @returns při správném vyplnění vstupu se vrátí hodnota vstupu. Při nesprávném vstupu se zavolá metoda controlInput() a vrátí se false.
     */
    inputObject() {
        let value = document.querySelector('.insuranceObject').value.trim();
        let correctValue = value.charAt(0).toUpperCase() + value.slice(1);
        if (value.length > 1) {
            this.correctInput('.insuranceObject');
            return correctValue;
        }
        else {
            this.controlInput('Neplatné údaje!', '.insuranceObject');
            return false;
        }
    }

    /**
     * Metoda pro ověření správnosti vyplnění vstupu s názvem platné od
     * @returns při správném vyplnění vstupu se vrátí hodnota vstupu. Při nesprávném vstupu se zavolá metoda controlInput() a vrátí se false.
     */
    inputValidFrom() {
        let value = document.querySelector('.insuranceValidFrom').value;
        if (value.length > 1 ) {
            this.correctInput('.insuranceValidFrom');
            return value;
        }
        else {
            this.controlInput('Neplatné údaje!', '.insuranceValidFrom');
            return false;
        }
    }

    /**
     * Metoda pro ověření správnosti vyplnění vstupu s názvem platné do
     * @returns při správném vyplnění vstupu se vrátí hodnota vstupu. Při nesprávném vstupu se zavolá metoda controlInput() a vrátí se false.
     */
    inputValidUntil() {
        let today = new Date();
        today = today.getFullYear() + '-' + this.getMonth(today.getMonth()) + '-' + (today.getDate()<10 ? '0' + today.getDate() : today.getDate());
        let value = document.querySelector('.insuranceValidUntil').value;
        if (value.length > 1 && value > today) {
            this.correctInput('.insuranceValidUntil');
            return value;
        }
        else {
            this.controlInput('Neplatné údaje!', '.insuranceValidUntil');
            return false;
        }
    }

    /**
     * Metoda pro získání dat o pojištěnci z databáze
     * @param {number} personID - id pojištěnce
     * @returns - data z databáze
     */
    InsuranceFromDTB(personID) {
        let callDtbObject = {
            'ID' : personID
        }
        // Vytvoříme objekt PostAjax s metodou POST a trasou k souboru php
        let postData = new PostAjax('POST', './php/personDataForInsurance.php', true);
        // Zavoláme metodu AJAX pro odeslání dat do souboru PHP
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    /**
     * Asynchornní metoda pro práci s daty z databáze
     * @param {number} personID - ID pojištěnce
     */
    control(personID){
        //Odešleme id pojištění do metody InsuranceFromDTB
        let dataDtb = this.InsuranceFromDTB(personID);
        dataDtb
            .then((result) => {
                //Jmené vložíme do divu s třídou .personFirstName
                let personFirstName = document.querySelector('.personFirstName');
                personFirstName.setAttribute('value', result[0].firstName);
                //Příjmeni vložíme do divu s třídou .personLastName
                let personLastName = document.querySelector('.personLastName');
                personLastName.setAttribute('value', result[0].lastName);
            })
    }

    /**
     * Metoda pro odeslání dat z formuláře do databáze
     * @param {string} type - typ pojištění
     * @param {string} amount - častka 
     * @param {string} subject - objekt pojištění
     * @param {string} validFrom - platnost pojištění od
     * @param {string} validUntil - platnost pojištění do
     * @param {number} personID - id pojištěnce
     * @param {number} insurerID - id pojistitele
     * @returns data z php souboru
     */
    registerDataSend(type, amount, subject, validFrom, validUntil, personID, insurerID) {
        let callDtbObject = {
            'type' : type,
            'amount' : amount,
            'subject' : subject,
            'validFrom' : validFrom,
            'validUntil' : validUntil,
            'personID' : personID,
            'insurerID' : insurerID
        }
        // Vytvoříme objekt PostAjax s metodou POST a trasou k souboru php
        let postData = new PostAjax('POST', './php/registerInsurance.php');
        // Zavoláme metodu AJAX pro odeslání dat do souboru PHP
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    /**
     * Metoda pro práci s daty z formuláře
     * @param {string} type - typ pojištění
     * @param {string} amount - častka
     * @param {string} subject - objekt pojištění
     * @param {string} validFrom - platnost pojištění od
     * @param {string} validUntil - platnost pojištění do
     * @param {number} personID - id pojištěnce
     * @param {number} insurerID - id pojistitele
     * @param {number} page - Zjištění na jaké stránce se uživatel nachází. 1 - section pojištění, 0 - dialog pojištění
     */
    sendData(type, amount, subject, validFrom, validUntil, personID, insurerID, page) {
        if (type && amount && subject && validFrom && validUntil && personID && insurerID) {
            //Zavoláme metodu registerDataSend s parametry z dat z formuláře
            let dataDTB = this.registerDataSend(type, amount, subject, validFrom, validUntil, personID, insurerID);
            dataDTB.then(function (result) {
                //Po odeslání dat z formuláře, odstraníme dialog
                document.querySelector('.insured-dialog').remove();
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
                    contentBox.control();
                }
                else{
                    //Odstraníme všechny information-boxy s daty o pojištění
                    let infoBoxes = document.querySelectorAll('.information-box-dialog');
                    for (let oneBox of infoBoxes) {
                        oneBox.remove();
                    }
                    //Pokud neexistují tlačítka pro strankování, tak pojištěnec nemá sjednané žádné pojištění a není třeba mazat tlačítka pro strankování. Odstraníme jen v divu .person-insurance text, že pojistník nemá sjednané žádné pojištění
                    if(document.querySelector('.control-dialog')){
                        document.querySelector('.control-dialog').remove();  
                    }
                    else{
                        document.querySelector('.person-insurances').firstChild.remove();
                    }
                    //Vytvoříme nový objekt pro ziskání id pojištěnce ze session storage
                    let sessionStorage = new SessionStorage();
                    //Vytvoříme nový objekt a vypíše znovu všechna data o pojištění do dialogu i s nově přidaným pojištěním
                    let contentBox = new Information();
                    contentBox.control(sessionStorage.getSessionData())
                }
                // Vypíše potvrzovací zprávu uživateli
                let message = new Message('Pojištění bylo úspěšně vytvořeno');
            });
        }
    }

}