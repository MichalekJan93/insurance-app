/**
 * Třída, pomocí, které odhlásíme uživatele
 */
export class LogOut{

    /**
     * Metoda vytvoří div (ikonu) pro odhlášení
     * @returns div
     */
    createLogoutDiv(){
        let div = document.createElement('div');
        div.setAttribute('class', 'logout');
        return div;
    }

    /**
     * Metoda vloží div (ikonu) pro přihlášení do DOMu
     * @param {number} input - role přihlášeného uživatele
     */
    setIcon(input){
        let loginIconDesktop = document.querySelector('.desktop-login');

        // Pokud se přihlásil uživatel
        if(input){
            loginIconDesktop.style.display = 'none';

            let header = document.querySelector('header');
            let hamburgerMenu = document.querySelector('.hamburger-menu');

            let div = document.querySelector('.logout');

            //Pokud existuje div pro odhlášení
            if(div){
                //Vložíme div před div .hamburger-menu
                header.insertBefore(div, hamburgerMenu)
                div.style.display = 'flex';
            }
            else {
                //Pokud neexistuje div pro přihlášení, tak ho nejdříve vytvoříme a pak až vložíme div před div .hamburger-menu
                div = this.createLogoutDiv();
                header.insertBefore(div, hamburgerMenu)
            }
        }
        else{ //Pokud se odhlásil uživatel
            let logOut = document.querySelector('.logout');
            //Pokud je v DOMu div .logout, tak ho zneviditelníme
            if(logOut != null){
                logOut.style.display = 'none';
                loginIconDesktop.style.display = 'flex';
            }
        }
    }
}