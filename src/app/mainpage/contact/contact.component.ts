import { TranslateService } from "@ngx-translate/core";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { trigger, state, style, animate, transition } from "@angular/animations";

@Component({
	selector: "app-contact",
	templateUrl: "./contact.component.html",
	styleUrls: ["./contact.component.scss"],
	animations: [
		trigger("fadeInOut", [
			transition(":enter", [style({ opacity: "0" }), animate("225ms", style({ opacity: "1" }))]),
			transition(":leave", [style({ opacity: "1" }), animate("225ms", style({ opacity: "0" }))]),
		]),
	],
})
export class ContactComponent implements OnInit {
	@ViewChild("contactform") contactform!: any;
	@ViewChild("nameField") nameField!: any;
	@ViewChild("mailField") mailField!: any;
	@ViewChild("messageField") messageField!: any;
	@ViewChild("formButton") formButton!: any;
	form!: FormGroup;
	validator: string = "VALID";
	successWindow: boolean = false;

	constructor(public translate: TranslateService) {}

	ngOnInit(): void {
		this.form = new FormGroup({
			name: new FormControl(null, Validators.required),
			email: new FormControl(null, [
				Validators.required,
				Validators.pattern(
					/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i
				),
			]),
			message: new FormControl(null, Validators.required),
		});
	}

	checkFormValidation(): boolean | void {
		if (this.form.status === "VALID") return true;
		else false;
	}

	async sendMail() {
		this.successWindow = true;
		setTimeout(() => {
			this.form.reset();
		}, 1000);
		setTimeout(() => {
			this.successWindow = false;
		}, 1500);

		let formData = new FormData();
		formData.append("name", this.form.value.name + " " + this.form.value.email);
		formData.append("message", this.form.value.message);

		await fetch("https://danieldoerbaum.de/send_mail.php", {
			method: "POST",
			body: formData,
		});
	}
}
