import "@fortawesome/fontawesome-free";
import "flag-icons";
import "bootstrap";
import $ from "jquery";
import { UtilsComponent } from './utils.component';

console.info("main.ts");

async function loadPage(file: string): Promise<string> {
    const response = await fetch(file);
    return await response.text();
}

async function loadPageComponents(): Promise<void> {
    let navbar = await loadPage("/src/navbar.html");
    document.body.innerHTML = navbar + document.body.innerHTML;
}

async function changeTranslationsEvent(utils: UtilsComponent): Promise<void> {
    let languageDropdownBtn = document.querySelector<HTMLElement>("#LanguageDropdown");
    languageDropdownBtn.click();

    setTimeout(() => {
        languageDropdownBtn.click()
    }, 10);

    document.querySelector<HTMLElement>("#LanguageOptions").querySelectorAll("a").forEach(item => {
        if (!item.id) {
            item.addEventListener("click", async () => {
                document.body.classList.remove("show");
                utils.changeTranslations(item.lang).then(() => {
                    setTimeout(() => { document.body.classList.add("show"); }, 300);
                });
            })
        }
    });
}

async function scrollNavbar(): Promise<void> {
    $(window).on('scroll', async() => {
        let header = $('header');
        header.toggleClass('header-scrolled', $(window).scrollTop() > 20);
    });
}

$(() => {
    console.info("utils.ts");
    let utils = new UtilsComponent();

    changeTranslationsEvent(utils);
    scrollNavbar();

    setTimeout(() => { document.body.classList.add("show"); }, 300);
});
