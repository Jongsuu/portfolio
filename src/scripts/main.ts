import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "flag-icons/css/flag-icons.min.css";
import "bootstrap";
import { UtilsComponent } from './utils.component';

async function changeTranslationsEvent(utils: UtilsComponent): Promise<void> {
    let languageDropdownBtn = document.body.querySelector<HTMLElement>("#LanguageDropdown");
    languageDropdownBtn.click();

    setTimeout(() => {
        languageDropdownBtn.click()
    }, 50);

    document.body.querySelector<HTMLElement>("#LanguageOptions").querySelectorAll("a").forEach(item => {
        if (!item.id) {
            item.addEventListener("click", async () => {
                let loader = document.getElementById("loader");
                loader.classList.remove("fadeOut");

                document.documentElement.lang = item.lang;

                utils.changeTranslations(item.lang).then(() => {
                    setTimeout(() => { loader.classList.add("fadeOut"); }, 200);
                });
            })
        }
    });
}

async function registerEvents(): Promise<void> {
    window.addEventListener('scroll', async() => {
        let header = document.body.querySelector("header");
        header.classList.toggle('header-scrolled', window.scrollY > 20);
    });

    let menuToggle = document.body.querySelector<HTMLElement>(".nav-menu-toggle");

    menuToggle.addEventListener("click", async() => {
        let links = document.body.querySelector<HTMLElement>(".nav-links-list-mobile");
        document.body.querySelector("main").classList.toggle("ocu");
        links.classList.toggle("nav-links-list-mobile-active");
    });

    document.body.querySelectorAll("[href]").forEach((item: HTMLLinkElement) => {
        if (!item.href.includes("#") && !item.hasAttribute("download") && item.href.includes(location.href)) {
            item.addEventListener("click", () => {
                document.getElementById("loader").classList.remove("fadeOut");
            });
        }
    });

    let downloadButtons = document.body.querySelectorAll("[download]");

    if (downloadButtons.length > 0) {
        let closeButton: HTMLElement = document.body.querySelector('[data-bs-dismiss="modal"]');
        downloadButtons.forEach(item => {
            item.addEventListener("click", () => {
                closeButton.click();
            })
        })
    }
}

window.addEventListener("DOMContentLoaded", () => {
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
