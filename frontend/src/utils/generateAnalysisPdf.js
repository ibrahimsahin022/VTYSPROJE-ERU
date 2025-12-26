import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generateAnalysisPdf = ({ user, analysis }) => {
  const riskPercent = Math.round((analysis.riskScore || 0) * 100);

  const docDefinition = {
    pageSize: "A4",
    pageMargins: [40, 60, 40, 60],

    content: [
      {
        text: "İŞSİZLİK RİSK ANALİZ RAPORU",
        style: "title",
      },

      {
        text: `Oluşturulma Tarihi: ${new Date(
          analysis.asOf
        ).toLocaleDateString("tr-TR")}`,
        style: "meta",
      },

      {
        text: "\nKULLANICI BİLGİLERİ",
        style: "section",
      },

      {
        table: {
          widths: ["30%", "70%"],
          body: [
            ["Ad Soyad", user?.fullName || "—"],
            ["Risk Seviyesi", analysis.level || "—"],
            ["Risk Skoru", `%${riskPercent}`],
          ],
        },
        layout: "lightHorizontalLines",
      },

      {
        text: "\nGENEL DEĞERLENDİRME",
        style: "section",
      },

      {
        text:
          "Bu rapor, yapay zeka destekli analiz motoru tarafından kullanıcının profil bilgileri ve piyasa verileri dikkate alınarak oluşturulmuştur.",
        style: "paragraph",
      },

      {
        text: "\nYAPAY ZEKA AÇIKLAMALARI",
        style: "section",
      },

      ...(Array.isArray(analysis.reasons) && analysis.reasons.length > 0
        ? analysis.reasons.map((r, i) => ({
            text: `• ${r.message}`,
            style: "bullet",
          }))
        : [
            {
              text: "Herhangi bir açıklama bulunmamaktadır.",
              italics: true,
            },
          ]),

      {
        text: "\nKARİYER YOL HARİTASI (AI ÖNERİ)",
        style: "section",
      },

      {
        ul: [
          "Mevcut becerilerinizi derinleştirmeniz önerilir.",
          "Risk seviyesini azaltmak için sektörel dönüşümler değerlendirilebilir.",
          "Yeni teknolojik yetkinlikler kazanmanız uzun vadede fayda sağlayacaktır.",
          "Alternatif kariyer yolları analiz edilmelidir.",
        ],
        style: "paragraph",
      },
    ],

    styles: {
      title: {
        fontSize: 20,
        bold: true,
        alignment: "center",
        margin: [0, 0, 0, 20],
      },
      meta: {
        fontSize: 10,
        alignment: "center",
        color: "#555",
        margin: [0, 0, 0, 20],
      },
      section: {
        fontSize: 14,
        bold: true,
        margin: [0, 20, 0, 10],
      },
      paragraph: {
        fontSize: 11,
        lineHeight: 1.4,
      },
      bullet: {
        fontSize: 11,
        margin: [0, 2, 0, 2],
      },
    },
  };

  pdfMake.createPdf(docDefinition).download("risk-analizi.pdf");
};
