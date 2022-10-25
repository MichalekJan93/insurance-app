
/**
 * Třída Box vytváří a odstraňuje element section.
 * Třídá, také edituje atribut class v elementu section.
 */
class Box{

    /* V konstruktoru máme uloženou section, kterou právě vidíme na stránce */
    constructor(){
        this.newBox = document.createElement('section');
    }

    /* Metoda nastavi velikost okna elementu <section> podle velikosti headeru */
    widthForBox(){
        let header = document.querySelector('header');
        this.newBox.style.width = header.clientWidth + 'px';
    }

    /**
    * Pomocí metody přidělíme section atributy.
    * @returns section s atributy
    */
    createBox(className){
        this.newBox.setAttribute('class', 'section');
        this.newBox.classList += ' ' + className;
        this.widthForBox();
        document.querySelector('body').appendChild(this.newBox);
        return this.newBox;
    }

    /* Metoda pro pro přepsání třídy */
    rename(newClassName){
        this.newBox.setAttribute('class', 'section');
        this.newBox.classList.add(newClassName);
    }

    /* Metoda pro vymazáni obsahu v section*/
    remove(){
        this.newBox.innerHTML = '';
    }
}