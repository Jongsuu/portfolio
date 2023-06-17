import "bootstrap";
import $ from "jquery";
import './style.css'
import { UtilsComponent } from './utils.component';

async function loadPages(): Promise<void> {
    let main = document.querySelector<HTMLElement>('#app');
    let pages = [
        "/src/home/home.html"
    ];

    for (let i = 0; i < pages.length; i++) {
        const response = await fetch(pages[i]);
        const html = await response.text();
        main.innerHTML += html;
    }
}

console.info("main.ts");

$(() => {
    loadPages().then(() => {
        console.info("utils.ts");
        let utils = new UtilsComponent();
    });
});
