import { PostAjax } from "../ajax/postAjax.js";
import { InfoParagraph } from "./infoParagraph.js";
/**
 * Class for creating a section home, for a registered insurer
 */
export class OverviewInsurance{

    /**
     * @param {number} insurerID - ID of the registered insurer.
     */
    constructor(insurerID){
        this.insurerID = insurerID;
    }

    /**
     * Method to create section home and its DOM.
     */
    createDivs(){
        let section = document.querySelector('section');
        let title = document.createElement('div');
        let insurerName = document.createElement('p');
        let insurerEmail = document.createElement('p');
        let box = document.createElement('div');
        let dataInsurer = document.createElement('div');
        let img = document.createElement('div');

        title.setAttribute('class', 'section-name'); 
        insurerName.setAttribute('class', 'person-name');
        insurerEmail.setAttribute('class', 'personContactSecondParagraph');
        box.setAttribute('class', 'box');
        dataInsurer.setAttribute('class', 'flex-wrapper');
        img.setAttribute('class', 'overview-img');

        title.innerHTML = 'Přehled cílů';

        section.appendChild(title);
        section.appendChild(insurerName);
        section.appendChild(insurerEmail)
        section.appendChild(box);
        box.appendChild(dataInsurer);
        box.appendChild(img);

        for(let i = 0; i < 4; i++){
            let singleChart = document.createElement('div');

            singleChart.setAttribute('class', `single-chart chart${i}`);

            dataInsurer.appendChild(singleChart);
        }
        // We will create an infoParagraph object, which will create an information div in the section
        let infoParagraph = new InfoParagraph('Data z aktuálního měsíce', section);
    }

    /**
     * A method for obtaining the number of insurance policies and the number of insured persons from the database
     * @param {number} insurerID Insurer ID
     * @returns Data from database
     */
    InsuranceFromDTB(insurerID) {
        let callDtbObject = {
            'ID' : insurerID
        }
        // We will create a PostAjax object with the POST method and the path to the php file
        let postData = new PostAjax('POST', './php/overviewInsurance.php', true);
        // We call the result method to send the data to the PHP file
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    /**
     * A method for working with data from a database
     * @param {number} insurerID Insurer ID
     */
    control(insurerID) {
        // We send the insurer id to the InsuranceFromDTB method
        let dataDtb = this.InsuranceFromDTB(insurerID);
        dataDtb
            .then(function (result) {
                // We insert the name and surname of the registered insurer into div .person-name
                document.querySelector('.person-name').innerHTML = `${result[0].firstName} ${result[0].lastName}`;
                // We insert the insurer's email into the div .personContactSecondParagraph
                document.querySelector('.personContactSecondParagraph').innerHTML = `${result[0].email}`;

                // We will create a field in which we will insert the number of insured persons and insurance from the database from the current month
                let valuesFromDtb = [result[0].RowsFromInsurance, result[0].RowsFromOneUserInsurance, result[0].RowsFromInsuredPersons, result[0].RowsFromOneInsuredPersons];

                // A field with values ​​that represent the number of policies taken out and policyholders registered that the insurer should fulfill in the current month
                const valuesMaxLimit = [30, 27, 8, 20];

                // A field with the names of the individual objectives that the insurer must meet.
                const titleCircle = ['Celkový počet pojištění', 'Váš celkový počet pojištění', 'Celkový počet pojistníků', 'Váš celkový počet pojistníků']

                // Loop to insert svg with data and target names into div .charts
                for(let i = 0; i < 4; i++){
                    let singleChart = document.querySelector(`.chart${i}`);

                    // We calculate the percentage of the individual goal achieved
                    let percentCircle = (valuesFromDtb[i] / valuesMaxLimit[i]) * 100;

                    // Circle svg creation
                    singleChart.innerHTML = `
                    <svg viewbox="0 0 36 36" class="circular-chart">
                        <path class="circle-bg" d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                        <path class="circle" stroke-dasharray="${percentCircle}, 100" d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                        <text x="18" y="20.35" class="percentage">${valuesFromDtb[i]}
                        </text>
                        <p>${titleCircle[i]}</p>
                    </svg>
                    <text class="max-value">/${valuesMaxLimit[i]}
                    </text>`; 
                }

                // Cycle using which svg with class .circular-chart we set the background color depending on how many percent the target is asleep
                let circularChart = document.querySelectorAll('.circular-chart');
                for(let i = 0; i < 4; i++){
                    let percentCircle = Math.ceil((valuesFromDtb[i] / valuesMaxLimit[i]) * 100);
                    if(percentCircle >= 0 && percentCircle <= 25){
                        circularChart[i].classList.add('red');
                    } else if(percentCircle >= 26 && percentCircle <= 75){
                        circularChart[i].classList.add('blue');
                    } else{
                        circularChart[i].classList.add('green');
                    }
                    // Centering .max-value by the number of insurances or insureds
                    let chart = document.querySelector(`.chart${i}`);
                    if(chart.childNodes[1].childNodes[5].innerHTML > 9){
                        chart.lastChild.classList.add('height');
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                /* Vlozit metodu z classy pro error */
            })
    }


}