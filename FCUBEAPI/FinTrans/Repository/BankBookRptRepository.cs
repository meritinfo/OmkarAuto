using Microsoft.Extensions.Options;
using FinTrans.Models;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Repository;
using DocumentFormat.OpenXml.VariantTypes;
using DocumentFormat.OpenXml.Wordprocessing;
using System.Data;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Spreadsheet;

namespace FinTrans.Repository
{
 
    public class BankBookRptRepository : IBankBookRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public BankBookRptRepository(IOptions<DBModel> _dbconnection,
            ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }

        public async Task<LedgerRptListModel> GetBankBookRptList(ReportRequestModel request)
        {
            LedgerRptListModel ledgerRptListModel = new();
            List<LedgerRptModel> ledgerRpts = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",         request.PageNumber),
                            new SqlParameter("@PageSize",           request.PageSize),
                            new SqlParameter("@SortColumn",         request.SortColumn),
                            new SqlParameter("@SortOrder",          request.SortOrder),
                            new SqlParameter("@Search",             request.Search),
                            new SqlParameter("@FromDate",           request.FromDate),
                            new SqlParameter("@ToDate",             request.ToDate),
                            new SqlParameter("@AccountID",          request.FilterStr),
                            new SqlParameter("@YearId",             request.FilterStr1),
                            new SqlParameter("@Branch",             request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBankBookRptList", param);
                    int totalRecords = 0;
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            ledgerRpts.Add(new LedgerRptModel
                            {
                                FtmDate         = Convert.ToString(dataSet.Tables[0].Rows[i]["FtmDate"]),
                                DocType         = Convert.ToString(dataSet.Tables[0].Rows[i]["DocType"]),
                                DocNo           = Convert.ToString(dataSet.Tables[0].Rows[i]["DocNo"]),
                                MainAccount     = Convert.ToString(dataSet.Tables[0].Rows[i]["MainAccount"]),
                                Narration       = Convert.ToString(dataSet.Tables[0].Rows[i]["Narration"]),
                                ReferenceDesc   = Convert.ToString(dataSet.Tables[0].Rows[i]["ReferenceDesc"]),
                                DrAmt           = Convert.ToString(dataSet.Tables[0].Rows[i]["DrAmt"]),                                
                                CrAmt           = Convert.ToString(dataSet.Tables[0].Rows[i]["CrAmt"]),
                                TypeSign        = Convert.ToString(dataSet.Tables[0].Rows[i]["TypeSign"]),
                                DocSeries       = Convert.ToString(dataSet.Tables[0].Rows[i]["DocSeries"]),
                                CheqNo          = Convert.ToString(dataSet.Tables[0].Rows[i]["CheqNo"]),
                                CheqDate        = Convert.ToString(dataSet.Tables[0].Rows[i]["CheqDate"]),
                                TransBrCode     = Convert.ToString(dataSet.Tables[0].Rows[i]["TransBrCode"]),
                            });
                        }

                        ledgerRptListModel.ledgersList = ledgerRpts;

                        ledgerRptListModel.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return ledgerRptListModel;
        }
        public async Task<DataSet> bankBookReport(ReportRequestModel request)
        {
            DataSet reportData = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",           request.FromDate),
                            new SqlParameter("@ToDate",             request.ToDate),
                            new SqlParameter("@AccountID",          request.FilterStr),
                            new SqlParameter("@YearId",             request.FilterStr1),
                            new SqlParameter("@Branch",             request.FilterStr2),
                        };

