import { PostAjax } from "../ajax/postAjax.js";
/**
 * Třída, která vytvoří DIV s informacemi o pojištěnci a jeho pojištění
 */
export class Information {

    /**
     * Metoda vytvoří dialog a elemnty v DOMu
     * @returns dialog
     */
    createDialog() {
        let dialog = document.createElement('dialog');
        let h2 = document.createElement('h2');
        let personNameParagraph = document.createElement('p');
        let divpersonData = document.createElement('div');
        let divPersonAddress = document.createElement('div');
        let personAddressFirstParagraph = document.createElement('p');
        let personAddressSecondParagraph = document.createElement('p');
        let divPersonContact = document.createElement('div');
        let personContactFirstParagraph = document.createElement('p');
        let personContactSecondParagraph = document.createElement('p');
        let divAddButton = document.createElement('div');
        let divAddButtonParagraph = document.createElement('p');
        let dialogOff = document.createElement('div');
        let subtitle = document.createElement('p');
        let divInsurances = document.createElement('div');

        dialog.setAttribute('class', 'infromation-person-dialog')
        h2.setAttribute('class', 'dialog-title');
        personNameParagraph.setAttribute('class', 'person-name');
        divpersonData.setAttribute('class', 'person-data');
        divPersonAddress.setAttribute('class', 'person-address');
        personAddressFirstParagraph.setAttribute('class', 'person-address-first-paragraph')
        personAddressSecondParagraph.setAttribute('class', 'person-address-second-paragraph')
        divPersonContact.setAttribute('class', 'person-contact');
        personContactFirstParagraph.setAttribute('class', 'personContactFirstParagraph');
        personContactSecondParagraph.setAttribute('class', 'personContactSecondParagraph');
        divAddButton.setAttribute('class', 'addButton-dialog');
        dialogOff.setAttribute('class', 'dialog-off');
        subtitle.setAttribute('class', 'subtitle');
        divInsurances.setAttribute('class', 'person-insurances');

        document.body.appendChild(dialog);
        dialog.appendChild(dialogOff);
        dialog.appendChild(h2);
        dialog.appendChild(personNameParagraph);
        dialog.appendChild(divpersonData);
        divpersonData.appendChild(divPersonAddress);
        divPersonAddress.appendChild(personAddressFirstParagraph);
        divPersonAddress.appendChild(personAddressSecondParagraph);
        divpersonData.appendChild(divPersonContact);
        divPersonContact.appendChild(personContactFirstParagraph);
        divPersonContact.appendChild(personContactSecondParagraph);
        divAddButton.appendChild(divAddButtonParagraph);
        dialog.appendChild(divAddButton);
        dialog.appendChild(subtitle);
        dialog.appendChild(divInsurances);

        h2.innerHTML = "Pojistník"
        divAddButtonParagraph.innerHTML = "Přidat pojištění"
        subtitle.innerHTML = "Seznam pojištění pojistníka"

        return dialog;
    }

    /**
     * Metoda pro zobrazení dialogu
     */
    showDialog() {
        let dialogUser = document.querySelector('.infromation-person-dialog');
        dialogUser.showModal();
    }

    /**
     * Metoda pro odstranění dialogu
     */
    deleteDialog() {
        document.body.removeChild(document.querySelector('.infromation-person-dialog'));
    }

