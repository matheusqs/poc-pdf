import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public gerarPDF(): void {
    const doc = new jsPDF();

    doc.html(document.getElementById('PDF'), {
      html2canvas: {
        scale: 0.4,
      },
      callback: (docNew) => {
        docNew.save('contrato.pdf');
      },
      x: 0,
      y: 0,
    });
  }
}
