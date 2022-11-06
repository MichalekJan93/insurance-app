import { PostAjax } from "../ajax/postAjax.js";
import { Information } from "./information.js";
/**
 * A class for creating a sectio home for a registered insured
 * The class inherits from the registered insured class
 */
export class OverviewPerson extends Information{
    /**
     * @param {number} personID ID of the registered insured
     */
    constructor(personID){
        super();
        this.personID = personID;
    }

    /**
     * Method to create section home and its DOM.
     */
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

    /**
     * A method for working with data from a database
     * @param {number} personID ID of the registered insured
     * @param {number} actuallyPageNumber The current page in the list of insurances on which the user is located
     */
    control(personID, actuallyPageNumber = 1) {
        // We send the insurer id to the InsuranceFromDTB method
        let dataDtb = this.InsuranceFromDTB(personID);
        dataDtb
            .then(function (result) {
                // Date of birth of the registered insured
                let birthdate = new Date(result[0].birthdate);
                let month = birthdate.getMonth() + 1;
                birthdate = birthdate.getDate() + '.' + month + '.' + birthdate.getFullYear();

                // We get data about the insured, which we then insert into an element on the page
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

                // according to the length of the field from the dtb, store in the variable the maximum number of pages for pagination -1 - in the field from the database, we have information about the policyholder at index 0, therefore
                let lengthDtb = result.length - 1;
                let maxNumberPages = Math.ceil(lengthDtb / 3);
                let gridA = 0;
                let gridB = 1;
                let data = (actuallyPageNumber - 1) * 3;

                let control = document.createElement('div');
                let controlLeft = document.createElement('div');
                let controlRight = document.createElement('div');
                let pageNumber = document.createElement('div');

                /**
                 * Functions to create a DIV about insurance
                 * @param {number} rowDtb The index at which we look for information from the JSON object
                 * @param {number} gridrowA GridRow from
                 * @param {number} gridrowB  GridRow until
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

                    informationBoxOne.setAttribute('class', 'information-box-one');
                    informationBoxTwo.setAttribute('class', 'information-box-two');
                    informationBoxThree.setAttribute('class', 'information-box-three');
                    informationBoxFour.setAttribute('class', 'information-box-four');
                    informationBoxFive.setAttribute('class', 'information-box-five');
                    informationBoxSix.setAttribute('class', 'information-box-six');
                    informationBoxSixStatus.setAttribute('class', 'insurance-status');
                    informationBtns.setAttribute('class', 'information-btns');

                    // Date conversion to cz format
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

                    // If the insurance is still active, we add the informationBoxSix Status class active div, if it is no longer active, we add the class inactive
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

                // Function for displaying buttons, for paging insurance
                function showControlButton(){

                    // We insert the current page number into the div .page-number
                    pageNumber.innerHTML = actuallyPageNumber;

                    // Displaying control buttons for paging, depending on where the user is located
                    // If it is on a page that is also the last one.
                    if (actuallyPageNumber == maxNumberPages) {
                        // If the maximum number of pages to display is 1
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
                    // If it is on a page that has no insurance
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
                    // If the maximum number of pages to display is 1
                    else if (actuallyPageNumber == 1) {
                        controlRight.style.visibility = 'visible';
                        controlRight.style.opacity = '1';
                        controlLeft.style.visibility = 'hidden';
                        controlLeft.style.opacity = '0';
                        pageNumber.style.visibility = 'visible';
                        pageNumber.style.opacity = '1'; 
                    }
                    // If there is more than one insurance page and it is not the last page
                    else if (actuallyPageNumber > 1 && actuallyPageNumber != maxNumberPages) {
                        controlRight.style.visibility = 'visible';
                        controlRight.style.opacity = '1';
                        controlLeft.style.visibility = 'visible';
                        controlLeft.style.opacity = '1';
                        pageNumber.style.visibility = 'visible';
                        pageNumber.style.opacity = '1';
                    }
                }

                // Function to create paging buttons
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

                // A function to send the current data to the createUserBox function
                function insertDataToFunction(){
                    // We will set a variable that will store the maximum value of the index for extracting data from the database
                    let maxValues = data + 3; 
                    // If the variable for storing the maximum index will be greater than the total length of the field of data from the database, then the variable will be overwritten to the length of the field from the database. Treatment: calling values ​​on non-existent array index
                    maxValues > lengthDtb ? maxValues = lengthDtb : maxValues = maxValues;

                    // The cycle for creating a miracle of the insured
                    for (let i = data + 1; i <= maxValues; i++) {
                        createUserBox(i, gridA, gridB);
                        gridA++;
                        gridB++;
                    }
                }

                // We call the insertDataToFunction function
                insertDataToFunction();

                let informationBox = document.createElement('div');

                // If at least one insured person from the database is entered into the page, arrows for paging will be created
                if (informationBox) {
                    createControlButtons(gridA, gridB, actuallyPageNumber, maxNumberPages);
                }

                // Capture clicks on paging buttons
                let buttonRight = document.querySelector('.control-right-dialog');
                let buttonLeft = document.querySelector('.control-left-dialog');

                // Capturing the right button click
                if(buttonRight){
                    buttonRight.addEventListener('click', () =>{
                        let box = document.querySelectorAll('.information-box-dialog');
                        // We will delete the existing data on the page
                        for(let oneBoxe of box){
                            oneBoxe.remove();
                        }

                        // We increase the value of the current page by one
                        actuallyPageNumber ++;

                        // We will call a function to list additional data from the database
                        data += 3
                        gridA = 0;
                        gridB = 1;                        
                        insertDataToFunction();
                        showControlButton();
                    })
                }

                // Capturing the left button click
                if(buttonLeft){
                    buttonLeft.addEventListener('click', () =>{
                        let box = document.querySelectorAll('.information-box-dialog');
                        // We will delete the existing data on the page
                        for(let oneBoxe of box){
                            oneBoxe.remove();
                        }
                        // We will decrement the value of the current page by one
                        actuallyPageNumber --;

                        // We will call a function to list additional data from the database
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