import { TranslateService } from "@ngx-translate/core";
import { Component } from "@angular/core";

@Component({
	selector: "app-welcome",
	templateUrl: "./welcome.component.html",
	styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent {
	constructor(public translate: TranslateService) {}
}
