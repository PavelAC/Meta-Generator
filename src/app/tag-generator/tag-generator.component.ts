import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlockComponent } from '../code-block/code-block.component';
import { MetaGeneratorService } from '../meta-generator.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-tag-generator',
  standalone: true,
  imports: [CommonModule, CodeBlockComponent],
  templateUrl: './tag-generator.component.html',
  styleUrls: ['./tag-generator.component.css']
})
export class TagGeneratorComponent {
  @Input() formData!: any;
  @Input() socialLinks!: any[];

  generatedTagsString = signal(''); 

  constructor(
    protected metaGenerator: MetaGeneratorService,
    private clipboard: Clipboard
  ) {}

  generateTags() {
    const generated = this.metaGenerator.generateMetaTags();
    console.log(generated);
    this.generatedTagsString.set(generated); // Update the signal
  }
}
