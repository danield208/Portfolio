import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { trigger, state, style, animate, transition } from "@angular/animations";
import { Observable, Subscription, first, fromEvent } from "rxjs";

@Component({
	selector: "app-mainpage",
	templateUrl: "./mainpage.component.html",
	styleUrls: ["./mainpage.component.scss"],
	animations: [
		trigger("fadeInOut", [
			transition(":enter", [style({ top: "-80px" }), animate("225ms", style({ top: "18px" }))]),
			transition(":leave", [style({ top: "18px" }), animate("225ms", style({ top: "-80px" }))]),
		]),
	],
})
export class MainpageComponent implements AfterViewInit, OnInit, OnDestroy {
	title = "Portfolio";
	header: boolean = true;
	lastScroll: number = 0;
	headerClass!: string;
	scrollByFunction: boolean = false;
	firstInit: number = 0;
	@ViewChild("appComponents") app_project!: ElementRef;
	root_DOM_Components_PositionY: Array<number> = [];
	timeOuts: Array<any> = [];
	headerArrow: boolean = false;
	headerArrow_symbol: string = "&#8744;";
	resizeObservable$!: Observable<Event>;
	resizeSubscription$!: Subscription;

	constructor(public translate: TranslateService) {}

	ngOnInit(): void {
		this.resizeObservable$ = fromEvent(window, "resize");
		this.resizeSubscription$ = this.resizeObservable$.subscribe((evt: any) => {
			this.root_DOM_Components_PositionY = [];
			this.setRootChilds();
		});
	}

	ngOnDestroy(): void {
		this.resizeSubscription$.unsubscribe();
	}

	ngAfterViewInit(): void {
		this.initHeaderAnimation();
		setTimeout(() => {
			this.setRootChilds();
		}, 200);
	}

	toggleMobileMenu(status: boolean) {
		this.root_DOM_Components_PositionY = [];
		if (status) this.setRootChilds();
	}

	setRootChilds() {
		let components: Array<HTMLAllCollection> = Array.from(this.app_project.nativeElement.children);
		components.forEach((child: any) => {
			this.root_DOM_Components_PositionY.push(child.offsetTop);
		});
	}

	initHeaderAnimation() {
		window.addEventListener("scroll", () => {
			if (!this.scrollByFunction && this.firstInit > 0) {
				let currentScroll = window.scrollY;
				if (this.isHeaderShwon(currentScroll)) this.hideHeader();
				else if (this.isHeaderHidden(currentScroll)) this.showHeader();
				this.lastScroll = window.pageYOffset;
			}
			this.firstInit = 1;
		});
	}

	isHeaderShwon(currentScroll: number) {
		return currentScroll > this.lastScroll && currentScroll > 180 && this.header;
	}

	hideHeader() {
		this.headerArrow_symbol = "&#8744;";
		this.header = false;
	}

	isHeaderHidden(currentScroll: number) {
		return currentScroll < this.lastScroll && currentScroll > 180 && !this.header;
	}

	showHeader() {
		this.headerArrow_symbol = "&#8743;";
		setTimeout(() => {
			this.header = true;
		}, 10);
	}

	setScrollByFunctionValue(status: boolean) {
		this.scrollByFunction = status;
	}
}
