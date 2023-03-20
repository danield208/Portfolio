import { TranslateService } from "@ngx-translate/core";
import { Component } from "@angular/core";

@Component({
	selector: "app-projects",
	templateUrl: "./projects.component.html",
	styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent {
	projects: any[] = [];

	infoBox: boolean = false;
	infoBoxClass: string = "";

	constructor(public translate: TranslateService) {
		this.fetchProjectsJson();
	}

	async fetchProjectsJson() {
		await fetch("assets/data/projects.json")
			.then((response) => response.json())
			.then((json) => {
				Object.entries(json).forEach((key) => {
					this.projects.push(key[1]);
				});
			});
	}

	openInfo() {
		console.log("runing");
		this.infoBox = true;
		this.infoBoxClass = "open";
		setTimeout(() => {
			this.infoBoxClass = "active";
		}, 225);
		setTimeout(() => {
			this.infoBoxClass = "active close";
			setTimeout(() => {
				this.infoBox = false;
			}, 225);
		}, 2500);
	}
}
