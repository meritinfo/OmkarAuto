using FleetTrans.Models;
using Microsoft.Extensions.Options;
using Microsoft.Office.Interop.Excel;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using Excel = Microsoft.Office.Interop.Excel;


namespace FleetTrans.Repository
{
    public class DocRenewalRptRepository: IDocRenewalRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        public DocRenewalRptRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        public async Task<DocRenewalRptListModel> GetDocRenewalRptList(ReportRequestModel request)
        {
            DocRenewalRptListModel docRenewalRpt = new();
            List<DocRenewalRptModel> docRenewalRptList = new();
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
                          //  new SqlParameter("@Branch",             request.FilterStr),
                            new SqlParameter("@DocRenewalID",  request.FilterStr1),
                            new SqlParameter("@VehicleMasterid",    request.FilterStr2),
                            new SqlParameter("@flag",               request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDocRenewalRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            docRenewalRptList.Add(new DocRenewalRptModel
                            {
                                RenewalDocName = Convert.ToString(dataSet.Tables[0].Rows[i]["RenewalDocName"]),
                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                ValidFromDt = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidFromDt"]),
                                NetAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmount"]),
                                DocumentRefNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DocumentRefNo"]),
                        

                            });
                        }

                        docRenewalRpt.DocRenewalRptlist = docRenewalRptList;

                        docRenewalRpt.PageMetaData = new PaginationMetaData
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
            return docRenewalRpt;
        }
        public async Task<ResponseModel> ExcelDocRenewalRptList(ReportRequestModel request)
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
                          //  new SqlParameter("@Branch",             request.FilterStr),
                            new SqlParameter("@DocRenewalID",  request.FilterStr1),
                            new SqlParameter("@VehicleMasterid",    request.FilterStr2),
                            new SqlParameter("@flag",               request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDocRenewalRptList", param);

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


                        Excel.Range R1 = Worksheets.get_Range("A1:H1", misvalue);

                        R1.MergeCells = true;
                        R1.HorizontalAlignment = Constants.xlCenter;
                        R1.Font.Name = "Georgia";
                        R1.Font.Size = 14;
                        R1.Font.Color = 255;
                        Worksheets.Cells[1, 1] = "OMKAR CARRIERS";

                        Excel.Range R2 = Worksheets.get_Range("A2:H2", misvalue);

                        R2.MergeCells = true;
                        R2.HorizontalAlignment = Constants.xlRight;
                        R2.Font.Name = "Microsoft Sans Serif";
                        R2.Font.Size = 9;
                        R2.Font.Bold = true;
                        Worksheets.Cells[2, 1] = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");

                        Excel.Range R3 = Worksheets.get_Range("A3:H3", misvalue);

                        R3.MergeCells = true;
                        R3.HorizontalAlignment = Constants.xlCenter;
                        R3.Font.Name = "Georgia";
                        R3.Font.Size = 13;
                        R3.Font.Color = 16711680;
                        R3.Font.Underline = true;
                        Worksheets.Cells[3, 1] = "Document Renewal Report";

                        Excel.Range R4 = Worksheets.get_Range("A4:H4", misvalue);

                        R4.MergeCells = true;
                        R4.HorizontalAlignment = Constants.xlCenter;
                        R4.Font.Name = "Georgia";
                        R4.Font.Size = 10;
                        R4.Font.Bold = true;
                        Worksheets.Cells[4, 1] = "From " + Convert.ToDateTime(request.FromDate).ToString("dd-MMM-yyyy") + " To " +Convert.ToDateTime(request.ToDate).ToString("dd-MMM-yyyy");

                        // for column name (HEADER)
                        Excel.Range R5 = Worksheets.get_Range("A5:H5", misvalue);

                        R5.Font.Bold = true;
                        R5.Font.Color = 8519755;
                        R5.HorizontalAlignment = Constants.xlCenter;

                        Worksheets.Cells[5, 1] = "Sl. No.";
                        Worksheets.Cells[5, 2] = "RenewalDocName";
                        Worksheets.Cells[5, 3] = "TransDate";
                        Worksheets.Cells[5, 4] = "VehicleNo";
                        Worksheets.Cells[5, 5] = "ValidFromDt";
                        Worksheets.Cells[5, 6] = "ValidToDt";
                        Worksheets.Cells[5, 7] = "NetAmount";
                        Worksheets.Cells[5, 8] = "DocumentRefNo";
               

                        v = 0;
                        int r = v + 6;
                        string Expdt = "";

                        while (v < dataSet.Tables[0].Rows.Count)
                        {
                           

                            Worksheets.Cells[r, 1] = v + 1;
                            Excel.Range RA6 = Worksheets.get_Range("A" + r + ":A" + r, misvalue);
                            RA6.HorizontalAlignment = Constants.xlRight;
                            Worksheets.Cells[r, 2] = dataSet.Tables[0].Rows[v]["RenewalDocName"].ToString();
                            Worksheets.Cells[r, 3] = dataSet.Tables[0].Rows[v]["TransDate"].ToString();
                            Worksheets.Cells[r, 4] = dataSet.Tables[0].Rows[v]["VehicleNo"].ToString();
                            Worksheets.Cells[r, 5] = dataSet.Tables[0].Rows[v]["ValidFromDt"].ToString();
                            Worksheets.Cells[r, 6] = dataSet.Tables[0].Rows[v]["ValidToDt"].ToString();
                            Worksheets.Cells[r, 7] = dataSet.Tables[0].Rows[v]["NetAmount"].ToString();
                            Worksheets.Cells[r, 8] = dataSet.Tables[0].Rows[v]["DocumentRefNo"].ToString();
                        
                            r++;
                            v++;
                        }
                        //RF6.NumberFormat = "dd-MMM-yyyy";

                        Excel.Range Rn6 = Worksheets.get_Range("A5:H" + (r - 1).ToString(), misvalue);
                        Rn6.Borders.LineStyle = XlLineStyle.xlContinuous;

                        Worksheets.UsedRange.EntireColumn.AutoFit();

                        app.EnableEvents = false;
                        app.DisplayAlerts = false;
                        var folderName = System.IO.Path.Combine("Reports", "DocRenewalRPT");
                        var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, folderName);
                        string fileName = "DocRenewal_" + request.Search + "_" + System.DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xlsx";
                        var filePath = folderName + "//" + fileName;
                        var fullPath = System.IO.Path.Combine(pathToSave, fileName);
                        bool exists = System.IO.Directory.Exists(pathToSave);
                        if (!exists)
                        {
                            Directory.CreateDirectory(pathToSave);
                        }

                        if (File.Exists(fullPath))
                            File.Delete(fullPath);


                        workbook.SaveAs(fullPath,
                                        XlFileFormat.xlOpenXMLWorkbook, Type.Missing, Type.Missing,
                                        false, false, XlSaveAsAccessMode.xlNoChange,
                                        Type.Missing, Type.Missing, Type.Missing, Type.Missing, Type.Missing);

                        workbook.Close(false, fullPath, Type.Missing);
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
                        response.Message = fileName;

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
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }


    }
}
