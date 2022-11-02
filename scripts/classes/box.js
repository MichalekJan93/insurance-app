
/**
 * The Box class creates and deletes the section element.
 * Class, also edits the class attribute in the section element.
 */
class Box{

    /* In the constructor, we have stored the section that we are currently seeing on the page */
    constructor(){
        this.newBox = document.createElement('section');
    }

    /* The method sets the window size of the <section> element according to the size of the header */
    widthForBox(){
        let header = document.querySelector('header');
        this.newBox.style.width = header.clientWidth + 'px';
    }

    /**
    * Method with which we assign the displayed section a new className
    * @returns Section with newly assigned attributes
    * @param {string} className The name of the class that we will assign to the section that we are currently displaying
    */
    createBox(className){
        this.newBox.setAttribute('class', 'section');
        this.newBox.classList += ' ' + className;
        this.widthForBox();
        document.querySelector('body').appendChild(this.newBox);
        return this.newBox;
    }

    /**
     * A method to override section's class name
     * @param {string} newClassName New class name for section
     */
    rename(newClassName){
        this.newBox.setAttribute('class', 'section');
        this.newBox.classList.add(newClassName);
    }

    /**
     * Method for clearing the contents of section
     */
    remove(){
        this.newBox.innerHTML = '';
    }
}