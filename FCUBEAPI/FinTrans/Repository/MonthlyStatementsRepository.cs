using FinTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using Shared.Repository;
using System.Data.SqlClient;
using Shared.Models;
using System.Transactions;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Office2016.Excel;
using System.Data;
using DocumentFormat.OpenXml.Drawing.Diagrams;
using System.Text;

namespace FinTrans.Repository
{
    public class MonthlyStatementsRepository : IMonthlyStatementsRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        readonly ISharedRepository sharedRepository;
        public MonthlyStatementsRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
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
                        int colcnt = 13;

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

                        ws.Cell(5, 1).Value     = "Admin Exp Desc";
                        ws.Cell(5, 2).Value     = "April";
                        ws.Cell(5, 3).Value     = "May";
                        ws.Cell(5, 4).Value     = "June";
                        ws.Cell(5, 5).Value     = "July";
                        ws.Cell(5, 6).Value     = "August";
                        ws.Cell(5, 7).Value     = "September";
                        ws.Cell(5, 8).Value     = "October";
                        ws.Cell(5, 9).Value     = "November";
                        ws.Cell(5, 10).Value    = "December";
                        ws.Cell(5, 11).Value    = "January";
                        ws.Cell(5, 12).Value    = "February";
                        ws.Cell(5, 13).Value    = "March";

                        ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                        ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                        ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;



                        var br = "";

                        decimal brApril = 0;    decimal TotApril = 0;
                        decimal brMay = 0;      decimal TotMay = 0;
                        decimal brJune = 0;     decimal TotJune = 0;
                        decimal brJuly = 0;     decimal TotJuly = 0;
                        decimal brAugust = 0;   decimal TotAugust = 0;
                        decimal brSeptember = 0;decimal TotSeptember = 0;
                        decimal brOctober = 0;  decimal TotOctober = 0;
                        decimal brNovember = 0; decimal TotNovember = 0;
                        decimal brDecember = 0; decimal TotDecember = 0;
                        decimal brJanuary = 0;  decimal TotJanuary = 0;
                        decimal brFebruary = 0; decimal TotFebruary = 0;
                        decimal brMarch = 0;    decimal TotMarch = 0;

                        int j = 0;
                        int i = 6;

