import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
	selector: "app-footer",
	template: `
		<content>
			<a>Instagram</a>
			<a>GitHub</a>
		</content>
		<div class="separator"></div>
		<content>
			<a>Impressum</a>
			<a>Datenschutzerklärung</a>
		</content>
	`,
	styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
	constructor(public translate: TranslateService) {}
}
