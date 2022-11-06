import { Menu } from "./classes/menu.js";

/**
 * Menu control
 */

// Creating a menu object, and calling the activeMenu method on the object
let controlMenu = new Menu();
controlMenu.activeMenu();

// Capturing menu icon clicks on mobile devices
document.querySelector('.hamburger-menu').addEventListener('click',function(){
 controlMenu.showResponsiveMenu();
})

// Creating a MutationObserver object to capture clicks on a menu that is not yet rendered on the page.
let observer = new MutationObserver(MutationRecord =>{
    let controlMenu = new Menu();
    controlMenu.activeMenu();
})

let elem = document.querySelector('.menu-header');

// Setting for object MutationObserver
observer.observe(elem, {
    childList: true,
});