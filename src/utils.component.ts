import $ from "jquery";
import { I18n } from "i18n-js";
import { availableParallelism } from "os";

export class UtilsComponent {
    private i18n: I18n;

    private availableTranslations = [
        "en", "es", "cat"
    ]

    constructor() {
        this.i18n = new I18n();
        this.i18n.defaultLocale = "en";
        this.i18n.availableLocales = this.availableTranslations;
        this.initializeTranslations();
    }

    private getLocale(): string  {
        // First check stored locale
        let locale = localStorage.getItem("locale");

        if (!locale) {
            locale = "en";
            let availableLanguages = this.i18n.availableLocales;
            let browserLanguages = navigator.languages.map(lang => lang.includes("-") ? lang.split("-")[0] : lang);
            let langSet = new Set<string>(browserLanguages);

            for (let i = 0; i < langSet.size; i++) {
                if (availableLanguages.find(lang => lang === langSet[i])) {
                    locale = langSet[i];
                    break;
                }
            }
        }

        return locale;
    }

    public async initializeTranslations(): Promise<void> {
        await this.changeTranslations(this.getLocale());
    }

    public async changeTranslations(locale: string): Promise<void> {
        let aboveItem = document.querySelector<HTMLElement>("#LanguageDropdown").children[0];
        let firstItem = document.querySelector<HTMLElement>("#LanguageOptionsSelected");
        let item = document.querySelector<HTMLElement>("#LanguageOptions").querySelector(`[lang="${locale}"`);

        let itemLang = item.getAttribute("lang");
        let itemFlag = item.querySelector("i").className;
        let itemLangText = item.querySelector("span").innerText;

        item.children[0].className = firstItem.children[0].className;
        item.children[1].innerHTML = firstItem.children[1].innerHTML;
        item.setAttribute("lang", firstItem.lang);

        firstItem.children[0].className = itemFlag;
        firstItem.children[1].innerHTML = itemLangText;
        firstItem.setAttribute("lang", itemLang);

        aboveItem.className = "m-0 " + itemFlag;

        await this.loadTranslations(locale);
        await this.refreshTranslations();
    }

    async loadTranslations(locale: string): Promise<void> {
        this.i18n.locale = locale;

        // Store the new selected locale
        localStorage.setItem("locale", locale);

        const response = await fetch(`/translations/${locale}.json`);
        const translations = await response.json();
        this.i18n.store(translations);
    }

    public async refreshTranslations(): Promise<void> {
        let _this = this;

        document.querySelectorAll("[i18n]").forEach(item => {
            let i18nId = item.getAttribute("i18n");

            if (item.tagName === "INPUT")
                item.setAttribute("placeholder", _this.i18n.t(i18nId));
            else
                item.innerHTML = _this.i18n.t(i18nId);
        });
    }
}
