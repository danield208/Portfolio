import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
	selector: "app-personal-info",
	templateUrl: "./personal-info.component.html",
	styleUrls: ["./personal-info.component.scss"],
})
export class PersonalInfoComponent {
	personalData: Array<any> = [];
	arrayLenght!: number;

	constructor(public translate: TranslateService) {
		this.getPersonalData();
	}

	async getPersonalData() {
		await fetch("assets/data/personal.json")
			.then((response) => response.json())
			.then((json) => {
				Object.entries(json).forEach((key) => {
					this.personalData.push(key[1]);
				});
			});
		this.arrayLenght = this.personalData.length;
	}
}
