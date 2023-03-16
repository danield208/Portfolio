import { TranslateService } from "@ngx-translate/core";
import { Component } from "@angular/core";

@Component({
	selector: "app-skills",
	templateUrl: "./skills.component.html",
	styleUrls: ["./skills.component.scss"],
})
export class SkillsComponent {
	infobox: boolean = false;
	classList: string = "";

	constructor(public translate: TranslateService) {}

	openInfobox() {
		this.infobox = true;
		setTimeout(() => {
			this.classList = "active";
		}, 225);
	}

	closeInfobox() {
		this.classList = "de_active";
		setTimeout(() => {
			this.infobox = false;
			this.classList = "";
		}, 225);
	}
}
