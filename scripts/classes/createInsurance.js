import { PostAjax } from "../ajax/postAjax.js";
import { Information } from "./information.js";
import { InsurancePersonBox } from "./insurancePersonBox.js";
import { Message } from "./message.js";
import { SessionStorage } from "./sessionStorage.js";

/**
 * The class we use to create a dialog and its DOM model to create insurance.
 * The class also verifies the correctness of the inputs from the user and subsequently sends the values ​​from the inputs to the php file, where the values ​​are further processed.
 */
export class CreateInsurance {

    constructor() {
        // Field with values, for input with selection of insurance type
        this.insurances = ['Pojištění vozidla', 'Pojištění nemovitosti', 'Životní pojištění', 'Cestovní pojištění'];
    }

    /**
     * Method for the current month in numeric form
     * @param {number} m Month number counting from 0
     * @returns Current month number
     */
    getMonth(m) {
        m += 1;
        return m < 10 ? '0' + m : m;
    }

    /**
     * Creation of a DIV in which the insured can be selected
     * @returns DIV with your DOM model
     */
    createSelectInsuranceDiv() {
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
     * A method to create a dialog and its DOM model
     * @returns return element dialog
     */
    createDialog() {
        let today = new Date();
        today = today.getFullYear() + '-' + this.getMonth(today.getMonth()) + '-' + today.getDate();
        let dialog = document.createElement('dialog');
        let dialogInsured = document.createElement('div');
        let dialogImg = document.createElement('div');
        let img = document.createElement('img');
        let insuredInformation = document.createElement('div');
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

    /* Method for hover effect when clicking on policyholder selection in div .select-insurance */
    hoverEfect() {
        let selectInsurance = document.querySelector('.select-insurance');
        let selectInsurances = document.querySelector('.select-insurances');
        selectInsurance.addEventListener('click', function () {
            selectInsurances.style.visibility = 'visible';
            selectInsurances.style.opacity = '1';
            selectInsurance.childNodes[1].style.transform = 'rotate(180deg)';
        })
        selectInsurances.addEventListener('mouseleave', function () {
            selectInsurances.style.visibility = 'hidden';
            selectInsurances.style.opacity = '0';
            selectInsurance.childNodes[1].style.transform = 'rotate(0deg)';
        })
    }

    /* A method to insert an insurance type into a div with the .select-insurances class*/
    insetInsurance() {
        let selectInsurances = document.querySelector('.select-insurances');
        for (let oneInsurance of this.insurances) {
            let oneInsuranceDiv = document.createElement('div');
            oneInsuranceDiv.setAttribute('class', 'one-insurance');
            oneInsuranceDiv.innerHTML = oneInsurance;
            selectInsurances.append(oneInsuranceDiv);
        }
    }

    /* A method to capture the click on an insurance type in the Insurance Type entry in the dialog and then pasting it into the .selected-insurance div */
    selectInsurance() {
        // Capturing insurance type clicks from div .select-insuranes
        let allInsurances = document.querySelectorAll('.one-insurance');
        for (let i = 0; i < allInsurances.length; i++) {
            allInsurances[i].addEventListener('click', function (event) {
                document.querySelector('.selected-insurance').innerHTML = this.innerText;
                // The invisibility of div
                let selectInsurances = document.querySelector('.select-insurances');
                selectInsurances.style.visibility = 'hidden';
                selectInsurances.style.opacity = '0';
            })
        }
    }

    /* Method to remove the dialog */
    deleteDialog() {
        document.body.removeChild(document.querySelector('.insured-dialog'));
    }

    /* A method to display a dialog */
    showDialog() {
        let dialogUser = document.querySelector('.insured-dialog');
        dialogUser.showModal();
        this.hoverEfect();
        this.insetInsurance();
        this.selectInsurance();
    }

    /**
     * A method for styling an element when a form input is incorrectly entered
     * @param {string}      text    The text of the error message displayed by the user
     * @param {DOM element} model   Element for styling
     */
    controlInput(text, model) {
        let p = document.querySelector('.error-message');
        p.innerHTML = text;
        p.style.visibility = 'visible';
        document.querySelector(model).style.borderColor = '#FF5436';
    }

    /**
     * A method to style an element on correct input in a form.
     * @param {DOM element} model Element for styling
     */
    correctInput(model) {
        document.querySelector(model).style.borderColor = '#e2e2ff';
    }

    /**
     * A method to verify the correctness of filling in the input named typ
     * @returns If the input is filled correctly, the value of the input is returned. If the input is incorrect, the controlInput() method is called and false is returned.
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
     * A method for verifying the correctness of filling in the input named částka
     * @returns If the input is filled correctly, the value of the input is returned. If the input is incorrect, the controlInput() method is called and false is returned.
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
     * A method for verifying the correctness of filling in the input named pojištění
     * @returns If the input is filled correctly, the value of the input is returned. If the input is incorrect, the controlInput() method is called and false is returned.
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
     * A method for verifying the correctness of filling in the input named platné od
     * @returns If the input is filled correctly, the value of the input is returned. If the input is incorrect, the controlInput() method is called and false is returned.
     */
    inputValidFrom() {
        let value = document.querySelector('.insuranceValidFrom').value;
        if (value.length > 1) {
            this.correctInput('.insuranceValidFrom');
            return value;
        }
        else {
            this.controlInput('Neplatné údaje!', '.insuranceValidFrom');
            return false;
        }
    }

    /**
     * A method for verifying the correctness of filling in the input named platné do
     * @returns If the input is filled correctly, the value of the input is returned. If the input is incorrect, the controlInput() method is called and false is returned.
     */
    inputValidUntil() {
        let today = new Date();
        today = today.getFullYear() + '-' + this.getMonth(today.getMonth()) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());
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
     * Method for obtaining data about the insured from the database
     * @param {number} personID Insured ID
     * @returns Data from database
     */
    InsuranceFromDTB(personID) {
        // We create an object with the data passed in the method parameter
        let callDtbObject = {
            'ID': personID
        }
        // We will create a PostAjax object with the POST method and the path to the php file
        let postData = new PostAjax('POST', './php/personDataForInsurance.php', true);
        // We call the result method to send the data to the PHP file
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    /**
     * A method for working with data from a database
     * @param {number} personID Insured ID
     */
    control(personID) {
        //We call the InsuranceFromDTB method and in the parameter pass it the values ​​from the parameter of this method
        let dataDtb = this.InsuranceFromDTB(personID);
        dataDtb
            .then((result) => {
                // We insert the name into the div with the .personFirstName class
                let personFirstName = document.querySelector('.personFirstName');
                personFirstName.setAttribute('value', result[0].firstName);
                // We insert the last name into the div with the .personLastName class
                let personLastName = document.querySelector('.personLastName');
                personLastName.setAttribute('value', result[0].lastName);
            })
    }

    /**
     * A method to send data from a form to a database
     * @param {string} type         Type insurance
     * @param {string} amount       Ammount
     * @param {string} subject      Insurance object
     * @param {string} validFrom    Insurance valid from
     * @param {string} validUntil   Insurance valid until
     * @param {number} personID     Insured ID
     * @param {number} insurerID    Insurer ID
     * @returns Data from database
     */
    registerDataSend(type, amount, subject, validFrom, validUntil, personID, insurerID) {
        let callDtbObject = {
            'type': type,
            'amount': amount,
            'subject': subject,
            'validFrom': validFrom,
            'validUntil': validUntil,
            'personID': personID,
            'insurerID': insurerID
        }
        // We will create a PostAjax object with the POST method and the path to the php file
        let postData = new PostAjax('POST', './php/registerInsurance.php');
        // We call the result method to send the data to the PHP file
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    /**
     * A method for working with data from a form
     * @param {string} type         Type insurance
     * @param {string} amount       Ammount
     * @param {string} subject      Insurance object
     * @param {string} validFrom    Insurance valid from
     * @param {string} validUntil   Insurance valid until
     * @param {number} personID     Insured ID
     * @param {number} insurerID    Insurer ID
     * @param {number} page         Finding out what page the user is on. 1 - insurance section, 0 - insurance dialog
     */
    sendData(type, amount, subject, validFrom, validUntil, personID, insurerID, page) {
        if (type && amount && subject && validFrom && validUntil && personID && insurerID) {
            // We call the registerDataSend method with parameters from data from the form
            let dataDTB = this.registerDataSend(type, amount, subject, validFrom, validUntil, personID, insurerID);
            dataDTB.then(function (result) {
                // After sending the data from the form, we will remove the dialog
                document.querySelector('.insured-dialog').remove();
                // We will verify which page the user is on
                if (page) {
                    // We will remove all information boxes with insurance data
                    let infoBoxes = document.querySelectorAll('.information-box');
                    for (let oneBox of infoBoxes) {
                        oneBox.remove();
                    }
                    // We will remove the control buttons for pagination
                    document.querySelector('.control').remove();
                    // We will create a new object and it will rewrite all the insurance data to the page with the newly added insurance
                    let contentBox = new InsurancePersonBox();
                    contentBox.control();
                }
                else {
                    // We will remove all information boxes with insurance data
                    let infoBoxes = document.querySelectorAll('.information-box-dialog');
                    for (let oneBox of infoBoxes) {
                        oneBox.remove();
                    }
                    // If there are no paging buttons, the insured has no insurance and there is no need to delete the paging buttons. We only remove the .person-insurance text in div that the policyholder has no insurance
                    if (document.querySelector('.control-dialog')) {
                        document.querySelector('.control-dialog').remove();
                    }
                    else {
                        document.querySelector('.person-insurances').firstChild.remove();
                    }
                    // We will create a new object to obtain the policyholder's id from session storage
                    let sessionStorage = new SessionStorage();
                    // We will create a new object and it will rewrite all the insurance data in the dialog with the newly added insurance
                    let contentBox = new Information();
                    contentBox.control(sessionStorage.getSessionData())
                }
                // The object prints a confirmation message to the user
                let message = new Message('Pojištění bylo úspěšně vytvořeno');
            });
        }
    }

}