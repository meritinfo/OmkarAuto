using DocumentFormat.OpenXml.Bibliography;
using HRMasters.Models;
using Microsoft.Extensions.Options;
using Microsoft.VisualBasic;
using Shared.Models;
using Shared.Repository;
using SqlHelper.Models;
using System;
using System.IO;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using DocumentFormat.OpenXml.Office2016.Excel;
using ClosedXML.Excel;

namespace HRMasters.Repository
{
    public class PaySheetRptRepository : IPaySheetRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public PaySheetRptRepository(IOptions<DBModel> _dbconnection, 
            ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<EmpPayGenList> GetPaySheetRptList(ReportRequestModel request)
        {
            EmpPayGenList empPayGenList = new();
            List<EmpPayGenModel> empPayList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize", request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder", request.SortOrder),
                            new SqlParameter("@Search", request.Search),
                            new SqlParameter("@MonthYear", request.FromDate),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpPaySheetRPTList", param);
                    int totalRecords = 0;
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            empPayList.Add(new EmpPayGenModel
                            {
                                SlNo            = Convert.ToString(dataSet.Tables[0].Rows[i]["SlNo"]),
                                MonthYear       = Convert.ToString(dataSet.Tables[0].Rows[i]["MonthYear"]),
                                EmpCode         = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpCode"]),
                                EmpName         = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpName"]),
                                DaysOfMonth     = Convert.ToString(dataSet.Tables[0].Rows[i]["DaysOfMonth"]),
                                WorkedDays      = Convert.ToString(dataSet.Tables[0].Rows[i]["WorkedDays"]),
                                LossOfPayDays   = Convert.ToString(dataSet.Tables[0].Rows[i]["LossOfPayDays"]),
                                PayDays         = Convert.ToString(dataSet.Tables[0].Rows[i]["PayDays"]),
                                BasicEarn       = Convert.ToString(dataSet.Tables[0].Rows[i]["BasicEarn"]),
                                HraEarn         = Convert.ToString(dataSet.Tables[0].Rows[i]["HraEarn"]),
                                FdaEarn         = Convert.ToString(dataSet.Tables[0].Rows[i]["FdaEarn"]),
                                Oth1Earn        = Convert.ToString(dataSet.Tables[0].Rows[i]["Oth1Earn"]),
                                Oth2Earn        = Convert.ToString(dataSet.Tables[0].Rows[i]["Oth2Earn"]),
                                TotalEarn       = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalEarn"]),
                                PfDed           = Convert.ToString(dataSet.Tables[0].Rows[i]["PfDed"]),
                                EsiDed          = Convert.ToString(dataSet.Tables[0].Rows[i]["EsiDed"]),
                                TdsDed          = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsDed"]),
                                PtDed           = Convert.ToString(dataSet.Tables[0].Rows[i]["PtDed"]),
                                SalAdvDed       = Convert.ToString(dataSet.Tables[0].Rows[i]["SalAdvDed"]),
                                LoanDed         = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanDed"]),
                                TotalDed        = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDed"]),
                                NetPay          = Convert.ToString(dataSet.Tables[0].Rows[i]["NetPay"]),                               
                            });
                        }

                        empPayGenList.PayGenMstList = empPayList;

