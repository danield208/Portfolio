import { TranslateService } from "@ngx-translate/core";
import { Component } from "@angular/core";

@Component({
	selector: "app-projects",
	template: `
		<h1 [innerHTML]="'projectTitle' | translate">###</h1>
		<main>
			<app-project *ngFor="let project of projects" [projectData]="project"></app-project>
		</main>
	`,
	styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent {
	projects: any[] = [];

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
}
