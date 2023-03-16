import { TranslateService } from "@ngx-translate/core";
import { Component, ViewChild } from "@angular/core";

@Component({
	selector: "app-contact",
	templateUrl: "./contact.component.html",
	styleUrls: ["./contact.component.scss"],
})
export class ContactComponent {
	@ViewChild("contactform") contactform!: any;
	@ViewChild("nameField") nameField!: any;
	@ViewChild("mailField") mailField!: any;
	@ViewChild("messageField") messageField!: any;
	@ViewChild("formButton") formButton!: any;

	constructor(public translate: TranslateService) {}

	async sendMail() {
		console.log(this.contactform);
		this.nameField.nativeElement.disabled = true;
		this.mailField.nativeElement.disabled = true;
		this.messageField.nativeElement.disabled = true;
		this.formButton.nativeElement.disabled = true;

		let formdata = new FormData();
		formdata.append("name", this.nameField.value);
		formdata.append("message", this.messageField.value);

		// send
		await fetch("https://daniel-doerbaum.developerakademie.net/Portfolio/sendMail/send_mail.php", {
			method: "POST",
			body: formdata,
		});

		this.nameField.nativeElement.disabled = false;
		this.mailField.nativeElement.disabled = false;
		this.messageField.nativeElement.disabled = false;
		this.formButton.nativeElement.disabled = false;
	}
}
