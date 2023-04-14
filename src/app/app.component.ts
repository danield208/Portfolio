import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
	selector: "app-root",
	template: `<router-outlet></router-outlet>`,
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	languages: Array<string> = ["en", "de"];

	constructor(public translate: TranslateService) {}

	ngOnInit(): void {
		this.downloadLangJSONs();
	}

	downloadLangJSONs() {
		this.languages.forEach((lang) => {
			this.translate.getTranslation(lang);
		});
	}
}
