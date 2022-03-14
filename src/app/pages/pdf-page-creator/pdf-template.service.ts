import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Constat } from '../list-constat/constat';
import { ConstatService } from '../list-constat/constat.service';

@Injectable({
  providedIn: 'root'
})
export class PdfTemplateService {

  retrievedImage: any;
  retrievedImageName: any;
  base64Data: any;
  retrieveResonse: any;
  res: any;


  constructor(private constatService: ConstatService) { }

  //test ++++++++++++++++++++++++++++++++++
  externalDataRetrievedFromServer = [
    { name: 'Bartek', age: 34 },
    { name: 'John', age: 27 },
    { name: 'Elizabeth', age: 30 },
  ];

  buildTableBody(data, columns) {
    var body = [];
    body.push(columns);
    data.forEach(function (row) {
      var dataRow = [];
      columns.forEach(function (column) {
        dataRow.push(row[column].toString());
      })
      body.push(dataRow);
    });
    return body;
  }

  table(data, columns) {
    return {
      table: {
        headerRows: 1,
        body: this.buildTableBody(data, columns)
      }
    };
  }
//test ++++++++++++++++++++++++++++++++++

  async getImage(id: number) {
    this.res = await this.constatService.getimage(id);
    this.retrieveResonse = this.res;
    this.retrievedImageName = this.res.name;
    this.base64Data = this.retrieveResonse.picByte;
    this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  }


