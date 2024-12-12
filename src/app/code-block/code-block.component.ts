import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-code-block',
  standalone: true,
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.css'],
  providers: [Clipboard]
})
export class CodeBlockComponent implements AfterViewInit {
  @Input() code: string = '';
  @Input() language: string = 'html';

  constructor(private el: ElementRef, private clipboard: Clipboard) {}

  ngAfterViewInit() {
    this.setCodeContent();
  }

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
