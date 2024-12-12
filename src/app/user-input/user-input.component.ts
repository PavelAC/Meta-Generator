import { Component, signal } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SocialLinksComponent } from "../social-links/social-links.component";
import { CommonModule } from '@angular/common';
import { TagGeneratorComponent } from '../tag-generator/tag-generator.component';
import { MetaGeneratorService } from '../meta-generator.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [HeaderComponent, SocialLinksComponent, CommonModule, TagGeneratorComponent],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {

  constructor(protected metaGenerator :MetaGeneratorService) {}

 get formData() {return this.metaGenerator.getFormData();}
 get socialLinks() {return this.metaGenerator.getSocialLinks()};

  handleInput(event: Event, field: string): void {
    const target = event.target as HTMLInputElement;
    this.metaGenerator.updateFormData(field, target.value);
  }

  updateSocialLinks(updatedLinks: any[]): void {
    this.metaGenerator.updateSocialLinks(updatedLinks);
  }

}
