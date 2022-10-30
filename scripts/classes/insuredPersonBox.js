import { PostAjax } from "../ajax/postAjax.js";

/**
 * Třída která vytvoří section s daty o pojištěncích
 */
export class InsuredPersonBox{

    constructor() {
        this.filterNames = ['filterName', 'filterSurname', 'filterNIP'];
        this.filterClass = ['filterName', 'filterSurname', 'filterNIP'];
        this.filterPlaceHolders = ['Jméno', 'Příjmení', 'PSČ'];
    }

    /**
     * Metoda pro vytvoření titlku v section
     * @param {string} title - titulek
     * @returns div
     */
    createTitle(title) {
        let titleName = document.createElement('div');
        titleName.getAttribute('class');
        titleName.setAttribute('class', 'section-name');
        titleName.innerHTML = title;
        return titleName;
    }

    /**
     * Metoda pro vytoření tlačítka pro přidání pojištěnce do databáze
     * @returns div
     */
    createButton() {
        let btn = document.createElement('div');
        let paragraph = document.createElement('p');
        btn.getAttribute('class');
        btn.setAttribute('class', 'addButton');
        paragraph.innerText = 'Přidat pojištěnce';
        btn.appendChild(paragraph);
        return btn;
    }

    /**
     * Funkce pro vytvoření filtrů, pro filtrování pojištěnce
     * @returns div
     */
    createFilters() {
        let filterDiv = document.createElement('div');
        filterDiv.getAttribute('class');
        filterDiv.setAttribute('class', 'filter');

        //Cyklis, pro vytvoření inputu pro filtrování
        for (let i = 0; i < parseInt(this.filterNames.length); i++) {
            let input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('class', 'filter-input ' + this.filterClass[i]);
            input.setAttribute('name', this.filterNames[i]);
            input.setAttribute('placeholder', this.filterPlaceHolders[i]);
            filterDiv.appendChild(input);
        }
        return filterDiv;
    }

    /**
     * Metoda, která odešle data o pojištěnci do databáze
     * @param {string} firstName - jméno pojištěnce
     * @param {string} lastName - příjmení pojištěnce
     * @param {number} NIP - PSČ pojištěnce
     * @returns data z databáze
     */
    dataFromDTB(firstName, lastName, NIP) {
        let callDtbObject = {
            'firstName' : firstName,
            'lastName' : lastName,
            'NIP' : NIP
        }
        // Vytvoříme objekt PostAjax s metodou POST a trasou k souboru php
        let dtb = new PostAjax('POST', './php/wievInsuredPersonBox.php', true);
        // Zavoláme metodu AJAX pro odeslání dat do souboru PHP
        let dataDTB = dtb.result(callDtbObject);
        return dataDTB;
    }

