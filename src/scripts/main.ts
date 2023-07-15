import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "flag-icons/css/flag-icons.min.css";
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
                    setTimeout(() => { loader.classList.add("fadeOut"); }, 200);
                });
            })
        }
    });
}

async function registerEvents(): Promise<void> {
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

    document.body.querySelectorAll("[href]").forEach((item: HTMLLinkElement) => {
        if (!item.href.includes("#") && !item.hasAttribute("download")) {
            item.addEventListener("click", () => {
                document.getElementById("loader").classList.remove("fadeOut");
            });
        }
    });

    let downloadButtons = document.body.querySelectorAll("[download]");

    if (downloadButtons.length > 0) {
        let closeButton: HTMLElement = document.querySelector('[data-bs-dismiss="modal"]');
        downloadButtons.forEach(item => {
            item.addEventListener("click", () => {
                closeButton.click();
            })
        })
    }
}

$(() => {
    let utils = new UtilsComponent();
    changeTranslationsEvent(utils);
    registerEvents();

    utils.initializeTranslations().then(() => {
        setTimeout(() => {
            let loader = document.getElementById("loader");
            loader.classList.add("fadeOut");
        }, 200);
    });
});
