using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using Excel = Microsoft.Office.Interop.Excel;
using Microsoft.Office.Interop.Excel;
//using Syncfusion.XlsIO;

namespace FleetTrans.Repository
{
    public class ExpTruckArrRptRepository : IExpTruckArrRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        public ExpTruckArrRptRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        public async Task<ExpTruckArrRptListModel> GetExpTruckArrRPTList(ReportRequestModel request)
        {
            ExpTruckArrRptListModel expTruckArrRpt = new();
            List<ExpTruckArrRptModel> expTruckArrsList = new();
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
                            new SqlParameter("@Branch",             request.FilterStr),
                            new SqlParameter("@ConsignorPayParty",  request.FilterStr1),
                            new SqlParameter("@VehicleMasterid",    request.FilterStr2),
                            new SqlParameter("@flag",               request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getExpTruckArrRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            expTruckArrsList.Add(new ExpTruckArrRptModel
                            {
                                TripId = Convert.ToString(dataSet.Tables[0].Rows[i]["TripId"]),
                                LoadingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingDate"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                LoadingBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingBranch"]),
                                LoadingFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingFrom"]),
                                Destination = Convert.ToString(dataSet.Tables[0].Rows[i]["Destination"]),
                                MatLoadType = Convert.ToString(dataSet.Tables[0].Rows[i]["MatLoadType"]),
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                ExpectedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpectedDate"]),
                                DriverName = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverName"]),
                                DriverPhone = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverPhone"]),

                            });    
                        }

                        expTruckArrRpt.ExpTruckArrRptslist = expTruckArrsList;

                        expTruckArrRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return expTruckArrRpt;
        }
        public async Task<ResponseModel> ExcelExpTruckArrRPTList(ReportRequestModel request)
        {
            ResponseModel response = new();
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
                            new SqlParameter("@Branch",             request.FilterStr),
                            new SqlParameter("@ConsignorPayParty",  request.FilterStr1),
                            new SqlParameter("@VehicleMasterid",    request.FilterStr2),
                            new SqlParameter("@flag",               request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getExpTruckArrRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int v = 0;
                        int cl = 0;
                        Application app = new Application();
                        Workbook workbook;
                        Worksheet Worksheets;
                        object misvalue = System.Reflection.Missing.Value;

                        workbook = app.Workbooks.Add(Type.Missing);
                        Worksheets = (Worksheet)app.ActiveSheet;


                        Excel.Range R1 = Worksheets.get_Range("A1:J1", misvalue);

                        R1.MergeCells = true;
                        R1.HorizontalAlignment = Constants.xlCenter;
                        R1.Font.Name = "Georgia";
                        R1.Font.Size = 14;
                        R1.Font.Color = 255;
                        Worksheets.Cells[1, 1] = "OMKAR CARRIERS";

                        Excel.Range R2 = Worksheets.get_Range("A2:J2", misvalue);

                        R2.MergeCells = true;
                        R2.HorizontalAlignment = Constants.xlRight;
                        R2.Font.Name = "Microsoft Sans Serif";
                        R2.Font.Size = 9;
                        R2.Font.Bold = true;
                        Worksheets.Cells[2, 1] = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");

                        Excel.Range R3 = Worksheets.get_Range("A3:J3", misvalue);

                        R3.MergeCells = true;
                        R3.HorizontalAlignment = Constants.xlCenter;
                        R3.Font.Name = "Georgia";
                        R3.Font.Size = 13;
                        R3.Font.Color = 16711680;
                        R3.Font.Underline = true;
                        Worksheets.Cells[3, 1] = "EXPECTED TRUCK ARRIVAL REPORT";

                        Excel.Range R4 = Worksheets.get_Range("A4:J4", misvalue);

                        R4.MergeCells = true;
                        R4.HorizontalAlignment = Constants.xlCenter;
                        R4.Font.Name = "Georgia";
                        R4.Font.Size = 10;
                        R4.Font.Bold = true;
                        Worksheets.Cells[4, 1] = "From " + request.FromDate + " To " + request.ToDate;

                        // for column name (HEADER)
                        Excel.Range R5 = Worksheets.get_Range("A5:J5", misvalue);

                        R5.Font.Bold = true;
                        R5.Font.Color = 8519755;
                        R5.HorizontalAlignment = Constants.xlCenter;

                        Worksheets.Cells[5, 1] = "Sl. No.";
                        Worksheets.Cells[5, 2] = "Loading Date";
                        Worksheets.Cells[5, 3] = "Vehicle No";
                        Worksheets.Cells[5, 4] = "Loading Branch";
                        Worksheets.Cells[5, 5] = "Loading From";
                        Worksheets.Cells[5, 6] = "Destination";
                        Worksheets.Cells[5, 7] = "Load Type";
                        Worksheets.Cells[5, 8] = "Party Name";
                        Worksheets.Cells[5, 9] = "Driver Name";
                        Worksheets.Cells[5, 10] = "Driver Phone";

                        v = 0;
                        int r = v + 6;
                        string Expdt = "";

                        while (v < dataSet.Tables[0].Rows.Count)
                        {
                            if (Expdt!=dataSet.Tables[0].Rows[v]["ExpectedDate"].ToString())
                            {
                                Expdt = dataSet.Tables[0].Rows[v]["ExpectedDate"].ToString();
                                Excel.Range R6 = Worksheets.get_Range("A"+ r +":J"+ r, misvalue);
                                R6.MergeCells = true;
                                R6.Font.Bold = true;
                                Worksheets.Cells[r, 1] = Expdt;
                                r++;
                            }

                            Worksheets.Cells[r, 1] = v + 1;
                            Excel.Range RA6 = Worksheets.get_Range("A"+r+":A"+ r, misvalue);
                            RA6.HorizontalAlignment = Constants.xlRight;
                            Worksheets.Cells[r, 2] = dataSet.Tables[0].Rows[v]["LoadingDate"].ToString();
                            Worksheets.Cells[r, 3] = dataSet.Tables[0].Rows[v]["VehicleNo"].ToString();
                            Worksheets.Cells[r, 4] = dataSet.Tables[0].Rows[v]["LoadingBranch"].ToString();
                            Worksheets.Cells[r, 5] = dataSet.Tables[0].Rows[v]["LoadingFrom"].ToString();
                            Worksheets.Cells[r, 6] = dataSet.Tables[0].Rows[v]["Destination"].ToString();
                            Worksheets.Cells[r, 7] = dataSet.Tables[0].Rows[v]["MatLoadType"].ToString();
                            Worksheets.Cells[r, 8] = dataSet.Tables[0].Rows[v]["PartyName"].ToString();
                            Worksheets.Cells[r, 9] = dataSet.Tables[0].Rows[v]["DriverName"].ToString();
                            Worksheets.Cells[r, 10] = dataSet.Tables[0].Rows[v]["DriverPhone"].ToString();
                            r++;
                            v++;
                        }
                        //RF6.NumberFormat = "dd-MMM-yyyy";

                        Excel.Range Rn6 = Worksheets.get_Range("A5:J"+ (r-1).ToString(), misvalue);
                        Rn6.Borders.LineStyle = XlLineStyle.xlContinuous;

                        Worksheets.UsedRange.EntireColumn.AutoFit();

                        app.EnableEvents = false;
                        app.DisplayAlerts = false;
                        string imageName = "ExpectedTruckArrival" + request.Search + "_" + request.FromDate + "-" + request.ToDate;
                        var filePath = Path.Combine(dbconnection.Value.UploadFolderPath, "reports/ExpTruckArrRPT/" + imageName);

                        if (File.Exists(filePath+ ".xlsx"))
                            File.Delete(filePath+ ".xlsx");


                        workbook.SaveAs(filePath+ ".xlsx",
                                        XlFileFormat.xlOpenXMLWorkbook, Type.Missing, Type.Missing,
                                        false, false, XlSaveAsAccessMode.xlNoChange,
                                        Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing);

                        workbook.Close(false, filePath+ ".xlsx", Type.Missing);
                        app.Workbooks.Close();
                        app.Application.Quit();
                        app.Quit();

                        System.Runtime.InteropServices.Marshal.ReleaseComObject(Worksheets);
                        System.Runtime.InteropServices.Marshal.ReleaseComObject(workbook);
                        System.Runtime.InteropServices.Marshal.ReleaseComObject(app);

                        workbook = null;
                        Worksheets = null;
                        app = null;

                        response.Status = true;
                        response.Message = filePath;

                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return response;
        }

        //public async Task<ResponseModel> ExcelExpTruckArrRPT(ReportRequestModel request)
        //{
        //    ResponseModel response = new();
        //    try
        //    {
        //        if (dbconnection != null)
        //        {
        //            SqlParameter[] param =
        //                {
        //                    new SqlParameter("@PageNumber",         request.PageNumber),
        //                    new SqlParameter("@PageSize",           request.PageSize),
        //                    new SqlParameter("@SortColumn",         request.SortColumn),
        //                    new SqlParameter("@SortOrder",          request.SortOrder),
        //                    new SqlParameter("@Search",             request.Search),
        //                    new SqlParameter("@FromDate",           request.FromDate),
        //                    new SqlParameter("@ToDate",             request.ToDate),
        //                    new SqlParameter("@Branch",             request.FilterStr),
        //                    new SqlParameter("@ConsignorPayParty",  request.FilterStr1),
        //                    new SqlParameter("@VehicleMasterid",    request.FilterStr2),
        //                    new SqlParameter("@flag",               request.FilterStr3),
        //                };
        //            var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getExpTruckArrRptList", param);

        //            if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
        //            {

        //                var filePath = "";
        //                using (ExcelEngine excelEngine = new ExcelEngine())
        //                {
        //                    int v = 0;
        //                    int r = 0;

        //                    IApplication application = excelEngine.Excel;
        //                    application.DefaultVersion = ExcelVersion.Excel2016;
        //                    IWorkbook workbook = application.Workbooks.Create(1);
        //                    IWorksheet worksheet = workbook.Worksheets[0];

        //                    Syncfusion.XlsIO.IStyle style1 = workbook.Styles.Add("NewStyle");
        //                    style1.Font.FontName = "Georgia";
        //                    style1.Font.Bold = true;
        //                    style1.Font.Size = 14;
        //                    style1.Font.Color = ExcelKnownColors.Red;
        //                    style1.HorizontalAlignment= ExcelHAlign.HAlignCenter;
        //                    worksheet.Range["A1:J1"].CellStyle = style1;
        //                    worksheet.Range["A1:J1"].Merge();
        //                    worksheet.Range[1, 1].Text = "OMKAR CARRIERS";

        //                    Syncfusion.XlsIO.IStyle style2 = workbook.Styles.Add("NewStyle1");
        //                    style2.Font.FontName = "Microsoft Sans Serif";
        //                    style2.Font.Bold = true;
        //                    style2.Font.Size = 9;
        //                    style2.HorizontalAlignment= ExcelHAlign.HAlignRight;
        //                    worksheet.Range["A2:J2"].CellStyle = style2;
        //                    worksheet.Range["A2:J2"].Merge();
        //                    worksheet.Range[2, 1].Text = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");

        //                    Syncfusion.XlsIO.IStyle style3 = workbook.Styles.Add("Style");
        //                    style3.Font.FontName = "Georgia";
        //                    style3.Font.Bold = true;
        //                    style3.Font.Size = 13;
        //                    style3.Font.Color = ExcelKnownColors.Green;
        //                    style3.HorizontalAlignment= ExcelHAlign.HAlignCenter;
        //                    worksheet.Range["A3:J3"].CellStyle = style3;
        //                    worksheet.Range["A3:J3"].Merge();
        //                    worksheet.Range[3, 1].Text = "EXPECTED TRUCK ARRIVAL REPORT";

        //                    Syncfusion.XlsIO.IStyle style4 = workbook.Styles.Add("Style1");
        //                    style4.Font.FontName = "Georgia";
        //                    style4.Font.Bold = true;
        //                    style4.Font.Size = 10;
        //                    style4.HorizontalAlignment= ExcelHAlign.HAlignCenter;
        //                    worksheet.Range["A4:J4"].CellStyle = style4;
        //                    worksheet.Range["A4:J4"].Merge();
        //                    worksheet.Range[4, 1].Text = "From " + request.FromDate + " To " + request.ToDate;

        //                    Syncfusion.XlsIO.IStyle style5 = workbook.Styles.Add("Style2");
        //                    style5.Font.FontName = "Georgia";
        //                    style5.Font.Bold = true;
        //                    style5.Font.Size = 10;
        //                    style5.Font.Color = ExcelKnownColors.Blue;
        //                    style5.HorizontalAlignment= ExcelHAlign.HAlignCenter;
        //                    worksheet.Range["A5:J5"].CellStyle = style5;

        //                    worksheet.Range[5, 1].Text = "Sl. No.";
        //                    worksheet.Range[5, 2].Text = "Loading Date";
        //                    worksheet.Range[5, 3].Text = "Vehicle No";
        //                    worksheet.Range[5, 4].Text = "Loading Branch";
        //                    worksheet.Range[5, 5].Text = "Loading From";
        //                    worksheet.Range[5, 6].Text = "Destination";
        //                    worksheet.Range[5, 7].Text = "Load Type";
        //                    worksheet.Range[5, 8].Text = "Party Name";
        //                    worksheet.Range[5, 9].Text = "Driver Name";
        //                    worksheet.Range[5, 10].Text = "Driver Phone";

        //                    v = 0;
        //                    string Expdt = "";
        //                    r = v + 6;
        //                    while (v < dataSet.Tables[0].Rows.Count)
        //                    {
        //                        if (Expdt!=dataSet.Tables[0].Rows[v]["ExpectedDate"].ToString())
        //                        {
        //                            Syncfusion.XlsIO.IStyle style = workbook.Styles.Add("NewStyle2");
        //                            style.Font.Bold = true;
        //                            style.Font.Color = ExcelKnownColors.Red;

        //                            Expdt = dataSet.Tables[0].Rows[v]["ExpectedDate"].ToString();
        //                            worksheet.Range["A"+ r +":J"+ r].Merge();
        //                            worksheet.Range["A"+ r +":J"+ r].CellStyle = style;
        //                            worksheet.Range[r, 1].Text ="EXPECTED DATE OF ARRIVAL: "+ Expdt;
        //                            r++;
        //                        }

        //                        worksheet.Range[r, 1].Text = (v + 1).ToString();
        //                        worksheet.Range[r, 2].Text = dataSet.Tables[0].Rows[v]["LoadingDate"].ToString();
        //                        worksheet.Range[r, 3].Text = dataSet.Tables[0].Rows[v]["VehicleNo"].ToString();
        //                        worksheet.Range[r, 4].Text = dataSet.Tables[0].Rows[v]["LoadingBranch"].ToString();
        //                        worksheet.Range[r, 5].Text = dataSet.Tables[0].Rows[v]["LoadingFrom"].ToString();
        //                        worksheet.Range[r, 6].Text = dataSet.Tables[0].Rows[v]["Destination"].ToString();
        //                        worksheet.Range[r, 7].Text = dataSet.Tables[0].Rows[v]["MatLoadType"].ToString();
        //                        worksheet.Range[r, 8].Text = dataSet.Tables[0].Rows[v]["PartyName"].ToString();
        //                        worksheet.Range[r, 9].Text = dataSet.Tables[0].Rows[v]["DriverName"].ToString();
        //                        worksheet.Range[r, 10].Text = dataSet.Tables[0].Rows[v]["DriverPhone"].ToString();
        //                        r++;
        //                        v++;
        //                    }
        //                    //worksheet.Range["A6:J"+r].Borders.LineStyle= ExcelLineStyle.Medium;
        //                    worksheet.AutofitColumn(1);
        //                    worksheet.UsedRange.AutofitColumns();
        //                    //Saving the workbook to disk in XLSX format
        //                    string imageName = "ExpectedTruckArrival" + request.Search + "_" + request.FromDate + "-" + request.ToDate;
        //                    filePath = Path.Combine(dbconnection.Value.UploadFolderPath, "reports/ExpTruckArrRPT/" + imageName);

        //                    if (System.IO.File.Exists(filePath+ ".xlsx"))
        //                        System.IO.File.Delete(filePath+ ".xlsx");

        //                    Stream excelstream = File.Create(filePath+".xlsx");
        //                    workbook.SaveAs(excelstream);
        //                    excelstream.Dispose();
        //                }

        //                response.Status = true;
        //                response.Message = filePath+".xlsx";
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log exception on database
        //        //ExceptionModel exceptionModel = new()
        //        //{
        //        //    ExceptionMessage = Convert.ToString(ex.Message),
        //        //    ExceptionType = Convert.ToString(ex.GetType().Name),
        //        //    ExceptionSource = Convert.ToString(ex.StackTrace)
        //        //};

        //        //ExceptionRepository exception = new(dbconnection);
        //        //await exception.SaveExceptionDetails(exceptionModel);
        //    }
        //    return response;
        //}



    }

}
