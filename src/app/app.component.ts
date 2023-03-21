import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
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
		console.log(this.root_DOM_Components_PositionY);
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

	isHeaderShwon(currentScroll: Number) {
		return currentScroll > this.lastScroll && currentScroll > 180 && this.headerClass == "showState";
	}

	hideHeader() {
		this.headerClass = "animateUp";
		setTimeout(() => {
			this.headerClass = "hideState";
		}, 225);
	}

	isHeaderHidden(currentScroll: Number) {
		return currentScroll < this.lastScroll && currentScroll > 180 && this.headerClass == "hideState";
	}

	showHeader() {
		this.headerClass = "animateDown";
		setTimeout(() => {
			this.headerClass = "showState";
		}, 225);
	}

	setScrollByFunctionValue(status: boolean) {
		this.scrollByFunction = status;
	}
}
