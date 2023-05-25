import { Component, Input, OnInit } from "@angular/core";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";

@Component({
	selector: "app-project",
	template: `
		<main>
			<h2>{{ projectData.Title }}</h2>
			<div class="container">
				<img src="{{ projectData.ImgSrc }}" alt="projectImg" />
				<content>
					<span [innerHTML]="InfoText"></span>
					<span>{{ projectData.Particularities }}</span>
				</content>
				<div>
					<nav>
						<a [href]="projectData.GithubLink" target="_blank">GitHub</a>
						<a [href]="projectData.SiteLink" target="_blank">WebSite</a>
					</nav>
				</div>
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
		setTimeout(()=>{
			this.checkLang(this.translate.currentLang);
		}, 200)
	}

	checkLang(currentLang: string) {
		if (currentLang == "de") {
			this.InfoText = this.projectData.InfoText.de;
		} else {
			this.InfoText = this.projectData.InfoText.en;
		}
	}
}
