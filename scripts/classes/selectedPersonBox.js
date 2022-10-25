import { PostAjax } from "../ajax/postAjax.js";
import { SessionStorage } from "./sessionStorage.js";


export class SelectedPersonBox {

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

    showDialog(){
        let dialogSelectedPerson = document.querySelector('.selected-box');
        dialogSelectedPerson.showModal();
        this.hoverEfect();
    }

    deleteDialog(){
        document.body.removeChild(document.querySelector('.selected-box'));
    }

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

    /* Funkce pro ziskani dat z databaze */
    dataFromDTB() {
        // V objektu máme prázdne vlastnosti, protože chceme z databáze vypsat všechny uživatele nacházející se v databázi.
        let callDtbObject = { 
            'firstName' : '',
            'lastName' : '',
            'NIP' : ''
        }
        // Vytvoříme objekt PostAjax s metodou POST a trasou k souboru php
        let dtb = new PostAjax('POST', './php/wievInsuredPersonBox.php', true);
        // Zavoláme metodu AJAX pro odeslání dat do souboru PHP
        let dataDTB = dtb.result(callDtbObject);
        return dataDTB;
    }

    /* Funkce pro naplneni section information-boxy */
    control() {
        let dataDtb = this.dataFromDTB();
        let selectPersons = document.querySelector('.select-persons');
        selectPersons.innerHTML = '';
            let result = dataDtb.then(function (result) {
            for(let onePerson of JSON.parse(result)){
                let onePersonDiv = document.createElement('div');
                onePersonDiv.setAttribute('class', 'person user' + onePerson.id);
                onePersonDiv.innerHTML = onePerson.firstName + ' ' + onePerson.lastName;
                selectPersons.append(onePersonDiv);
            }

            /* Zachitime kliknuti na pojistnika z divu .select-persons */
            let allPersons = document.querySelectorAll('.person');
            for(let i = 0; i < allPersons.length; i++){
                allPersons[i].addEventListener('click', function(event){
                    document.querySelector('.selected-person').innerHTML = this.innerText;
                    let personID = this.getAttribute('class').substring(11,this.length);
                    /* Odstraneni divu */
                    let selectPersons = document.querySelector('.select-persons');
                    selectPersons.style.visibility = 'hidden';
                    selectPersons.style.opacity = '0';
                    let btn = document.querySelector('.selected-button');
                    btn.setAttribute('class','selected-button enabled');
                    btn.disabled = false;

                    let sessionStorage = new SessionStorage();
                    sessionStorage.setSessionStorage(personID);
                })
            }
        })
    }
}