                        empPayGenList.PageMetaData = new PaginationMetaData
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
            return empPayGenList;
        }
        public async Task<ResponseModel> GetPaySheetRptExcel(RequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MonthYear", request.strRequest),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpPaySheetRPTExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                       
                        var filter = "FOR THE MONTH OF  " + Convert.ToDateTime(request.strRequest).ToString("MMM yyyy").ToUpper();
                        response = await GetExcelReport(dataSet.Tables[0], "SALARY STATEMENT", filter);
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

        public async Task<ResponseModel> GetPfECRExcel(RequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MonthYear", request.strRequest),
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpPfEcrRPTExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dataSet.Tables[0].Rows[i]["UAN"] = "'" + dataSet.Tables[0].Rows[i]["UAN"].ToString();
                        }
                        var filter = " For The Month OF  " + Convert.ToDateTime(request.strRequest).ToString("MMM yyyy").ToUpper();
                       
                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Provident Fund ECR Converter", filter);
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
        public async Task<ResponseModel> GetPfECRText(RequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MonthYear", request.strRequest),
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpPfEcrRPTText", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var foldername = System.IO.Path.Combine("reports", "Download");
                        var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                        var filename = "TextReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".txt";
                        var filePath = foldername + "//" + filename;
                        var fullPath = System.IO.Path.Combine(pathToSave, filename);
                        bool exists = System.IO.Directory.Exists(pathToSave);
                        if (!exists)
                        {
                            Directory.CreateDirectory(pathToSave);
                        }

                        if (File.Exists(fullPath))
                            File.Delete(fullPath);

                        ExportDataTabletoFile(dataSet.Tables[0], "#~#", false, fullPath);


                        response.Status = true;
                        response.Message = filename;
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

        public void ExportDataTabletoFile(DataTable datatable, string delimited, bool exportcolumnsheader, string file)
        {
            StreamWriter str = new StreamWriter(file, false, System.Text.Encoding.Default);
            if (exportcolumnsheader)
            {
                string Columns = string.Empty;
                foreach (DataColumn column in datatable.Columns)
                {
                    Columns += column.ColumnName + delimited;
                }
                str.WriteLine(Columns.Remove(Columns.Length - 1, 1));
            }
            foreach (DataRow datarow in datatable.Rows)
            {
                string row = string.Empty;
                foreach (object items in datarow.ItemArray)
                {
                    row += items.ToString() + delimited;
                }
                str.WriteLine(row.Remove(row.Length - 1, 1));
            }
            str.Flush();
            str.Close();
        }

        public async Task<ResponseModel> GetExcelReport(DataTable dt, string rptheader, string filter)
        {
            ResponseModel responseModel = new();
            try
            {
                using (XLWorkbook wb = new XLWorkbook())
                {
                    int colcnt = dt.Columns.Count;
                    responseModel = await sharedRepository.GetCompanyDetail();

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

                    for (int i = 0; i < colcnt; i++)
                    {
                        ws.Cell(5, i+1).Value = dt.Columns[i].ColumnName;
                    }

                    ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                    int j = 0;
                    var bada = 0.00;
                    var othall = 0.00;
                    var gross = 0.00;
                    var basic = 0.00;
                    var other = 0.00;
                    var erned = 0.00;
                    var pf = 0.00;
                    var esi = 0.00;
                    var pt = 0.00;
                    var oths = 0.00;
                    var ded = 0.00;
                    var net = 0.00;

                    for (j = 0; j < dt.Rows.Count; j++)
                    {
                        bada = bada + Convert.ToDouble(dt.Rows[j]["BA+DA"]);
                        othall = othall + Convert.ToDouble(dt.Rows[j]["OTH ALL"]);
                        gross = gross + Convert.ToDouble(dt.Rows[j]["GROSS"]);
                        basic = basic + Convert.ToDouble(dt.Rows[j]["BASIC+DA"]);
                        other = other + Convert.ToDouble(dt.Rows[j]["OTHER ALL"]);
                        erned = erned + Convert.ToDouble(dt.Rows[j]["EARNED SAL"]);
                        pf = pf + Convert.ToDouble(dt.Rows[j]["PF"]);
                        esi = esi + Convert.ToDouble(dt.Rows[j]["ESI"]);
                        pt = pt + Convert.ToDouble(dt.Rows[j]["PT"]);
                        oths = oths + Convert.ToDouble(dt.Rows[j]["OTHERS"]);
                        ded = ded + Convert.ToDouble(dt.Rows[j]["TOT DED"]);
                        net = net + Convert.ToDouble(dt.Rows[j]["NET PAY"]);

                        for (int i = 0; i < colcnt; i++)
                        {
                            ws.Cell(j + 6, i + 1).Value = Convert.ToString(dt.Rows[j][i]);
                        }

                    }

                    ws.Cell(j + 6, 1).Value = "";
                    ws.Cell(j + 6, 2).Value = "TOTAL";
                    ws.Cell(j + 6, 3).Value = bada.ToString() ;
                    ws.Cell(j + 6, 4).Value = othall.ToString();
                    ws.Cell(j + 6, 5).Value = gross.ToString();
                    ws.Cell(j + 6, 6).Value = "";
                    ws.Cell(j + 6, 7).Value = "";
                    ws.Cell(j + 6, 8).Value = "";
                    ws.Cell(j + 6, 9).Value = "";
                    ws.Cell(j + 6, 10).Value = basic.ToString();
                    ws.Cell(j + 6, 11).Value = other.ToString();
                    ws.Cell(j + 6, 12).Value = erned.ToString();
                    ws.Cell(j + 6, 13).Value = pf.ToString();
                    ws.Cell(j + 6, 14).Value = esi.ToString();
                    ws.Cell(j + 6, 15).Value = pt.ToString();
                    ws.Cell(j + 6, 16).Value = oths.ToString();
                    ws.Cell(j + 6, 17).Value = ded.ToString();
                    ws.Cell(j + 6, 18).Value = net.ToString();


                    ws.Range(j + 6, 1, j + 6, colcnt).Style.Font.Bold = true;
                    ws.Range(j + 6, 1, j + 6, colcnt).Style.Font.FontSize = 12;
                    ws.Range(j + 6, 1, j + 6, colcnt).Style.Font.FontColor = XLColor.Maroon;

                    for (int k = 1; k <= colcnt; k++)
                    {
                        ws.Column(k).AdjustToContents();
                    }

                    ws.Range(5, 1, j + 6, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    ws.Range(5, 1, j + 6, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                    var foldername = System.IO.Path.Combine("reports", "Download");
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
