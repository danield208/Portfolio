import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { trigger, state, style, animate, transition } from "@angular/animations";

@Component({
	selector: "app-project",
	template: `
		<h1 *ngIf="!responsive_hide">{{ Index + 1 }}</h1>
		<content>
			<h2>{{ projectData.Title }}</h2>
			<img src="{{ projectData.ImgSrc }}" alt="projectImg" />
			<div class="projectInfo">
				<span>{{ "projects." + projectData.InfoText | translate }}</span>
				<span>{{ projectData.Particularities }}</span>
			</div>
			<div [@hoverAnimation]="mouseOver ? 'mouseIn' : 'mouseOut'" class="hoverField" #hoverField>Lorem</div>
		</content>
	`,
	styleUrls: ["./project.component.scss"],
	animations: [
		trigger("hoverAnimation", [
			transition("mouseOut => mouseIn", [style({ scale: 1 }), animate("225ms", style({ scale: 1.2 }))]),
			state("mouseIn", style({ scale: "1.2" })),
			transition("mouseIn => mouseOut", [style({ scale: 1.2 }), animate("225ms", style({ scale: 1 }))]),
			state("mouseOut", style({ scale: "1.0" })),
		]),
	],
})
export class ProjectComponent implements AfterViewInit {
	responsive_hide!: boolean;
	mouseOver!: boolean;
	@Input() Index!: number;
	@Input() projectData: any = {};
	@ViewChild("hoverField") hoverField!: ElementRef;

	constructor() {}

	ngAfterViewInit(): void {
		this.hoverField.nativeElement.addEventListener("mouseenter", () => {
			this.mouseOver = true;
		});
		this.hoverField.nativeElement.addEventListener("mouseleave", () => {
			this.mouseOver = false;
		});
	}
}
