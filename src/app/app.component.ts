import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { trigger, state, style, animate, transition } from "@angular/animations";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
	animations: [
		trigger("fadeIn", [transition(":enter", [style({ top: "-40px" }), animate("225ms", style({ top: "10px" }))])]),
		trigger("fadeOut", [
			transition(":leave", [
				style({ top: "10px", opacity: "0.3" }),
				animate("225ms", style({ top: "-20px", opacity: "0" })),
			]),
		]),
	],
})
export class AppComponent implements AfterViewInit {
	title = "Portfolio";
	header: boolean = true;
	lastScroll: number = 0;
	headerClass: string = "showState";
	scrollByFunction: boolean = false;
	firstInit: number = 0;
	@ViewChild("appComponents") app_project!: ElementRef;
	root_DOM_Components_PositionY: Array<number> = [];
	timeOuts: Array<any> = [];
	headerArrow: boolean = false;
	headerArrow_symbol: string = "&#8744;";

	constructor(public translate: TranslateService) {
		this.initHeaderAnimation();
	}

	ngAfterViewInit(): void {
		this.setRootChilds();
		document.addEventListener("resize", () => {
			this.timeOuts.forEach((timout: number) => {
				clearTimeout(timout);
			});
			this.timeOuts.push(
				setTimeout(() => {
					this.setRootChilds();
				}, 400)
			);
		});
	}

	setRootChilds() {
		let components: Array<HTMLAllCollection> = Array.from(this.app_project.nativeElement.children);
		components.forEach((child: any) => {
			this.root_DOM_Components_PositionY.push(child.getBoundingClientRect().y + window.scrollY);
		});
	}

	initHeaderAnimation() {
		window.addEventListener("scroll", () => {
			this.firstInit++;
			if (!this.scrollByFunction && this.firstInit > 1) {
				let currentScroll = window.scrollY;
				if (this.isHeaderShwon(currentScroll)) this.hideHeader();
				else if (this.isHeaderHidden(currentScroll)) this.showHeader();
				this.lastScroll = window.pageYOffset;
			}
		});
	}

	isHeaderShwon(currentScroll: number) {
		return currentScroll > this.lastScroll && currentScroll > 180 && this.headerClass == "showState";
	}

	hideHeader() {
		this.headerClass = "animateUp";
		this.headerArrow_symbol = "&#8744;";
		setTimeout(() => {
			this.headerClass = "hideState";
			this.headerArrow = true;
		}, 225);
	}

	isHeaderHidden(currentScroll: number) {
		return currentScroll < this.lastScroll && currentScroll > 180 && this.headerClass == "hideState";
	}

	showHeader() {
		this.headerArrow_symbol = "&#8743;";
		setTimeout(() => {
			this.headerArrow = false;
		}, 20);
		this.headerClass = "animateDown";
		setTimeout(() => {
			this.headerClass = "showState";
		}, 225);
	}

	setScrollByFunctionValue(status: boolean) {
		this.scrollByFunction = status;
	}
}
