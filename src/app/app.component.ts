import { Component, ElementRef, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';

interface RowProps {
  value: string;
  title: string;
  x: number;
  y: number;
  yText: number;
  heightCell: number;
  widthCell: number;
}

interface ParagraphProps {
  x: number;
  y: number;
  paragraphs: string[];
  maxWidth?: number;
}

interface TitleProps {
  x: number;
  y: number;
  width: number;
  text: string;
  backgroundColor?: '#f2f2f2' | '#bfbfbf';
  borderColor?: string;
  isCenter?: boolean;
  fontSize?: number;
  isBold?: boolean;
}

interface LineProps {
  y: number;
  height: number;
}

interface PageNumberProps {
  number: number;
  employeeName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'html-to-pdf';

  public gerarPDF(): void {
    const TOTAL = 210;
    const TOTAL_WITHOUT_MARGIN = TOTAL - 30;
    const COLUMN_PAGE_GAP = 10;
    const doc = new jsPDF();

    this.setHeaderPage(doc);

    this.setHeaderInfoTable(TOTAL_WITHOUT_MARGIN, doc, COLUMN_PAGE_GAP);

    doc.setFontSize(10);
    doc.setFillColor('#bfbfbf');
    doc.setDrawColor('#000000');

    this.insertTitle(doc, {
      x: 10,
      y: 80,
      width: TOTAL_WITHOUT_MARGIN / 2,
      text: 'TERMOS E CONDIÇÕES',
      backgroundColor: '#bfbfbf',
      borderColor: '#000000',
      isCenter: true,
      fontSize: 10,
    });

    this.insertLine(doc, TOTAL_WITHOUT_MARGIN, COLUMN_PAGE_GAP, {
      y: 80,
      height: 195,
    });

    this.insertTitle(doc, {
      x: 10 + TOTAL_WITHOUT_MARGIN / 2 + COLUMN_PAGE_GAP,
      y: 80,
      width: TOTAL_WITHOUT_MARGIN / 2,
      text: 'TERMS AND CONDITIONS',
      backgroundColor: '#bfbfbf',
      borderColor: '#000000',
      isCenter: true,
      fontSize: 10,
    });

    this.insertFisrtSection(doc, TOTAL_WITHOUT_MARGIN, COLUMN_PAGE_GAP);

    this.insertSecondSection(doc, TOTAL_WITHOUT_MARGIN, COLUMN_PAGE_GAP);

    this.insertThirdSection(doc, TOTAL_WITHOUT_MARGIN, COLUMN_PAGE_GAP);

    this.insertPageNumber(doc, TOTAL_WITHOUT_MARGIN, {
      number: 1,
      employeeName: 'Employee Name',
    });

    doc.addPage();

    const thirdSectionLastParagraphsPortuguese = [
      'Proteção tributária: Após o fechamento das declarações fiscais do Home e do Host será fornecido o Tax Protection no intuito de compensar qualquer perda tributária entre o que teria sido gasto no país de origem e o que foi efetivamente pago de impostos no país de destino. Para definição de eventual valor devido pela VALE ao colaborador, será considerada no cálculo a restituição de Imposto de Renda a ser depositada/ já depositada no país de destino.',
      ' ',
      'Remuneração Variável: Elegível ao programa de Remuneração Variável do país de origem, considerando salários e targets da referida localidade de origem. A empresa se reserva do direito de mudar os termos deste programa de remuneração variável e metas individuais periodicamente.',
      ' ',
      'Incentivos de Longo Prazo: De acordo com os programas da Vale vigentes para o seu nível hierárquico.',
    ];

    this.insertParagraphs(doc, {
      x: 10,
      y: 15,
      paragraphs: thirdSectionLastParagraphsPortuguese,
      maxWidth: TOTAL_WITHOUT_MARGIN / 2 + 8,
    });

    this.insertLine(doc, TOTAL_WITHOUT_MARGIN, COLUMN_PAGE_GAP, {
      y: 15,
      height: 250,
    });

    const thirdSectionLastParagraphsEnglish = [
      'Tax Protection: After income tax is informed in both home and host location, it will be offered a tax protection to compensate loss between what would have been paid in home location and what was actually paid in host location. For the definition of any amount owed to the employee by VALE, it will be considered the calculation for the income tax refund to be deposited / already deposited in the host country.',
      ' ',
      'Variable Pay: Eligible to home country variable compensation plan, considering salary and targets of home location. The Company reserves the right to change the terms of its variable pay plan and company and individual performance targets from time to time.',
      ' ',
      'Long Term Incentives: According to Vale programs in place for your hierarchic level.',
    ];

    this.insertParagraphs(doc, {
      x: 10 + 2 + TOTAL_WITHOUT_MARGIN / 2 + COLUMN_PAGE_GAP,
      y: 15,
      paragraphs: thirdSectionLastParagraphsEnglish,
      maxWidth: TOTAL_WITHOUT_MARGIN / 2 - 8,
    });

    doc.output('pdfobjectnewwindow');
  }

  private insertThirdSection(
    doc: jsPDF,
    TOTAL_WITHOUT_MARGIN: number,
    COLUMN_PAGE_GAP: number
  ) {
    const BASE_X = 10;
    const BASE_Y = 245;

    this.insertTitle(doc, {
      x: BASE_X,
      y: BASE_Y,
      text: '3. Pacote de Remuneração',
      width: TOTAL_WITHOUT_MARGIN / 2,
      backgroundColor: '#f2f2f2',
      borderColor: '#f2f2f2',
      fontSize: 9,
      isBold: true,
    });

    const paragraphsPortuguese = [
      'Para definição do seu salário anual no país de destino, serão considerados os valores contidos no Balance Sheet (anexo).',
      ' ',
      'Salário-Host: Composto pelo salário base Home ajustado pelo custo e qualidade de vida, quando aplicáveis. O valor considerado é liquido de impostos e pago no host location.',
    ];

    this.insertParagraphs(doc, {
      x: BASE_X + 2,
      y: BASE_Y + 13,
      paragraphs: paragraphsPortuguese,
      maxWidth: TOTAL_WITHOUT_MARGIN / 2 + 8,
    });

    doc.rect(BASE_X, BASE_Y, 0, 8);

    this.insertTitle(doc, {
      x: BASE_X + TOTAL_WITHOUT_MARGIN / 2 + COLUMN_PAGE_GAP,
      y: BASE_Y,
      text: '3. Remuneration package',
      width: TOTAL_WITHOUT_MARGIN / 2,
      backgroundColor: '#f2f2f2',
      borderColor: '#f2f2f2',
      fontSize: 9,
      isBold: true,
    });

    const paragraphsEnglish = [
      'For the definition of your annual salary overseas, it will be taken in consideration values from Balance Sheet (attached).',
      ' ',
      'Host-Compensation: Composed by home based salary adjusted accordingly cost of living in host location and quality of living, when applicable. This value is net of taxes and paid in host location.',
    ];

    this.insertParagraphs(doc, {
      x: BASE_X + 2 + TOTAL_WITHOUT_MARGIN / 2 + COLUMN_PAGE_GAP,
      y: BASE_Y + 13,
      paragraphs: paragraphsEnglish,
      maxWidth: TOTAL_WITHOUT_MARGIN / 2 + 8,
    });
  }

  private insertSecondSection(
    doc: jsPDF,
    TOTAL_WITHOUT_MARGIN: number,
    COLUMN_PAGE_GAP: number
  ) {
    const BASE_X = 10;
    const BASE_Y = 165;

    this.insertTitle(doc, {
      x: BASE_X,
      y: BASE_Y,
      text: '2. Pagamento da Remuneração',
      width: TOTAL_WITHOUT_MARGIN / 2,
      backgroundColor: '#f2f2f2',
      borderColor: '#f2f2f2',
      fontSize: 9,
      isBold: true,
    });

    const paragraphsPortuguese = [
      'A remuneração da sua designação internacional será paga na localidade de destino de acordo com o estabelecido no Balance Sheet (anexo).',
      ' ',
      'Juntamente com sua remuneração mensal você receberá o Adicional de Transferência que será composto pelos itens de Custo de Vida (CoL), Qualidade de Vida (Hardship) e de Transição (Transition). A soma dos subitens será de no mínimo 25% sobre o salário bruto anual.',
      'De acordo com informações prestadas pela Vale: (i) o seu contrato de trabalho com a referida empresa não será rescindido, mas, a partir da data de início efetivo da sua designação, você será mantido em licença sem vencimentos; (ii) durante a designação internacional, o salário de origem será referência para cálculo de benefícios devidos no país de origem, tais como plano de pensão, previdência social, recolhimento do FGTS e abonos resultantes de acordos locais.',
      ' ',
      'Serão enviadas notas de débito mensalmente para as cobranças do INSS, parte de contribuição do empregado, da Valia e do PASA, caso haja alguma despesa relativa. É de responsabilidade do designado a quitação das notas de débito em dia.',
    ];

    this.insertParagraphs(doc, {
      x: BASE_X + 2,
      y: BASE_Y + 13,
      paragraphs: paragraphsPortuguese,
      maxWidth: TOTAL_WITHOUT_MARGIN / 2 + 8,
    });

    doc.rect(BASE_X, BASE_Y, 0, 8);

    this.insertTitle(doc, {
      x: BASE_X + TOTAL_WITHOUT_MARGIN / 2 + COLUMN_PAGE_GAP,
      y: BASE_Y,
      text: '2. Compensation payment',
      width: TOTAL_WITHOUT_MARGIN / 2,
      backgroundColor: '#f2f2f2',
      borderColor: '#f2f2f2',
      fontSize: 9,
      isBold: true,
    });

    const paragraphsEnglish = [
      'Your International Assignment compensation will be paid in host location, accordingly the established in Balance Sheet (attached).',
      ' ',
      'Along with your monthly remuneration you will receive the Transfer Allowance is composed by Cost of Living Allowance (CoL), Hardship Allowance and Transition Allowance. The total of the sub-items will be at least 25% of the gross annual salary.',
      'As per information from Vale: (i) your employment contract with the referred company will not be terminated however since effective start of assignment date you will be kept on unpaid leave; (ii) during international assignment, home salary will be used as reference for calculation of benefits due in home country such as pension plan, social charges and payments due to local agreements. (iii) Transfer Allowance is composed by Col Allowance, Hardship Allowance and Transition Allowance.',
      ' ',
      'Monthly debit notes will be sent to employee to charge INSS due from employee contribution, Valia and PASA, if there is any expense related. Assignee is responsible for having debit notes paid on time.',
    ];

    this.insertParagraphs(doc, {
      x: BASE_X + 2 + TOTAL_WITHOUT_MARGIN / 2 + COLUMN_PAGE_GAP,
      y: BASE_Y + 13,
      paragraphs: paragraphsEnglish,
      maxWidth: TOTAL_WITHOUT_MARGIN / 2 + 8,
    });
  }

  private insertFisrtSection(
    doc: jsPDF,
    TOTAL_WITHOUT_MARGIN: number,
    COLUMN_PAGE_GAP: number
  ) {
    this.insertTitle(doc, {
      x: 10,
      y: 92,
      text: '1. Início e oficialização da oferta',
      width: TOTAL_WITHOUT_MARGIN / 2,
      backgroundColor: '#f2f2f2',
      borderColor: '#f2f2f2',
      fontSize: 9,
      isBold: true,
    });

    const paragraphsPortuguese = [
      'É com satisfação que confirmamos a oferta para uma designação internacional temporária na Vale International S.A - Dubai, para a posição , baseado em .',
      ' ',
      'A designação internacional deverá começar em 01 fevereiro de AAAA, sujeita ao cumprimento dos requerimentos de imigração da localidade de destino, obtenção e manutenção das autorizações, documentos e vistos apropriados.',
      ' ',
      'A designação será inicialmente de 24 meses a partir da data efetiva de início das suas atividades na localidade de destino, podendo ser prorrogada, com seu consentimento, ou reduzida, a critério da empresa.',
      ' ',
      'Você somente será elegível ao pacote de remuneração e benefícios descrito nesta carta proposta durante o período de designação internacional na localidade de destino. O término da designação será considerado condição resolutiva da cessão da remuneração e benefícios abaixo listados.',
    ];

    this.insertParagraphs(doc, {
      x: 12,
      y: 105,
      paragraphs: paragraphsPortuguese,
      maxWidth: TOTAL_WITHOUT_MARGIN / 2 + 8,
    });

    this.insertTitle(doc, {
      x: 10 + TOTAL_WITHOUT_MARGIN / 2 + COLUMN_PAGE_GAP,
      y: 92,
      text: '1. Commencement and Operation of Offer',
      width: TOTAL_WITHOUT_MARGIN / 2,
      backgroundColor: '#f2f2f2',
      borderColor: '#f2f2f2',
      fontSize: 9,
      isBold: true,
    });

    const paragraphsEnglish = [
      'We have the pleasure in confirming our offer to you for a temporary international assignment to "&I7&", for the position of "&BalanceSheet!$J$15&", based in "&\'OfferLetter (New)\'!I8&"."',
      ' ',
      'The international assignment shall start on "&TEXTO(C6;"DD")&" of "&TEXTO(C6;"MMMM")&" of "&TEXTO(C6;"AAAA")&", subject to you meeting host location immigration requirements, obtaining and maintaining appropriate permits, documents and visas.',
      ' ',
      'The assignment duration is initially of "&ESQUERDA(I5;2)&" months from effective start date of your activities in host location, and it may be extended with your consent or reduced at the company discretion.',
      ' ',
      'You will only be entitled to the related compensation and benefits package during the assignment period in host location. The completion of the assignment will be considered final condition for the termination of compensation and benefits listed below.',
    ];

    this.insertParagraphs(doc, {
      x: 12 + TOTAL_WITHOUT_MARGIN / 2 + COLUMN_PAGE_GAP,
      y: 105,
      paragraphs: paragraphsEnglish,
      maxWidth: TOTAL_WITHOUT_MARGIN / 2 + 8,
    });
  }

  private setHeaderPage(doc: jsPDF) {
    doc.addImage('../assets/images/logo_vale.jpg', 'JPEG', 10, 10, 20, 7);
    doc.setFontSize(16);
    doc.setTextColor('#007e7a');
    doc.setFont('Calibri', 'bold');
    doc.text('GLOBAL MOBILITY', 35, 14);

    doc.setFontSize(10);
    doc.setTextColor('#747678');
    doc.setFont('Calibri', 'bold');
    doc.text('CARTA OFERTA / OFFER LETTER', 35, 19);
  }

  private setHeaderInfoTable(
    TOTAL_WITHOUT_MARGIN: number,
    doc: jsPDF,
    COLUMN_PAGE_GAP: number
  ) {
    const WIDTH_CELL = TOTAL_WITHOUT_MARGIN / 6;
    const HEIGHT_CELL = 8;
    const BASE_Y_TABLE = 27;
    const BASE_Y_TABLE_TEXT = 32;

    const tableDataFirstColumn: Array<{ title: string; value: string }> = [
      { title: 'ID', value: '1234567' },
      { title: 'Name', value: 'Employee Name' },
      { title: 'Expected Start Date', value: 'fevereiro 1, 2019' },
      { title: 'Home Company', value: 'Vale SA' },
      { title: 'Home Country', value: 'Brazil' },
      { title: 'Home Position', value: '' },
    ];

    const tableDataSecondColumn: Array<{ title: string; value: string }> = [
      { title: 'Assignment Type', value: 'Long Term Assignment (LTA)' },
      { title: 'Duration', value: '24 months' },
      { title: 'Host Location Class', value: 'A' },
      { title: 'Host Company', value: 'Vale Internaional S.A. - Dubai' },
      { title: 'Host Country', value: 'Canadá' },
      { title: 'Host Position', value: '' },
    ];

    doc.setDrawColor('#bfbfbf');
    doc.setTextColor('#000000');
    doc.setFontSize(8);

    for (let [index, row] of tableDataFirstColumn.entries()) {
      this.setTableRowHeaderInfo(doc, {
        x: 10,
        y: BASE_Y_TABLE + HEIGHT_CELL * index,
        yText: BASE_Y_TABLE_TEXT + HEIGHT_CELL * index,
        widthCell: WIDTH_CELL,
        value: row.value,
        title: row.title,
        heightCell: HEIGHT_CELL,
      });
    }

    for (let [index, row] of tableDataSecondColumn.entries()) {
      this.setTableRowHeaderInfo(doc, {
        x: 10 + WIDTH_CELL * 3 + COLUMN_PAGE_GAP,
        y: BASE_Y_TABLE + HEIGHT_CELL * index,
        yText: BASE_Y_TABLE_TEXT + HEIGHT_CELL * index,
        widthCell: WIDTH_CELL,
        value: row.value,
        title: row.title,
        heightCell: HEIGHT_CELL,
      });
    }
  }

  private setTableRowHeaderInfo(
    doc: jsPDF,
    { y, yText, heightCell, title, value, widthCell, x }: RowProps
  ) {
    doc.setFillColor('#d8d8d8');

    doc.rect(x, y, widthCell, heightCell, 'FD');
    doc.setFont('Calibri', 'bold');
    doc.text(title, x + 2, yText);

    doc.rect(widthCell + x, y, 2 * widthCell, heightCell);
    doc.setFont('Calibri', 'normal');
    doc.text(value, x + 2 + widthCell, yText);
  }

  private insertParagraphs(
    doc: jsPDF,
    { x, y, paragraphs, maxWidth }: ParagraphProps
  ) {
    let textsParsed = paragraphs;

    if (maxWidth) {
      textsParsed = paragraphs.reduce<string[]>(
        (textsConcatenad, currentText) =>
          textsConcatenad.concat(doc.splitTextToSize(currentText, maxWidth)),
        []
      );
    }

    doc.setFont('Calibri', 'normal');
    doc.setFontSize(8);
    doc.text(textsParsed, x, y);
  }

  private insertLine(
    doc: jsPDF,
    TOTAL_WITHOUT_MARGIN: number,
    COLUMN_PAGE_GAP: number,
    { y, height }: LineProps
  ) {
    doc.setDrawColor('#000000');

    doc.setLineDashPattern([0.4], 0);
    doc.line(
      10 + TOTAL_WITHOUT_MARGIN / 2 + COLUMN_PAGE_GAP / 2,
      y,
      10 + TOTAL_WITHOUT_MARGIN / 2 + COLUMN_PAGE_GAP / 2,
      y + height
    );
  }

  private insertTitle(
    doc: jsPDF,
    {
      x,
      y,
      width,
      text,
      backgroundColor,
      borderColor,
      isCenter,
      isBold,
      fontSize,
    }: TitleProps
  ) {
    doc.setFontSize(fontSize);
    if (isBold) {
      doc.setFont('Calibri', 'bold');
    }
    doc.setFillColor(backgroundColor);
    doc.setDrawColor(borderColor);

    doc.rect(x, y, width, 8, 'F');

    let textX = x + 2;

    if (isCenter) {
      textX = x + width / 2 - text.length;
    }

    doc.text(text, textX, y + 5);
    doc.setFont('Calibri', 'normal');
  }

  private insertPageNumber(
    doc: jsPDF,
    TOTAL_WITHOUT_MARGIN: number,
    { number, employeeName }: PageNumberProps
  ) {
    const text = `Offer Letter to ${employeeName} - Page ${number}/6`;
    doc.setFontSize(9);
    doc.text(text, TOTAL_WITHOUT_MARGIN + 15, 285, {
      align: 'right',
      baseline: 'bottom',
    });
  }
}
