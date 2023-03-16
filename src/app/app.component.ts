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
	headerClass: string = "active";

	constructor(public translate: TranslateService) {
		// this language will be used as a fallback when a translation isn't found in the current language
		// translate.setDefaultLang('en');
		// the lang to use, if the lang isn't available, it will use the current loader to get them
		// translate.use('en');

		window.addEventListener("scroll", () => {
			let currentScroll = window.scrollY;
			// console.log(currentScroll);

			if (currentScroll > this.lastScroll && currentScroll > 180) {
				console.log("hide header");
			} else if (currentScroll < this.lastScroll) {
				if (currentScroll > 180) console.log("show header");
			}

			this.lastScroll = window.pageYOffset;
		});
	}
}
