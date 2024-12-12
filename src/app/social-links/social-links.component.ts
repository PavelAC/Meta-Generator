import { Component, computed, signal, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.css'
})
export class SocialLinksComponent {
  @Output() selectedLinks = new EventEmitter<any[]>();

  socialPlatforms = signal([
    {
      name: 'Facebook',
      selected: false,
      fields: {
        title: '',
        description: '',
        image: '',
      },
    },
    {
      name: 'Twitter',
      selected: false,
      fields: {
        title: '',
        description: '',
        image: '',
      },
    },
  ]);

 selectedPlatforms = computed(() =>
  this.socialPlatforms().filter(platform => platform.selected)
);

togglePlatform(platformName: string): void {
  const updatedPlatforms = this.socialPlatforms().map(platform =>
    platform.name === platformName
      ? { ...platform, selected: !platform.selected }
      : platform
  );
  this.socialPlatforms.set(updatedPlatforms);

  this.selectedLinks.emit(this.selectedPlatforms());
}
}
