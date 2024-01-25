using FinTrans.Models;
using FinTrans.Repository;
using iText.Kernel.Colors;
using iText.Kernel.Events;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas;
using iText.Kernel.Pdf.Canvas.Draw;
using iText.Kernel.Pdf.Xobject;
using iText.Layout;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System.Collections;
using System.Data;
using System.Data.Common;

namespace FinTrans.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class CashReceiptPaymentsBusiness : ICashReceiptPaymentsBusiness
    {
        private readonly IOptions<DBModel> dbconnection;
        readonly ICashReceiptPaymentsRepository cashReceiptPaymentsRepository;
        public CashReceiptPaymentsBusiness(ICashReceiptPaymentsRepository _CashReceiptPaymentsRepository, IOptions<DBModel> _dbconnection)
        {
            cashReceiptPaymentsRepository = _CashReceiptPaymentsRepository;
            dbconnection = _dbconnection;
        }

        /// <summary>
        /// Business method for  details
        /// </summary>
        /// <param name="destinationMasterModel"></param>
        public async Task<ResponseModel> CashReceiptPaymentsSave(CashReceiptPaymentsModel cashReceiptPaymentsModel)
        {
            return await cashReceiptPaymentsRepository.CashReceiptPaymentsSave(cashReceiptPaymentsModel);
        }

        public async Task<CashReceiptPaymentsList> GetCashReceiptPaymentsList(BankCashListFilterModel request)
        {
            return await cashReceiptPaymentsRepository.GetCashReceiptPaymentsList(request);
        }
        public async Task<ResponseModel> GetNextDocNo(DocNoFilterModel docNoFilter)
        {
            return await cashReceiptPaymentsRepository.GetNextDocNo(docNoFilter);
        }
        public async Task<ResponseModel> CashReceiptPaymentsDelete(RequestModel req)
        {
            return await cashReceiptPaymentsRepository.CashReceiptPaymentsDelete(req);
        }
        public async Task <CashReceiptPaymentsModel> GetCashReceiptPaymentInnerGridList(RequestModel req)
        {
            return await cashReceiptPaymentsRepository.GetCashReceiptPaymentInnerGridList(req);
        }

        public async Task<List<DropDownListModel>> GetCashBankAccountList(RequestModel request)
        {
            return await cashReceiptPaymentsRepository.GetCashBankAccountList(request);
        }

        public async Task<ResponseModel> CashBookReport(CashBookReportRequestModel request)
        {
            DataSet reportData = await cashReceiptPaymentsRepository.CashBookReport(request);

            string path = CreateCashBookReport(request, reportData);
            return new ResponseModel { Status = true, Message = path };
        }

        private string CreateCashBookReport(CashBookReportRequestModel request, DataSet reportData)
        {
            var folderName = System.IO.Path.Combine("Reports", "CashBook");
            var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, folderName);
            string fileName = "CashBookReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmss") + ".pdf";
            var filePath = folderName + "//" + fileName;
            var fullPath = System.IO.Path.Combine(pathToSave, fileName);
            bool exists = System.IO.Directory.Exists(pathToSave);
            if (!exists)
            {
                Directory.CreateDirectory(pathToSave);
            }
            PdfWriter writer = new PdfWriter(fullPath);
            var pdf = new PdfDocument(writer);
            pdf.SetDefaultPageSize(PageSize.A4);
            var document = new Document(pdf);
            // Header table
            var headerTable = new Table(3);
            headerTable.SetWidth(UnitValue.CreatePercentValue(100));

            var headerCell = new Cell().Add(new Paragraph("MAXWELL LOGISTICS PRIVATE LIMITED"));
            headerTable.AddCell(headerCell.SetFontSize(9F).SetBorder(Border.NO_BORDER));
            headerCell = new Cell().Add(new Paragraph("From : " + request.StartDate));
            headerTable.AddCell(headerCell.SetFontSize(9F).SetBorder(Border.NO_BORDER));
            headerCell = new Cell().Add(new Paragraph("To : " + request.EndDate));
            headerTable.AddCell(headerCell.SetFontSize(9F).SetBorder(Border.NO_BORDER));

            headerCell = new Cell().Add(new Paragraph("CASH BOOK"));
            headerTable.AddCell(headerCell.SetFontSize(9F).SetBorder(Border.NO_BORDER));
            headerCell = new Cell().Add(new Paragraph("Branch : " + request.Branch));
            headerTable.AddCell(headerCell.SetFontSize(9F).SetBorder(Border.NO_BORDER));
            headerCell = new Cell().Add(new Paragraph(""));
            headerTable.AddCell(headerCell.SetBorder(Border.NO_BORDER));

            document.Add(headerTable);

            // Invoice details table
            var detailsTable = new Table(6);
            detailsTable.SetWidth(UnitValue.CreatePercentValue(100));

            detailsTable.AddCell(new Cell().Add(new Paragraph("Trans Date")).SetFontSize(9F).SetBorder(Border.NO_BORDER).SetBorderBottom(new SolidBorder(ColorConstants.BLACK, 1F)));
            detailsTable.AddCell(new Cell().Add(new Paragraph("Doc No")).SetFontSize(9F).SetBorder(Border.NO_BORDER).SetBorderBottom(new SolidBorder(ColorConstants.BLACK, 1F)));
            detailsTable.AddCell(new Cell().Add(new Paragraph("Particulars")).SetFontSize(9F).SetBorder(Border.NO_BORDER).SetBorderBottom(new SolidBorder(ColorConstants.BLACK, 1F)));
            detailsTable.AddCell(new Cell().Add(new Paragraph("Receipts")).SetFontSize(9F).SetBorder(Border.NO_BORDER).SetBorderBottom(new SolidBorder(ColorConstants.BLACK, 1F)));
            detailsTable.AddCell(new Cell().Add(new Paragraph("Payments")).SetFontSize(9F).SetBorder(Border.NO_BORDER).SetBorderBottom(new SolidBorder(ColorConstants.BLACK, 1F)));
            detailsTable.AddCell(new Cell().Add(new Paragraph("Balance")).SetFontSize(9F).SetBorder(Border.NO_BORDER).SetBorderBottom(new SolidBorder(ColorConstants.BLACK, 1F)));

            // Add more details as needed

            // Line separator
            LineSeparator ls = new LineSeparator(new SolidLine());
            ls.SetMarginTop(20);
            document.Add(ls);

            Decimal Balance = 0;
            for(int i=0; i< reportData.Tables[0].Rows.Count; i++)
            {
                detailsTable.AddCell(new Cell().Add(new Paragraph(Convert.ToDateTime(reportData.Tables[0].Rows[i]["FtmDate"]).ToString("dd-MM-yyyy"))).SetFontSize(9F).SetBorder(Border.NO_BORDER));
                detailsTable.AddCell(new Cell().Add(new Paragraph(Convert.ToString(reportData.Tables[0].Rows[i]["DocNo"]))).SetFontSize(9F).SetBorder(Border.NO_BORDER));
                detailsTable.AddCell(new Cell().Add(new Paragraph(Convert.ToString(reportData.Tables[0].Rows[i]["Narration"]))).SetFontSize(9F).SetBorder(Border.NO_BORDER));
                detailsTable.AddCell(new Cell().Add(new Paragraph(Convert.ToString(reportData.Tables[0].Rows[i]["DrAmt"]))).SetFontSize(9F).SetBorder(Border.NO_BORDER));
                detailsTable.AddCell(new Cell().Add(new Paragraph(Convert.ToString(reportData.Tables[0].Rows[i]["CrAmt"]))).SetFontSize(9F).SetBorder(Border.NO_BORDER));
                Balance = Balance + Convert.ToDecimal(reportData.Tables[0].Rows[i]["DrAmt"]) - Convert.ToDecimal(reportData.Tables[0].Rows[i]["CrAmt"]);
                detailsTable.AddCell(new Cell().Add(new Paragraph(Convert.ToString(Balance))).SetFontSize(9F).SetBorder(Border.NO_BORDER));
            }

            document.Add(detailsTable);

            // Line separator
            ls = new LineSeparator(new SolidLine());
            document.Add(ls);

            // Footer
            var footerTable = new Table(1);
            footerTable.SetWidth(UnitValue.CreatePercentValue(100));
            footerTable.SetMarginTop(20);

            var footerCell = new Cell().Add(new Paragraph("Thank you!"));
            footerCell.SetTextAlignment(TextAlignment.CENTER);
            footerTable.AddCell(footerCell);

            document.Add(footerTable);

            Footer footerHandler = new Footer();
            pdf.AddEventHandler(PdfDocumentEvent.END_PAGE, footerHandler);
            footerHandler.WriteTotal(pdf);

            document.Close();

            //return filePath;
            return fileName;
        }

        protected class Footer : IEventHandler
        {
            protected PdfFormXObject placeholder;
            protected float side = 20;
            protected float x = 300;
            protected float y = 25;
            protected float space = 4.5f;
            protected float descent = 3;

            public Footer()
            {
                placeholder = new PdfFormXObject(new Rectangle(0, 0, side, side));
            }

            public virtual void HandleEvent(Event @event)
            {
                PdfDocumentEvent docEvent = (PdfDocumentEvent)@event;
                PdfDocument pdf = docEvent.GetDocument();
                PdfPage page = docEvent.GetPage();
                int pageNumber = pdf.GetPageNumber(page);
                Rectangle pageSize = page.GetPageSize();
                PdfCanvas pdfCanvas = new PdfCanvas(page);
                Canvas canvas = new Canvas(pdfCanvas, pageSize);
                canvas.SetFontSize(10);
                Paragraph p = new Paragraph().Add("Page ").Add(pageNumber.ToString()).Add(" of");
                canvas.ShowTextAligned(p, x, y, TextAlignment.RIGHT);
                canvas.Close();
                pdfCanvas.AddXObjectAt(placeholder, x + space, y - descent);
                pdfCanvas.Release();
            }

            public void WriteTotal(PdfDocument pdfDoc)
            {
                Canvas canvas = new Canvas(placeholder, pdfDoc);
                canvas.SetFontSize(10);
                canvas.ShowTextAligned(pdfDoc.GetNumberOfPages().ToString(), 0, descent, TextAlignment.LEFT);
                canvas.Close();
            }
        }

    }
}