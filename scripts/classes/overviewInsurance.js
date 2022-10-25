import { PostAjax } from "../ajax/postAjax.js";
import { InfoParagraph } from "./infoParagraph.js";

export class OverviewInsurance{

    constructor(insurerID){
        this.insurerID = insurerID;
    }

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

        let infoParagraph = new InfoParagraph('Data z aktuálního měsíce', section);
    }

    /* Funkce pro ziskani dat z databaze */
    InsuranceFromDTB(insurerID) {
        let callDtbObject = {
            'ID' : insurerID
        }
        /* Zavolame AJAX pro ziskani dat z databaze*/
        let postData = new PostAjax('POST', './php/overviewInsurance.php', true);
        /* Ziskame promisu vysledku a tu ulozime do promenne, kterou vratime. */
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    ahoj(){
        console.log('Ahoj');
    }

    control(insurerID) {
        let dataDtb = this.InsuranceFromDTB(insurerID);
        
        dataDtb.then(function (result) {
            result = JSON.parse(result);
            document.querySelector('.person-name').innerHTML = `${result[0].firstName} ${result[0].lastName}`;
            document.querySelector('.personContactSecondParagraph').innerHTML = `${result[0].email}`;

            /* Pocty pojistniku a pojisteni z dtb */
            let valuesFromDtb = [result[0].RowsFromInsurance, result[0].RowsFromOneUserInsurance, result[0].RowsFromInsuredPersons, result[0].RowsFromOneInsuredPersons];

            let valuesMaxLimit = [30, 27, 8, 20];

            let titleCircle = ['Celkový počet pojištění', 'Váš celkový počet pojištění', 'Celkový počet pojistníků', 'Váš celkový počet pojistníků']

            for(let i = 0; i < 4; i++){
                let singleChart = document.querySelector(`.chart${i}`);
                
                let percentCircle = (valuesFromDtb[i] / valuesMaxLimit[i]) * 100;

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

            /* Vlozeni tridy podle splnenych procent v poctu novych pojisteni a pojistniku */
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
                /* Centrovani max-value podle poctu mist daneho poctu pojiteni nebo pojistniku */
                let chart = document.querySelector(`.chart${i}`);
                if(chart.childNodes[1].childNodes[5].innerHTML > 9){
                    chart.lastChild.classList.add('height');
                }
            }
        })
    }


}