                        for (j = 0; j < dt.Rows.Count; j++)
                        {
                            if(br != dt.Rows[j]["Branch"].ToString())
                            {
                                if (j>0)
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

                                br = dt.Rows[j]["Branch"].ToString();

                                ws.Range(i, 1, i, colcnt).Merge();
                                ws.Range(i, 1, i, colcnt).Value = br;
                                ws.Range(i, 1, i, colcnt).Style.Font.Bold = true;
                                ws.Range(i, 1, i, colcnt).Style.Font.FontSize = 12;
                                ws.Range(i, 1, i, colcnt).Style.Font.FontColor = XLColor.Navy;

                                i++;                              

                            }

                            ws.Cell(i, 1).Value  = dt.Rows[j]["AdminExpDesc"].ToString();
                            ws.Cell(i, 2).Value  = dt.Rows[j]["April"].ToString();
                            ws.Cell(i, 3).Value  = dt.Rows[j]["May"].ToString();
                            ws.Cell(i, 4).Value  = dt.Rows[j]["June"].ToString();
                            ws.Cell(i, 5).Value  = dt.Rows[j]["July"].ToString();
                            ws.Cell(i, 6).Value  = dt.Rows[j]["August"].ToString();
                            ws.Cell(i, 7).Value  = dt.Rows[j]["September"].ToString();
                            ws.Cell(i, 8).Value  = dt.Rows[j]["October"].ToString();
                            ws.Cell(i, 9).Value  = dt.Rows[j]["November"].ToString();
                            ws.Cell(i, 10).Value = dt.Rows[j]["December"].ToString();
                            ws.Cell(i, 11).Value = dt.Rows[j]["January"].ToString();
                            ws.Cell(i, 12).Value = dt.Rows[j]["February"].ToString();
                            ws.Cell(i, 13).Value = dt.Rows[j]["March"].ToString();

                            i++;

                            if (request.FilterStr1 == "Y")
                            {
                                ws.Cell(i, 1).Value  = "Budget";
                                ws.Cell(i, 2).Value  = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 3).Value  = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 4).Value  = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 5).Value  = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 6).Value  = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 7).Value  = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 8).Value  = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 9).Value  = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 10).Value = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 11).Value = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 12).Value = dt.Rows[j]["BudgetAmt"].ToString();
                                ws.Cell(i, 13).Value = dt.Rows[j]["BudgetAmt"].ToString();

                                i++;
                            }

                            brApril     = brApril     + dt.Rows[j]["April"].ToString()      ==""? 0 : Convert.ToDecimal(dt.Rows[j]["April"]);
                            brMay       = brMay       + dt.Rows[j]["May"].ToString()        ==""? 0 : Convert.ToDecimal(dt.Rows[j]["May"]);
                            brJune      = brJune      + dt.Rows[j]["June"].ToString()       ==""? 0 : Convert.ToDecimal(dt.Rows[j]["June"]);
                            brJuly      = brJuly      + dt.Rows[j]["July"].ToString()       ==""? 0 : Convert.ToDecimal(dt.Rows[j]["July"]);
                            brAugust    = brAugust    + dt.Rows[j]["August"].ToString()     ==""? 0 : Convert.ToDecimal(dt.Rows[j]["August"]);
                            brSeptember = brSeptember + dt.Rows[j]["September"].ToString()  ==""? 0 : Convert.ToDecimal(dt.Rows[j]["September"]);
                            brOctober   = brOctober   + dt.Rows[j]["October"].ToString()    ==""? 0 : Convert.ToDecimal(dt.Rows[j]["October"]);
                            brNovember  = brNovember  + dt.Rows[j]["November"].ToString()   ==""? 0 : Convert.ToDecimal(dt.Rows[j]["November"]);
                            brDecember  = brDecember  + dt.Rows[j]["December"].ToString()   ==""? 0 : Convert.ToDecimal(dt.Rows[j]["December"]);
                            brJanuary   = brJanuary   + dt.Rows[j]["January"].ToString()    ==""? 0 : Convert.ToDecimal(dt.Rows[j]["January"]);
                            brFebruary  = brFebruary  + dt.Rows[j]["February"].ToString()   ==""? 0 : Convert.ToDecimal(dt.Rows[j]["February"]);
                            brMarch     = brMarch     + dt.Rows[j]["March"].ToString()      ==""? 0 : Convert.ToDecimal(dt.Rows[j]["March"]);

                            TotApril     = TotApril     + dt.Rows[j]["April"].ToString()      ==""? 0 : Convert.ToDecimal(dt.Rows[j]["April"]);
                            TotMay       = TotMay       + dt.Rows[j]["May"].ToString()        ==""? 0 : Convert.ToDecimal(dt.Rows[j]["May"]);
                            TotJune      = TotJune      + dt.Rows[j]["June"].ToString()       ==""? 0 : Convert.ToDecimal(dt.Rows[j]["June"]);
                            TotJuly      = TotJuly      + dt.Rows[j]["July"].ToString()       ==""? 0 : Convert.ToDecimal(dt.Rows[j]["July"]);
                            TotAugust    = TotAugust    + dt.Rows[j]["August"].ToString()     ==""? 0 : Convert.ToDecimal(dt.Rows[j]["August"]);
                            TotSeptember = TotSeptember + dt.Rows[j]["September"].ToString()  ==""? 0 : Convert.ToDecimal(dt.Rows[j]["September"]);
                            TotOctober   = TotOctober   + dt.Rows[j]["October"].ToString()    ==""? 0 : Convert.ToDecimal(dt.Rows[j]["October"]);
                            TotNovember  = TotNovember  + dt.Rows[j]["November"].ToString()   ==""? 0 : Convert.ToDecimal(dt.Rows[j]["November"]);
                            TotDecember  = TotDecember  + dt.Rows[j]["December"].ToString()   ==""? 0 : Convert.ToDecimal(dt.Rows[j]["December"]);
                            TotJanuary   = TotJanuary   + dt.Rows[j]["January"].ToString()    ==""? 0 : Convert.ToDecimal(dt.Rows[j]["January"]);
                            TotFebruary  = TotFebruary  + dt.Rows[j]["February"].ToString()   ==""? 0 : Convert.ToDecimal(dt.Rows[j]["February"]);
                            TotMarch     = TotMarch     + dt.Rows[j]["March"].ToString()      =="" ? 0 : Convert.ToDecimal(dt.Rows[j]["March"]);
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
                        ws.Range(i, 1, i, colcnt).Style.Font.Bold = true;
                        ws.Range(i, 1, i, colcnt).Style.Font.FontSize = 12;
                        ws.Range(i, 1, i, colcnt).Style.Font.FontColor = XLColor.Maroon;

                        i++;

                        ws.Cell(i, 1).Value = "Total";
                        ws.Cell(i, 2).Value  = TotApril.ToString();
                        ws.Cell(i, 3).Value  = TotMay.ToString();
                        ws.Cell(i, 4).Value  = TotJune.ToString();
                        ws.Cell(i, 5).Value  = TotJuly.ToString();
                        ws.Cell(i, 6).Value  = TotAugust.ToString();
                        ws.Cell(i, 7).Value  = TotSeptember.ToString();
                        ws.Cell(i, 8).Value  = TotOctober.ToString();
                        ws.Cell(i, 9).Value  = TotNovember.ToString();
                        ws.Cell(i, 10).Value = TotDecember.ToString();
                        ws.Cell(i, 11).Value = TotJanuary.ToString();
                        ws.Cell(i, 12).Value = TotFebruary.ToString();
                        ws.Cell(i, 13).Value = TotMarch.ToString();
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

    }
}
