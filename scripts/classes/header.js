/**
 * Třída, pomocí, které přidáme položky do menu v headru
 */
export class Header {
    /**
     * 
     * @param {number} role - role uživatele. Odhlášený, přihlášený pojistitel, přihlášený pojištěnec
     */
    constructor(role) {
        this.role = role;
        this.removeMenu();
        this.menuHeader(this.role);
    }

    /**
     * Metoda, která přidá položky do menu
     * @param {number} role 
     */
    menuHeader(role) {
        //Názvy položek v menu
        let menuItem = ['Home', 'Pojištěnci', 'Pojištění', 'Info'];
        //Pokud je přihlášen pojistitel, přidáme do menu všechny položky z pole text
        if (role) {
            // Cyklus pro vložení položek do menu
            for (let i = 0; i < menuItem.length; i++) {
                let li = document.createElement('li');

                li.setAttribute('class', 'menu');

                if (menuItem[i] == 'Přihlásit') {
                    li.classList += ' mobile-login login';
                }

                li.innerHTML = menuItem[i];
                let menuHeader = document.querySelector('.menu-header');
                menuHeader.appendChild(li);
            }
        }
        //Pokud je přihlášen pojištěnec nebo je uživatel odhlášen, tak zobrazíme jen dvě položky v menu
        else {
            for (let i = 0; i < menuItem.length; i++) {

                if (i > 0 && i < 3) {
                    continue;
                }

                let li = document.createElement('li');

                li.setAttribute('class', 'menu');

                li.innerHTML = menuItem[i];
                let menuHeader = document.querySelector('.menu-header');
                menuHeader.appendChild(li);
            }
        }
    }

    /**
     * Metoda, která odstraní aktuální položku v menu
     */
    removeMenu() {
        let li = document.querySelectorAll('.menu');
        let menu = document.querySelector('.menu-header');
        if (li.length > 0) {
            for (let i = 0; i < li.length; i++){
                menu.removeChild(li[i]);
            }
        }
    }
}