export class Overview{

    createDivs(){
        let divMainBox = document.createElement('div');
        let divMainBoxText = document.createElement('div');
        let h1 = document.createElement('h1');
        let divMainBoxParagraph = document.createElement('p');
        let href = document.createElement('a');
        let divMainBoxImg = document.createElement('div');
        let img = document.createElement('img');
        let divMainBoxReferenc = document.createElement('div');
        let referencParagraphFirst = document.createElement('p');
        let referencParagraphSecond = document.createElement('p');
        let referencDivImgs = document.createElement('div');
        let referencImgFacesFirst = document.createElement('img');
        let referencImgFacesSecond = document.createElement('img');
        let referencImgFacesThird = document.createElement('img');
        let referencImgFacesFourth = document.createElement('img');
        let h2 = document.createElement('h2');
        let insuranceBoxes = document.createElement('div');
        let insuranceBoxFirst = document.createElement('div');
        let insuranceBoxSecond = document.createElement('div');
        let insuranceBoxThird = document.createElement('div');
        let insuranceBoxFourth = document.createElement('div');

        divMainBox.setAttribute('class', 'main-box');
        divMainBoxText.setAttribute('class', 'main-box-text');
        href.setAttribute('class', 'phone-call');
        divMainBoxImg.setAttribute('class', 'main-box-img');
        img.setAttribute('src', './img/insurance-app.jpg');
        img.setAttribute('alt', 'Pojištění App');
        divMainBoxReferenc.setAttribute('class', 'main-box-referenc');
        referencDivImgs.setAttribute('class', 'main-box-referenc-imgs');
        referencImgFacesFirst.setAttribute('class', 'insurance-faces');
        referencImgFacesFirst.setAttribute('src', './img/faceOne.png');
        referencImgFacesFirst.setAttribute('alt', 'Pojištění App');
        referencImgFacesSecond.setAttribute('class', 'insurance-faces');
        referencImgFacesSecond.setAttribute('src', './img/faceTwo.png');
        referencImgFacesSecond.setAttribute('alt', 'Pojištění App');
        referencImgFacesThird.setAttribute('class', 'insurance-faces');
        referencImgFacesThird.setAttribute('src', './img/faceThree.png');
        referencImgFacesThird.setAttribute('alt', 'Pojištění App');
        referencImgFacesFourth.setAttribute('class', 'insurance-faces');
        referencImgFacesFourth.setAttribute('src', './img/faceFour.png');
        referencImgFacesFourth.setAttribute('alt', 'Pojištění App');
        insuranceBoxes.setAttribute('class', 'insurance-boxes');
        insuranceBoxFirst.setAttribute('class', 'insurance-boxes-box');
        insuranceBoxSecond.setAttribute('class', 'insurance-boxes-box');
        insuranceBoxThird.setAttribute('class', 'insurance-boxes-box');
        insuranceBoxFourth.setAttribute('class', 'insurance-boxes-box');

        h1.innerHTML = 'Chytré pojištění pro Váš lepší <span>RODINNÝ ŽIVOT</span>';
        divMainBoxParagraph.innerHTML = 'Nepodceňujte životní rizika. Sjednejte si životní pojištění a spolehněte se na pomocnou ruku v náročných životních situacích. Nabizíme Vám životní pojištění s úročením vaších vkladů až do výše 6,5 % p.a.';
        href.innerHTML = 'SJEDNAT SCHŮZKU';
        referencParagraphFirst.innerHTML = '1,2 Milionů +';
        referencParagraphSecond.innerHTML = 'Spokojených klientů';
        h2.innerHTML = 'Pojištění pro Vaše každodenní potřeby';
        insuranceBoxFirst.innerHTML = '<h3>Pojištění vozidla</h3>';
        insuranceBoxSecond.innerHTML = '<h3>Cestovní pojištění</h3>';
        insuranceBoxThird.innerHTML = '<h3>Pojištění majetku</h3>';
        insuranceBoxFourth.innerHTML = '<h3>Pojištění podnikání</h3>';

        let section = document.querySelector('.section');
        section.appendChild(divMainBox);
        divMainBox.appendChild(divMainBoxText);
        divMainBoxText.appendChild(h1);
        divMainBoxText.appendChild(divMainBoxParagraph);
        divMainBoxText.appendChild(href);
        divMainBox.appendChild(divMainBoxImg);
        divMainBoxImg.appendChild(img);
        divMainBoxImg.appendChild(divMainBoxReferenc);
        divMainBoxReferenc.appendChild(referencParagraphFirst);
        divMainBoxReferenc.appendChild(referencParagraphSecond);
        divMainBoxReferenc.appendChild(referencDivImgs);
        referencDivImgs.appendChild(referencImgFacesFirst);
        referencDivImgs.appendChild(referencImgFacesSecond);
        referencDivImgs.appendChild(referencImgFacesThird);
        referencDivImgs.appendChild(referencImgFacesFourth);
        section.appendChild(h2);
        section.appendChild(insuranceBoxes);
        insuranceBoxes.appendChild(insuranceBoxFirst);
        insuranceBoxes.appendChild(insuranceBoxSecond);
        insuranceBoxes.appendChild(insuranceBoxThird);
        insuranceBoxes.appendChild(insuranceBoxFourth);
    }
}