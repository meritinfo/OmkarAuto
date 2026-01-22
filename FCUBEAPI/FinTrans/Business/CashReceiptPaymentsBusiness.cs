using DocumentFormat.OpenXml.Drawing.Charts;
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
using Org.BouncyCastle.Asn1.Ocsp;
using Shared.Models;
using Shared.Repository;
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
        private readonly ISharedRepository sharedRepository;
        public CashReceiptPaymentsBusiness(
            ICashReceiptPaymentsRepository _CashReceiptPaymentsRepository,
            IOptions<DBModel> _dbconnection,
            ISharedRepository _sharedRepository)
        {
            cashReceiptPaymentsRepository = _CashReceiptPaymentsRepository;
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
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
        public async Task<List<DropDownListModel>> GetFinRefTypes()
        {
            return await cashReceiptPaymentsRepository.GetFinRefTypes();
        }
        public async Task<ResponseModel> GetFinDocDetails(RequestModel request)
        {
            return await cashReceiptPaymentsRepository.GetFinDocDetails(request);
        }
        public async Task<ResponseModel> CheckSubLedgerExists(RequestModel request)
        {
            return await cashReceiptPaymentsRepository.CheckSubLedgerExists(request);
        }
        public async Task<ResponseModel> GetCashReceiptPaymentsExcel(BankCashListFilterModel request)
        {
            return await cashReceiptPaymentsRepository.GetCashReceiptPaymentsExcel(request);
        }
        public async Task<LedgerDetailList> GetLedgerDetailList(ReportRequestModel request)
        {
            return await cashReceiptPaymentsRepository.GetLedgerDetailList(request);
        }

        public async Task<ResponseModel> CashBookReport(ReportRequestModel request)
        {
            DataSet reportData = await cashReceiptPaymentsRepository.CashBookReport(request);
            
            ResponseModel response = new ResponseModel();
            response = await sharedRepository.GetCompanyDetail();

            string path = CreateCashBookReportAsync(request, reportData, response);
            return new ResponseModel { Status = true, Message = path };
        }

        private string CreateCashBookReportAsync(ReportRequestModel request, DataSet reportData,ResponseModel response)
        {
            
            var folderName = System.IO.Path.Combine("reports", "CashBook");
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
            var headerTable = new Table(1);
            headerTable.SetWidth(UnitValue.CreatePercentValue(100));

            var headerCell = new Cell().Add(new Paragraph(response.Message));
            headerTable.AddCell(headerCell.SetFontSize(12F).SetBorder(Border.NO_BORDER));
            document.Add(headerTable);

            headerTable = new Table(1);
            headerTable.SetWidth(UnitValue.CreatePercentValue(100));

            headerCell = new Cell().Add(new Paragraph("CASH BOOK REPORT"));
            headerTable.AddCell(headerCell.SetFontSize(10F).SetBorder(Border.NO_BORDER));
            document.Add(headerTable);

            headerTable = new Table(2);
            headerTable.SetWidth(UnitValue.CreatePercentValue(100));
            headerCell = new Cell().Add(new Paragraph("From : " +Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy")));
            headerTable.AddCell(headerCell.SetFontSize(9F).SetBorder(Border.NO_BORDER));
            headerCell = new Cell().Add(new Paragraph("To : " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy")));
            headerTable.AddCell(headerCell.SetFontSize(9F).SetBorder(Border.NO_BORDER));

            document.Add(headerTable);

            headerTable = new Table(1);
            headerTable.SetWidth(UnitValue.CreatePercentValue(100));
            headerCell = new Cell().Add(new Paragraph("Branch : " + (request.FilterStr1=="" ? "ALL" : request.FilterStr1)));
            headerTable.AddCell(headerCell.SetFontSize(9F).SetBorder(Border.NO_BORDER));           

            document.Add(headerTable);

            // Invoice details table
            var detailsTable = new Table(6);
            detailsTable.SetWidth(UnitValue.CreatePercentValue(100));

            detailsTable.AddCell(new Cell().SetWidth(UnitValue.CreatePercentValue(12)).Add(new Paragraph("Trans Date")).SetFontSize(9F).SetBorder(Border.NO_BORDER).SetBorderBottom(new SolidBorder(ColorConstants.BLACK, 1F)));
            detailsTable.AddCell(new Cell().SetWidth(UnitValue.CreatePercentValue(10)).Add(new Paragraph("Doc No")).SetFontSize(9F).SetBorder(Border.NO_BORDER).SetBorderBottom(new SolidBorder(ColorConstants.BLACK, 1F)));
            detailsTable.AddCell(new Cell().SetWidth(UnitValue.CreatePercentValue(45)).Add(new Paragraph("Particulars")).SetFontSize(9F).SetBorder(Border.NO_BORDER).SetBorderBottom(new SolidBorder(ColorConstants.BLACK, 1F)));
            detailsTable.AddCell(new Cell().SetWidth(UnitValue.CreatePercentValue(11)).Add(new Paragraph("Receipts")).SetFontSize(9F).SetBorder(Border.NO_BORDER).SetBorderBottom(new SolidBorder(ColorConstants.BLACK, 1F)));
            detailsTable.AddCell(new Cell().SetWidth(UnitValue.CreatePercentValue(11)).Add(new Paragraph("Payments")).SetFontSize(9F).SetBorder(Border.NO_BORDER).SetBorderBottom(new SolidBorder(ColorConstants.BLACK, 1F)));
            detailsTable.AddCell(new Cell().SetWidth(UnitValue.CreatePercentValue(11)).Add(new Paragraph("Balance")).SetFontSize(9F).SetBorder(Border.NO_BORDER).SetBorderBottom(new SolidBorder(ColorConstants.BLACK, 1F)));

            // Add more details as needed

            // Line separator
            LineSeparator ls = new LineSeparator(new SolidLine());
            ls.SetMarginTop(20);
            document.Add(ls);

            Decimal Balance = 0;
            Decimal receipts = 0;
            Decimal totReceipts = 0;
            Decimal payments = 0;
            Decimal totPayments = 0;
            var DocNo = "";

            for (int i=0; i< reportData.Tables[0].Rows.Count; i++)
            {
                detailsTable.AddCell(new Cell().Add(new Paragraph(Convert.ToDateTime(reportData.Tables[0].Rows[i]["FtmDate"]).ToString("dd-MM-yyyy"))).SetFontSize(9F).SetBorder(Border.NO_BORDER));
                DocNo = reportData.Tables[0].Rows[i]["DocNo"].ToString();
                if (DocNo=="0") { DocNo = ""; }
                detailsTable.AddCell(new Cell().Add(new Paragraph(DocNo)).SetFontSize(9F).SetBorder(Border.NO_BORDER));
                detailsTable.AddCell(new Cell().Add(new Paragraph(Convert.ToString(reportData.Tables[0].Rows[i]["Narration"]))).SetFontSize(9F).SetBorder(Border.NO_BORDER));
                receipts = Convert.ToDecimal(reportData.Tables[0].Rows[i]["DrAmt"]);
                detailsTable.AddCell(new Cell().Add(new Paragraph(receipts.ToString())).SetFontSize(9F).SetBorder(Border.NO_BORDER));
                payments = Convert.ToDecimal(reportData.Tables[0].Rows[i]["CrAmt"]);
                detailsTable.AddCell(new Cell().Add(new Paragraph(payments.ToString())).SetFontSize(9F).SetBorder(Border.NO_BORDER));
                totReceipts = totReceipts + receipts;
                totPayments = totPayments + payments;
                Balance = totReceipts - totPayments;
                detailsTable.AddCell(new Cell().Add(new Paragraph(Convert.ToString(Balance))).SetFontSize(9F).SetBorder(Border.NO_BORDER));
               
            }

            document.Add(detailsTable);

            // Line separator
            ls = new LineSeparator(new SolidLine());
            document.Add(ls);

            detailsTable = new Table(3);
            detailsTable.SetWidth(UnitValue.CreatePercentValue(100));

            detailsTable.AddCell(new Cell().Add(new Paragraph("Total Receipts : "+ totReceipts.ToString())).SetFontSize(9F).SetBorder(Border.NO_BORDER));
            detailsTable.AddCell(new Cell().Add(new Paragraph("Total Payments : "+ totPayments.ToString())).SetFontSize(9F).SetBorder(Border.NO_BORDER));
            Balance = totReceipts - totPayments;
            detailsTable.AddCell(new Cell().Add(new Paragraph("Closing Balance : " + Balance.ToString())).SetFontSize(9F).SetBorder(Border.NO_BORDER));


            document.Add(detailsTable);

            // Line separator
            ls = new LineSeparator(new SolidLine());
            document.Add(ls);

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