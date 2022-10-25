import { InsuredPersonBox } from "./insuredPersonBox.js";
import { GetAjax } from "../ajax/getAjax.js";
import { InfoParagraph } from "./infoParagraph.js";

/**
 * Třída která vytvoří section s daty o pojištění.
 * Třída dědí z třídy InsuredPersonBox
 */
export class InsurancePersonBox extends InsuredPersonBox{

    constructor(){
        super();
    }

    /**
     * Metoda pro vytoření tlačítka pro přidání pojištění do databáze
     * @returns div
     */
    createButton() {
        let btn = document.createElement('div');
        let paragraph = document.createElement('p');
        btn.getAttribute('class');
        btn.setAttribute('class', 'addButton-dialog');
        paragraph.innerText = 'Přidat pojištění';
        btn.appendChild(paragraph);
        return btn;
    }

     /**
      * Metoda, která příjmé data z databáze
      * @returns data z databáze
      */
     dataFromDTB() {
        // Vytvoříme objekt GetAjax s metodou GET a trasou k souboru php
        let dtb = new GetAjax('GET', './php/wievInsuranceBox.php', true);
        // Zavoláme metodu AJAX pro přijetí dat ze souboru PHP
        let dataDTB = dtb.result();
        return dataDTB;
    }

    /**
     * Metoda pro práci s daty z databáze
     * @param {*} actuallyPageNumber - aktuální stránka v seznamu pojištěnců, na které se uživatel nachází
     */
    control(actuallyPageNumber = 1) {
        //Index od kterého se mají vypsat data do seznamu z result
        let data = (actuallyPageNumber - 1) * 5;
        //Zavoláme metodu InsuranceFromDTB
        let dataDtb = this.dataFromDTB();
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
                    let id = 'insurance' + result[rowDtb].id;
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

                    informationBoxOne.setAttribute('class', 'information-box-one-insurance');
                    informationBoxTwo.setAttribute('class', 'information-box-two-insurance');
                    informationBoxThree.setAttribute('class', 'information-box-three-insurance');

                    /* Převod datumu na cz formát */
                    let validUntil = new Date(result[rowDtb].validUntil);
                    let monthUntil = validUntil.getMonth() + 1;
                    let czValidUntil = validUntil.getDate() + '.' + monthUntil + '.' + validUntil.getFullYear();

                    informationBoxOne.innerHTML = result[rowDtb].personName[0].firstName+ ' ' + result[rowDtb].personName[0].lastName;
                    informationBoxTwo.innerHTML = result[rowDtb].type;
                    informationBoxThree.innerHTML = czValidUntil;

                    informationBox.appendChild(informationBoxOne);
                    informationBox.appendChild(informationBoxTwo);
                    informationBox.appendChild(informationBoxThree);

                    let informationBtns = document.createElement('div');
                    informationBtns.getAttribute('class');
                    informationBtns.setAttribute('class', 'information-btns');
                    informationBox.appendChild(informationBtns);

                    let btnUpdate = document.createElement('div');
                    let btnDelete = document.createElement('div');

                    btnUpdate.getAttribute('class');
                    btnDelete.getAttribute('class');

                    btnUpdate.setAttribute('class', 'btn-update-dialog');
                    btnDelete.setAttribute('class', 'btn-delete-dialog');

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

            let section = document.querySelector('.section');
            let infoParagraph = new InfoParagraph('Zde se zobrazují pouze aktivní pojištění. Neaktivní pojištění, lze vidět jen v informačním boxu daného pojistníka', section);
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
    }

}