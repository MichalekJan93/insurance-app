import { PostAjax } from "../ajax/postAjax.js";
import { Information } from "./information.js";

export class OverviewPerson extends Information{

    constructor(personID){
        super();
        this.personID = personID;
    }

    createDivs(){
        let section = document.querySelector('section');
        let title = document.createElement('div');
        let personNameParagraph = document.createElement('p');
        let divpersonData = document.createElement('div');
        let divPersonAddress = document.createElement('div');
        let personAddressFirstParagraph = document.createElement('p');
        let personAddressSecondParagraph = document.createElement('p');
        let divPersonContact = document.createElement('div');
        let personContactFirstParagraph = document.createElement('p');
        let personContactSecondParagraph = document.createElement('p');
        let subtitle = document.createElement('p');
        let divInsurances = document.createElement('div');

        title.setAttribute('class', 'section-name');
        personNameParagraph.setAttribute('class', 'person-name');
        divpersonData.setAttribute('class', 'person-data');
        divPersonAddress.setAttribute('class', 'person-address');
        personAddressFirstParagraph.setAttribute('class', 'person-address-first-paragraph')
        personAddressSecondParagraph.setAttribute('class', 'person-address-second-paragraph')
        divPersonContact.setAttribute('class', 'person-contact');
        personContactFirstParagraph.setAttribute('class', 'personContactFirstParagraph');
        personContactSecondParagraph.setAttribute('class', 'personContactSecondParagraph');
        subtitle.setAttribute('class', 'subtitle');
        divInsurances.setAttribute('class', 'person-insurances');

        section.appendChild(title);
        section.appendChild(personNameParagraph);
        section.appendChild(divpersonData);
        divpersonData.appendChild(divPersonAddress);
        divPersonAddress.appendChild(personAddressFirstParagraph);
        divPersonAddress.appendChild(personAddressSecondParagraph);
        divpersonData.appendChild(divPersonContact);
        divPersonContact.appendChild(personContactFirstParagraph);
        divPersonContact.appendChild(personContactSecondParagraph);
        section.appendChild(subtitle);
        section.appendChild(divInsurances);

        title.innerHTML = "Váš přehled"
        subtitle.innerHTML = "Vaše pojištění"
    }

