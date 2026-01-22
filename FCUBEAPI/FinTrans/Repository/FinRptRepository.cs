using Microsoft.Extensions.Options;
using FinTrans.Models;
using Shared.Models;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Repository;
using System.Data;
using ClosedXML.Excel;
using Newtonsoft.Json;
using System.Net.Http.Headers;

namespace FinTrans.Repository
{
 
    public class FinRptRepository : IFinRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public FinRptRepository(IOptions<DBModel> _dbconnection,
            ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }

        public async Task<ResponseModel> CashBookReport(ReportRequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                string baseUrl = "";
                baseUrl = dbconnection.Value.apiPath + "api/CashBook/";

                string UrlParam = "?FromDate=" + request.FromDate +
                                    "&ToDate=" + request.ToDate +
                                    "&Branch=" + request.FilterStr +
                                    "&YearId=" + request.FilterStr1 +
                                    "&AccountID=" + request.FilterStr2 +
                                    "&RptType=" + request.FilterStr3 +
                                    "&format=" + request.Search;

                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.GetAsync(UrlParam).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    dynamic data = JsonConvert.DeserializeObject(result);
                    if (data != "500")
                    {
                        responseModel.Status = true;
                        responseModel.Message = data;
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = data;
                    }


                    client.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
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
                                FtmDate = Convert.ToString(dataSet.Tables[0].Rows[i]["FtmDate"]),
                                DocType = Convert.ToString(dataSet.Tables[0].Rows[i]["DocType"]),
                                DocNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DocNo"]),
                                MainAccount = Convert.ToString(dataSet.Tables[0].Rows[i]["MainAccount"]),
                                Narration = Convert.ToString(dataSet.Tables[0].Rows[i]["Narration"]),
                                ReferenceDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["ReferenceDesc"]),
                                DrAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["DrAmt"]),
                                CrAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CrAmt"]),
                                TypeSign = Convert.ToString(dataSet.Tables[0].Rows[i]["TypeSign"]),
                                DocSeries = Convert.ToString(dataSet.Tables[0].Rows[i]["DocSeries"]),
                                CheqNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CheqNo"]),
                                CheqDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CheqDate"]),
                                TransBrCode = Convert.ToString(dataSet.Tables[0].Rows[i]["TransBrCode"]),
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

        public async Task<ResponseModel> GetBRSRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@YearId",             request.FilterStr1),
                            new SqlParameter("@AccountID",             request.FilterStr2),
                            new SqlParameter("@Branch",          request.FilterStr),
                            new SqlParameter("@ToDate",             request.ToDate),
                    };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBankReconRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {

                        response = await GetBalanceAsPerBooks(request);
                        var filter = "Balance as per Books : " + response.Message;

                        response = await sharedRepository.GetGroupExcelReport(dataSet.Tables[0], "Bank Reconciliation Report", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ResponseModel> GetBalanceAsPerBooks(ReportRequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@YearId",             request.FilterStr1),
                            new SqlParameter("@AccountID",             request.FilterStr2),
                            new SqlParameter("@Branch",          request.FilterStr),
                            new SqlParameter("@ClearDate",             request.ToDate),
                    };
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBankReconAsPerBookExcel", param);

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(userData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(userData.Tables[0].Rows[0]["Message"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
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

                        if (DocNo == "0") { DocNo = ""; }

                        ws.Cell(j + 7, 1).Value = Convert.ToDateTime(dt.Rows[j]["FtmDate"]).ToString("dd-MM-yyyy");
                        ws.Cell(j + 7, 2).Value = DocNo;
                        ws.Cell(j + 7, 3).Value = dt.Rows[j]["Narration"].ToString();
                        ws.Cell(j + 7, 4).Value = receipts.ToString();
                        ws.Cell(j + 7, 5).Value = payments.ToString();
                        ws.Cell(j + 7, 6).Value = Balance.ToString();
                    }

                    Balance = totReceipts - totPayments;

                    filter = "Total Debits : " + totReceipts.ToString() + "  "
                            + "Total Credits : " + totPayments.ToString() + "  "
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

        public async Task<ResponseModel> BankBookPrint(ReportRequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                string baseUrl = "";
                baseUrl = dbconnection.Value.apiPath + "api/BankBook/";

                string UrlParam = "?FromDate=" + request.FromDate +
                                    "&ToDate=" + request.ToDate +
                                    "&Branch=" + request.FilterStr +
                                    "&YearId=" + request.FilterStr1 +
                                    "&AccountID=" + request.FilterStr2 +
                                    "&format=" + request.Search;

                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.GetAsync(UrlParam).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    dynamic data = JsonConvert.DeserializeObject(result);
                    if (data != "500")
                    {
                        responseModel.Status = true;
                        responseModel.Message = data;
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = data;
                    }


                    client.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }

        public async Task<List<DropDownListModel>> GetLedgerList()
        {
            List<DropDownListModel> ledgerList = new();
            try
            {
                if (dbconnection != null)               
                {
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLedgerList", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            ledgerList.Add(new DropDownListModel
                            {
                                DataId = Convert.ToString(statusData.Tables[0].Rows[i]["DataId"]),
                                DataName = Convert.ToString(statusData.Tables[0].Rows[i]["DataName"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return ledgerList;
        }       
        public async Task<LedgerRptListModel> GetLedgerRptList(ReportRequestModel request)
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
                            new SqlParameter("@SubName",            request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLedgerRptList", param);
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
                                SlNo            = Convert.ToString(dataSet.Tables[0].Rows[i]["SlNo"]),
                                DrAmt           = Convert.ToString(dataSet.Tables[0].Rows[i]["DrAmt"]),                                
                                CrAmt           = Convert.ToString(dataSet.Tables[0].Rows[i]["CrAmt"]),
                                TypeSign        = Convert.ToString(dataSet.Tables[0].Rows[i]["TypeSign"]),
                                FtdId           = Convert.ToString(dataSet.Tables[0].Rows[i]["FtdId"]),
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
        public async Task<List<MenuReportAccessModel>> GetReportMenuList()
        {
            var result = new List<MenuReportAccessModel>();

            try
            {
                if (dbconnection != null)
                {
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "Usp_GetReportLedgerTreeList", null);

                    if (statusData != null && statusData.Tables.Count > 0 && statusData.Tables[0].Rows.Count > 0)
                    {
                        var table = statusData.Tables[0];

                        // Build flat list
                        for (int i = 0; i < table.Rows.Count; i++)
                        {
                            var row = table.Rows[i];
                            result.Add(new MenuReportAccessModel
                            {
                                AccountID = row["AccountID"].ToString(),
                                AccountName = row["AccountName"].ToString(),
                                //ApproveYn = row["ApproveYn"]?.ToString(),
                                Level = row["Level"].ToString(),
                                ParentAccountID = row["ParentAccountID"]?.ToString(),
                                Children = new List<MenuReportAccessModel>()
                            });
                        }

                        // Build lookup and hierarchy
                        var lookup = new Dictionary<string, MenuReportAccessModel>();
                        var roots = new List<MenuReportAccessModel>();

                        for (int i = 0; i < result.Count; i++)
                        {
                            result[i].Children = new List<MenuReportAccessModel>();
                            lookup[result[i].AccountID] = result[i];
                        }

                        for (int i = 0; i < result.Count; i++)
                        {
                            var currentMenu = result[i];
                            if (string.IsNullOrEmpty(currentMenu.ParentAccountID))
                            {
                                roots.Add(currentMenu);
                            }
                            else if (lookup.ContainsKey(currentMenu.ParentAccountID))
                            {
                                lookup[currentMenu.ParentAccountID].Children.Add(currentMenu);
                            }
                        }

                        return roots;
                    }
                }

                return new List<MenuReportAccessModel>();
            }
            catch (Exception ex)
            {
                throw new Exception("Error while fetching menu hierarchy: " + ex.Message, ex);
            }
        }
        public async Task<ResponseModel> GetLedgerRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
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
                            new SqlParameter("@SubName",            request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLedgerRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Ledger From " + request.FromDate + " To " + request.ToDate;
                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Accounts Ledger Report", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";

                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
  
      
        public async Task<DataSet> ledgerReport(ReportRequestModel request)
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
                            new SqlParameter("@SubName",            request.FilterStr2),
                        };

                    reportData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLedgerRptExcel", param);
                }
            }
            catch (Exception ex)
            {

            }
            return reportData;
        }

        public async Task<ResponseModel> LedgerPrintPdf(RepReqModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                string baseUrl = "";
                baseUrl = dbconnection.Value.apiPath + "api/Ledger/";

                string UrlParam = "?FromDate=" + request.FromDate +
                                    "&ToDate=" + request.ToDate +
                                    "&Branch=" + request.FilterStr +
                                    "&YearId=" + request.FilterStr1 +
                                    "&AccountID=" + request.FilterStr2 +
                                    "&RptType=" + request.FilterStr3 +
                                    "&SubType=" + request.SortColumn +
                                    "&SubLedger=" + request.SortOrder +
                                    "&GroupYn=" + request.Search +
                                    "&format=" + request.FilterStr4;

                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.GetAsync(UrlParam).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    dynamic data = JsonConvert.DeserializeObject(result);
                    if (data != "500")
                    {
                        responseModel.Status = true;
                        responseModel.Message = data;
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = data;
                    }


                    client.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }
        public async Task<ResponseModel> LedgerMultiplePrintPdf(RepReqModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                string baseUrl = "";
                baseUrl = dbconnection.Value.apiPath + "api/MultipleLedger/";

                string UrlParam = "?FromDate=" + request.FromDate +
                                    "&ToDate=" + request.ToDate +
                                    "&Branch=" + request.FilterStr +
                                    "&YearId=" + request.FilterStr1 +
                                    "&AccountID=" + request.FilterStr2 +
                                    "&RptType=" + request.FilterStr3 +
                                    "&SubType=" + request.SortColumn +
                                    "&SubLedger=" + request.SortOrder +
                                    "&GroupYn=" + request.Search +
                                    "&format=" + request.FilterStr4;

                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.GetAsync(UrlParam).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    dynamic data = JsonConvert.DeserializeObject(result);
                    if (data != "500")
                    {
                        responseModel.Status = true;
                        responseModel.Message = data;
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = data;
                    }


                    client.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }
        public async Task<ResponseModel> AnnexurePrintPdf(RepReqModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                string baseUrl = "";
                baseUrl = dbconnection.Value.apiPath + "api/Annexure/";

                string UrlParam = "?FromDate=" + request.FromDate +
                                    "&ToDate=" + request.ToDate +
                                    "&Branch=" + request.FilterStr +
                                    "&YearId=" + request.FilterStr1 +
                                    "&AccountID=" + request.FilterStr2 +
                                    "&RptType=" + request.FilterStr3 +
                                    "&OpenOrdate=" + request.SortColumn +
                                    "&Supress=" + request.Search +
                                    "&format=" + request.FilterStr4;

                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.GetAsync(UrlParam).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    dynamic data = JsonConvert.DeserializeObject(result);
                    if (data != "500")
                    {
                        responseModel.Status = true;
                        responseModel.Message = data;
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = data;
                    }


                    client.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }
        public async Task<ResponseModel> BrokerLedgerPrint(ReportRequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                string baseUrl = "";
                baseUrl = dbconnection.Value.apiPath + "api/BrokerLedger/";

                string UrlParam = "?FromDate=" + request.FromDate +
                                    "&ToDate=" + request.ToDate +
                                    "&Branch=1" +
                                    "&YearId=" + request.FilterStr1 +
                                    "&BrokerId=" + request.FilterStr2 +
                                    "&format=" + request.Search;

                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.GetAsync(UrlParam).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    dynamic data = JsonConvert.DeserializeObject(result);
                    if (data != "500")
                    {
                        responseModel.Status = true;
                        responseModel.Message = data;
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = data;
                    }


                    client.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }




        public async Task<GstSalesRegisterRptListModel> GetGstSalesRegisterRptList(ReportRequestModel request)
        {
            GstSalesRegisterRptListModel gstSalesRegisterRptListModel = new();
            List<GstSalesRegisterRptModel> salesRpts = new();
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
                            new SqlParameter("@GstType",            request.FilterStr1),
                                new SqlParameter("@AccountID",          request.FilterStr),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getGstSalesRegisterRptList", param);
                    int totalRecords = 0;
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            salesRpts.Add(new GstSalesRegisterRptModel
                            {
                                InvDate = Convert.ToString(dataSet.Tables[0].Rows[i]["InvDate"]),
                                InvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["InvNo"]),
                                AccountGstNo = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountGstNo"]),
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                TotSubTotal = Convert.ToString(dataSet.Tables[0].Rows[i]["TotSubTotal"]),
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                TotalBillAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalBillAmt"]),

                            });
                        }

                        gstSalesRegisterRptListModel.GstSalesList = salesRpts;

                        gstSalesRegisterRptListModel.PageMetaData = new PaginationMetaData
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
            return gstSalesRegisterRptListModel;
        }
        public async Task<DataSet> GstSalesReport(ReportRequestModel request)
        {
            DataSet reportData = new();
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

                            new SqlParameter("@GstType",            request.FilterStr2),
                              new SqlParameter("@AccountID",          request.FilterStr),
                    };

                    reportData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getGstSalesRegisterRptList", param);
                }
            }
            catch (Exception ex)
            {

            }
            return reportData;
        }
        public async Task<ResponseModel> GetGstSalesRegisterRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                             new SqlParameter("@FromDate",           request.FromDate),
                            new SqlParameter("@ToDate",             request.ToDate),
                            new SqlParameter("@AccountID",          request.FilterStr),
                          //  new SqlParameter("@YearId",             request.FilterStr1),
                            new SqlParameter("@GstType",            request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getGstSalesRegisterRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Gst Sales From " + request.FromDate + " To " + request.ToDate;
                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Gst Sales Report", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }



        public async Task<ResponseModel> GetMonthlyBookingRptExcel(ReportRequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                SqlParameter[] param =
                {
                    new SqlParameter("@FromDate",   request.FromDate),
                    new SqlParameter("@ToDate",     request.ToDate),
                    new SqlParameter("@Freight",    request.FilterStr),
                    new SqlParameter("@BranchWise", request.FilterStr1)
                };
                var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getMonthlyBookingRptExcel", param);

                if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                {
                    var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy") +
                                     " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                    responseModel = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Monthly Booking Statement", filter);
                }
                else
                {
                    responseModel.Status = false;
                    responseModel.Message = "No Data";
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<ResponseModel> GetMonthlyLorryHireRptExcel(ReportRequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                SqlParameter[] param =
                {
                    new SqlParameter("@FromDate",   request.FromDate),
                    new SqlParameter("@ToDate",     request.ToDate),
                    new SqlParameter("@Freight",    request.FilterStr),
                    new SqlParameter("@BranchWise", request.FilterStr1)
                };
                var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getMonthlyLorryHireRptExcel", param);

                if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                {
                    var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy") +
                                     " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                    responseModel = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Monthly Lorry Hire Statement", filter);
                }
                else
                {
                    responseModel.Status = false;
                    responseModel.Message = "No Data";
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<ResponseModel> GetMonthlyAdminExpRptExcel(ReportRequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                SqlParameter[] param =
                {
                    new SqlParameter("@FromDate",   request.FromDate),
                    new SqlParameter("@ToDate",     request.ToDate),
                    new SqlParameter("@Branch",     request.FilterStr)
                };
                var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getMonthlyAdminExpRptExcel", param);

                if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                {
                    using (XLWorkbook wb = new XLWorkbook())
                    {
                        responseModel = await sharedRepository.GetCompanyDetail();
                        DataTable dt = dataSet.Tables[0];
                        int colcnt = 14;

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
                        ws.Range(3, 1, 3, colcnt).Value = "Monthly Admin Expense Statement";
                        ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                        ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                        ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                        ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                        ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                        ws.Range(4, 1, 4, colcnt).Merge();
                        ws.Range(4, 1, 4, colcnt).Value = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy") +
                                                        " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");
                        ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                        ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                        ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                        ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                        ws.Cell(5, 1).Value = "Admin Exp Desc";
                        ws.Cell(5, 2).Value = "April";
                        ws.Cell(5, 3).Value = "May";
                        ws.Cell(5, 4).Value = "June";
                        ws.Cell(5, 5).Value = "July";
                        ws.Cell(5, 6).Value = "August";
                        ws.Cell(5, 7).Value = "September";
                        ws.Cell(5, 8).Value = "October";
                        ws.Cell(5, 9).Value = "November";
                        ws.Cell(5, 10).Value = "December";
                        ws.Cell(5, 11).Value = "January";
                        ws.Cell(5, 12).Value = "February";
                        ws.Cell(5, 13).Value = "March";
                        ws.Cell(5, 14).Value = "Total";

                        ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                        ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                        ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;



                        var br = "";

                        decimal brApril = 0; decimal TotApril = 0;
                        decimal brMay = 0; decimal TotMay = 0;
                        decimal brJune = 0; decimal TotJune = 0;
                        decimal brJuly = 0; decimal TotJuly = 0;
                        decimal brAugust = 0; decimal TotAugust = 0;
                        decimal brSeptember = 0; decimal TotSeptember = 0;
                        decimal brOctober = 0; decimal TotOctober = 0;
                        decimal brNovember = 0; decimal TotNovember = 0;
                        decimal brDecember = 0; decimal TotDecember = 0;
                        decimal brJanuary = 0; decimal TotJanuary = 0;
                        decimal brFebruary = 0; decimal TotFebruary = 0;
                        decimal brMarch = 0; decimal TotMarch = 0;
                        decimal brTotal = 0; decimal gTotal = 0;

                        int j = 0;
                        int i = 6;

                        for (j = 0; j < dt.Rows.Count; j++)
                        {
                            if (br != dt.Rows[j]["Branch"].ToString())
                            {
                                if (j > 0)
                                {
                                    ws.Cell(i, 1).Value = "Branch Total";
                                    ws.Cell(i, 2).Value = brApril.ToString();
                                    ws.Cell(i, 3).Value = brMay.ToString();
                                    ws.Cell(i, 4).Value = brJune.ToString();
                                    ws.Cell(i, 5).Value = brJuly.ToString();
                                    ws.Cell(i, 6).Value = brAugust.ToString();
                                    ws.Cell(i, 7).Value = brSeptember.ToString();
                                    ws.Cell(i, 8).Value = brOctober.ToString();
                                    ws.Cell(i, 9).Value = brNovember.ToString();
                                    ws.Cell(i, 10).Value = brDecember.ToString();
                                    ws.Cell(i, 11).Value = brJanuary.ToString();
                                    ws.Cell(i, 12).Value = brFebruary.ToString();
                                    ws.Cell(i, 13).Value = brMarch.ToString();
                                    ws.Cell(i, 14).Value = brTotal.ToString();

                                    ws.Range(i, 1, i, colcnt).Style.Font.Bold = true;
                                    ws.Range(i, 1, i, colcnt).Style.Font.FontSize = 12;
                                    ws.Range(i, 1, i, colcnt).Style.Font.FontColor = XLColor.Maroon;

                                    i++;
                                }

                                brApril = 0;
                                brMay = 0;
                                brJune = 0;
                                brJuly = 0;
                                brAugust = 0;
                                brSeptember = 0;
                                brOctober = 0;
                                brNovember = 0;
                                brDecember = 0;
                                brJanuary = 0;
                                brFebruary = 0;
                                brMarch = 0;
                                brTotal = 0;

                                br = dt.Rows[j]["Branch"].ToString();

                                ws.Range(i, 1, i, colcnt).Merge();
                                ws.Range(i, 1, i, colcnt).Value = br;
                                ws.Range(i, 1, i, colcnt).Style.Font.Bold = true;
                                ws.Range(i, 1, i, colcnt).Style.Font.FontSize = 12;
                                ws.Range(i, 1, i, colcnt).Style.Font.FontColor = XLColor.Navy;

                                i++;

                            }

                            ws.Cell(i, 1).Value = dt.Rows[j]["AdminExpDesc"].ToString();
                            ws.Cell(i, 2).Value = dt.Rows[j]["April"].ToString();
                            ws.Cell(i, 3).Value = dt.Rows[j]["May"].ToString();
                            ws.Cell(i, 4).Value = dt.Rows[j]["June"].ToString();
                            ws.Cell(i, 5).Value = dt.Rows[j]["July"].ToString();
                            ws.Cell(i, 6).Value = dt.Rows[j]["August"].ToString();
                            ws.Cell(i, 7).Value = dt.Rows[j]["September"].ToString();
                            ws.Cell(i, 8).Value = dt.Rows[j]["October"].ToString();
                            ws.Cell(i, 9).Value = dt.Rows[j]["November"].ToString();
                            ws.Cell(i, 10).Value = dt.Rows[j]["December"].ToString();
                            ws.Cell(i, 11).Value = dt.Rows[j]["January"].ToString();
                            ws.Cell(i, 12).Value = dt.Rows[j]["February"].ToString();
                            ws.Cell(i, 13).Value = dt.Rows[j]["March"].ToString();
                            ws.Cell(i, 14).Value = dt.Rows[j]["Total"].ToString();

                            i++;

                            if (request.FilterStr1 == "Y")
                            {
                                ws.Cell(i, 1).Value = "Budget";
                                ws.Cell(i, 2).Value = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 3).Value = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 4).Value = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 5).Value = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 6).Value = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 7).Value = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 8).Value = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 9).Value = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 10).Value = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 11).Value = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 12).Value = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 13).Value = dt.Rows[j]["BudgetAmt"].ToString();

                                i++;
                            }

                            brApril = brApril + dt.Rows[j]["April"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["April"]);
                            brMay = brMay + dt.Rows[j]["May"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["May"]);
                            brJune = brJune + dt.Rows[j]["June"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["June"]);
                            brJuly = brJuly + dt.Rows[j]["July"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["July"]);
                            brAugust = brAugust + dt.Rows[j]["August"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["August"]);
                            brSeptember = brSeptember + dt.Rows[j]["September"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["September"]);
                            brOctober = brOctober + dt.Rows[j]["October"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["October"]);
                            brNovember = brNovember + dt.Rows[j]["November"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["November"]);
                            brDecember = brDecember + dt.Rows[j]["December"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["December"]);
                            brJanuary = brJanuary + dt.Rows[j]["January"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["January"]);
                            brFebruary = brFebruary + dt.Rows[j]["February"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["February"]);
                            brMarch = brMarch + dt.Rows[j]["March"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["March"]);
                            brTotal = brTotal + dt.Rows[j]["Total"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["Total"]);

                            TotApril = TotApril + dt.Rows[j]["April"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["April"]);
                            TotMay = TotMay + dt.Rows[j]["May"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["May"]);
                            TotJune = TotJune + dt.Rows[j]["June"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["June"]);
                            TotJuly = TotJuly + dt.Rows[j]["July"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["July"]);
                            TotAugust = TotAugust + dt.Rows[j]["August"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["August"]);
                            TotSeptember = TotSeptember + dt.Rows[j]["September"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["September"]);
                            TotOctober = TotOctober + dt.Rows[j]["October"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["October"]);
                            TotNovember = TotNovember + dt.Rows[j]["November"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["November"]);
                            TotDecember = TotDecember + dt.Rows[j]["December"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["December"]);
                            TotJanuary = TotJanuary + dt.Rows[j]["January"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["January"]);
                            TotFebruary = TotFebruary + dt.Rows[j]["February"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["February"]);
                            TotMarch = TotMarch + dt.Rows[j]["March"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["March"]);
                            gTotal = gTotal + dt.Rows[j]["Total"].ToString() == "" ? 0 : Convert.ToDecimal(dt.Rows[j]["Total"]);
                        }

                        ws.Cell(i, 1).Value = "Branch Total";
                        ws.Cell(i, 2).Value = brApril.ToString();
                        ws.Cell(i, 3).Value = brMay.ToString();
                        ws.Cell(i, 4).Value = brJune.ToString();
                        ws.Cell(i, 5).Value = brJuly.ToString();
                        ws.Cell(i, 6).Value = brAugust.ToString();
                        ws.Cell(i, 7).Value = brSeptember.ToString();
                        ws.Cell(i, 8).Value = brOctober.ToString();
                        ws.Cell(i, 9).Value = brNovember.ToString();
                        ws.Cell(i, 10).Value = brDecember.ToString();
                        ws.Cell(i, 11).Value = brJanuary.ToString();
                        ws.Cell(i, 12).Value = brFebruary.ToString();
                        ws.Cell(i, 13).Value = brMarch.ToString();
                        ws.Cell(i, 14).Value = brTotal.ToString();

                        ws.Range(i, 1, i, colcnt).Style.Font.Bold = true;
                        ws.Range(i, 1, i, colcnt).Style.Font.FontSize = 12;
                        ws.Range(i, 1, i, colcnt).Style.Font.FontColor = XLColor.Maroon;

                        i++;

                        ws.Cell(i, 1).Value = "Total";
                        ws.Cell(i, 2).Value = TotApril.ToString();
                        ws.Cell(i, 3).Value = TotMay.ToString();
                        ws.Cell(i, 4).Value = TotJune.ToString();
                        ws.Cell(i, 5).Value = TotJuly.ToString();
                        ws.Cell(i, 6).Value = TotAugust.ToString();
                        ws.Cell(i, 7).Value = TotSeptember.ToString();
                        ws.Cell(i, 8).Value = TotOctober.ToString();
                        ws.Cell(i, 9).Value = TotNovember.ToString();
                        ws.Cell(i, 10).Value = TotDecember.ToString();
                        ws.Cell(i, 11).Value = TotJanuary.ToString();
                        ws.Cell(i, 12).Value = TotFebruary.ToString();
                        ws.Cell(i, 13).Value = TotMarch.ToString();
                        ws.Cell(i, 14).Value = gTotal.ToString();

                        ws.Range(i, 1, i, colcnt).Style.Font.Bold = true;
                        ws.Range(i, 1, i, colcnt).Style.Font.FontSize = 14;

                        i++;

                        for (int k = 1; k <= colcnt; k++)
                        {
                            ws.Column(k).AdjustToContents();
                        }

                        ws.Range(5, 1, i - 1, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                        ws.Range(5, 1, i - 1, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

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
                else
                {
                    responseModel.Status = false;
                    responseModel.Message = "No Data Found";
                }

            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }

        public async Task<ResponseModel> GetMonthlyPerformanceExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@RptType",    request.FilterStr),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getMonthlyPerformanceRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        response = await GetMonthlyPerReport(dataSet, request);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {

                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ResponseModel> GetMonthlyPerReport(DataSet ds, ReportRequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                responseModel = await sharedRepository.GetCompanyDetail();
                using (XLWorkbook wb = new XLWorkbook())
                {
                    int colcnt = ds.Tables[0].Columns.Count;
                    var rptheader = "";
                    var filter = "PERIOD FROM " + Convert.ToDateTime(request.FromDate).ToString("dd-MMMM-yyyy")
                                    + " TO " + Convert.ToDateTime(request.ToDate).ToString("dd-MMMM-yyyy");


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
                    if (request.FilterStr == "M")
                    {
                        rptheader = "MONTH WISE - MONTHLY PERFORMANCE REPORT";
                    }
                    else if (request.FilterStr == "B")
                    {
                        rptheader = "BRANCH WISE - MONTHLY PERFORMANCE REPORT";
                    }
                    else 
                    {
                        rptheader = "BRANCH WISE - MONTHLY PERFORMANCE REPORT";
                    }
                    filter = "FROM THE MONTH " + Convert.ToDateTime(request.FromDate).ToString("MMMM-yyyy")
                        + " TO " + Convert.ToDateTime(request.ToDate).ToString("MMMM-yyyy");

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

                    int j = 0, r = 5;
                    System.Data.DataTable dt = new System.Data.DataTable();
                    if (ds != null && ds.Tables[0].Rows.Count > 0)
                    {
                        dt = ds.Tables[0];
                    }

                    ws.Range(r, 1, r + 1, 1).Merge();
                    ws.Range(r, 1, r + 1, 1).Value = "SL.No";
                    ws.Range(r, 2, r + 1, 2).Merge();
                    ws.Range(r, 2, r + 1, 2).Value = dt.Columns[1].ColumnName;
                    ws.Range(r, 3, r, 4).Merge();
                    ws.Range(r, 3, r, 4).Value = "TOTAL BOOKING";
                    ws.Range(r, 5, r, 6).Merge();
                    ws.Range(r, 5, r, 6).Value = "OPRNL. COSTING";
                    ws.Range(r, 7, r, 8).Merge();
                    ws.Range(r, 7, r, 8).Value = "MARGIN AFTER 3 % BFD";
                    ws.Range(r, 9, r, 10).Merge();
                    ws.Range(r, 9, r, 10).Value = "TOTAL ADMN. EXPENSES";
                    ws.Range(r, 11, r, 12).Merge();
                    ws.Range(r, 11, r, 12).Value = "MARGIN / LOSS(Excluding  Income Tax &  Depreciation )";

                    ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                    ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 12;
                    ws.Range(r, 1, r, colcnt).Style.Font.FontColor = XLColor.Black;
                    ws.Range(r, 1, r, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    r++;

                    ws.Cell(r, 3).Value = "FREIGHT";
                    ws.Cell(r, 4).Value = "NOS. OF GC NOTES";
                    ws.Cell(r, 5).Value = "AMOUNT";
                    ws.Cell(r, 6).Value = "% OVER FREIGHT AMT.";
                    ws.Cell(r, 7).Value = "AMOUNT";
                    ws.Cell(r, 8).Value = "% OVER FREIGHT AMT.";
                    ws.Cell(r, 9).Value = "AMOUNT";
                    ws.Cell(r, 10).Value = "% OVER FREIGHT AMT.";
                    ws.Cell(r, 11).Value = "AMOUNT";
                    ws.Cell(r, 12).Value = "% OVER FREIGHT AMT.";

                    ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                    ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 12;
                    ws.Range(r, 1, r, colcnt).Style.Font.FontColor = XLColor.Black;
                    ws.Range(r, 1, r, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                    r++;

                    for (j = 0; j < dt.Rows.Count; j++)
                    {
                        if (dt.Rows[j][0].ToString() == "999" || dt.Rows[j][0].ToString() == "1000")
                        {
                            ws.Range(r, 1, r, 2).Merge();
                            ws.Range(r, 1, r, 2).Value = dt.Rows[j][1].ToString();
                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                        }
                        else
                        {
                            ws.Cell(r, 1).Value = Convert.ToString(dt.Rows[j][0]);
                            ws.Cell(r, 2).Value = Convert.ToString(dt.Rows[j][1]);
                            if (request.FilterStr == "M")
                                ws.Cell(r, 2).Style.NumberFormat.Format = "MMMM-yy";
                        }
                        for (int i = 2; i < colcnt; i++)
                        {
                            ws.Cell(r, i + 1).Value = Convert.ToString(dt.Rows[j][i]);
                        }
                        r++;
                    }

                    ws.Range(r, 1, r, colcnt).Merge();
                    ws.Range(r, 1, r, colcnt).Value = "";
                    r++;

                    for (int k = 1; k <= colcnt; k++)
                    {
                        ws.Column(k).AdjustToContents();
                    }

                    ws.Range(5, 1, r - 1, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    ws.Range(5, 1, r - 1, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                    var foldername = System.IO.Path.Combine("Reports", "Download");
                    var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                    var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";
                    var filePath = foldername + "//" + filename;
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
