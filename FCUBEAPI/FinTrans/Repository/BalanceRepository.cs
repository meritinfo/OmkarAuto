using Microsoft.Extensions.Options;
using FinTrans.Models;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using Shared.Repository;
using ClosedXML.Excel;
using System.Data;
using DocumentFormat.OpenXml.Drawing;
using System.Diagnostics;
using DocumentFormat.OpenXml.Wordprocessing;
using System.Runtime.ConstrainedExecution;

namespace FinTrans.Repository
{
    public class BalanceRepository : IBalanceRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public BalanceRepository(IOptions<DBModel> _dbconnection,
            ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
                  
        public async Task<ResponseModel> GetOpeningBalanceExcel(ReportRequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@YearId",    request.FilterStr),
                        new SqlParameter("@Branch",    request.FilterStr1),
                    };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTrailRptOpeningBalance", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        
                        DataTable dt = dataSet.Tables[0];

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            int colcnt = 4;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = "MAXWELL LOGISTICS PRIVATE LIMITED";
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
                            ws.Range(3, 1, 3, colcnt).Value = "Opening Trial Balance";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = request.FilterStr2=="" ? "CONSOLIDATED" : request.FilterStr2;
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Cell(5, 1).Value = "ACCOUNT NAME";
                            ws.Cell(5, 2).Value = "";
                            ws.Cell(5, 3).Value = "DEBIT Rs";
                            ws.Cell(5, 3).Style.Font.FontColor = XLColor.Red;
                            ws.Cell(5, 4).Value = "CREDIT Rs.";
                            ws.Cell(5, 4).Style.Font.FontColor = XLColor.Blue;


                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;

                            int j = 0;
                            int r = 6;
                            var MainGroup = "";
                            var SubGroup = "";
                            var CrdDbtNote = "";
                            var clr = XLColor.Red;
                            decimal totCrd = 0;
                            decimal totDbt = 0;


                            for (j = 0; j < dt.Rows.Count; j++)
                            {
                                if (MainGroup!= dt.Rows[j]["MainGroup"].ToString())
                                {
                                    ws.Range(r, 1, r, colcnt).Merge();
                                    ws.Range(r, 1, r, colcnt).Value = dt.Rows[j]["MainGroup"].ToString();
                                    ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                    ws.Range(r, 1, r, colcnt).Style.Font.FontColor = XLColor.DarkGreen;
                                    ws.Range(r, 1, r, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                                    ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 11;
                                    MainGroup = dt.Rows[j]["MainGroup"].ToString();
                                    r++;

                                    ws.Range(r, 1, r, colcnt).Merge();
                                    ws.Range(r, 1, r, colcnt).Value = "";
                                    r++;

                                }

                                if (SubGroup!= dt.Rows[j]["SubGroup"].ToString())
                                {
                                    CrdDbtNote = "";
                                    ws.Cell(r, 1).Value = dt.Rows[j]["SubGroup"].ToString();
                                    ws.Cell(r, 1).Style.Font.Bold = true;
                                    ws.Cell(r, 1).Style.Font.FontSize = 11;
                                    if (Convert.ToDecimal(dt.Rows[j]["tot"].ToString())>0)
                                    {
                                        CrdDbtNote = Math.Abs(Convert.ToDecimal(dt.Rows[j]["tot"].ToString())) + " Dr";
                                    }
                                    if (Convert.ToDecimal(dt.Rows[j]["tot"].ToString())<0)
                                    {
                                        CrdDbtNote = Math.Abs(Convert.ToDecimal(dt.Rows[j]["tot"].ToString())) + " Cr";
                                        clr = XLColor.Blue;
                                    }
                                    ws.Cell(r, 2).Value = CrdDbtNote;
                                    ws.Cell(r, 2).Style.Font.Bold = true;
                                    ws.Cell(r, 2).Style.Font.FontColor = clr;
                                    ws.Cell(r, 2).Style.Font.FontSize = 11;

                                    SubGroup= dt.Rows[j]["SubGroup"].ToString();
                                    r++;
                                }

                                ws.Cell(r, 1).Value = dt.Rows[j]["AccountName"].ToString();
                                ws.Cell(r, 2).Value = "";
                                ws.Cell(r, 3).Value = Convert.ToDecimal(dt.Rows[j]["DEBIT"].ToString())>0? dt.Rows[j]["DEBIT"].ToString():"";
                                ws.Cell(r, 4).Value = Convert.ToDecimal(dt.Rows[j]["CREDIT"].ToString())>0 ? dt.Rows[j]["CREDIT"].ToString():"";

                                totDbt = totDbt + Convert.ToDecimal(dt.Rows[j]["DEBIT"].ToString());
                                totCrd = totCrd + Convert.ToDecimal(dt.Rows[j]["CREDIT"].ToString()); 
                               
                                r++;
                            }


                            ws.Range(r, 1, r, 2).Merge(); 

                            if (totDbt - totCrd > 0)
                            {
                                ws.Range(r, 1, r, 2).Value ="Debit Side Diff. :" + (totDbt - totCrd).ToString();
                                ws.Range(r, 1, r, 2).Style.Font.FontColor = XLColor.Red;
                            }
                            else if (totDbt - totCrd < 0)
                            {
                                ws.Range(r, 1, r, 2).Value ="Credit Side Diff. :" + (totCrd - totDbt).ToString();
                                ws.Range(r, 1, r, 2).Style.Font.FontColor = XLColor.Blue;
                            }
                            ws.Cell(r, 3).Value = totDbt;
                            ws.Cell(r, 4).Value = totCrd;
                            ws.Range(r, 1, r, 4).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 4).Style.Font.FontSize = 11;
                            ws.Range(6, 3, r, 4).Style.NumberFormat.Format = "0.00";


                            for (int k = 1; k <= colcnt; k++)
                            {
                                ws.Column(k).AdjustToContents();
                            }

                            ws.Range(5, 1, r, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, r, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("Reports", "Download");
                            var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                            var filename = "OpeningBalance_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";
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
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<ResponseModel> GetAsOnDateExcel(ReportRequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@FromDate",   request.FromDate),
                        new SqlParameter("@ToDate",     request.ToDate),
                        new SqlParameter("@YearId",     request.FilterStr),
                        new SqlParameter("@Branch",     request.FilterStr1),
                        new SqlParameter("@BalanceSheet", request.Search),
                    };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTrailRptAsOnDate", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {

                        DataTable dt = dataSet.Tables[0];

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            int colcnt = 4;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = "MAXWELL LOGISTICS PRIVATE LIMITED";
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
                            ws.Range(3, 1, 3, colcnt).Value = "As On Date";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = request.FilterStr2=="" ? "CONSOLIDATED" : request.FilterStr2;
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Cell(5, 1).Value = "ACCOUNT NAME";
                            ws.Cell(5, 2).Value = "";
                            ws.Cell(5, 3).Value = "DEBIT Rs";
                            ws.Cell(5, 3).Style.Font.FontColor = XLColor.Red;
                            ws.Cell(5, 4).Value = "CREDIT Rs.";
                            ws.Cell(5, 4).Style.Font.FontColor = XLColor.Blue;


                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;

                            int j = 0;
                            int r = 6;
                            var MainGroup = "";
                            var SubGroup = "";
                            var CrdDbtNote = "";
                            var clr = XLColor.Red;
                            decimal totCrd = 0;
                            decimal totDbt = 0;


                            for (j = 0; j < dt.Rows.Count; j++)
                            {
                                if (MainGroup!= dt.Rows[j]["MainGroup"].ToString())
                                {
                                    ws.Range(r, 1, r, colcnt).Merge();
                                    ws.Range(r, 1, r, colcnt).Value = dt.Rows[j]["MainGroup"].ToString();
                                    ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                    ws.Range(r, 1, r, colcnt).Style.Font.FontColor = XLColor.DarkGreen;
                                    ws.Range(r, 1, r, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                                    ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 11;
                                    MainGroup = dt.Rows[j]["MainGroup"].ToString();
                                    r++;

                                    ws.Range(r, 1, r, colcnt).Merge();
                                    ws.Range(r, 1, r, colcnt).Value = "";
                                    r++;

                                }

                                if (SubGroup!= dt.Rows[j]["SubGroup"].ToString())
                                {
                                    CrdDbtNote = "";
                                    ws.Cell(r, 1).Value = dt.Rows[j]["SubGroup"].ToString();
                                    ws.Cell(r, 1).Style.Font.Bold = true;
                                    ws.Cell(r, 1).Style.Font.FontSize = 11;
                                    if (Convert.ToDecimal(dt.Rows[j]["tot"].ToString())>0)
                                    {
                                        CrdDbtNote = Math.Abs(Convert.ToDecimal(dt.Rows[j]["tot"].ToString())) + " Dr";
                                    }
                                    if (Convert.ToDecimal(dt.Rows[j]["tot"].ToString())<0)
                                    {
                                        CrdDbtNote = Math.Abs(Convert.ToDecimal(dt.Rows[j]["tot"].ToString())) + " Cr";
                                        clr = XLColor.Blue;
                                    }
                                    ws.Cell(r, 2).Value = CrdDbtNote;
                                    ws.Cell(r, 2).Style.Font.Bold = true;
                                    ws.Cell(r, 2).Style.Font.FontColor = clr;
                                    ws.Cell(r, 2).Style.Font.FontSize = 11;

                                    SubGroup= dt.Rows[j]["SubGroup"].ToString();
                                    r++;
                                }

                                ws.Cell(r, 1).Value = dt.Rows[j]["AccountName"].ToString();
                                ws.Cell(r, 2).Value = "";
                                ws.Cell(r, 3).Value = Convert.ToDecimal(dt.Rows[j]["DEBIT"].ToString())>0 ? dt.Rows[j]["DEBIT"].ToString() : "";
                                ws.Cell(r, 4).Value = Convert.ToDecimal(dt.Rows[j]["CREDIT"].ToString())>0 ? dt.Rows[j]["CREDIT"].ToString() : "";

                                totDbt = totDbt + Convert.ToDecimal(dt.Rows[j]["DEBIT"].ToString());
                                totCrd = totCrd + Convert.ToDecimal(dt.Rows[j]["CREDIT"].ToString());

                                r++;
                            }


                            ws.Range(r, 1, r, 2).Merge();

                            if (totDbt - totCrd > 0)
                            {
                                ws.Range(r, 1, r, 2).Value ="Debit Side Diff. :" + (totDbt - totCrd).ToString();
                                ws.Range(r, 1, r, 2).Style.Font.FontColor = XLColor.Red;
                            }
                            else if (totDbt - totCrd < 0)
                            {
                                ws.Range(r, 1, r, 2).Value ="Credit Side Diff. :" + (totCrd - totDbt).ToString();
                                ws.Range(r, 1, r, 2).Style.Font.FontColor = XLColor.Blue;
                            }
                            ws.Cell(r, 3).Value = totDbt;
                            ws.Cell(r, 4).Value = totCrd;
                            ws.Range(r, 1, r, 4).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 4).Style.Font.FontSize = 11;
                            ws.Range(6, 3, r, 4).Style.NumberFormat.Format = "0.00";


                            for (int k = 1; k <= colcnt; k++)
                            {
                                ws.Column(k).AdjustToContents();
                            }

                            ws.Range(5, 1, r, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, r, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("Reports", "Download");
                            var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                            var filename = "AsOnDate_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";
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
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<ResponseModel> GetAsOnDateDetailsExcel(ReportRequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@FromDate",   request.FromDate),
                        new SqlParameter("@ToDate",     request.ToDate),
                        new SqlParameter("@YearId",     request.FilterStr),
                        new SqlParameter("@Branch",     request.FilterStr1),
                        new SqlParameter("@Group",      ""),
                    };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTrailRptAsOnDateDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {

                        DataTable dt = dataSet.Tables[0];

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            int colcnt = 7;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = "MAXWELL LOGISTICS PRIVATE LIMITED";
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
                            ws.Range(3, 1, 3, colcnt).Value = "AS ON DATE (DETAILS) : " + Convert.ToDateTime(request.ToDate).ToString("dd-MM-yyyy")  ;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = request.FilterStr2=="" ? "CONSOLIDATED" : request.FilterStr2;
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(5, 2, 5, 3).Merge();
                            ws.Range(5, 2, 5, 3).Value = "OPENING";
                            ws.Range(5, 4, 5, 5).Merge();
                            ws.Range(5, 4, 5, 5).Value = "DURING THE PERIOD";
                            ws.Range(5, 6, 5, 7).Merge();
                            ws.Range(5, 6, 5, 7).Value = "CLOSING";
                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;

                            ws.Cell(6, 1).Value = "ACCOUNT NAME";
                            ws.Cell(6, 2).Value = "DEBIT";
                            ws.Cell(6, 2).Style.Font.FontColor = XLColor.Red;
                            ws.Cell(6, 3).Value = "CREDIT";
                            ws.Cell(6, 3).Style.Font.FontColor = XLColor.Blue;
                            ws.Cell(6, 4).Value = "DEBIT";
                            ws.Cell(6, 4).Style.Font.FontColor = XLColor.Red;
                            ws.Cell(6, 5).Value = "CREDIT";
                            ws.Cell(6, 5).Style.Font.FontColor = XLColor.Blue;


                            ws.Range(6, 1, 6, colcnt).Style.Font.Bold = true;
                            ws.Range(6, 1, 6, colcnt).Style.Font.FontSize = 12;

                            int j = 0;
                            int r = 7;
                            decimal totDrOpen = 0;
                            decimal totDrAMt = 0;
                            decimal totCrOpen = 0;
                            decimal totCrAmt = 0;

                            decimal balAmt = 0;
                            decimal totbalAmt = 0;


                            for (j = 0; j < dt.Rows.Count; j++)
                            {
                                balAmt = Convert.ToDecimal(dt.Rows[j]["DrOpen"].ToString()) +
                                        Convert.ToDecimal(dt.Rows[j]["DrAMt"].ToString()) -
                                        Convert.ToDecimal(dt.Rows[j]["CrOpen"].ToString()) -
                                        Convert.ToDecimal(dt.Rows[j]["CrAmt"].ToString());

                                totDrOpen = totDrOpen + Convert.ToDecimal(dt.Rows[j]["DrOpen"].ToString());
                                totDrAMt = totDrAMt  + Convert.ToDecimal(dt.Rows[j]["DrAMt"].ToString());
                                totCrOpen = totCrOpen + Convert.ToDecimal(dt.Rows[j]["CrOpen"].ToString());
                                totCrAmt = totCrAmt  + Convert.ToDecimal(dt.Rows[j]["CrAmt"].ToString());

                                totbalAmt = totbalAmt + balAmt;

                                ws.Cell(r, 1).Value = dt.Rows[j]["AccountName"].ToString();
                                ws.Cell(r, 2).Value = Convert.ToDecimal(dt.Rows[j]["DrOpen"].ToString())>0 ? dt.Rows[j]["DrOpen"].ToString() : "";
                                ws.Cell(r, 3).Value = Convert.ToDecimal(dt.Rows[j]["CrOpen"].ToString())>0 ? dt.Rows[j]["CrOpen"].ToString() : "";
                                ws.Cell(r, 4).Value = Convert.ToDecimal(dt.Rows[j]["DrAMt"].ToString())>0 ? dt.Rows[j]["DrAMt"].ToString() : "";
                                ws.Cell(r, 5).Value = Convert.ToDecimal(dt.Rows[j]["CrAmt"].ToString())>0 ? dt.Rows[j]["CrAmt"].ToString() : "";
                                ws.Cell(r, 6).Value = Math.Abs(balAmt);
                                
                                if (balAmt>0)
                                {
                                    ws.Cell(r, 7).Value = "D";
                                    ws.Range(r, 6, r, 7).Style.Font.FontColor = XLColor.Red;
                                }
                                else
                                {
                                    ws.Cell(r, 7).Value = "C";
                                    ws.Range(r, 6, r, 7).Style.Font.FontColor = XLColor.Blue;
                                }

                                r++;
                            }


                            ws.Cell(r, 2).Value = totDrOpen.ToString();
                            ws.Cell(r, 3).Value = totCrOpen.ToString();
                            ws.Cell(r, 4).Value = totDrAMt.ToString();
                            ws.Cell(r, 5).Value = totCrAmt.ToString();
                            ws.Cell(r, 6).Value = totbalAmt.ToString();

                            ws.Range(r, 1, r, 7).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 7).Style.Font.FontSize = 12;
                            ws.Range(r, 1, r, 7).Style.Font.FontColor = XLColor.DarkBlue;
                            ws.Range(7, 2, r, 6).Style.NumberFormat.Format = "0.00";


                            for (int k = 1; k <= colcnt; k++)
                            {
                                ws.Column(k).AdjustToContents();
                            }

                            ws.Range(5, 1, r, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, r, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("Reports", "Download");
                            var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                            var filename = "AsOnDateDetails_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";
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
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<ResponseModel> GetAsOnDateDetailsGroupExcel(ReportRequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@FromDate",   request.FromDate),
                        new SqlParameter("@ToDate",     request.ToDate),
                        new SqlParameter("@YearId",     request.FilterStr),
                        new SqlParameter("@Branch",     request.FilterStr1),
                        new SqlParameter("@Group",      "Y"),
                    };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTrailRptAsOnDateDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {

                        DataTable dt = dataSet.Tables[0];

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            int colcnt = 7;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = "MAXWELL LOGISTICS PRIVATE LIMITED";
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
                            ws.Range(3, 1, 3, colcnt).Value = "AS ON DATE (DETAILS) : " + Convert.ToDateTime(request.ToDate).ToString("dd-MM-yyyy");
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = request.FilterStr2=="" ? "CONSOLIDATED" : request.FilterStr2;
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(5, 2, 5, 3).Merge();
                            ws.Range(5, 2, 5, 3).Value = "OPENING";
                            ws.Range(5, 4, 5, 5).Merge();
                            ws.Range(5, 4, 5, 5).Value = "DURING THE PERIOD";
                            ws.Range(5, 6, 5, 7).Merge();
                            ws.Range(5, 6, 5, 7).Value = "CLOSING";
                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;

                            ws.Cell(6, 1).Value = "ACCOUNT NAME";
                            ws.Cell(6, 2).Value = "DEBIT";
                            ws.Cell(6, 2).Style.Font.FontColor = XLColor.Red;
                            ws.Cell(6, 3).Value = "CREDIT";
                            ws.Cell(6, 3).Style.Font.FontColor = XLColor.Blue;
                            ws.Cell(6, 4).Value = "DEBIT";
                            ws.Cell(6, 4).Style.Font.FontColor = XLColor.Red;
                            ws.Cell(6, 5).Value = "CREDIT";
                            ws.Cell(6, 5).Style.Font.FontColor = XLColor.Blue;


                            ws.Range(6, 1, 6, colcnt).Style.Font.Bold = true;
                            ws.Range(6, 1, 6, colcnt).Style.Font.FontSize = 12;

                            var MainGroup = "";
                            var SubGroup = "";

                            int j = 0;
                            int r = 7;
                            decimal totDrOpen = 0;
                            decimal totDrAMt = 0;
                            decimal totCrOpen = 0;
                            decimal totCrAmt = 0;

                            decimal balAmt = 0;
                            decimal totbalAmt = 0;


                            for (j = 0; j < dt.Rows.Count; j++)
                            {
                                if (MainGroup!= dt.Rows[j]["MainGroup"].ToString())
                                {
                                    ws.Range(r, 1, r, colcnt).Merge();
                                    ws.Range(r, 1, r, colcnt).Value = dt.Rows[j]["MainGroup"].ToString();
                                    ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                    ws.Range(r, 1, r, colcnt).Style.Font.FontColor = XLColor.DarkGreen;
                                    ws.Range(r, 1, r, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                                    ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 11;
                                    MainGroup = dt.Rows[j]["MainGroup"].ToString();
                                    r++;

                                    ws.Range(r, 1, r, colcnt).Merge();
                                    ws.Range(r, 1, r, colcnt).Value = "";
                                    r++;

                                }

                                if (SubGroup!= dt.Rows[j]["SubGroup"].ToString())
                                {
                                    ws.Range(r, 1, r, colcnt).Merge();
                                    ws.Range(r, 1, r, colcnt).Value = dt.Rows[j]["SubGroup"].ToString();
                                    ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                    ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 11;                                   

                                    SubGroup= dt.Rows[j]["SubGroup"].ToString();
                                    r++;
                                }

                                balAmt = Convert.ToDecimal(dt.Rows[j]["DrOpen"].ToString()) +
                                        Convert.ToDecimal(dt.Rows[j]["DrAMt"].ToString()) -
                                        Convert.ToDecimal(dt.Rows[j]["CrOpen"].ToString()) -
                                        Convert.ToDecimal(dt.Rows[j]["CrAmt"].ToString());

                                totDrOpen = totDrOpen + Convert.ToDecimal(dt.Rows[j]["DrOpen"].ToString());
                                totDrAMt = totDrAMt  + Convert.ToDecimal(dt.Rows[j]["DrAMt"].ToString());
                                totCrOpen = totCrOpen + Convert.ToDecimal(dt.Rows[j]["CrOpen"].ToString());
                                totCrAmt = totCrAmt  + Convert.ToDecimal(dt.Rows[j]["CrAmt"].ToString());

                                totbalAmt = totbalAmt + balAmt;

                                ws.Cell(r, 1).Value = dt.Rows[j]["AccountName"].ToString();
                                ws.Cell(r, 2).Value = Convert.ToDecimal(dt.Rows[j]["DrOpen"].ToString())>0 ? dt.Rows[j]["DrOpen"].ToString() : "";
                                ws.Cell(r, 3).Value = Convert.ToDecimal(dt.Rows[j]["CrOpen"].ToString())>0 ? dt.Rows[j]["CrOpen"].ToString() : "";
                                ws.Cell(r, 4).Value = Convert.ToDecimal(dt.Rows[j]["DrAMt"].ToString())>0 ? dt.Rows[j]["DrAMt"].ToString() : "";
                                ws.Cell(r, 5).Value = Convert.ToDecimal(dt.Rows[j]["CrAmt"].ToString())>0 ? dt.Rows[j]["CrAmt"].ToString() : "";
                                ws.Cell(r, 6).Value = Math.Abs(balAmt);

                                if (balAmt>0)
                                {
                                    ws.Cell(r, 7).Value = "D";
                                    ws.Range(r, 6, r, 7).Style.Font.FontColor = XLColor.Red;
                                }
                                else
                                {
                                    ws.Cell(r, 7).Value = "C";
                                    ws.Range(r, 6, r, 7).Style.Font.FontColor = XLColor.Blue;
                                }

                                r++;
                            }


                            ws.Cell(r, 2).Value = totDrOpen.ToString();
                            ws.Cell(r, 3).Value = totCrOpen.ToString();
                            ws.Cell(r, 4).Value = totDrAMt.ToString();
                            ws.Cell(r, 5).Value = totCrAmt.ToString();
                            ws.Cell(r, 6).Value = totbalAmt.ToString();

                            ws.Range(r, 1, r, 7).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 7).Style.Font.FontSize = 12;
                            ws.Range(r, 1, r, 7).Style.Font.FontColor = XLColor.DarkBlue;
                            ws.Range(7, 2, r, 6).Style.NumberFormat.Format = "0.00";


                            for (int k = 1; k <= colcnt; k++)
                            {
                                ws.Column(k).AdjustToContents();
                            }

                            ws.Range(5, 1, r, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, r, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("Reports", "Download");
                            var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                            var filename = "AsOnDateDetailsGroup_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";
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
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<ResponseModel> GetGivenPeriodExcel(ReportRequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@FromDate",   request.FromDate),
                        new SqlParameter("@ToDate",     request.ToDate),
                        new SqlParameter("@YearId",     request.FilterStr),
                        new SqlParameter("@Branch",     request.FilterStr1),
                        new SqlParameter("@ProfitLoss", request.Search),
                    };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTrailRptGivenPeriod", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {

                        DataTable dt = dataSet.Tables[0];

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            int colcnt = 4;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = "MAXWELL LOGISTICS PRIVATE LIMITED";
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
                            ws.Range(3, 1, 3, colcnt).Value = "For Given Period " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy") + " To "+ Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = request.FilterStr2=="" ? "CONSOLIDATED" : request.FilterStr2;
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Cell(5, 1).Value = "ACCOUNT NAME";
                            ws.Cell(5, 2).Value = "";
                            ws.Cell(5, 3).Value = "DEBIT Rs";
                            ws.Cell(5, 3).Style.Font.FontColor = XLColor.Red;
                            ws.Cell(5, 4).Value = "CREDIT Rs.";
                            ws.Cell(5, 4).Style.Font.FontColor = XLColor.Blue;


                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;

                            int j = 0;
                            int r = 6;
                            var MainGroup = "";
                            var SubGroup = "";
                            var CrdDbtNote = "";
                            var clr = XLColor.Red;
                            decimal totCrd = 0;
                            decimal totDbt = 0;


                            for (j = 0; j < dt.Rows.Count; j++)
                            {
                                if (MainGroup!= dt.Rows[j]["MainGroup"].ToString())
                                {
                                    ws.Range(r, 1, r, colcnt).Merge();
                                    ws.Range(r, 1, r, colcnt).Value = dt.Rows[j]["MainGroup"].ToString();
                                    ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                    ws.Range(r, 1, r, colcnt).Style.Font.FontColor = XLColor.DarkGreen;
                                    ws.Range(r, 1, r, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                                    ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 11;
                                    MainGroup = dt.Rows[j]["MainGroup"].ToString();
                                    r++;

                                    ws.Range(r, 1, r, colcnt).Merge();
                                    ws.Range(r, 1, r, colcnt).Value = "";
                                    r++;

                                }

                                if (SubGroup!= dt.Rows[j]["SubGroup"].ToString())
                                {
                                    CrdDbtNote = "";
                                    ws.Cell(r, 1).Value = dt.Rows[j]["SubGroup"].ToString();
                                    ws.Cell(r, 1).Style.Font.Bold = true;
                                    ws.Cell(r, 1).Style.Font.FontSize = 11;
                                    if (Convert.ToDecimal(dt.Rows[j]["tot"].ToString())>0)
                                    {
                                        CrdDbtNote = Math.Abs(Convert.ToDecimal(dt.Rows[j]["tot"].ToString())) + " Dr";
                                    }
                                    if (Convert.ToDecimal(dt.Rows[j]["tot"].ToString())<0)
                                    {
                                        CrdDbtNote = Math.Abs(Convert.ToDecimal(dt.Rows[j]["tot"].ToString())) + " Cr";
                                        clr = XLColor.Blue;
                                    }
                                    ws.Cell(r, 2).Value = CrdDbtNote;
                                    ws.Cell(r, 2).Style.Font.Bold = true;
                                    ws.Cell(r, 2).Style.Font.FontColor = clr;
                                    ws.Cell(r, 2).Style.Font.FontSize = 11;

                                    SubGroup= dt.Rows[j]["SubGroup"].ToString();
                                    r++;
                                }

                                ws.Cell(r, 1).Value = dt.Rows[j]["AccountName"].ToString();
                                ws.Cell(r, 2).Value = "";
                                ws.Cell(r, 3).Value = Convert.ToDecimal(dt.Rows[j]["DEBIT"].ToString())>0 ? dt.Rows[j]["DEBIT"].ToString() : "";
                                ws.Cell(r, 4).Value = Convert.ToDecimal(dt.Rows[j]["CREDIT"].ToString())>0 ? dt.Rows[j]["CREDIT"].ToString() : "";

                                totDbt = totDbt + Convert.ToDecimal(dt.Rows[j]["DEBIT"].ToString());
                                totCrd = totCrd + Convert.ToDecimal(dt.Rows[j]["CREDIT"].ToString());

                                r++;
                            }


                            ws.Range(r, 1, r, 2).Merge();

                            if (totDbt - totCrd > 0)
                            {
                                ws.Range(r, 1, r, 2).Value ="Debit Side Diff. :" + (totDbt - totCrd).ToString();
                                ws.Range(r, 1, r, 2).Style.Font.FontColor = XLColor.Red;
                            }
                            else if (totDbt - totCrd < 0)
                            {
                                ws.Range(r, 1, r, 2).Value ="Credit Side Diff. :" + (totCrd - totDbt).ToString();
                                ws.Range(r, 1, r, 2).Style.Font.FontColor = XLColor.Blue;
                            }
                            ws.Cell(r, 3).Value = totDbt;
                            ws.Cell(r, 4).Value = totCrd;
                            ws.Range(r, 1, r, 4).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 4).Style.Font.FontSize = 11;
                            ws.Range(6, 3, r, 4).Style.NumberFormat.Format = "0.00";


                            for (int k = 1; k <= colcnt; k++)
                            {
                                ws.Column(k).AdjustToContents();
                            }

                            ws.Range(5, 1, r, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, r, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("Reports", "Download");
                            var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                            var filename = "ForGivenPeriod_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";
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
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "No Data Found";
                    }
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