    /**
     * Metoda pro práci s daty z databáze
     * @param {number} actuallyPageNumber - aktuální stránka v seznamu pojištěnců, na které se uživatel nachází
     * @param {string} firstName - jméno pojištěnce
     * @param {string} lastName - příjmení pojištěnce 
     * @param {number} NIP - PSČ pojištěnce
     */
    control(actuallyPageNumber = 1, firstName = '', lastName = '', NIP = '') {
        //Index od kterého se mají vypsat data do seznamu z result
        let data = (actuallyPageNumber - 1) * 5;
        //Odešleme jméno, příjmení a PSČ pojištěnce do metody InsuranceFromDTB
        let dataDtb = this.dataFromDTB(firstName, lastName, NIP);
        let maxNumberPages;
        let control = document.createElement('div');
        let controlLeft = document.createElement('div');
        let controlRight = document.createElement('div');
        let pageNumber = document.createElement('div');

        dataDtb.then(function (result) {
            // Délka pole z DTB
            let lengthDtb = result.length;
            //Maximální počet stránek
            maxNumberPages = Math.ceil(lengthDtb / 5);
            let gridA = 4;
            let gridB = 5;

            /**
             * Funkce pro vytvoření divu o pojištění
             * @param {number} rowDtb - index pojištění v result
             * @param {number} gridrowA - gridRow od
             * @param {number} gridrowB  - gridRow do
             */
            function createUserBox(rowDtb, gridrowA, gridrowB) {
                    let section = document.querySelector('.section');
                    let id = 'user' + result[rowDtb].id;
                    let informationBox = document.createElement('div');
                    informationBox.getAttribute('class');
                    informationBox.setAttribute('class', 'information-box');
                    informationBox.getAttribute('id');
                    informationBox.setAttribute('id', id);
                    informationBox.style.gridRow = gridrowA / gridrowB;
                    section.appendChild(informationBox);

                    let informationBoxOne = document.createElement('div');
                    let informationBoxTwo = document.createElement('div');
                    let informationBoxThree = document.createElement('div');

                    informationBoxOne.getAttribute('class');
                    informationBoxTwo.getAttribute('class');
                    informationBoxThree.getAttribute('class');

                    informationBoxOne.setAttribute('class', 'information-box-one');
                    informationBoxTwo.setAttribute('class', 'information-box-two');
                    informationBoxThree.setAttribute('class', 'information-box-three');

                    informationBoxOne.innerHTML = result[rowDtb].firstName;
                    informationBoxTwo.innerHTML = result[rowDtb].lastName;
                    informationBoxThree.innerHTML = result[rowDtb].NIP;

                    informationBox.appendChild(informationBoxOne);
                    informationBox.appendChild(informationBoxTwo);
                    informationBox.appendChild(informationBoxThree);

                    let informationBtns = document.createElement('div');
                    informationBtns.getAttribute('class');
                    informationBtns.setAttribute('class', 'information-btns');
                    informationBox.appendChild(informationBtns);

                    let btnInformation = document.createElement('div');
                    let btnUpdate = document.createElement('div');
                    let btnDelete = document.createElement('div');

                    btnInformation.getAttribute('class');
                    btnUpdate.getAttribute('class');
                    btnDelete.getAttribute('class');

                    btnInformation.setAttribute('class', 'btn-information');
                    btnUpdate.setAttribute('class', 'btn-update');
                    btnDelete.setAttribute('class', 'btn-delete');

                    informationBtns.appendChild(btnInformation);
                    informationBtns.appendChild(btnUpdate);
                    informationBtns.appendChild(btnDelete);
            }

            // Funkce pro zobrazení tlačítek, pro strankování pojištění
            function showControlButton(){

                // Aktuální číslo stránky, vložíme do divu .page-number
                pageNumber.innerHTML = actuallyPageNumber;

                // Zobrazování ovládacích tlačítek pro strankování, podle toho kde se nachází uživatel.
                // Pokud se nachází na stránce, ve které není žádné pojištění
                if(maxNumberPages == 0){
                    controlRight.style.visibility = 'hidden';
                    controlRight.style.opacity = '0';
                    controlLeft.style.visibility = 'hidden';
                    controlLeft.style.opacity = '0';
                    pageNumber.style.visibility = 'visible';
                    pageNumber.style.opacity = '1';
                }
                // Pokud se nachází na stránce, která je také poslední.
                else if (actuallyPageNumber == maxNumberPages) {
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
             */
            function createControlButtons() {
                let section = document.querySelector('.section');
                control.getAttribute('class');
                control.setAttribute('class', 'control');
                section.appendChild(control);

                controlLeft.getAttribute('class');
                controlRight.getAttribute('class');
                pageNumber.getAttribute('class');
                controlLeft.setAttribute('class', 'control-left');
                controlRight.setAttribute('class', 'control-right');
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
                let maxValues = data + 5; 
                // Pokud proměnna pro uchovávání maximálního indexu bude větší než celková délka pole dat z databáze, tak se proměnna přepíše na délku pole z databáze. Ošetření: voláni hodnot na neexistujícím indexu pole.
                maxValues > lengthDtb ? maxValues = lengthDtb : maxValues = maxValues;

                // Cyklus pro vytváření divu pojištěnce
                for (let i = data; i < maxValues; i++) {
                    createUserBox(i, gridA, gridB);
                    gridA++;
                    gridB++;
                }
            }

            insertDataToFunction();

            let informationBox = document.createElement('div');

            //Pokud se do stránky propíše aspoň jeden pojištěnec z databáze vytvoří se šipky pro stránkování
            if (informationBox) {
                createControlButtons();
            }

            // Zachycení kliknutí na tlačítka pro strankování
            let buttonRight = document.querySelector('.control-right');
            let buttonLeft = document.querySelector('.control-left');

            //Zachycení kliknutí na tlačítko doprava
            if(buttonRight){
                buttonRight.addEventListener('click', () =>{
                    let box = document.querySelectorAll('.information-box');
                    // Vymažeme stávající data na stránce
                    for(let oneBoxe of box){
                        oneBoxe.remove();
                    }

                    //Zvýšíme hodnotu aktuální stránky o jednu
                    actuallyPageNumber ++;

                    // Zavoláme funkci pro vypsání dalších dat z databáze
                    data += 5
                    gridA = 4;
                    gridB = 5;
                    insertDataToFunction();
                    showControlButton();
                })
            }

            //Zachycení kliknutí na tlačítko doleva
            if(buttonLeft){
                buttonLeft.addEventListener('click', () =>{
                    let box = document.querySelectorAll('.information-box');
                    // Vymažeme stávající data na stránce
                    for(let oneBoxe of box){
                        oneBoxe.remove();
                    }

                    //Snížíme hodnotu aktuální stránky o jednu
                    actuallyPageNumber --;

                    // Zavoláme funkci pro vypsání dalších dat z databáze
                    data -= 5
                    gridA = 4;
                    gridB = 5;
                    insertDataToFunction();
                    showControlButton();
                })
            }
        });
    }

    /**
     * Funkce pro vložení titulku do section
     * @param {string} title 
     */
    insertData(title) {
        let section = document.querySelector('.section');
        section.appendChild(this.createTitle(title));
        section.appendChild(this.createButton());
        section.appendChild(this.createFilters());
    }
}