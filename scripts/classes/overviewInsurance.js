import { PostAjax } from "../ajax/postAjax.js";
import { InfoParagraph } from "./infoParagraph.js";
/**
 * Třída pro vytvoření section home, pro přihlášeného pojistitele
 */
export class OverviewInsurance{

    /**
     * @param {number} insurerID - id přihlašeného pojistitele, id načítáme z cookies
     */
    constructor(insurerID){
        this.insurerID = insurerID;
    }

    /**
     * Metoda pro vytvoření section home a jejího DOMu.
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

        let infoParagraph = new InfoParagraph('Data z aktuálního měsíce', section);
    }

    /**
     * Metoda pro získání počtu pojištění a počtu pojištěnců z databáze
     * @param {number} insurerID - id pojistitele
     * @returns - data z databáze
     */
    InsuranceFromDTB(insurerID) {
        let callDtbObject = {
            'ID' : insurerID
        }
        // Vytvoříme objekt PostAjax s metodou POST a trasou k souboru php
        let postData = new PostAjax('POST', './php/overviewInsurance.php', true);
        // Zavoláme metodu AJAX pro odeslání dat do souboru PHP
        let dataDTB = postData.result(callDtbObject);
        return dataDTB;
    }

    /**
     * Asynchronní metoda pro práci s daty z databáze
     * @param {number} insurerID - ID pojistitele
     */
    control(insurerID) {
        //Odešleme id pojištění do metody InsuranceFromDTB
        let dataDtb = this.InsuranceFromDTB(insurerID);
        dataDtb
            .then(function (result) {
                // Jméno a přijmení přihlašeného pojistitele, vložíme do divu .person-name
                document.querySelector('.person-name').innerHTML = `${result[0].firstName} ${result[0].lastName}`;
                // Email pojistitele vložíme do divu .personContactSecondParagraph
                document.querySelector('.personContactSecondParagraph').innerHTML = `${result[0].email}`;

                //Vytvoříme si pole, do kterého vložíme počty pojištěnců a pojištění z databáze z aktuálního měsíce.
                let valuesFromDtb = [result[0].RowsFromInsurance, result[0].RowsFromOneUserInsurance, result[0].RowsFromInsuredPersons, result[0].RowsFromOneInsuredPersons];

                //Pole s hodnotami, které reprezentují počet uzavřených pojištění a registrovaných pojistníků, které by měl pojistitel splnit v aktuálním měsící.
                const valuesMaxLimit = [30, 27, 8, 20];

                //Pole s názvy jednotlivých cílů, které musí pojistitel splnit.
                const titleCircle = ['Celkový počet pojištění', 'Váš celkový počet pojištění', 'Celkový počet pojistníků', 'Váš celkový počet pojistníků']

                // Cyklus pro vložení svg s daty a názvů cílů do divu .charts.
                for(let i = 0; i < 4; i++){
                    let singleChart = document.querySelector(`.chart${i}`);

                    // Vypočítáme na kolik procent je jednotlivý cíl splněn.
                    let percentCircle = (valuesFromDtb[i] / valuesMaxLimit[i]) * 100;

                    //Vytvoření svg circle
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

                //Cyklus pomocí kterého svg s třídou .circular-chart nastavíme barvu pozadí v závislosti na kolik procent je cíl spněn.
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
                    // Centrování .max-value podle počtu pojištění nebo pojištěnců.
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