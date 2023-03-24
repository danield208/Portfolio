import { TranslateService } from "@ngx-translate/core";
import { Component, Input } from "@angular/core";

@Component({
	selector: "app-profile",
	template: `
		<div>
			<img *ngIf="!responsive_hide" src="./assets/images/mann.png" alt="profilbild" />
			<span [innerHTML]="'profile' | translate">###</span>
		</div>

		<app-skills></app-skills>
	`,
	styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent {
	@Input() responsive_hide!: boolean;
	constructor(public translate: TranslateService) {}
}