    /**
     * Metoda pro získání dat o pojištěnci z databáze a jeho pojištění
     * @param {number} personID - id pojištěnce
     * @returns - data z databáze
     */
    InsuranceFromDTB(personID) {
        let callDtbObject = {
            'ID' : personID
        }
        // Vytvoříme objekt PostAjax s metodou POST a trasou k souboru php
        let postData = new PostAjax('POST', './php/wievInsurancePersonBox.php', true);
        // Zavoláme metodu AJAX pro odeslání dat do souboru PHP
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    /**
     * Metoda, která pracuje s daty o pojištěnci a jeho pojištění. Data následně vkládá do elemntů v DOMu od dialogu
     * @param {number} personID - id pojištěnce
     * @param {number} actuallyPageNumber - aktuální stránka v seznamu pojištění, na které se nacházíme
     */
    control(personID, actuallyPageNumber = 1) {
        //Odešleme id pojištění do metody InsuranceFromDTB
        let dataDtb = this.InsuranceFromDTB(personID);
        dataDtb.then(function (result) {
            // data z PHP souboru převedeme na JSON
            result = JSON.parse(result);
            // Datum narození převedeme na český formát
            let birthdate = new Date(result[0].birthdate);
            let month = birthdate.getMonth() + 1;
            birthdate = birthdate.getDate() + '.' + month + '.' + birthdate.getFullYear();

            // Data o užovateli vložíme do divů
            let personNameParagraph = document.querySelector('.person-name');
            let personAddressFirstParagraph = document.querySelector('.person-address-first-paragraph');
            let personAddressSecondParagraph = document.querySelector('.person-address-second-paragraph');
            let personContactFirstParagraph = document.querySelector('.personContactFirstParagraph');
            let personContactSecondParagraph = document.querySelector('.personContactSecondParagraph')

            personNameParagraph.innerHTML = result[0].firstName + ' ' + result[0].lastName;
            personAddressFirstParagraph.innerHTML = birthdate;
            personAddressSecondParagraph.innerHTML = result[0].address + ', ' + result[0].city + ', ' + result[0].NIP;
            personContactFirstParagraph.innerHTML = result[0].phone;
            personContactSecondParagraph.innerHTML = result[0].email;

            // Délka pole pro strankování. -1 protože v poli máme na indexu 0 informace o pojištěnci.
            let lengthDtb = result.length - 1;

            // Podle délky pole z DTB si uložíme do proměnné maximální počet stránek pro strankování
            let maxNumberPages = Math.ceil(lengthDtb / 3);
            let gridA = 0;
            let gridB = 1;
            let data = (actuallyPageNumber - 1) * 3;  

            /**
             * Funkce pro vytvoření divu o pojištění
             * @param {number} rowDtb - index pojištění v result 
             * @param {number} gridrowA - gridRow od
             * @param {number} gridrowB  - gridRow do
             */
            function createUserBox(rowDtb, gridrowA, gridrowB) {
                let divInsurances = document.querySelector('.person-insurances');
                let id = 'insurance' + result[rowDtb].id;

                let informationBox = document.createElement('div');
                informationBox.getAttribute('class');
                informationBox.setAttribute('class', 'information-box-dialog');
                informationBox.getAttribute('id');
                informationBox.setAttribute('id', id);
                informationBox.style.gridRow = gridrowA / gridrowB;
                divInsurances.appendChild(informationBox);

                let informationBoxOne = document.createElement('div');
                let informationBoxTwo = document.createElement('div');
                let informationBoxThree = document.createElement('div');
                let informationBoxFour = document.createElement('div');
                let informationBoxFive = document.createElement('div');
                let informationBoxSix = document.createElement('div');
                let informationBoxSixStatus = document.createElement('div');
                let informationBtns = document.createElement('div');
                let btnUpdate = document.createElement('div');
                let btnDelete = document.createElement('div');

                informationBoxOne.setAttribute('class', 'information-box-one');
                informationBoxTwo.setAttribute('class', 'information-box-two');
                informationBoxThree.setAttribute('class', 'information-box-three');
                informationBoxFour.setAttribute('class', 'information-box-four');
                informationBoxFive.setAttribute('class', 'information-box-five');
                informationBoxSix.setAttribute('class', 'information-box-six');
                informationBoxSixStatus.setAttribute('class', 'insurance-status');
                informationBtns.setAttribute('class', 'information-btns');
                btnUpdate.setAttribute('class', 'btn-update-dialog');
                btnDelete.setAttribute('class', 'btn-delete-dialog');

                // Datum převedeme na český formát
                let validFrom = new Date(result[rowDtb].validFrom);
                let monthFrom = validFrom.getMonth() + 1;
                let czValidFrom = validFrom.getDate() + '.' + monthFrom + '.' + validFrom.getFullYear();

                // Datum převedeme na český formát
                let validUntil = new Date(result[rowDtb].validUntil);
                let monthUntil = validUntil.getMonth() + 1;
                let czValidUntil = validUntil.getDate() + '.' + monthUntil + '.' + validUntil.getFullYear();

                // Data o pojištění vložíme do divů
                informationBoxOne.innerHTML = result[rowDtb].type;
                informationBoxTwo.innerHTML = result[rowDtb].subject;
                informationBoxThree.innerHTML = result[rowDtb].amount + ' Kč';
                informationBoxFour.innerHTML = czValidFrom;
                informationBoxFive.innerHTML = czValidUntil;

                // Pokud je pojištění stále aktivní k dnešnímu dni, tak přidáme divu .informationBoxSixStatus classu active, pokud už aktivní není, přidáme classu inactive.
                let today = new Date();
                today < validUntil ? informationBoxSixStatus.classList.add('active') : informationBoxSixStatus.classList.add('inactive');

                //Vše vložíme do divu .infromation-box
                divInsurances.appendChild(informationBox);
                informationBox.appendChild(informationBoxOne);
                informationBox.appendChild(informationBoxTwo);
                informationBox.appendChild(informationBoxThree);
                informationBox.appendChild(informationBoxFour);
                informationBox.appendChild(informationBoxFive);
                informationBox.appendChild(informationBoxSix);
                informationBoxSix.appendChild(informationBoxSixStatus);
                informationBox.appendChild(informationBtns);
                informationBtns.appendChild(btnUpdate);
                informationBtns.appendChild(btnDelete);
            }

            let control = document.createElement('div');
            let controlLeft = document.createElement('div');
            let controlRight = document.createElement('div');
            let pageNumber = document.createElement('div');

            // Funkce pro zobrazení tlačítek, pro strankování pojištění
            function showControlButton(){

                // Aktuální číslo stránky, vložíme do divu .page-number
                pageNumber.innerHTML = actuallyPageNumber;

                // Zobrazování ovládacích tlačítek pro strankování, podle toho kde se nachází uživatel.
                // Pokud se nachází na stránce, která je také poslední.
                if (actuallyPageNumber == maxNumberPages) {
                    // Pokud je maximální počet stránek pro zobrazení 1
                    if(maxNumberPages == 1){
                        controlRight.style.visibility = 'hidden';
                        controlRight.style.opacity = '0';
                        controlLeft.style.visibility = 'hidden';
                        controlLeft.style.opacity = '0';
                        pageNumber.style.visibility = 'visible';
                        pageNumber.style.opacity = '1';
                    }
                    else{
                        controlRight.style.visibility = 'hidden';
                        controlRight.style.opacity = '0';
                        controlLeft.style.visibility = 'visible';
                        controlLeft.style.opacity = '1';
                        pageNumber.style.visibility = 'visible';
                        pageNumber.style.opacity = '1';
                    }
                }
                // Pokud se nachází na stránce, ve které není žádné pojištění
                else if (maxNumberPages == 0) {
                    controlRight.style.visibility = 'hidden';
                    controlRight.style.opacity = '0';
                    controlLeft.style.visibility = 'hidden';
                    controlLeft.style.opacity = '0';
                    pageNumber.style.visibility = 'visible';
                    pageNumber.style.opacity = '1';

                    // Vypíšeme informaci uživateli, že pojištěnec, nemá sjednané žádné pojištění
                    let divInsurances = document.querySelector('.person-insurances');
                    divInsurances.innerHTML = '<p>Pojistník, nemá sjednané žádné pojištění.....</p>';
                }
                // Pokud je maximální počet stránek pro zobrazení roven 1
                else if (actuallyPageNumber == 1) {
                    controlRight.style.visibility = 'visible';
                    controlRight.style.opacity = '1';
                    controlLeft.style.visibility = 'hidden';
                    controlLeft.style.opacity = '0';
                    pageNumber.style.visibility = 'visible';
                    pageNumber.style.opacity = '1'; 
                }
                // Pokud se nachází na stráne o pojištění větší než jedna a také se nejedná o poslední stránku.
                else if (actuallyPageNumber > 1 && actuallyPageNumber != maxNumberPages) {
                    controlRight.style.visibility = 'visible';
                    controlRight.style.opacity = '1';
                    controlLeft.style.visibility = 'visible';
                    controlLeft.style.opacity = '1';
                    pageNumber.style.visibility = 'visible';
                    pageNumber.style.opacity = '1';
                }
            }

            /**
             * Funkce pro vytvoření tlačítek pro stránkování
             * @param {number} gridA - gridRow od
             * @param {number} gridB - gridRow do
             */
            function createControlButtons(gridA, gridB) {
                let divInsurances = document.querySelector('.person-insurances');
                control.getAttribute('class');
                control.setAttribute('class', 'control-dialog');
                control.style.gridRow = gridA + '/' + gridB;
                divInsurances.appendChild(control);

                controlLeft.setAttribute('class', 'control-left-dialog');
                controlRight.setAttribute('class', 'control-right-dialog');
                pageNumber.setAttribute('class', 'page-number');

                control.appendChild(controlLeft);
                control.appendChild(pageNumber);
                control.appendChild(controlRight);

                showControlButton();
            }

            /**
             * Funkce pro odeslání aktuálních dat do funkce createUserBox
             */
            function insertDataToFunction(){
                // Nastavíme proměnnou, která bude uchovávat maximální hodnotu indexu pro výpis dat z databáze
                let maxValues = data + 3; 
                // Pokud proměnna pro uchovávání maximálního indexu bude větší než celková délka pole dat z databáze, tak se proměnna přepíše na délku pole z databáze. Ošetření: voláni hodnot na neexistujícím indexu pole.
                maxValues > lengthDtb ? maxValues = lengthDtb : maxValues = maxValues;

                // Cyklus pro vytváření divu pojištění
                for (let i = data + 1; i <= maxValues; i++) {
                    createUserBox(i, gridA, gridB);
                    gridA++;
                    gridB++;
                }
            }

            insertDataToFunction();

            let informationBox = document.createElement('div');

            //Pokud se do stránky propíše aspoň jedeno pojištění z databáze vytvoří se šipky pro stránkování
            if (informationBox) {
                createControlButtons(gridA, gridB);
            }

            // Zachycení kliknutí na tlačítka pro strankování
            let buttonRight = document.querySelector('.control-right-dialog');
            let buttonLeft = document.querySelector('.control-left-dialog');

            //Zachycení kliknutí na tlačítko doprava
            if(buttonRight){
                buttonRight.addEventListener('click', () =>{
                    let box = document.querySelectorAll('.information-box-dialog');
                    // Vymažeme stávající data na stránce
                    for(let oneBoxe of box){
                        oneBoxe.remove();
                    }

                    //Zvýšíme hodnotu aktuální stránky o jednu
                    actuallyPageNumber ++;

                    // Zavoláme funkci pro vypsání dalších dat z databáze
                    data += 3
                    gridA = 0;
                    gridB = 1;
                    insertDataToFunction();
                    showControlButton();
                })
            }

            //Zachycení kliknutí na tlačítko doleva
            if(buttonLeft){
                buttonLeft.addEventListener('click', () =>{
                    let box = document.querySelectorAll('.information-box-dialog');
                    // Vymažeme stávající data na stránce
                    for(let oneBoxe of box){
                        oneBoxe.remove();
                    }

                    //Snížíme hodnotu aktuální stránky o jednu
                    actuallyPageNumber --;

                    // Zavoláme funkci pro vypsání dalších dat z databáze
                    data -= 3
                    gridA = 0;
                    gridB = 1;
                    insertDataToFunction();
                    showControlButton();
                })
            }
        })
    }
}