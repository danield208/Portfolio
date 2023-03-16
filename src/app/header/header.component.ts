import { TranslateService } from "@ngx-translate/core";
import { Component } from "@angular/core";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
	constructor(public translate: TranslateService) {
		// this language will be used as a fallback when a translation isn't found in the current language
		// translate.setDefaultLang('en');
		// the lang to use, if the lang isn't available, it will use the current loader to get them
		// translate.use('en');
	}

	changeLang(lang: Event) {
		let target = lang.target as HTMLSpanElement;
		let siblings = target.parentElement?.querySelectorAll("span");

		this.translate.use(target.attributes[1].value);

		siblings?.forEach((elem) => {
			if (elem.classList.value == "") {
				elem.classList.value = "active";
			} else {
				elem.classList.value = "";
			}
		});
	}
}
