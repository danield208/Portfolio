import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    SkillsComponent,
    ProjectsComponent,
    SocialMediaComponent,
    ProfileComponent,
    ContactComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
