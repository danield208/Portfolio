import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	title = "Portfolio";
	header: boolean = true;
	lastScroll: Number = 0;
	headerClass: string = "showState";

	constructor(public translate: TranslateService) {
		this.initHeaderAnimation();
	}

	initHeaderAnimation() {
		window.addEventListener("scroll", () => {
			let currentScroll = window.scrollY;
			if (this.isHeaderShwon(currentScroll)) this.hideHeader();
			else if (this.isHeaderHidden(currentScroll)) this.showHeader();
			this.lastScroll = window.pageYOffset;
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
}