                    reportData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBankBookRptExcel", param);

                }
            }
            catch (Exception ex)
            {

            }
            return reportData;
        }

        public async Task<ResponseModel> GetBankBookRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                var dataSet = await bankBookReport(request);

                if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                {
                    var filter = "Bank Book From " + request.FromDate + " To " + request.ToDate;
                    var filter1 = "Account : " + request.FilterStr3;
                    response = await GetExcelReport(dataSet.Tables[0], "Bank Book Report", filter, filter1);
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ResponseModel> GetExcelReport(DataTable dt, string rptheader, string filter, string filter1)
        {
            ResponseModel responseModel = new();
            try
            {
                using (XLWorkbook wb = new XLWorkbook())
                {
                    responseModel = await sharedRepository.GetCompanyDetail();
                    int colcnt = 6;

                    var ws = wb.Worksheets.Add("worksheet");
                    ws.Range(1, 1, 1, colcnt).Merge();
                    ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                    ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                    ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(2, 1, 2, colcnt).Merge();
                    ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                    ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                    ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                    ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                    ws.Range(3, 1, 3, colcnt).Merge();
                    ws.Range(3, 1, 3, colcnt).Value = rptheader;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                    ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(4, 1, 4, colcnt).Merge();
                    ws.Range(4, 1, 4, colcnt).Value = filter;
                    ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                    ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(5, 1, 5, colcnt).Merge();
                    ws.Range(5, 1, 5, colcnt).Value = filter1;
                    ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.Purple;
                    ws.Range(5, 1, 5, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Cell(6, 1).Value = "Trans Date";
                    ws.Cell(6, 2).Value = "Doc No";
                    ws.Cell(6, 3).Value = "Particulars";
                    ws.Cell(6, 4).Value = "Debit";
                    ws.Cell(6, 5).Value = "Credit";
                    ws.Cell(6, 6).Value = "Balance";

                    ws.Range(6, 1, 6, colcnt).Style.Font.Bold = true;
                    ws.Range(6, 1, 6, colcnt).Style.Font.FontSize = 12;
                    ws.Range(6, 1, 6, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                    int j = 0;


                    Decimal Balance = 0;
                    Decimal receipts = 0;
                    Decimal totReceipts = 0;
                    Decimal payments = 0;
                    Decimal totPayments = 0;
                    var DocNo = "";

                    for (j = 0; j < dt.Rows.Count; j++)
                    {
                        DocNo = dt.Rows[j]["DocNo"].ToString();
                        receipts = Convert.ToDecimal(dt.Rows[j]["DrAmt"]);
                        payments = Convert.ToDecimal(dt.Rows[j]["CrAmt"]);
                        totReceipts = totReceipts + receipts;
                        totPayments = totPayments + payments;
                        Balance = totReceipts - totPayments;

                        if (DocNo=="0") { DocNo = ""; }

                        ws.Cell(j + 7, 1).Value = Convert.ToDateTime(dt.Rows[j]["FtmDate"]).ToString("dd-MM-yyyy");
                        ws.Cell(j + 7, 2).Value = DocNo;
                        ws.Cell(j + 7, 3).Value = dt.Rows[j]["Narration"].ToString();
                        ws.Cell(j + 7, 4).Value = receipts.ToString();
                        ws.Cell(j + 7, 5).Value = payments.ToString();
                        ws.Cell(j + 7, 6).Value = Balance.ToString();
                    }

                    Balance = totReceipts - totPayments;

                    filter = "Total Debits : "+ totReceipts.ToString() + "  " 
                            + "Total Credits : "+ totPayments.ToString() + "  " 
                            + "Closing Balance : " + Balance.ToString();

                    ws.Range(j + 7, 1, j + 7, colcnt).Merge();
                    ws.Range(j + 7, 1, j + 7, colcnt).Value = filter;
                    ws.Range(j + 7, 1, j + 7, colcnt).Style.Font.Bold = true;
                    ws.Range(j + 7, 1, j + 7, colcnt).Style.Font.FontSize = 12;
                    ws.Range(j + 7, 1, j + 7, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    for (int k = 1; k <= colcnt; k++)
                    {
                        ws.Column(k).AdjustToContents();
                    }

                    ws.Range(6, 4, j + 6, 6).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                    ws.Range(6, 1, j + 7, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    ws.Range(6, 1, j + 7, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                    var foldername = System.IO.Path.Combine("reports", "Download");
                    var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                    var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                    var fullPath = System.IO.Path.Combine(pathToSave, filename);
                    bool exists = System.IO.Directory.Exists(pathToSave);

                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }

                    if (File.Exists(fullPath))
                        File.Delete(fullPath);

                    wb.SaveAs(fullPath);

                    responseModel.Status = true;
                    responseModel.Message = filename;

                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }

    }
}
