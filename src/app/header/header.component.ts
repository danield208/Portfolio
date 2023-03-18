import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements AfterViewInit {
	@ViewChild("languagePicker") div_DOM!: ElementRef;
	div_DOM_SpanChilds: Array<HTMLSpanElement> = [];
	languages: Array<string> = ["en", "de"];

	constructor(public translate: TranslateService) {
		translate.onLangChange.subscribe((event: LangChangeEvent) => {
			localStorage.setItem("page_language", event.lang);
		});

		this.downloadLangJSONs();
	}

	downloadLangJSONs() {
		this.languages.forEach((lang) => {
			this.translate.getTranslation(lang);
		});
	}

	ngAfterViewInit(): void {
		this.setLanguagePickerChilds();
		this.ifLocalStorage_init();
	}

	setLanguagePickerChilds() {
		this.div_DOM_SpanChilds.push(this.div_DOM.nativeElement.firstChild);
		this.div_DOM_SpanChilds.push(this.div_DOM.nativeElement.lastChild);
	}

	ifLocalStorage_init() {
		if (this.checkForLocalStorageItem()) {
			let localStorage_Language: string = String(localStorage.getItem("page_language"));
			this.setLanguage(localStorage_Language);
		}
	}

	checkForLocalStorageItem() {
		return localStorage.getItem("page_language");
	}

	changeLang(lang: Event) {
		let target = lang.target as HTMLSpanElement;
		let language: string = String(target.attributes[1].value);
		this.setLanguage(language);
	}

	async setLanguage(language: string) {
		this.translate.use(language);
		this.setLanguagePicker_style();
	}

	setLanguagePicker_style() {
		this.div_DOM_SpanChilds.forEach((elem: HTMLSpanElement) => {
			let elem_lang = elem.attributes[1].nodeValue;
			if (elem_lang == this.translate.currentLang) {
				elem.classList.value = "active";
			} else elem.classList.value = "";
		});
	}
}
