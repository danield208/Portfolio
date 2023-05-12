import {Component, ElementRef, ViewChild} from "@angular/core";
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
	arrayLength!: number;
	cvLink!: any;
	@ViewChild('openCV') openCV!: ElementRef<HTMLLinkElement>

	constructor(public translate: TranslateService, private data: DataService) {
		this.getPersonalData();
	}

	async getPersonalData() : Promise<void> {
		await fetch("assets/data/personal.json")
			.then((response) => response.json())
			.then((json) => {
				Object.entries(json).forEach((key) => {
					this.personalData.push(key[1]);
				});
			});
		this.arrayLength = this.personalData.length;
	}

	showCV(url: string) {
		this.data.downloadPDF(url).subscribe(res  => {
			this.openCV.nativeElement.setAttribute('href', URL.createObjectURL(res))
			this.openCV.nativeElement.click()
		});
	}
}
