import { Component, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-code-block',
  standalone: true,
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.css'],
  providers: [Clipboard]
})
export class CodeBlockComponent{
  @Input() code: string = '';
  @Input() language: string = 'html';

  constructor(private el: ElementRef, private clipboard: Clipboard) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['code']) {
      this.setCodeContent();
    }
  }

  // This function updates the code content in the DOM
  setCodeContent() {
    const codeElement = this.el.nativeElement.querySelector('code');
    if (codeElement) {
      codeElement.textContent = this.code;
    }
  }

  copyCode() {
    this.clipboard.copy(this.code);
  }
}
