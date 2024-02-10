using Microsoft.Extensions.Options;
using FreightMasters.Models;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using Excel = Microsoft.Office.Interop.Excel;
using Microsoft.Office.Interop.Excel;

namespace FreightMasters.Repository
{
    public class DriverLicRptRepository: IDriverLicRptRepository
    {

        private readonly IOptions<DBModel> dbconnection;
        public DriverLicRptRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<DriverLicRptListModel> GetDriverLicRptList(ReportRequestModel request)
        {
            DriverLicRptListModel driverLicRpt = new();
            List<DriverLicRptModel> driverLicRptList = new();
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
                           // new SqlParameter("@FromDate",           request.FromDate),
                         //   new SqlParameter("@ToDate",             request.ToDate),
                           new SqlParameter("@Active",             request.FilterStr),
                            new SqlParameter("@ExpiryLic",  request.FilterStr1),
                           new SqlParameter("@DriverName",    request.FilterStr2),
                           new SqlParameter("@flag",               request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDriverLicRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            driverLicRptList.Add(new DriverLicRptModel
                            {
                                DriverName = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverName"]),
                                FatherName = Convert.ToString(dataSet.Tables[0].Rows[i]["FatherName"]),
                                DateOfBirth = Convert.ToString(dataSet.Tables[0].Rows[i]["DateOfBirth"]),
                                IntroBy = Convert.ToString(dataSet.Tables[0].Rows[i]["IntroBy"]),
                                IntroByMobileNo = Convert.ToString(dataSet.Tables[0].Rows[i]["IntroByMobileNo"]),
                                DateOfAppoint = Convert.ToString(dataSet.Tables[0].Rows[i]["DateOfAppoint"]),
                                LicenseNo = Convert.ToString(dataSet.Tables[0].Rows[i]["LicenseNo"]),
                                LicenseIssuAuth= Convert.ToString(dataSet.Tables[0].Rows[i]["LicenseIssuAuth"]),
                                LicValidUpto = Convert.ToString(dataSet.Tables[0].Rows[i]["LicValidUpto"]),
                                BloodGroup = Convert.ToString(dataSet.Tables[0].Rows[i]["BloodGroup"]),
                                DriverMobile1 = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMobile1"]),
                                DriverMobile2 = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMobile2"]),
                                TempAddPhone = Convert.ToString(dataSet.Tables[0].Rows[i]["TempAddPhone"]),
                                PermanentAddr = Convert.ToString(dataSet.Tables[0].Rows[i]["PermanentAddr"]),
                                PermAddPhone = Convert.ToString(dataSet.Tables[0].Rows[i]["PermAddPhone"]),
                                DriverAadharNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverAadharNo"]),
                                IsActive = Convert.ToString(dataSet.Tables[0].Rows[i]["IsActive"]),
                                GroupName = Convert.ToString(dataSet.Tables[0].Rows[i]["GroupName"]),
                                DrBankAccountName = Convert.ToString(dataSet.Tables[0].Rows[i]["DrBankAccountName"]),
                                BankName = Convert.ToString(dataSet.Tables[0].Rows[i]["BankName"]),
                                BankAcNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BankAcNo"]),
                                BankIfsCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BankIfsCode"]),


                            });
                        }

                        driverLicRpt.DriverLicRptList = driverLicRptList;

                        driverLicRpt.PageMetaData = new PaginationMetaData
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
            return driverLicRpt;
        }
        public async Task<ResponseModel> ExcelDriverLicRptList(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {   new SqlParameter("@PageNumber",         request.PageNumber),
                            new SqlParameter("@PageSize",           request.PageSize),
                            new SqlParameter("@SortColumn",         request.SortColumn),
                            new SqlParameter("@SortOrder",          request.SortOrder),
                            new SqlParameter("@Search",             request.Search),
                           // new SqlParameter("@FromDate",           request.FromDate),
                         //   new SqlParameter("@ToDate",             request.ToDate),
                           new SqlParameter("@Active",             request.FilterStr),
                            new SqlParameter("@ExpiryLic",  request.FilterStr1),
                           new SqlParameter("@DriverName",    request.FilterStr2),
                            new SqlParameter("@flag",               1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDriverLicRptList", param);

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


                        Excel.Range R1 = Worksheets.get_Range("A1:W1", misvalue);

                        R1.MergeCells = true;
                        R1.HorizontalAlignment = Constants.xlCenter;
                        R1.Font.Name = "Georgia";
                        R1.Font.Size = 14;
                        R1.Font.Color = 255;
                        Worksheets.Cells[1, 1] = "OMKAR CARRIERS";

                        Excel.Range R2 = Worksheets.get_Range("A2:W2", misvalue);

                        R2.MergeCells = true;
                        R2.HorizontalAlignment = Constants.xlRight;
                        R2.Font.Name = "Microsoft Sans Serif";
                        R2.Font.Size = 9;
                        R2.Font.Bold = true;
                        Worksheets.Cells[2, 1] = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");

                        Excel.Range R3 = Worksheets.get_Range("A3:W3", misvalue);

                        R3.MergeCells = true;
                        R3.HorizontalAlignment = Constants.xlCenter;
                        R3.Font.Name = "Georgia";
                        R3.Font.Size = 13;
                        R3.Font.Color = 16711680;
                        R3.Font.Underline = true;
                        Worksheets.Cells[3, 1] = "Driver Lic Report";

                        Excel.Range R4 = Worksheets.get_Range("A4:W4", misvalue);

                        R4.MergeCells = true;
                        R4.HorizontalAlignment = Constants.xlCenter;
                        R4.Font.Name = "Georgia";
                        R4.Font.Size = 10;
                        R4.Font.Bold = true;
                        Worksheets.Cells[4, 1] = "From " + Convert.ToDateTime(request.FromDate).ToString("dd-MMM-yyyy") + " To " + Convert.ToDateTime(request.ToDate).ToString("dd-MMM-yyyy");

                        // for column name (HEADER)
                        Excel.Range R5 = Worksheets.get_Range("A5:W5", misvalue);

                        R5.Font.Bold = true;
                        R5.Font.Color = 8519755;
                        R5.HorizontalAlignment = Constants.xlCenter;

                        Worksheets.Cells[5, 1] = "Sl. No.";
                        Worksheets.Cells[5, 2] = "DriverName";
                        Worksheets.Cells[5, 3] = "FatherName";
                        Worksheets.Cells[5, 4] = "DateOfBirth";
                        Worksheets.Cells[5, 5] = "IntroBy";
                        Worksheets.Cells[5, 6] = "IntroByMobileNo";
                        Worksheets.Cells[5, 7] = "DateOfAppoint";
                        Worksheets.Cells[5, 8] = "LicenseNo";
                        Worksheets.Cells[5, 9] = "LicenseIssuAuth";
                        Worksheets.Cells[5, 10] = "LicValidUpto";
                        Worksheets.Cells[5, 11] = "BloodGroup";
                        Worksheets.Cells[5, 12] = "DriverMobile1";
                        Worksheets.Cells[5, 13] = "DriverMobile2";
                        Worksheets.Cells[5, 14] = "TempAddPhone";
                        Worksheets.Cells[5, 15] = "PermanentAddr";
                        Worksheets.Cells[5, 16] = "PermAddPhone";
                        Worksheets.Cells[5, 17] = "DriverAadharNo";
                        Worksheets.Cells[5, 18] = "IsActive";
                        Worksheets.Cells[5, 19] = "GroupName";
                        Worksheets.Cells[5, 20] = "DrBankAccountName";
                        Worksheets.Cells[5, 21] = "BankName";
                        Worksheets.Cells[5, 22] = "BankAcNo";
                        Worksheets.Cells[5, 23] = "BankIfsCode";



                        v = 0;
                        int r = v + 6;
                        string Expdt = "";

                        while (v < dataSet.Tables[0].Rows.Count)
                        {


                            Worksheets.Cells[r, 1] = v + 1;
                            Excel.Range RA6 = Worksheets.get_Range("A" + r + ":A" + r, misvalue);
                            RA6.HorizontalAlignment = Constants.xlRight;
                            Worksheets.Cells[r, 2] = dataSet.Tables[0].Rows[v]["DriverName"].ToString();
                            Worksheets.Cells[r, 3] = dataSet.Tables[0].Rows[v]["FatherName"].ToString();
                            Worksheets.Cells[r, 4] = dataSet.Tables[0].Rows[v]["DateOfBirth"].ToString();
                            Worksheets.Cells[r, 5] = dataSet.Tables[0].Rows[v]["IntroBy"].ToString();
                            Worksheets.Cells[r, 6] = dataSet.Tables[0].Rows[v]["IntroByMobileNo"].ToString();
                            Worksheets.Cells[r, 7] = dataSet.Tables[0].Rows[v]["DateOfAppoint"].ToString();
                            Worksheets.Cells[r, 8] = dataSet.Tables[0].Rows[v]["LicenseNo"].ToString();
                            Worksheets.Cells[r, 9] = dataSet.Tables[0].Rows[v]["LicenseIssuAuth"].ToString();
                            Worksheets.Cells[r, 10] = dataSet.Tables[0].Rows[v]["LicValidUpto"].ToString();
                            Worksheets.Cells[r, 11] = dataSet.Tables[0].Rows[v]["BloodGroup"].ToString();
                            Worksheets.Cells[r, 12] = dataSet.Tables[0].Rows[v]["DriverMobile1"].ToString();
                            Worksheets.Cells[r, 13] = dataSet.Tables[0].Rows[v]["DriverMobile2"].ToString();
                            Worksheets.Cells[r, 14] = dataSet.Tables[0].Rows[v]["TempAddPhone"].ToString();
                            Worksheets.Cells[r, 15] = dataSet.Tables[0].Rows[v]["PermanentAddr"].ToString();
                            Worksheets.Cells[r, 16] = dataSet.Tables[0].Rows[v]["PermAddPhone"].ToString();
                            Worksheets.Cells[r, 17] = dataSet.Tables[0].Rows[v]["DriverAadharNo"].ToString();
                            Worksheets.Cells[r, 18] = dataSet.Tables[0].Rows[v]["IsActive"].ToString();
                            Worksheets.Cells[r, 19] = dataSet.Tables[0].Rows[v]["GroupName"].ToString();
                            Worksheets.Cells[r, 20] = dataSet.Tables[0].Rows[v]["DrBankAccountName"].ToString();
                            Worksheets.Cells[r, 21] = dataSet.Tables[0].Rows[v]["BankName"].ToString();
                            Worksheets.Cells[r, 22] = dataSet.Tables[0].Rows[v]["BankAcNo"].ToString();
                            Worksheets.Cells[r, 23] = dataSet.Tables[0].Rows[v]["BankIfsCode"].ToString();


                            r++;
                            v++;
                        }
                        //RF6.NumberFormat = "dd-MMM-yyyy";

                        Excel.Range Rn6 = Worksheets.get_Range("A5:W" + (r - 1).ToString(), misvalue);
                        Rn6.Borders.LineStyle = XlLineStyle.xlContinuous;

                        Worksheets.UsedRange.EntireColumn.AutoFit();

                        app.EnableEvents = false;
                        app.DisplayAlerts = false;
                        var folderName = System.IO.Path.Combine("Reports", "DriverLicRPT");
                        var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, folderName);
                        string fileName = "DriverLic_" + request.Search + "_" + System.DateTime.Now.ToString("ddMMyyyyHHmmss") + ".xlsx";
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
