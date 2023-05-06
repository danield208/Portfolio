import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {DataService} from "../../_service/data.service";
import {Data} from "@angular/router";

@Component({
	selector: "app-personal-info",
	templateUrl: "./personal-info.component.html",
	styleUrls: ["./personal-info.component.scss"],
	providers: [DataService],
})
export class PersonalInfoComponent {
	personalData: Array<any> = [];
	arrayLenght!: number;

	constructor(public translate: TranslateService, private data: DataService) {
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

	showCV(url: string) {
		this.data.downloadPDF(url).subscribe(res => {
			const fileURL = URL.createObjectURL(res);
			window.open(fileURL, '_blank');
		});
	}
}
