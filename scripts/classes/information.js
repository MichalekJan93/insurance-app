import { PostAjax } from "../ajax/postAjax.js";
/**
 * A class that creates a DIV with information about the insured and his insurance
 */
export class Information {

    /**
     * The method creates a dialog and elements in the DOM
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
     * A method to display a dialog
     */
    showDialog() {
        let dialogUser = document.querySelector('.infromation-person-dialog');
        dialogUser.showModal();
    }

    /**
     * Method to remove the dialog
     */
    deleteDialog() {
        document.body.removeChild(document.querySelector('.infromation-person-dialog'));
    }

    /**
     * Method for obtaining data about the insured from the database and his insurance
     * @param {number} personID Insured ID
     * @returns Data from database
     */
    InsuranceFromDTB(personID) {
        // We create an object with the data passed in the method parameter
        let callDtbObject = {
            'ID' : personID
        }
        // We will create a PostAjax object with the POST method and the path to the php file
        let postData = new PostAjax('POST', './php/wievInsurancePersonBox.php', true);
        // We call the result method to send the data to the PHP file
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    /**
     * A method that works with data about the insured and his insurance. It then inserts the data into elements in the DOM from the dialog
     * @param {number} personID Insured ID
     * @param {number} actuallyPageNumber The current page in the list of insurances we are on
     */
    control(personID, actuallyPageNumber = 1) {
        // We call the InsuranceFromDTB method with parameters from data from the form
        let dataDtb = this.InsuranceFromDTB(personID);
        dataDtb.then(function (result) {
            // We will convert the date of birth to Czech format
            let birthdate = new Date(result[0].birthdate);
            let month = birthdate.getMonth() + 1;
            birthdate = birthdate.getDate() + '.' + month + '.' + birthdate.getFullYear();

            // We will insert the user data into the divs
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

            // The length of the paging field. -1 because we have information about the insured in the field at index 0.
            let lengthDtb = result.length - 1;

            // According to the length of the field from the DTB, we store the maximum number of pages for pagination in a variable
            let maxNumberPages = Math.ceil(lengthDtb / 3);
            let gridA = 0;
            let gridB = 1;
            let data = (actuallyPageNumber - 1) * 3;  

            /**
             * Features to create a wonder about insurance
             * @param {number} rowDtb Insurance index in result
             * @param {number} gridrowA gridRow from
             * @param {number} gridrowB  gridRow dokud
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

                // We will convert the date to the Czech format
                let validFrom = new Date(result[rowDtb].validFrom);
                let monthFrom = validFrom.getMonth() + 1;
                let czValidFrom = validFrom.getDate() + '.' + monthFrom + '.' + validFrom.getFullYear();

                // We will convert the date to the Czech format
                let validUntil = new Date(result[rowDtb].validUntil);
                let monthUntil = validUntil.getMonth() + 1;
                let czValidUntil = validUntil.getDate() + '.' + monthUntil + '.' + validUntil.getFullYear();

                // We will put the insurance data into the divs
                informationBoxOne.innerHTML = result[rowDtb].type;
                informationBoxTwo.innerHTML = result[rowDtb].subject;
                informationBoxThree.innerHTML = result[rowDtb].amount + ' Kč';
                informationBoxFour.innerHTML = czValidFrom;
                informationBoxFive.innerHTML = czValidUntil;

                // If the insurance is still active to date, we add diva .informationBoxSixStatus to the active class, if it is no longer active, we add the inactive class
                let today = new Date();
                today < validUntil ? informationBoxSixStatus.classList.add('active') : informationBoxSixStatus.classList.add('inactive');

                // We put everything in div .infromation-box
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

            // Functions for displaying buttons, for paging insurance
            function showControlButton(){

                // We insert the current page number into the div .page-number
                pageNumber.innerHTML = actuallyPageNumber;

                // Displaying control buttons for paging, depending on where the user is located
                // If it is on a page that is also the last one
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

                    // We will write information to the user that the insured has no insurance
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
                // If there is more than one insurance page and it is not the last page.
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
             * Function to create paging buttons
             * @param {number} gridrowA gridRow from
             * @param {number} gridrowB  gridRow dokud
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

            /* A function to send the current data to the createUserBox function */
            function insertDataToFunction(){
                // We will set a variable that will store the maximum value of the index for extracting data from the database
                let maxValues = data + 3; 
                // If the variable for storing the maximum index will be greater than the total length of the field of data from the database, then the variable will be overwritten to the length of the field from the database. Treatment: calling values ​​on non-existent array index
                maxValues > lengthDtb ? maxValues = lengthDtb : maxValues = maxValues;

                // Cycle for creating an insurance miracle
                for (let i = data + 1; i <= maxValues; i++) {
                    createUserBox(i, gridA, gridB);
                    gridA++;
                    gridB++;
                }
            }

            insertDataToFunction();

            let informationBox = document.createElement('div');

            // If at least one insurance from the database is entered into the page, arrows for pagination will be created
            if (informationBox) {
                createControlButtons(gridA, gridB);
            }

            // Creating variables with button elements
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

                    // Capturing the left button click
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