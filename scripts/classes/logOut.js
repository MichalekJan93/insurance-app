/**
 * The class we use to log out the user
 */
export class LogOut{

    /**
     * The method creates a logout div (icon).
     * @returns div
     */
    createLogoutDiv(){
        let div = document.createElement('div');
        div.setAttribute('class', 'logout');
        return div;
    }

    /**
     * The method inserts a login div (icon) into the DOM
     * @param {number} input Role of the logged in user
     */
    setIcon(input){
        let loginIconDesktop = document.querySelector('.desktop-login');

        // If the user is logged in
        if(input){
            loginIconDesktop.style.display = 'none';

            let header = document.querySelector('header');
            let hamburgerMenu = document.querySelector('.hamburger-menu');

            let div = document.querySelector('.logout');

            // If there is a logout div
            if(div){
                // We insert the div before the .hamburger-menu div
                header.insertBefore(div, hamburgerMenu)
                div.style.display = 'flex';
            }
            else {
                // If there is no login div, we create it first and then insert the div before the .hamburger-menu div
                div = this.createLogoutDiv();
                header.insertBefore(div, hamburgerMenu)
            }
        }
        else{ // If the user has logged out
            let logOut = document.querySelector('.logout');
            // If there is a .logout div in the DOM, we make it invisible
            if(logOut != null){
                logOut.style.display = 'none';
                loginIconDesktop.style.display = 'flex';
            }
        }
    }
}