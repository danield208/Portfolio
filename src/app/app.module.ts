import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./mainpage/header/header.component";
import { WelcomeComponent } from "./mainpage/welcome/welcome.component";
import { ProjectsComponent } from "./mainpage/projects/projects.component";
import { ContactComponent } from "./mainpage/contact/contact.component";
import { FooterComponent } from "./mainpage/footer/footer.component";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateLoader } from "@ngx-translate/core";
import { PersonalInfoComponent } from "./mainpage/personal-info/personal-info.component";
import { ProjectComponent } from "./mainpage/projects/project.component";
import { SkillsComponent } from "./mainpage/skills/skills.component";
import { MainpageComponent } from "./mainpage/mainpage.component";
import { ImprintComponent } from "./imprint/imprint.component";
import { DataprotectComponent } from "./dataprotect/dataprotect.component";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		WelcomeComponent,
		ProjectsComponent,
		ContactComponent,
		FooterComponent,
		PersonalInfoComponent,
		ProjectComponent,
		SkillsComponent,
		MainpageComponent,
		ImprintComponent,
		DataprotectComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		ReactiveFormsModule,
		TranslateModule.forRoot({
			defaultLanguage: "de",
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		}),
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
