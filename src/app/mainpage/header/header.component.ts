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
	HostBinding, AfterViewChecked,
} from "@angular/core";
import { first, fromEvent, Observable, Subscription } from "rxjs";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements AfterViewInit, OnInit, OnDestroy, AfterViewChecked {
	//Child
	@ViewChild("languagePicker") div_DOM!: ElementRef;
	@ViewChild("nav") nav_DOM!: ElementRef;
	@ViewChild("main") mainElem!: ElementRef;
	@ViewChild("buttonText") button!: ElementRef;

	//Input
	@Input() componentPositions!: Array<number>;

	//Output
	@Output() scrollByFunction = new EventEmitter<boolean>();
	@Output() openMobileMenu = new EventEmitter<boolean>();

	//Hostbinding
	@HostBinding("class.mobileOpen") host: boolean = false;

	div_DOM_SpanChilds: Array<HTMLSpanElement> = [];
	nav_DOM_SpanChilds: Array<HTMLSpanElement> = [];
	currentPosition!: string;
	timeouts: Array<any> = [];
	components: Array<string> = ["start", "projects", "personal", "contact"];
	windowMobileWidth: number = 646;
	resizeObservable$!: Observable<Event>;
	resizeSubscription$!: Subscription;
	mobileView: boolean = false;
	translateObserv$: any;
	openMobileNav: boolean = true;
	projectBreak: number = 1310;

	constructor(public translate: TranslateService) {
		if (window.innerWidth <= this.windowMobileWidth) {
			this.mobileView = true;
			this.openMobileNav = this.mobileView;
		} else {
			this.mobileView = false;
			this.openMobileNav = this.mobileView;
		}
	}

	ngOnInit(): void {
		this.translateObserv$ = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			localStorage.setItem("page_language", event.lang);
		});

		this.resizeObservable$ = fromEvent(window, "resize");
		this.resizeSubscription$ = this.resizeObservable$.subscribe((evt: any) => {
			if (window.innerWidth <= this.windowMobileWidth) {
				this.mobileView = true;
				this.openMobileNav = this.mobileView;
				if (this.openMobileNav && this.host) {
					this.toggleMenu()
				}
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
			this.openMobileMenu.emit(true);
			this.ngAfterViewInit();
		}, 20);
	}

	ngAfterViewInit(): void {
		if (!this.mobileView || !this.openMobileNav) {
			this.setLanguagePickerChilds();
			this.setNavChilds();
		}
		this.ifLocalStorage_init();
	}

	ngAfterViewChecked() {
	this.firstPositionCheck()
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
		this.firstPositionCheck()
		this.addEventListeners();
	}

	firstPositionCheck() {
		if (!this.mobileView || !this.openMobileNav) {
			//setTimeout(() => {
				this.components.forEach((component: string) => {
					if (this.checkComponentCollision(component)) {
						this.currentPosition = component;
						this.setNavStile();
					}
				});
			//}, 20);
		}
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
	}

	checkComponentCollision(component: string): boolean | void {
		let headerIfStatements: Array<Boolean>;
		if (this.projectBreak >= window.innerWidth) {
			headerIfStatements = [
				window.scrollY >= this.componentPositions[0] && window.scrollY + 80 < this.componentPositions[1],
				window.scrollY + 120 > this.componentPositions[1] && window.scrollY + 80 < this.componentPositions[2],
				window.scrollY + 120 > this.componentPositions[2] && window.scrollY + 80 < this.componentPositions[3],
				window.scrollY + 120 > this.componentPositions[3] && window.scrollY < this.componentPositions[3] + this.componentPositions[3]
			];
		} else {
			headerIfStatements = [
				window.scrollY >= this.componentPositions[0] && window.scrollY + 80 < this.componentPositions[1],
				window.scrollY + 80 > this.componentPositions[1] && window.scrollY + 80 < this.componentPositions[2],
				window.scrollY + 80 > this.componentPositions[2] && window.scrollY + 80 < this.componentPositions[3],
				window.scrollY + 80 > this.componentPositions[3] && window.scrollY < this.componentPositions[3] + this.componentPositions[3]
			];
		}
		for (let index = 0; index < this.components.length; index++) {
			if (headerIfStatements[index] && this.components[index] == component) return true;
		}
	}

	checkMobileWidth(): boolean | void {
		if (window.innerWidth <= 646) return true;
		else return false;
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

	ifLocalStorage_init() {
		if (this.checkForLocalStorageItem()) {
			let localStorage_Language: string = String(localStorage.getItem("page_language"));
			this.setLanguage(localStorage_Language);
		} else this.setLanguagePicker_style(this.translate.defaultLang);
	}

	checkForLocalStorageItem() {
		return localStorage.getItem("page_language");
	}

	setLanguage(language: string) {
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
				window.scrollTo({ top: 0, behavior: "smooth" });
				break;
			case "projects":
				this.scrollByFuntionStatus();
				if (this.projectBreak >= window.innerWidth)
					window.scrollTo({ top: this.componentPositions[1] - 100, behavior: "smooth" });
				else window.scrollTo({ top: this.componentPositions[1], behavior: "smooth" });

				break;
			case "personal":
				this.scrollByFuntionStatus();
				if (this.projectBreak >= window.innerWidth)
					window.scrollTo({ top: this.componentPositions[2] - 100, behavior: "smooth" });
				else window.scrollTo({ top: this.componentPositions[2], behavior: "smooth" });
				break;
			case "contact":
				this.scrollByFuntionStatus();
				if (this.projectBreak >= window.innerWidth)
					window.scrollTo({ top: this.componentPositions[3] - 100, behavior: "smooth" });
				else window.scrollTo({ top: this.componentPositions[3] - 4, behavior: "smooth" });
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
