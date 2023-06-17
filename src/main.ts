import "bootstrap";
import $ from "jquery";
import { UtilsComponent } from './utils.component';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import "/node_modules/bootstrap/scss/bootstrap.scss";

console.info("main.ts");

function changeTranslations(utils: UtilsComponent): void {
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

$(() => {
    console.info("utils.ts");
    let utils = new UtilsComponent();

    changeTranslations(utils);
    setTimeout(() => { document.body.classList.add("show"); }, 100);
});
