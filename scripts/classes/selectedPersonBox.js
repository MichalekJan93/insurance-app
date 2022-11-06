import { PostAjax } from "../ajax/postAjax.js";
import { SessionStorage } from "./sessionStorage.js";

/**
 * A class to create a dialog where we can select an insured to add his insurance
 */

export class SelectedPersonBox {

    /**
     * A method for creating a dialog and its element
     */
    createSelectedBox(){
        let selectedDialog = document.createElement('dialog');
        let paragraph = document.createElement('p');
        let selectPerson = document.createElement('div');
        let img = document.createElement('img');
        let selectedPerson = document.createElement('div');
        let selectPersons = document.createElement('div');
        let btn = document.createElement('input');
        let dialogOff = document.createElement('div');

        selectedDialog.setAttribute('class', 'selected-box');
        selectPerson.setAttribute('class', 'select-person');
        selectedPerson.setAttribute('class', 'selected-person');
        selectPersons.setAttribute('class', 'select-persons');
        dialogOff.setAttribute('class', 'dialog-off');
        img.setAttribute('src', 'img/arrow.png');
        img.setAttribute('alt', 'Vybrat uživatele, pojištění APP');
        btn.setAttribute('class', 'selected-button disabled');
        btn.setAttribute('type', 'button');
        btn.setAttribute('value', 'vybrat');

        btn.disabled = true;

        document.body.appendChild(selectedDialog);
        selectedDialog.appendChild(dialogOff);
        selectedDialog.appendChild(paragraph);
        selectedDialog.appendChild(selectPerson);
        selectPerson.appendChild(selectedPerson);
        selectPerson.appendChild(img);
        selectedDialog.appendChild(selectPersons);
        selectedDialog.appendChild(btn);

        paragraph.innerHTML = 'Vyberte pojištěnce';

    }

    /**
     * The method displays the registration dialog
     */
    showDialog(){
        let dialogSelectedPerson = document.querySelector('.selected-box');
        dialogSelectedPerson.showModal();
        this.hoverEfect();
    }

    /**
     * The method removes the dialog from the page
     */
    deleteDialog(){
        document.body.removeChild(document.querySelector('.selected-box'));
    }

    /**
     * Adding css hover for elemenet .select-persons
     */
    hoverEfect(){
        let selectPerson = document.querySelector('.select-person');
        let selectPersons = document.querySelector('.select-persons');
        selectPerson.addEventListener('click', function(){
            selectPersons.style.visibility = 'visible';
            selectPersons.style.opacity = '1';
            selectPerson.lastChild.style.transform = 'rotate(180deg)';
        })
        selectPersons.addEventListener('mouseleave', function(){
            selectPersons.style.visibility = 'hidden';
            selectPersons.style.opacity = '0';
            selectPerson.lastChild.style.transform = 'rotate(0deg)';
        })
    }

    /**
     * A method to send data from a form to a database
     * @returns Data from database 
     */
    dataFromDTB() {
        // We have empty properties in the object because we want to list all the users in the database from the database.
        let callDtbObject = { 
            'firstName' : '',
            'lastName' : '',
            'NIP' : ''
        }
        // We will create a PostAjax object with the POST method and the path to the php file
        let dtb = new PostAjax('POST', './php/wievInsuredPersonBox.php', true);
        // We call the result method to send the data to the PHP file
        let dataDTB = dtb.result(callDtbObject);
        return dataDTB;
    }

    /**
     * A method for working with data from a form
     */
    control() {
        // We send the insurer id to the registerDataSend method
        let dataDtb = this.dataFromDTB();
        let selectPersons = document.querySelector('.select-persons');
        selectPersons.innerHTML = '';
            let result = dataDtb.then(function (result) {
            for(let onePerson of result){
                let onePersonDiv = document.createElement('div');
                onePersonDiv.setAttribute('class', 'person user' + onePerson.id);
                onePersonDiv.innerHTML = onePerson.firstName + ' ' + onePerson.lastName;
                selectPersons.append(onePersonDiv);
            }

            // Let's catch a click on the policyholder from div .select-persons
            let allPersons = document.querySelectorAll('.person');
            for(let i = 0; i < allPersons.length; i++){
                allPersons[i].addEventListener('click', function(event){
                    document.querySelector('.selected-person').innerHTML = this.innerText;
                    let personID = this.getAttribute('class').substring(11,this.length);
                    // Removed div
                    let selectPersons = document.querySelector('.select-persons');
                    selectPersons.style.visibility = 'hidden';
                    selectPersons.style.opacity = '0';
                    let btn = document.querySelector('.selected-button');
                    btn.setAttribute('class','selected-button enabled');
                    btn.disabled = false;
                    // We create a SessionStorage object and add the id of the selected insured to the session storage
                    let sessionStorage = new SessionStorage();
                    sessionStorage.setSessionStorage(personID);
                })
            }
        })
    }
}