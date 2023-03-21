import { TranslateService } from "@ngx-translate/core";
import { Component } from "@angular/core";

@Component({
	selector: "app-welcome",
	templateUrl: "./welcome.component.html",
	styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent {
	responsive_hide: boolean;
	imgSrc: string;

	constructor(public translate: TranslateService) {
		if (window.innerWidth < 529) {
			this.responsive_hide = true;
			this.imgSrc = "./assets/images/mann.png";
		} else {
			this.responsive_hide = false;
			this.imgSrc = "./assets/images/test.png";
		}

		this.initEventListener();
	}

	initEventListener() {
		window.addEventListener("resize", () => {
			if (window.innerWidth < 529) {
				this.responsive_hide = true;
				this.imgSrc = "./assets/images/mann.png";
			} else {
				this.responsive_hide = false;
				this.imgSrc = "./assets/images/test.png";
			}
		});
	}
}
