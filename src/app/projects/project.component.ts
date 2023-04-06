import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
// import { trigger, state, style, animate, transition } from "@angular/animations";

@Component({
	selector: "app-project",
	template: `
		<!-- <h1 *ngIf="!responsive_hide">{{ Index + 1 }}</h1> -->
		<content>
			<div class="border"></div>
			<div class="main">
				<h2>{{ projectData.Title }}</h2>
				<img src="{{ projectData.ImgSrc }}" alt="projectImg" />
				<div class="projectInfo">
					<span>{{ "projects." + projectData.InfoText | translate }}</span>
					<span>{{ projectData.Particularities }}</span>
				</div>
				<div
					[@hoverAnimation]="InfoField ? 'mouseIn' : 'mouseOut'"
					class="hoverField"
					(click)="InfoField = !InfoField"
					#hoverField
				>
					&#x3c;
				</div>
				<div @moveIn *ngIf="InfoField" class="infoField" (click)="InfoField = !InfoField" #infoField>
					<a>GitHub</a>
					<a>WebSite</a>
					<a>###</a>
				</div>
			</div>
		</content>
	`,
	styleUrls: ["./project.component.scss"],
	animations: [
		// trigger("hoverAnimation", [
		// 	transition("mouseOut => mouseIn", [
		// 		style({ color: "white" }),
		// 		animate("225ms", style({ color: "rgba(255, 255, 255, 0)" })),
		// 	]),
		// 	state("mouseIn", style({ color: "rgba(255, 255, 255, 0)" })),
		// 	transition("mouseIn => mouseOut", [
		// 		style({ color: "rgba(255, 255, 255, 0)" }),
		// 		animate("225ms", style({ color: "white" })),
		// 	]),
		// 	state("mouseOut", style({ color: "white" })),
		// ]),
		// trigger("moveIn", [
		// 	transition(":enter", [
		// 		style({ right: "-120px", color: "rgba(255, 255, 255, 0)" }),
		// 		animate("225ms", style({ right: "0", color: "white" })),
		// 	]),
		// 	transition(":leave", [
		// 		style({ right: "0", color: "white" }),
		// 		animate("225ms", style({ right: "-120px", color: "rgba(255, 255, 255, 0)" })),
		// 	]),
		// ]),
	],
})
export class ProjectComponent implements AfterViewInit {
	responsive_hide!: boolean;
	mouseOver!: boolean;
	@Input() Index!: number;
	@Input() projectData: any = {};
	@ViewChild("hoverField") hoverField!: ElementRef;
	@ViewChild("infoField") infoField!: ElementRef;
	InfoField: boolean = false;

	constructor() {}

	ngAfterViewInit(): void {}
}
