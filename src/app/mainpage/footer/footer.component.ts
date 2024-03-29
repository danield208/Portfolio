import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
	selector: "app-footer",
	template: `
		<div class="main">
			<nav>
				<a href="https://www.linkedin.com/in/daniel-d%C3%B6rbaum-71463a241" target="_blank">LinkedIn</a>
				<a href="https://github.com/danield208" target="_blank">GitHub</a>
			</nav>
			<div class="separator"></div>
			<nav>
				<a routerLink="/imprint">{{ "footer.imprint" | translate }}</a>
				<a routerLink="/dataprot">{{ "footer.privacypolicy" | translate }}</a>
			</nav>
		</div>
	`,
	styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
	constructor(public translate: TranslateService) {}
}
