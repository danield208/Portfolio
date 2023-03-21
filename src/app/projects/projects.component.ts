import { TranslateService } from "@ngx-translate/core";
import { Component } from "@angular/core";

@Component({
	selector: "app-projects",
	templateUrl: "./projects.component.html",
	styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent {
	projects: any[] = [];
	responsive_hide: boolean;
	infoBox: boolean = false;
	infoBoxClass: string = "";

	constructor(public translate: TranslateService) {
		this.fetchProjectsJson();
		if (window.innerWidth < 529) this.responsive_hide = true;
		else this.responsive_hide = false;
		this.initEventListener();
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

	initEventListener() {
		window.addEventListener("resize", () => {
			if (window.innerWidth < 529) this.responsive_hide = true;
			else this.responsive_hide = false;
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
