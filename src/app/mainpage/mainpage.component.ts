import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { trigger, state, style, animate, transition } from "@angular/animations";

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
export class MainpageComponent implements AfterViewInit {
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

	constructor(public translate: TranslateService) {}

	ngAfterViewInit(): void {
		this.initHeaderAnimation();
		this.setRootChilds();
		document.addEventListener("resize", () => {
			this.timeOuts.forEach((timout: number) => {
				clearTimeout(timout);
			});
			this.timeOuts.push(
				setTimeout(() => {
					this.setRootChilds();
				}, 100)
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
