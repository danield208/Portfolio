import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./header/header.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { SkillsComponent } from "./welcome/profile/skills/skills.component";
import { ProjectsComponent } from "./projects/projects.component";
import { ProfileComponent } from "./welcome/profile/profile.component";
import { ContactComponent } from "./contact/contact.component";
import { FooterComponent } from "./footer/footer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsersettingsComponent } from "./usersettings.component";
import { TranslateLoader } from "@ngx-translate/core";
import { PersonalInfoComponent } from './personal-info/personal-info.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		WelcomeComponent,
		SkillsComponent,
		ProjectsComponent,
		ProfileComponent,
		ContactComponent,
		FooterComponent,
		UsersettingsComponent,
  PersonalInfoComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
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
