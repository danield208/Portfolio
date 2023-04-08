import { Component, Input, OnInit } from "@angular/core";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";

@Component({
	selector: "app-project",
	template: `
		<main>
			<h2>{{ projectData.Title }}</h2>
			<img src="{{ projectData.ImgSrc }}" alt="projectImg" />
			<content>
				<span>{{ InfoText }}</span>
				<span>{{ projectData.Particularities }}</span>
			</content>
			<div>
				<nav>
					<a [href]="">GitHub</a>
					<a href="{{ projectData.SiteLink }}" target="_blank">WebSite</a>
				</nav>
			</div>
		</main>
	`,
	styleUrls: ["./project.component.scss"],
})
export class ProjectComponent implements OnInit {
	@Input() projectData: any = {};
	InfoText: string = "";
	observeLangChange!: any;

	constructor(private translate: TranslateService) {}

	ngOnInit(): void {
		this.observeLangChange = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			this.checkLang(event.lang);
		});
		console.log(
			this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
				this.checkLang(event.lang);
			})
		);
		this.checkLang(this.translate.currentLang);
	}

	checkLang(currentLang: string) {
		if (currentLang == "de") {
			this.InfoText = this.projectData.InfoText.de;
		} else {
			this.InfoText = this.projectData.InfoText.en;
		}
	}
}
