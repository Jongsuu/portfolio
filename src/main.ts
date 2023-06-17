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
    document.querySelector<HTMLElement>("#LanguageOptions").querySelectorAll("a").forEach(item => {
        if (!item.id) {
            item.addEventListener("click", async () => {
                document.body.classList.remove("show");
                utils.changeTranslations(item.lang);
                setTimeout(() => { document.body.classList.add("show"); }, 200);
            })
        }
    });
}

$(async () => {
    await loadPageComponents();

    console.info("utils.ts");
    let utils = new UtilsComponent();

    await changeTranslationsEvent(utils);
    setTimeout(() => { document.body.classList.add("show"); }, 50);
});
