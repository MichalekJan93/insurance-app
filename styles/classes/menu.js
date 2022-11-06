/**
 * A class that modifies the menu in the header
 */
export class Menu{

    constructor(){
        this.menu  = document.querySelectorAll('.menu');
        this.menuIcon = document.querySelector('.hamburger-menu');
    }

    // The method removes the menu-active class from the inactive items in the menu headr
    resetActiveMenu(){
        this.menu.forEach(element => {
            element.classList.remove('menu-activate');
        })
    }
    // Creates a menu-active class when an item in the header menu is clicked
    activeMenu(){
        this.menu.forEach(element => {
            element.addEventListener('click', () =>{
                this.resetActiveMenu();
                element.classList.add('menu-activate');
                // Scrolling the menu after clicking on an item in the menu
                // If the size of the header is smaller than 960, we scroll the menu
                if(document.querySelector('header').clientWidth < 960){
                    let menuHeader = document.querySelector('.menu-header')
                    menuHeader.className = 'menu-header';
                }
            })
        })
    }

    // Responsive header menu control
    showResponsiveMenu(){
        let menuHeader = document.querySelector('.menu-header');
        // If the size of the header is smaller than 960, we scroll the menu
        if(document.querySelector('header').clientWidth < 960){
            if(menuHeader.className === 'menu-header'){
                menuHeader.className += ' show';
            }
            else{
                menuHeader.className = 'menu-header';
            }
        }
    }
}

