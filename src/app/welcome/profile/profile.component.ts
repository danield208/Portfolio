import { TranslateService } from "@ngx-translate/core";
import { Component, Input } from "@angular/core";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent {
	@Input() responsive_hide!: boolean;
	constructor(public translate: TranslateService) {}
}