    control(personID, actuallyPageNumber = 1) {
        let dataDtb = this.InsuranceFromDTB(personID);
        dataDtb.then(function (result) {
            result = JSON.parse(result);
            let birthdate = new Date(result[0].birthdate);
            let month = birthdate.getMonth() + 1;
            birthdate = birthdate.getDate() + '.' + month + '.' + birthdate.getFullYear();

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

            /* podle delky pole z dtb si ulozime do promene maximalni pocet stranek pro strankovani
            -1 - v poli z databaze mame na indexu 0 informace o pojistnikovi, proto   */
            let lengthDtb = result.length - 1;
            let maxNumberPages = Math.ceil(lengthDtb / 3);
            let gridA = 0;
            let gridB = 1;
            let data = (actuallyPageNumber - 1) * 3;

            let control = document.createElement('div');
            let controlLeft = document.createElement('div');
            let controlRight = document.createElement('div');
            let pageNumber = document.createElement('div');

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

                informationBoxOne.setAttribute('class', 'information-box-one');
                informationBoxTwo.setAttribute('class', 'information-box-two');
                informationBoxThree.setAttribute('class', 'information-box-three');
                informationBoxFour.setAttribute('class', 'information-box-four');
                informationBoxFive.setAttribute('class', 'information-box-five');
                informationBoxSix.setAttribute('class', 'information-box-six');
                informationBoxSixStatus.setAttribute('class', 'insurance-status');
                informationBtns.setAttribute('class', 'information-btns');

                /* Prevod datumu na CZ format */
                let validFrom = new Date(result[rowDtb].validFrom);
                let monthFrom = validFrom.getMonth() + 1;
                let czValidFrom = validFrom.getDate() + '.' + monthFrom + '.' + validFrom.getFullYear();

                let validUntil = new Date(result[rowDtb].validUntil);
                let monthUntil = validUntil.getMonth() + 1;
                let czValidUntil = validUntil.getDate() + '.' + monthUntil + '.' + validUntil.getFullYear();

                informationBoxOne.innerHTML = result[rowDtb].type;
                informationBoxTwo.innerHTML = result[rowDtb].subject;
                informationBoxThree.innerHTML = result[rowDtb].amount + ' Kč';
                informationBoxFour.innerHTML = czValidFrom;
                informationBoxFive.innerHTML = czValidUntil;

                /* Pokud je pojisteni stale aktivni, tak pridame divu informationBoxSixStatus classu active, pokud uz aktivni neni, pridame classu inactive */
                let today = new Date();
                today < validUntil ? informationBoxSixStatus.classList.add('active') : informationBoxSixStatus.classList.add('inactive');

                divInsurances.appendChild(informationBox);
                informationBox.appendChild(informationBoxOne);
                informationBox.appendChild(informationBoxTwo);
                informationBox.appendChild(informationBoxThree);
                informationBox.appendChild(informationBoxFour);
                informationBox.appendChild(informationBoxFive);
                informationBox.appendChild(informationBoxSix);
                informationBoxSix.appendChild(informationBoxSixStatus);
                informationBox.appendChild(informationBtns);


            }

            /* Funkce pro zobrazeni ovladacich tlacitek pro strankovani */
            function showControlButton(){
                pageNumber.innerHTML = actuallyPageNumber;

                if (actuallyPageNumber == maxNumberPages) {
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
                else if (maxNumberPages == 0) {
                    controlRight.style.visibility = 'hidden';
                    controlRight.style.opacity = '0';
                    controlLeft.style.visibility = 'hidden';
                    controlLeft.style.opacity = '0';
                    pageNumber.style.visibility = 'visible';
                    pageNumber.style.opacity = '1';

                    let divInsurances = document.querySelector('.person-insurances');
                    divInsurances.innerHTML = '<p>Pojistník, nemá sjednané žádné pojištění.....</p>';
                }
                else if (actuallyPageNumber == 1) {
                    controlRight.style.visibility = 'visible';
                    controlRight.style.opacity = '1';
                    controlLeft.style.visibility = 'hidden';
                    controlLeft.style.opacity = '0';
                    pageNumber.style.visibility = 'visible';
                    pageNumber.style.opacity = '1'; 
                }
                else if (actuallyPageNumber > 1 && actuallyPageNumber != maxNumberPages) {
                    controlRight.style.visibility = 'visible';
                    controlRight.style.opacity = '1';
                    controlLeft.style.visibility = 'visible';
                    controlLeft.style.opacity = '1';
                    pageNumber.style.visibility = 'visible';
                    pageNumber.style.opacity = '1';
                }
            }

            /* Funkce pro vytvoreni tlacitek pro strankovani */
            function createControlButtons(gridA, gridB, actuallyPageNumber, lastPageNumber) {
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

            function insertDataToFunction(){
                /* Nastavime promenou, ktera bude uchovavat maximalni hodnotu indexu pro vypis dat z databaze */
                let maxValues = data + 3; 
                /* Pokud promena pro uchovavani maximalniho indexu bude vetsi nez celkova delka pole dat z databaze, 
                tak se promena prepise na delku pole z databaze. Osetreni: volani hodnot na neexistujicim indexu pole. */
                maxValues > lengthDtb ? maxValues = lengthDtb : maxValues = maxValues;

                for (let i = data + 1; i <= maxValues; i++) {
                    /* i .. prvek  */
                    /* gridA ... oznaceni row pro stylovani */
                    /* gridB ... oznaceni column pro stylovani */
                    createUserBox(i, gridA, gridB);
                    gridA++;
                    gridB++;
                }
            }

            insertDataToFunction();

            let informationBox = document.createElement('div');

            /* Pokud se do tranky propise aspon jeden pojistenec z databaze vytvori se sipky pro 
            strankovani */
            if (informationBox) {
                createControlButtons(gridA, gridB, actuallyPageNumber, maxNumberPages);
            }

            /* Zachyceni ovladani tlacitek pro strankovani */
            let buttonRight = document.querySelector('.control-right-dialog');
            let buttonLeft = document.querySelector('.control-left-dialog');
            if(buttonRight){
                buttonRight.addEventListener('click', () =>{
                    let box = document.querySelectorAll('.information-box-dialog');
                    /* Vymazeme stavajici data na strance */
                    for(let oneBoxe of box){
                        oneBoxe.remove();
                    }
                    /* Zavolame funkci pro vypsani dalsich dat z databaze */
                    data += 3
                    gridA = 0;
                    gridB = 1;
                    actuallyPageNumber ++;
                    insertDataToFunction();
                    showControlButton();
                })
            }

            if(buttonLeft){
                buttonLeft.addEventListener('click', () =>{
                    let box = document.querySelectorAll('.information-box-dialog');
                    /* Vymazeme stavajici data na strance */
                    for(let oneBoxe of box){
                        oneBoxe.remove();
                    }
                    /* Zavolame funkci pro vypsani dalsich dat z databaze */
                    data -= 3
                    gridA = 0;
                    gridB = 1;
                    actuallyPageNumber --;
                    insertDataToFunction();
                    showControlButton();
                })
            }
        })
    }

}