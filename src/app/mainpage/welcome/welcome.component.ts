import { TranslateService } from "@ngx-translate/core";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-welcome",
	templateUrl: "./welcome.component.html",
	styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent {
	skillinfos: boolean = false;

	constructor(public translate: TranslateService, public router: Router) {
		router.events.subscribe((val) => {
			let res: any = val;
			if (res.url === "/skillinfos") this.skillinfos = true;
			else if (res.url === undefined) return;
			else this.skillinfos = false;
		});

		this.initEventListener();
	}

	initEventListener() {}
}
