import { Injectable } from '@angular/core';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
const PDF_EXTENSION = '.pdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  public exportAsPdfFile(json: any, displayColumn: any, fileName: string): void {
    console.log(json);
    let col: any[] = [];
    for (let key in json[0]) {
      if (col.indexOf(key) === -1 && displayColumn.indexOf(key) > -1) {
        col.push(key);
      }
    }

    let docDefinition = {
      content: [
        { text: fileName, fontSize: 15 },
        {
          table: {
            body: this.buildTableBody(json, col),
            fontSize: 8
          }
        }
      ],
      defaultStyle: {
        fontSize: 8
      }
    };

    pdfMake.createPdf(docDefinition).download(fileName + '_export_' + new Date().getTime() + PDF_EXTENSION);
  }

  buildTableBody(data: any[], columns: any[]) {
    var body = [];
    body.push(columns);
    data.forEach(function (row) {
      var dataRow: any[] = [];
      columns.forEach(function (column) {
        dataRow.push(row[column].toString());
      })
      body.push(dataRow);
    });

    return body;
  }
}
