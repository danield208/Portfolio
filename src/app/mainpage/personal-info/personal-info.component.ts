import {Component, ElementRef, ViewChild} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {DataService} from "../../_service/data.service";

@Component({
	selector: "app-personal-info",
	templateUrl: "./personal-info.component.html",
	styleUrls: ["./personal-info.component.scss"],
	providers: [DataService],
})
export class PersonalInfoComponent {
	personalData: Array<any> = [];
	arrayLength!: number;
	@ViewChild('openCV') openCV!: ElementRef<HTMLLinkElement>
	isSafari =
		navigator.userAgent &&
		navigator.userAgent.indexOf('Apple') > -1 &&
		navigator.userAgent.indexOf('Windows') == -1


	constructor(public translate: TranslateService, private data: DataService) {
		this.getPersonalData();
		console.log(navigator.userAgent)
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
			if (this.isSafari) window.location.href = URL.createObjectURL(res)
			else window.open(URL.createObjectURL(res), "_blank")
		});
	}
}
