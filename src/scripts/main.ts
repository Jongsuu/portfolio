import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "flag-icons/css/flag-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import { UtilsComponent } from './utils.component';

async function loadPage(file: string): Promise<string> {
    const response = await fetch(file);
    return await response.text();
}

async function changeTranslationsEvent(utils: UtilsComponent): Promise<void> {
    // let languageDropdownBtn = document.querySelector<HTMLElement>("#LanguageDropdown");
    // languageDropdownBtn.click();

    // setTimeout(() => {
    //     languageDropdownBtn.click()
    // }, 100);

    document.querySelector<HTMLElement>("#LanguageOptions").querySelectorAll("a").forEach(item => {
        if (!item.id) {
            item.addEventListener("click", async () => {
                let loader = document.getElementById("loader");
                loader.classList.remove("fadeOut");

                document.body.classList.remove("show");
                document.documentElement.lang = item.lang;

                utils.changeTranslations(item.lang).then(() => {
                    setTimeout(() => { loader.classList.add("fadeOut"); }, 50);
                });
            })
        }
    });
}

async function registerNavbarEvents(): Promise<void> {
    $(window).on('scroll', async() => {
        let header = $('header');
        header.toggleClass('header-scrolled', $(window).scrollTop() > 20);
    });

    let menuToggle = document.querySelector<HTMLElement>(".nav-menu-toggle");

    menuToggle.addEventListener("click", async() => {
        let links = document.querySelector<HTMLElement>(".nav-links-list-mobile");
        document.querySelector("main").classList.toggle("ocu");
        links.classList.toggle("nav-links-list-mobile-active");
    });
}

$(() => {
    let utils = new UtilsComponent();
    changeTranslationsEvent(utils);
    registerNavbarEvents();

    utils.initializeTranslations().then(() => {
        setTimeout(() => {
            let loader = document.getElementById("loader");
            loader.classList.add("fadeOut");
        }, 50);
    });
});
