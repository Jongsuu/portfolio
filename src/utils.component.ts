import $ from "jquery";
import { I18n } from "i18n-js";

export interface Language {
    locale: string,
    language: string
}

export class UtilsComponent {
    private i18n: I18n;

    constructor() {
        this.i18n = new I18n();
        this.i18n.defaultLocale = "en";
        this.initializeTranslations(this.getLocale());
    }

    private getLocale(): Language  {
        let lang: Language = {
            locale: "en",
            language: "en"
        };

        let browserLanguages = navigator.languages;
        let availableLanguages = this.i18n.availableLocales;

        for (let i = 0; i < browserLanguages.length; i++) {
            if (availableLanguages.find(lang => lang.includes("-") ? lang.split("-")[0] : lang === browserLanguages[i])) {
                lang.locale = browserLanguages[i].split("-")[0];

                lang.language = lang.locale === "en" ?
                    lang.locale : lang.language = browserLanguages[i];
                break;
            }
        }

        return lang;
    }

    public async initializeTranslations(lang: Language): Promise<void> {
        await this.loadTranslations(lang);
        await this.refreshTranslations();
    }

    async loadTranslations(lang: Language): Promise<void> {
        console.info("load translations");
        this.i18n.locale = lang.locale;
        const response = await fetch(`/translations/${lang.language}.json`);
        const translations = await response.json();
        this.i18n.store(translations);
    }

    public async refreshTranslations(): Promise<void> {
        console.info("refresh translations");

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
