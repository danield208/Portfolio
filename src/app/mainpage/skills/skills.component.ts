import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
	selector: "app-skills",
	templateUrl: "./skills.component.html",
	styleUrls: ["./skills.component.scss"],
})
export class SkillsComponent implements OnInit {
	mobileClass: string = "";

	constructor(public translate: TranslateService) {}

	ngOnInit(): void {
		if (navigator.userAgent.includes("Mobile")) this.mobileClass = "mobile";
		else this.mobileClass = "";
	}
}
