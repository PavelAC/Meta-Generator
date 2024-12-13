import { Component, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-code-block',
  standalone: true,
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.css'],
  providers: [Clipboard]
})
export class CodeBlockComponent implements OnChanges {
  @Input() code!: string; // The code content to display
  @Input() language: string = 'html'; // The language for syntax highlighting (default: HTML)

  constructor(
    private el: ElementRef,
    private clipboard: Clipboard
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['code']) {
      this.updateCodeContent();
    }
  }

  private updateCodeContent() {
    const codeElement = this.el.nativeElement.querySelector('code');
    if (codeElement) {
      codeElement.textContent = this.code; // Set the code content
    }
  }

  // copyCode() {
  //   const codeToCopy = this.generatedTagsString();
  //   if (codeToCopy) {
  //     this.clipboard.copy(codeToCopy);
  //     console.log('Code copied to clipboard!');
  //   } else {
  //     console.warn('No code available to copy.');
  //   }
  // }

  copyCode() {
    this.clipboard.copy(this.code);
  } 
}