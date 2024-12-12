import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlockComponent } from '../code-block/code-block.component';
import { MetaGeneratorService } from '../meta-generator.service';

@Component({
  selector: 'app-tag-generator',
  standalone: true,
  imports: [CommonModule, CodeBlockComponent],
  templateUrl: './tag-generator.component.html',
  styleUrls: ['./tag-generator.component.css']
})
export class TagGeneratorComponent {

  generateTags!:string;

  @Input() formData!: any;
  @Input() socialLinks!: any[];

  constructor(protected metaGenerator :MetaGeneratorService) {}

  // ngOnInit():void{}

  generatedTagsString = signal('');

  generatedTags() {
    // this.generatedTagsString.set('');
    this.generateTags=this.metaGenerator.generateMetaTags();
    console.log(this.generateTags)
    this.generatedTagsString.set(this.generateTags);}
}
