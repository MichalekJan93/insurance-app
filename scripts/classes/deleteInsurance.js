import { PostAjax } from "../ajax/postAjax.js";
import { Message } from "./message.js";
import { Information } from "./information.js";
import { SessionStorage } from "./sessionStorage.js";
import { InsurancePersonBox } from "./insurancePersonBox.js";
/**
 * The class, with the help of which we delete the given insurance
 */
export class DeleteInsurance{
    /**
     * @param {number} insuranceID  Insurer ID
     * @param {number} page         Finding out which page the user is on
     */
    constructor(insuranceID, page){
        this.insuranceID = insuranceID;
        this.page = page;
        this.delete(this.insuranceID, this.page);
    }

    /**
     * A method that sends the id of the insurance we want to delete to a PHP file
     * @param {number} insuranceID Insurance ID
     * @returns Data from databes
     */
    InsuranceFromDTB(insuranceID) {
        // We create an object with the data passed in the method parameter
        let callDtbObject = {
            'ID' : insuranceID
        }
        // We will create a PostAjax object with the POST method and the path to the php file
        let postData = new PostAjax('POST', './php/deleteInsurance.php', true);
        // We call the result method to send the data to the PHP file
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    /**
     * A method for working with data from a database
     * @param {number} insuranceID  Insured ID
     * @param {number} page         Finding out what page the user is on. 1 - insurance section, 0 - insurance dialog
     */
    delete(insuranceID, page){
        // We call the InsuranceFromDTB method with parameters from data from the form
        let dataDtb = this.InsuranceFromDTB(insuranceID);
        dataDtb.then(function (result) {
            if(result == true){
                // We will verify which page the user is on
                if(page){
                    // We will remove all information boxes with insurance data
                    let infoBoxes = document.querySelectorAll('.information-box');
                    for (let oneBox of infoBoxes) {
                        oneBox.remove();
                    }
                    // We will remove the control buttons for pagination
                    document.querySelector('.control').remove();
                    // We will create a new object and it will rewrite all the insurance data to the page with the newly added insurance
                    let contentBox = new InsurancePersonBox();
                    contentBox.control()
                }
                else{
                    // We will remove all information boxes with insurance data
                    let infoBoxes = document.querySelectorAll('.information-box-dialog');
                    for (let oneBox of infoBoxes) {
                        oneBox.remove();
                    }
                    // We will remove the control buttons for pagination
                    document.querySelector('.control-dialog').remove();
                    // We will create a new object to obtain the policyholder's id from session storage
                    let sessionStorage = new SessionStorage();
                    // We will create a new object and it will rewrite all the insurance data in the dialog with the newly added insurance
                    let contentBox = new Information();
                    contentBox.control(sessionStorage.getSessionData())
                }
                // The object prints a confirmation message to the user
                let message = new Message('Pojištění bylo úspěšně odstraněno');
            }
        })
    }
}