import { Component, signal } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SocialLinksComponent } from "../social-links/social-links.component";
import { CommonModule } from '@angular/common';
import { TagGeneratorComponent } from '../tag-generator/tag-generator.component';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [HeaderComponent, SocialLinksComponent, CommonModule, TagGeneratorComponent],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  formData = signal({
    title: '',
    description: '',
    keywords: '',
    charset: '',
    author: ''
  });

  socialLinks = signal<any[]>([]);

  // Handle input changes dynamically
  updateFormField(field: string, value: string): void {
    this.formData.set({
      ...this.formData(),
      [field]: value
    });
  }

  handleInput(event: Event, field: string): void {
    const target = event.target as HTMLInputElement; // Type assertion here
    const value = target.value;
    this.updateFormField(field, value);
  }
  updateSocialLinks(updatedLinks: any[]): void {
    this.socialLinks.set(updatedLinks);
  }
}
