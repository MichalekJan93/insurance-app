import { Menu } from "./classes/menu.js";

let controlMenu = new Menu();
controlMenu.activeMenu();

document.querySelector('.hamburger-menu').addEventListener('click',function(){
 controlMenu.showResponsiveMenu();
})


let observer = new MutationObserver(MutationRecord =>{
    let controlMenu = new Menu();
    controlMenu.activeMenu();
})

let elem = document.querySelector('.menu-header');

/* Observer s nastavenim MutationObserver */
observer.observe(elem, {
    childList: true,
});