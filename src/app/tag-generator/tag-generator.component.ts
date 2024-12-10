import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlockComponent } from '../code-block/code-block.component';

@Component({
  selector: 'app-tag-generator',
  standalone: true,
  imports: [CommonModule, CodeBlockComponent],
  templateUrl: './tag-generator.component.html',
  styleUrls: ['./tag-generator.component.css']
})
export class TagGeneratorComponent {
  @Input() formData!: () => any; // Signal for form data
  @Input() socialLinks!: () => any[]; // Signal for social platform data

  generatedTags = computed(() => {
    const tags = [];
    const formData = this.formData();
    const socialLinks = this.socialLinks();

    // Basic meta tags
    tags.push(`<title>${formData.title}</title>`);
    tags.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0">`);
    tags.push(`<meta charset="${formData.charset}">`);
    tags.push(`<meta name="author" content="${formData.author}">`);
    tags.push(`<meta name="description" content="${formData.description}">`);
    tags.push(`<meta name="keywords" content="${formData.keywords}">`);

    // Social platform-specific meta tags
    socialLinks.forEach(platform => {
      if (platform.name === 'Facebook') {
        tags.push(`<meta property="og:title" content="${platform.fields.title}">`);
        tags.push(`<meta property="og:description" content="${platform.fields.description}">`);
        tags.push(`<meta property="og:image" content="${platform.fields.image}">`);
      } else {
        tags.push(`<meta name="${platform.name.toLowerCase()}:title" content="${platform.fields.title}">`);
        tags.push(`<meta name="${platform.name.toLowerCase()}:description" content="${platform.fields.description}">`);
        tags.push(`<meta name="${platform.name.toLowerCase()}:image" content="${platform.fields.image}">`);
      }
    });

    return tags.join('\n');
  });

  generatedTagsString = signal('');

  generateTags() {
    this.generatedTagsString.set(this.generatedTags());
    console.log("button pressed")
  }
}
