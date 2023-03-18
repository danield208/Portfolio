import { TranslateService } from "@ngx-translate/core";
import { Component } from "@angular/core";

@Component({
	selector: "app-skills",
	templateUrl: "./skills.component.html",
	styleUrls: ["./skills.component.scss"],
})
export class SkillsComponent {
	infobox: boolean = false;
	infoboxText: boolean = false;
	openInfoboxRunning: boolean = false;
	closeInfoboxRunning: boolean = false;
	classList: string = "";

	constructor(public translate: TranslateService) {}

	openInfobox() {
		if (!this.openInfoboxRunning && !this.infobox) {
			this.openInfoboxRunning = true;
			this.infobox = true;
			setTimeout(() => {
				this.infoboxText = true;
				this.classList = "active";
				this.openInfoboxRunning = false;
			}, 225);
		}
	}

	closeInfobox() {
		if (!this.closeInfoboxRunning && this.infobox) {
			setTimeout(() => {
				this.runCloseCode();
			}, 225);
		}
	}

	runCloseCode() {
		this.closeInfoboxRunning = true;
		setTimeout(() => {
			this.infoboxText = false;
			this.classList = "de_active";
			setTimeout(() => {
				this.infobox = false;
				this.classList = "";
				this.closeInfoboxRunning = false;
			}, 225);
		}, 225);
	}
}
