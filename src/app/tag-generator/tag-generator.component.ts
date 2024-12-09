import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag-generator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag-generator.component.html',
  styleUrl: './tag-generator.component.css'
})
export class TagGeneratorComponent {
  @Input() formData!: () => any; // Signal for form data
  @Input() socialLinks!: () => any[]; // Signal for social platform data

  // Computed signal to generate meta tags
  generatedTags = computed(() => {
    const tags = [];
    const formData = this.formData();
    const socialLinks = this.socialLinks();

    // Basic meta tags
    tags.push(`<meta charset="${formData.charset}">`);
    tags.push(`<meta name="author" content="${formData.author}">`);
    tags.push(`<meta name="description" content="${formData.description}">`);
    tags.push(`<meta name="keywords" content="${formData.keywords}">`);

    // Social platform-specific meta tags
    socialLinks.forEach(platform => {
      tags.push(`<meta name="${platform.name.toLowerCase()}:title" content="${platform.fields.title}">`);
      tags.push(`<meta name="${platform.name.toLowerCase()}:description" content="${platform.fields.description}">`);
      tags.push(`<meta name="${platform.name.toLowerCase()}:image" content="${platform.fields.image}">`);
    });

    return tags;
  });

  generateTags(): void {
    console.log('Generated Meta Tags:', this.generatedTags());
  }
}
