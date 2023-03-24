import { TranslateService } from "@ngx-translate/core";
import { Component } from "@angular/core";

@Component({
	selector: "app-projects",
	template: `
		<h1 [innerHTML]="'projects.title' | translate">###</h1>
		<main>
			<app-project
				*ngFor="let project of projects; let Index = index"
				[projectData]="project"
				[Index]="Index"
			></app-project>
		</main>
	`,
	styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent {
	projects: any[] = [];
	responsive_hide: boolean;

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
}