  public getDocumentDefinition(constat: Constat) {
    let insCh
    let insDch
    if (!!constat.inspecteurChargement) {
      insCh = constat.inspecteurChargement.nom.substring(0, 1).toUpperCase() + constat.inspecteurChargement.prenom.substring(0, 1).toUpperCase()
    } else { insCh = "" }
    if (!!constat.inspecteurDechargement) {
      insDch = constat.inspecteurDechargement.nom.substring(0, 1).toUpperCase() + constat.inspecteurDechargement.prenom.substring(0, 1).toUpperCase()
    } else insDch = ""
    this.getImage(constat.id)

    return {
      // footer:
      // {
      //   margin: [40, -70, 0, 0],
      //   columns: [
      //     {
      //       width: '*',
      //       style: 'tableExample',
      //       table: {
      //         widths: [250, 250,],
      //         heights: [10, 50],

      //         body: [
      //           [[
      //             {
      //               table: {
      //                 body: [
      //                   [
      //                     { text: 'Expertise :', border: [false, false, false, false], bold: true },
      //                     { text: 'C', color: '#690000' }, 'X',
      //                     { text: 'D', color: '#126900' }, 'X'
      //                   ],

      //                 ]
      //               },
      //             }
      //           ], [
      //             {
      //               table: {
      //                 body: [
      //                   [
      //                     { text: 'Interchange :', border: [false, false, false, false], bold: true },
      //                     { text: 'C', color: '#690000' }, 'X',
      //                     { text: 'D', color: '#126900' }, 'X'
      //                   ],
      //                 ]
      //               },
      //             }
      //           ]],
      //           [{ text: 'Remarque', italics: true, color: 'gray' }, { text: 'Remarque', italics: true, color: 'gray' }]
      //         ]
      //       }
      //     },

      //   ]
      // },
      watermark: { text: 'e-surveys', angle: 60, opacity: 0.1 },
      content: [
        {
          alignment: 'center',
          columns: [
            {
              width: '*',
              alignment: "left",
              margin: [-20, 0, 0, 0],
              fontSize: 11,
              color: '#1d44af',
              bold: true,
              text: 'general@esurveys.fr\nTEL: +33 (0) 495 069 230',
            },
            {
              width: 140,
              alignment: 'center',
              margin: [-85, -20, 0, 0],
              text: 'CONSTAT DE SURVEILLANCE',
              style: 'title',
            },
            {
              width: 150,
              alignment: "right",
              margin: [0, 0, -20, 0],
              fontSize: 11,
              color: '#1d44af',
              bold: true,
              text: 'www.esurveys.fr\nFAX: +33(0) 491 467 892'
            },
          ]
        },
        {
          canvas: [
            {
              type: 'rect',
              x: -1,
              y: 15,
              w: 518,
              h: 70,
              r: 5,
              lineColor: 'black',
              lineWidth: 2
            },
          ]
        },

        {
          style: 'headTable',
          layout: 'headerLineOnly',
          absolutePosition: { x: 90, y: 88 },
          table: {
            widths: [70, "auto", "auto"],
            body: [
              [{ text: constat.voyage.bateau.intitule, alignment: 'center', margin: [-100, 17, 0, 0] },
              {
                table: {
                  body: [
                    [
                      { text: 'Chargement', bold: true, color: '#690000', alignment: 'center' },
                      { text: 'Dechargement', bold: true, color: '#126900', alignment: 'center' }],
                    [{
                      table: {
                        body: [
                          ['Port', 'Date'],
                          [{ text: constat.voyage.portChargement.intitule, bold: true }, { text: new DatePipe('fr').transform(constat.dateChargement, 'dd/MM/yyyy'), bold: true }]
                        ]
                      },
                      layout: 'noBorders',
                    },
                    {
                      table: {
                        body: [
                          ['Port', 'Date'],
                          [{ text: constat.voyage.portDechargement.intitule, bold: true }, { text: new DatePipe('fr').transform(constat.dateDechargement, 'dd/MM/yyyy'), bold: true }]
                        ]
                      },
                      layout: 'headerLineOnly',
                    }
                    ],
                  ],
                },
                margin: [-10, -5, 0, 0]
              },
              {
                table: {
                  widths: ['*', "*"],
                  body: [
                    [{ text: 'Inspecteur', bold: true, colSpan: 2 }, ''],
                    [{ text: '1', bold: true, color: '#690000' }, { text: insCh, bold: true, color: '#690000' }],
                    [{ text: '2', bold: true, color: '#126900' }, { text: insDch, bold: true, color: '#126900' },]

                  ]
                },
                layout: 'headerLineOnly',
              }]
            ]
          }
        },
        {
          columns: [
            {
              width: '*',
              text: ['ID : ', { text: 'vID', bold: true },]
            },
            {
              width: '*',
              text: ['Plomb : ', { text: constat.plombCode, bold: true },]
            },
            {
              width: '*',
              text: ['Type : ', { text: 'vType', bold: true, italics: true },]
            },
            {
              width: '*',
              text: ['Chargeur : ', { text: constat.chargeur.intitule, bold: true },]
            }
          ]
        },
        { text: '.................................................................................................................................................................', alignment: 'center', },
        {
          columns: [
            {
              width: "*",
              style: 'tableExample',
              table: {
                body: [
                  [{ text: 'PHASE 1 : CHARGEMENT', color: '#690000', bold: true, colSpan: 6, alignment: 'center', fontSize: 12 }, {}, {}, {}, {}, {}],
                  [
                    { text: 'Description', fontSize: 9 },
                    { text: 'Posi', fontSize: 9 },
                    { text: 'Dommage', fontSize: 9 },
                    { text: 'Dim/Nbr', fontSize: 9 },
                    { text: 'Detail', fontSize: 9 },
                    { text: 'Ancien', fontSize: 9 }
                  ],
                  [
                    { text: 'vA1', fontSize: 8 },
                    { text: 'vA2', fontSize: 8 },
                    { text: 'vA3', fontSize: 8 },
                    { text: 'lo. vo \nla. va', fontSize: 8 },
                    { text: 'vA5', fontSize: 8 },
                    { text: 'vA6', fontSize: 8 }
                  ]
                ]
              }
            },

            {
              width: '*',
              style: 'tableExample',
              table: {
                body: [
                  [{ text: 'PHASE 2 : DECHARGEMENT', color: '#126900', bold: true, colSpan: 6, alignment: 'center' }, {}, {}, {}, {}, {}],
                  [
                    { text: 'Description', fontSize: 9 },
                    { text: 'Posi', fontSize: 9 },
                    { text: 'Dommage', fontSize: 9 },
                    { text: 'Dim/Nbr', fontSize: 9 },
                    { text: 'Detail', fontSize: 9 },
                    { text: 'Ancien', fontSize: 9 }
                  ],
                  [
                    { text: 'vA1', fontSize: 8 },
                    { text: 'vA2', fontSize: 8 },
                    { text: 'vA3', fontSize: 8 },
                    { text: 'lo. vo \nla. va', fontSize: 8 },
                    { text: 'vA5', fontSize: 8 },
                    { text: 'vA6', fontSize: 8 }
                  ]
                ]
              }
            },
          ]
        },
        { margin: [20, 0, 0, 0], fontSize: 9, text: '*RG=RAGUER    DF=DEFORMER CS=CASSER   CP=COUPER   MA=MANQUANT   FR=FROTTER   DH=DECHIRER   PF=PERFORER   RAP=RAPIECER    RG/DF=RAGUER&DEFORMER' },


        // deuxiemme page pour les images 
        { text: '', pageBreak: 'before' },
        {
          alignment: 'center',
          columns: [
            {
              width: '*',
              alignment: "left",
              margin: [-20, 0, 0, 0],
              fontSize: 11,
              color: '#1d44af',
              bold: true,
              text: 'general@esurveys.fr\nTEL: +33 (0) 495 069 230',
            },
            {
              width: 140,
              alignment: 'center',
              margin: [-85, -20, 0, 0],
              text: 'CONSTAT DE SURVEILLANCE',
              style: 'title',
            },
            {
              width: 150,
              alignment: "right",
              margin: [0, 0, -20, 0],
              fontSize: 11,
              color: '#1d44af',
              bold: true,
              text: 'www.esurveys.fr\nFAX: +33(0) 491 467 892'
            },
          ]
        },
        {
          canvas: [
            {
              type: 'rect',
              x: -1,
              y: 15,
              w: 518,
              h: 70,
              r: 5,
              lineColor: 'black',
              lineWidth: 2
            },
          ]
        },

        {
          style: 'headTable',
          layout: 'headerLineOnly',
          absolutePosition: { x: 90, y: 88 },
          table: {
            widths: [70, "auto", "auto"],
            body: [
              [{ text: constat.voyage.bateau.intitule, alignment: 'center', margin: [-100, 17, 0, 0] },
              {
                table: {
                  body: [
                    [
                      { text: 'Chargement', bold: true, color: '#690000', alignment: 'center' },
                      { text: 'Dechargement', bold: true, color: '#126900', alignment: 'center' }],
                    [{
                      table: {
                        body: [
                          ['Port', 'Date'],
                          [{ text: constat.voyage.portChargement.intitule, bold: true }, { text: new DatePipe('fr').transform(constat.dateChargement, 'dd/MM/yyyy'), bold: true }]
                        ]
                      },
                      layout: 'noBorders',
                    },
                    {
                      table: {
                        body: [
                          ['Port', 'Date'],
                          [{ text: constat.voyage.portDechargement.intitule, bold: true }, { text: new DatePipe('fr').transform(constat.dateDechargement, 'dd/MM/yyyy'), bold: true }]
                        ]
                      },
                      layout: 'headerLineOnly',
                    }
                    ],
                  ],
                },
                margin: [-10, -5, 0, 0]
              },
              {
                table: {
                  widths: ['*', "*"],
                  body: [
                    [{ text: 'Inspecteur', bold: true, colSpan: 2 }, ''],
                    [{ text: '1', bold: true, color: '#690000' }, { text: insCh, bold: true, color: '#690000' }],
                    [{ text: '2', bold: true, color: '#126900' }, { text: insDch, bold: true, color: '#126900' },]

                  ]
                },
                layout: 'headerLineOnly',
              }]
            ]
          }
        },
        {
          columns: [
            {
              width: '*',
              text: ['ID : ', { text: 'vID', bold: true },]
            },
            {
              width: '*',
              text: ['Plomb : ', { text: constat.plombCode, bold: true },]
            },
            {
              width: '*',
              text: ['Type : ', { text: 'vType', bold: true, italics: true },]
            },
            {
              width: '*',
              text: ['Chargeur : ', { text: constat.chargeur.intitule, bold: true },]
            }
          ]
        },
        { text: '.................................................................................................................................................................', alignment: 'center', },
        { text: 'VISUEL', alignment: 'center', bold: true, fontSize: 20 },
        this.table(this.externalDataRetrievedFromServer, ['name', 'age'])

      ],



















      styles: {
        footer: {
        },
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        title: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 0],
          alignment: 'center',
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        headTable: {
          margin: [-35, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
      defaultStyle: {
        // alignment: 'justify'
      }

    }
  }

}
