import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import {
	Component,
	ViewChild,
	ElementRef,
	AfterViewInit,
	Output,
	EventEmitter,
	Input,
	OnInit,
	OnDestroy,
	HostBinding,
} from "@angular/core";
import { fromEvent, Observable, Subscription } from "rxjs";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements AfterViewInit, OnInit, OnDestroy {
	@ViewChild("languagePicker") div_DOM!: ElementRef;
	@ViewChild("nav") nav_DOM!: ElementRef;
	@ViewChild("main") mainElem!: ElementRef;
	@ViewChild("buttonText") button!: ElementRef;
	div_DOM_SpanChilds: Array<HTMLSpanElement> = [];
	nav_DOM_SpanChilds: Array<HTMLSpanElement> = [];
	languages: Array<string> = ["en", "de"];
	@Input() componentPositions!: Array<number>;
	@Output() scrollByFunction = new EventEmitter<boolean>();
	currentPosition!: string;
	pageOffset: number = 300;
	timeouts: Array<any> = [];
	showMobileNav: boolean = true;
	components: Array<string> = ["start", "skills", "projects", "personal", "contact"];
	windowWidth: number = 646;
	resizeObservable$!: Observable<Event>;
	resizeSubscription$!: Subscription;
	mobileView: boolean = false;
	mobileNavOpen: boolean = true;
	translateObserv$: any;
	openMobileNav: boolean = true;
	@HostBinding("class.mobileOpen") host: boolean = false;

	constructor(public translate: TranslateService) {
		this.translateObserv$ = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			localStorage.setItem("page_language", event.lang);
		});
		if (window.innerWidth <= this.windowWidth) {
			this.mobileView = true;
			this.openMobileNav = this.mobileView;
		} else {
			this.mobileView = false;
			this.openMobileNav = this.mobileView;
		}
		this.downloadLangJSONs();
	}

	ngOnInit(): void {
		this.resizeObservable$ = fromEvent(window, "resize");
		this.resizeSubscription$ = this.resizeObservable$.subscribe((evt: any) => {
			if (window.innerWidth <= this.windowWidth) {
				this.mobileView = true;
				this.openMobileNav = this.mobileView;
			} else {
				this.mobileView = false;
				this.openMobileNav = this.mobileView;
			}
			setTimeout(() => {
				this.ngAfterViewInit();
			}, 50);
		});
	}

	ngOnDestroy(): void {
		this.resizeSubscription$.unsubscribe();
		this.translateObserv$.unsubscribe();
	}

	toggleMenu() {
		this.openMobileNav = !this.openMobileNav;
		this.host = !this.host;
		this.mainElem.nativeElement.classList.toggle("mobileOpen");
		if (!this.openMobileNav) this.button.nativeElement.innerHTML = "Close";
		else this.button.nativeElement.innerText = "Open";

		setTimeout(() => {
			this.ngAfterViewInit();
		}, 20);
	}

	downloadLangJSONs() {
		this.languages.forEach((lang) => {
			this.translate.getTranslation(lang);
		});
	}

	ngAfterViewInit(): void {
		if (!this.mobileView || !this.openMobileNav) {
			this.setLanguagePickerChilds();
			this.setNavChilds();
		}
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
			this.components.forEach((component: string) => {
				if (this.checkComponentCollision(component)) {
					this.currentPosition = component;
					this.setNavStile();
				}
			});
		});
		if (!this.mobileView) {
			console.log(window.scrollY, this.componentPositions[1]);
			this.components.forEach((component: string) => {
				if (this.checkComponentCollision(component)) {
					this.currentPosition = component;
					this.setNavStile();
				}
			});
		}
	}

	checkComponentCollision(component: string): any {
		let headerIfStatements: Array<Boolean> = [
			(window.scrollY >= 0 || window.scrollY >= this.pageOffset) &&
				window.scrollY <= window.innerHeight - this.pageOffset,
			window.scrollY >= this.componentPositions[1] - this.pageOffset &&
				window.scrollY <= this.componentPositions[2] - this.pageOffset,
			window.scrollY >= this.componentPositions[2] - this.pageOffset &&
				window.scrollY <= this.componentPositions[3] - this.pageOffset,
			window.scrollY >= this.componentPositions[3] - this.pageOffset &&
				window.scrollY <= this.componentPositions[4] - this.pageOffset,
			window.scrollY >= this.componentPositions[4] - this.pageOffset && window.scrollY <= window.innerHeight * 5,
		];
		for (let index = 0; index < this.components.length; index++) {
			if (headerIfStatements[index] && this.components[index] == component) return true;
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
				this.scrollByFuntionStatus();
				document
					.querySelector("app-welcome")
					?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
				break;
			case "skills":
				this.scrollByFuntionStatus();
				document.querySelector("app-skills")?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
				break;
			case "projects":
				this.scrollByFuntionStatus();
				document
					.querySelector("app-projects")
					?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
				break;
			case "personal":
				this.scrollByFuntionStatus();
				document
					.querySelector("app-personal-info")
					?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
				break;
			case "contact":
				this.scrollByFuntionStatus();
				document
					.querySelector("app-contact")
					?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
				break;
		}
	}

	scrollByFuntionStatus() {
		window.clearTimeout(this.timeouts[0]);
		this.timeouts.length = 0;
		this.timeouts.push(
			setTimeout(() => {
				this.scrollByFunction.emit(false);
			}, 800)
		);
	}
}
