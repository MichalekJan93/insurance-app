/**
 * The class with which we add items to the menu in the header
 */
export class Header {

    /**
     * @param {number} role User role. Deregistered, registered insurer, registered insured
     */
    constructor(role) {
        this.role = role;
        this.removeMenu();
        this.menuHeader(this.role);
    }

    /**
     * A method that adds items to the menu
     * @param {number} role User role
     */
    menuHeader(role) {
        // Menu item names
        let menuItem = ['Home', 'Pojištěnci', 'Pojištění', 'Info'];
        // If the insurer is logged in, we add all items from the text field to the menu
        if (role) {
            // Cycle for inserting menu items
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
        // If the insured is logged in or the user is logged out, we only display two items in the menu
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
     * A method that removes the current menu item
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