using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using ClosedXML.Excel;
using System.Data;
using DocumentFormat.OpenXml;
using Shared.Repository;

namespace FleetTrans.Repository
{
    public class ExpTruckArrRptRepository : IExpTruckArrRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public ExpTruckArrRptRepository(IOptions<DBModel> _dbconnection, 
            ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
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
                        DataTable dt = dataSet.Tables[0];

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            response = await sharedRepository.GetCompanyDetail();
                            int colcnt = dt.Columns.Count;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, 10).Merge();
                            ws.Range(1, 1, 1, 10).Value = response.Message;
                            ws.Range(1, 1, 1, 10).Style.Font.Bold = true;
                            ws.Range(1, 1, 1, 10).Style.Font.FontSize = 18;
                            ws.Range(1, 1, 1, 10).Style.Font.FontColor = XLColor.Maroon;
                            ws.Range(1, 1, 1, 10).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(2, 1, 2, 10).Merge();
                            ws.Range(2, 1, 2, 10).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                            ws.Range(2, 1, 2, 10).Style.Font.Bold = true;
                            ws.Range(2, 1, 2, 10).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                            ws.Range(2, 1, 2, 10).Style.Font.FontSize = 11;

                            ws.Range(3, 1, 3, 10).Merge();
                            ws.Range(3, 1, 3, 10).Value = "EXPECTED TRUCK ARRIVAL REPORT";
                            ws.Range(3, 1, 3, 10).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, 10).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, 10).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, 10).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, 10).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, 10).Merge();
                            ws.Range(4, 1, 4, 10).Value = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy") + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy"); ;
                            ws.Range(4, 1, 4, 10).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, 10).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, 10).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, 10).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Cell(5, 1).Value= "Sl. No.";
                            ws.Cell(5, 2).Value= "Loading Date";
                            ws.Cell(5, 3).Value= "Vehicle No";
                            ws.Cell(5, 4).Value= "Loading Branch";
                            ws.Cell(5, 5).Value= "Loading From";
                            ws.Cell(5, 6).Value= "Destination";
                            ws.Cell(5, 7).Value= "Load Type";
                            ws.Cell(5, 8).Value= "Party Name";
                            ws.Cell(5, 9).Value= "Driver Name";
                            ws.Cell(5, 10).Value = "Driver Phone";

                            ws.Range(5, 1, 5, 10).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, 10).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, 10).Style.Font.FontColor = XLColor.DarkBlue;

                            int j = 0;
                            int r = 6;
                            string Expdt = "";

                            for (j = 0; j < dt.Rows.Count; j++)
                            {
                                if (Expdt!=dataSet.Tables[0].Rows[j]["ExpectedDate"].ToString())
                                {
                                    Expdt = dataSet.Tables[0].Rows[j]["ExpectedDate"].ToString();
                                    ws.Range(r, 1, r, 10).Merge();
                                    ws.Range(r, 1, r, 10).Value = Expdt;
                                    ws.Range(r, 1, r, 10).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;
                                    ws.Range(r, 1, r, 10).Style.Font.Bold = true;

                                    r++;
                                }

                                ws.Cell(r, 1).Value = j + 1;
                                ws.Cell(r, 2).Value = dataSet.Tables[0].Rows[j]["LoadingDate"].ToString();
                                ws.Cell(r, 3).Value = dataSet.Tables[0].Rows[j]["VehicleNo"].ToString();
                                ws.Cell(r, 4).Value = dataSet.Tables[0].Rows[j]["LoadingBranch"].ToString();
                                ws.Cell(r, 5).Value = dataSet.Tables[0].Rows[j]["LoadingFrom"].ToString();
                                ws.Cell(r, 6).Value = dataSet.Tables[0].Rows[j]["Destination"].ToString();
                                ws.Cell(r, 7).Value = dataSet.Tables[0].Rows[j]["MatLoadType"].ToString();
                                ws.Cell(r, 8).Value = dataSet.Tables[0].Rows[j]["PartyName"].ToString();
                                ws.Cell(r, 9).Value = dataSet.Tables[0].Rows[j]["DriverName"].ToString();
                                ws.Cell(r, 10).Value = dataSet.Tables[0].Rows[j]["DriverPhone"].ToString();
                                r++;
                            }
                            for (int k = 1; k <= 10; k++)
                            {
                                ws.Column(k).AdjustToContents();
                            }

                            ws.Range(5, 1, r-1, 10).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, r-1, 10).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

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

                            response.Status = true;
                            response.Message = filename;

                        }

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


    }

}
