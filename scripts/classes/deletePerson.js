import { PostAjax } from "../ajax/postAjax.js";
import { Message } from "./message.js";
import { InsuredPersonBox } from "./insuredPersonBox.js";
/**
 * The class, with the help of which we delete the insured person from the database
 */
export class DeletePerson{

    /**
     * @param {number} personID ID of the insured we want to delete
     */
    constructor(personID){
        this.personID = personID;
        this.delete(this.personID);
    }

    /**
     * A method that sends the id of the insured we want to delete to a PHP file
     * @param {number} personID - insured ID
     * @returns Data from databese
     */
    InsuranceFromDTB(personID) {
        // We create an object with the data passed in the method parameter
        let callDtbObject = {
            'ID' : personID
        }
        // We will create a PostAjax object with the POST method and the path to the php file
        let postData = new PostAjax('POST', './php/deletePerson.php', true);
        // We call the result method to send the data to the PHP file
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }
    /**
     * A method for working with data from a database
     * @param {number} personID ID of the insured we want to delete
     */
    delete(personID){
        // We send the policyholder id to the InsuranceFromDTB method
        let dataDtb = this.InsuranceFromDTB(personID);
        dataDtb.then(function (result) {
            // If we receive true from method InsuranceFromDTB, as if the insured person has been deleted, we execute the following commands.
            if(result == true){
                // We will remove all information boxes with data of insured persons
                let infoBoxes = document.querySelectorAll('.information-box');
                for (let oneBox of infoBoxes) {
                    oneBox.remove();
                }
                // We will remove the control buttons for pagination
                document.querySelector('.control').remove();
                // We will create a new object and rewrite all the data about the policyholders to the page without the deleted policyholder
                let contentBox = new InsuredPersonBox();
                contentBox.control();
                // The object prints a confirmation message to the user
                let message = new Message('Pojistník byl úspěšně odstraněn');
            }
        })
    }
}