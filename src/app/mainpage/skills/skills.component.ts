import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { fromEvent, Observable, Subscription } from "rxjs";

@Component({
	selector: "app-skills",
	templateUrl: "./skills.component.html",
	styleUrls: ["./skills.component.scss"],
})
export class SkillsComponent implements OnInit {
	mobileClass: string = "";
	resizeObservable$!: Observable<Event>;
	resizeSubscription$!: any;

	constructor(public translate: TranslateService) {}

	ngOnInit(): void {
		if (navigator.userAgent.includes("Mobile")) this.mobileClass = "mobile";
		else this.mobileClass = "";
		if (window.innerWidth <= 646) {
			this.mobileClass = "mobile";
		} else {
			this.mobileClass = "";
		}
		this.resizeObservable$ = fromEvent(window, "resize");
		this.resizeSubscription$ = this.resizeObservable$.subscribe((evt: any) => {
			if (window.innerWidth <= 646) {
				this.mobileClass = "mobile";
			} else {
				this.mobileClass = "";
			}
		});
	}
}
