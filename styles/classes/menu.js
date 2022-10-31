export class Menu{

    constructor(){
        this.menu  = document.querySelectorAll('.menu');
        this.menuIcon = document.querySelector('.hamburger-menu');
    }

    /* Odstraní třídu menu-active s neaktivních položek v headr menu */
    resetActiveMenu(){
        this.menu.forEach(element => {
            element.classList.remove('menu-activate');
        })
    }
    /* Vytvoří třidu menu-active po kliknutí na položku v headr menu*/
    activeMenu(){
        this.menu.forEach(element => {
            element.addEventListener('click', () =>{
                this.resetActiveMenu();
                element.classList.add('menu-activate');
                /* Srolovani menu po kliknuti na polozku v menu */
                /* Pokud bude velikost headeru mensi nez 960, tak scrollujeme menu */
                if(document.querySelector('header').clientWidth < 960){
                    let menuHeader = document.querySelector('.menu-header')
                    menuHeader.className = 'menu-header';
                }
            })
        })
    }

    /* Ovladani responsivního headr menu */
    showResponsiveMenu(){
        let menuHeader = document.querySelector('.menu-header');
        /* Pokud bude velikost headeru mensi nez 960, tak scrollujeme menu */
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

