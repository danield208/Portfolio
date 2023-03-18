import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from "@angular/core";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements AfterViewInit {
	@ViewChild("languagePicker") div_DOM!: ElementRef;
	@ViewChild("nav") nav_DOM!: ElementRef;
	div_DOM_SpanChilds: Array<HTMLSpanElement> = [];
	nav_DOM_SpanChilds: Array<HTMLSpanElement> = [];
	languages: Array<string> = ["en", "de"];
	@Output() scrollByFunction = new EventEmitter<boolean>();
	currentPosition!: string;
	pageOffset: number = 300;

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
		this.setNavChilds();
		this.ifLocalStorage_init();
	}

	setLanguagePickerChilds() {
		this.div_DOM_SpanChilds.push(this.div_DOM.nativeElement.firstChild);
		this.div_DOM_SpanChilds.push(this.div_DOM.nativeElement.lastChild);
	}

	setNavChilds() {
		let navChildren: Array<HTMLSpanElement> = Array.from(this.nav_DOM.nativeElement.children);
		navChildren.forEach((child: any) => {
			if (child.localName == "span") {
				this.nav_DOM_SpanChilds.push(child);
			}
		});
		this.addEventListeners();
		console.log(this.nav_DOM_SpanChilds);
	}

	ifLocalStorage_init() {
		if (this.checkForLocalStorageItem()) {
			let localStorage_Language: string = String(localStorage.getItem("page_language"));
			this.setLanguage(localStorage_Language);
		} else this.setLanguagePicker_style(this.translate.defaultLang);
	}

	checkForLocalStorageItem() {
		return localStorage.getItem("page_language");
	}

	addEventListeners() {
		window.addEventListener("scroll", () => {
			if (this.checkComponentCollision("start")) {
				this.currentPosition = "start";
			}
			if (this.checkComponentCollision("projects")) {
				this.currentPosition = "projects";
			}
			if (this.checkComponentCollision("personal")) {
				this.currentPosition = "personal";
			}
			if (this.checkComponentCollision("contact")) {
				this.currentPosition = "contact";
			}
			this.setNavStile();
		});
	}

	checkComponentCollision(component: string): any {
		switch (component) {
			case "start":
				return (
					(window.scrollY >= 0 || window.scrollY >= this.pageOffset) &&
					window.scrollY <= window.innerHeight - this.pageOffset
				);
			case "projects":
				return (
					window.scrollY >= window.innerHeight - this.pageOffset &&
					window.scrollY <= window.innerHeight * 2 + this.pageOffset
				);
			case "personal":
				return (
					window.scrollY >= window.innerHeight * 2 - this.pageOffset &&
					window.scrollY <= window.innerHeight * 3 + this.pageOffset
				);
			case "contact":
				return (
					window.scrollY >= window.innerHeight * 3 - this.pageOffset &&
					window.scrollY <= window.innerHeight * 4 + this.pageOffset
				);
		}
	}

	setNavStile() {
		this.nav_DOM_SpanChilds.forEach((span) => {
			if (span.attributes[1].value == this.currentPosition) {
				span.classList.value = "position";
			} else span.classList.value = "";
		});
	}

	changeLang(lang: Event) {
		let target = lang.target as HTMLSpanElement;
		let language: string = String(target.attributes[1].value);
		this.setLanguage(language);
	}

	async setLanguage(language: string) {
		this.translate.use(language);
		this.setLanguagePicker_style(language);
	}

	setLanguagePicker_style(language: string = this.translate.defaultLang) {
		this.div_DOM_SpanChilds.forEach((elem: HTMLSpanElement) => {
			let elem_lang = elem.attributes[1].nodeValue;
			if (elem_lang == language) {
				elem.classList.value = "active";
			} else elem.classList.value = "";
		});
	}

	browserJump(position: string) {
		this.scrollByFunction.emit(true);
		switch (position) {
			case "start":
				document
					.querySelector("app-welcome")
					?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
				break;
			case "projects":
				document
					.querySelector("app-projects")
					?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
				break;
			case "personal":
				document
					.querySelector("app-personal-info")
					?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
				break;
			case "contact":
				document
					.querySelector("app-contact")
					?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
				break;
		}
		setTimeout(() => {
			this.scrollByFunction.emit(false);
		}, 800);
	}
}
