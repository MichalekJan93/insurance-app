import { PostAjax } from "../ajax/postAjax.js";

/**
 * A class that creates a section with data about insured persons
 */
export class InsuredPersonBox{

    constructor() {
        this.filterNames = ['filterName', 'filterSurname', 'filterNIP'];
        this.filterClass = ['filterName', 'filterSurname', 'filterNIP'];
        this.filterPlaceHolders = ['Jméno', 'Příjmení', 'PSČ'];
    }

    /**
     * Method for creating a caption in section
     * @param {string} title Titel in section
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
     * A method to create a button to add insured person to the database
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
     * Method for creating filters, for filtering the insured
     * @returns div
     */
    createFilters() {
        let filterDiv = document.createElement('div');
        filterDiv.getAttribute('class');
        filterDiv.setAttribute('class', 'filter');

        // Loop, to create input for filtering
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
     * A method that receives data about insured persons from the database
     * @param {string} firstName Name of the insured
     * @param {string} lastName Last name of the insured
     * @param {number} NIP ZIP code of the insured
     * @returns Data from the database
     */
    dataFromDTB(firstName, lastName, NIP) {
        let callDtbObject = {
            'firstName' : firstName,
            'lastName' : lastName,
            'NIP' : NIP
        }
        // We will create a PostAjax object with the POST method and the path to the php file
        let dtb = new PostAjax('POST', './php/wievInsuredPersonBox.php', true);
        // We call the result method to send the data to the PHP file
        let dataDTB = dtb.result(callDtbObject);
        return dataDTB;
    }

    /**
     * A method for working with data from a database
     * @param {number} actuallyPageNumber The current page in the list of insurances on which the user is located
     * @param {string} firstName Name of the insured
     * @param {string} lastName Last name of the insured
     * @param {number} NIP ZIP code of the insured
     */
    control(actuallyPageNumber = 1, firstName = '', lastName = '', NIP = '') {

        let maxNumberPages;
        let control = document.createElement('div');
        let controlLeft = document.createElement('div');
        let controlRight = document.createElement('div');
        let pageNumber = document.createElement('div');

        // The index from which data should be written to the list from result
        let data = (actuallyPageNumber - 1) * 5;
        // We send the name, surname and zip code of the insured to the InsuranceFromDTB method
        let dataDtb = this.dataFromDTB(firstName, lastName, NIP);
        dataDtb.then(function (result) {
            // The length of the field with the data from the database
            let lengthDtb = result.length;
            // Maximum number of pages
            maxNumberPages = Math.ceil(lengthDtb / 5);
            let gridA = 4;
            let gridB = 5;

            /**
             * Features to create a wonder about the insured
             * @param {number} rowDtb The index at which we look for information from the JSON object
             * @param {number} gridrowA GridRow from
             * @param {number} gridrowB  GridRow until
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

            // Function for displaying buttons, for paging insurance
            function showControlButton(){

                // We insert the current page number into the div .page-number
                pageNumber.innerHTML = actuallyPageNumber;

                // Displaying control buttons for paging, depending on where the user is located
                // If it is on a page that has no insurance
                if(maxNumberPages == 0){
                    controlRight.style.visibility = 'hidden';
                    controlRight.style.opacity = '0';
                    controlLeft.style.visibility = 'hidden';
                    controlLeft.style.opacity = '0';
                    pageNumber.style.visibility = 'visible';
                    pageNumber.style.opacity = '1';
                }
                // If it is on a page that is also the last one.
                else if (actuallyPageNumber == maxNumberPages) {
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

            // A function to send the current data to the createUserBox function
            function insertDataToFunction(){
                // We will set a variable that will store the maximum value of the index for extracting data from the database
                let maxValues = data + 5; 
                // If the variable for storing the maximum index will be greater than the total length of the field of data from the database, then the variable will be overwritten to the length of the field from the database. Treatment: calling values ​​on non-existent array index
                maxValues > lengthDtb ? maxValues = lengthDtb : maxValues = maxValues;

                // The cycle for creating a miracle of the insured
                for (let i = data; i < maxValues; i++) {
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
                createControlButtons();
            }

            // Capture clicks on paging buttons
            let buttonRight = document.querySelector('.control-right');
            let buttonLeft = document.querySelector('.control-left');

            // Capturing the right button click
            if(buttonRight){
                buttonRight.addEventListener('click', () =>{
                    let box = document.querySelectorAll('.information-box');
                    // We will delete the existing data on the page
                    for(let oneBoxe of box){
                        oneBoxe.remove();
                    }

                    // We increase the value of the current page by one
                    actuallyPageNumber ++;

                    // We will call a function to list additional data from the database
                    data += 5
                    gridA = 4;
                    gridB = 5;
                    insertDataToFunction();
                    showControlButton();
                })
            }

            // Capturing the left button click
            if(buttonLeft){
                buttonLeft.addEventListener('click', () =>{
                    let box = document.querySelectorAll('.information-box');
                    // We will delete the existing data on the page
                    for(let oneBoxe of box){
                        oneBoxe.remove();
                    }

                    // We will decrement the value of the current page by one
                    actuallyPageNumber --;

                    // We will call a function to list additional data from the database
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
     * A method for inserting a title into a section
     * @param {string} title Title in section
     */
    insertData(title) {
        let section = document.querySelector('.section');
        section.appendChild(this.createTitle(title));
        section.appendChild(this.createButton());
        section.appendChild(this.createFilters());
    }
}