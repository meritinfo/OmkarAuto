using FleetTrans.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using Shared.Repository;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Shared.Models;
using ClosedXML.Excel;
using System.Data;
using DocumentFormat.OpenXml;
using Shared.Repository;

namespace FleetTrans.Repository
{
    public class FleetRptRepository : IFleetRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public FleetRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<ResponseModel> ExcelTripOutstandingRptList(ReportRequestModel request)
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
                            new SqlParameter("@VehicleMasterID",    request.FilterStr),
                            new SqlParameter("@Party",              request.FilterStr1),
                            new SqlParameter("@RptType",            request.FilterStr2),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripOutstandingRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Trip Outstanding report " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy") + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");
                        var rptname = request.FilterStr2 == "S"? "Vehicle Advances / Balances Receipt Details" :"Trip Outstanding report";
                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], rptname, filter);

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
        public async Task<TripOutstandingRptListModel> GetTripOutstandingRptList(ReportRequestModel request)
        {
            TripOutstandingRptListModel tripOutstandingRpt = new();
            List<TripOutstandingRptModel> tripOutstandingRptList = new();
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
                            new SqlParameter("@VehicleMasterId",    request.FilterStr),
                            new SqlParameter("@Party",          request.FilterStr1),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripOutstandingRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tripOutstandingRptList.Add(new TripOutstandingRptModel
                            {
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                TripNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TripNo"]),
                                TripDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TripDate"]),
                                OwnMarket = Convert.ToString(dataSet.Tables[0].Rows[i]["OwnMarket"]),
                                ChBrCode = Convert.ToString(dataSet.Tables[0].Rows[i]["ChBrCode"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                TripFromPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["TripFromPlace"]),
                                TripToPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["TripToPlace"]),
                                TptName = Convert.ToString(dataSet.Tables[0].Rows[i]["TptName"]),
                                TotalHire = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalHire"]),
                                RecdAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["RecdAmt"]),
                                DedAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["DedAmt"]),
                                TdsAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsAmt"]),
                                ExtraAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraAmt"]),

                            });
                        }

                        tripOutstandingRpt.TripOutstandingRptlist = tripOutstandingRptList;

                        tripOutstandingRpt.PageMetaData = new PaginationMetaData
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
            return tripOutstandingRpt;
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

                            ws.Cell(5, 1).Value = "Sl. No.";
                            ws.Cell(5, 2).Value = "Loading Date";
                            ws.Cell(5, 3).Value = "Vehicle No";
                            ws.Cell(5, 4).Value = "Loading Branch";
                            ws.Cell(5, 5).Value = "Loading From";
                            ws.Cell(5, 6).Value = "Destination";
                            ws.Cell(5, 7).Value = "Load Type";
                            ws.Cell(5, 8).Value = "Party Name";
                            ws.Cell(5, 9).Value = "Driver Name";
                            ws.Cell(5, 10).Value = "Driver Phone";

                            ws.Range(5, 1, 5, 10).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, 10).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, 10).Style.Font.FontColor = XLColor.DarkBlue;

                            int j = 0;
                            int r = 6;
                            string Expdt = "";

                            for (j = 0; j < dt.Rows.Count; j++)
                            {
                                if (Expdt != dataSet.Tables[0].Rows[j]["ExpectedDate"].ToString())
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

                            ws.Range(5, 1, r - 1, 10).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, r - 1, 10).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

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
        public async Task<DieselStmtRptListModel> GetDieselStmtRptList(ReportRequestModel request)
        {
            DieselStmtRptListModel dieselStmtRpt = new();
            List<DieselStmtRptModel> dieselStmtRptList = new();
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
                            new SqlParameter("@Branch",          request.FilterStr),
                            new SqlParameter("@VehicleMasterID",    request.FilterStr1),
                            new SqlParameter("@TripAdjusted",      request.FilterStr2),
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDieselStmtRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dieselStmtRptList.Add(new DieselStmtRptModel
                            {
                                Branch = Convert.ToString(dataSet.Tables[0].Rows[i]["Branch"]),
                                Vehicleno = Convert.ToString(dataSet.Tables[0].Rows[i]["Vehicleno"]),
                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                TransRefNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TransRefNo"]),
                                DslQty = Convert.ToString(dataSet.Tables[0].Rows[i]["DslQty"]),
                                DslRate = Convert.ToString(dataSet.Tables[0].Rows[i]["DslRate"]),
                                Amount = Convert.ToString(dataSet.Tables[0].Rows[i]["Amount"]),
                                TripAdj = Convert.ToString(dataSet.Tables[0].Rows[i]["TripAdj"]),
                                TripNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TripNo"]),
                                FillingStnName = Convert.ToString(dataSet.Tables[0].Rows[i]["FillingStnName"]),
                            });
                        }

                        dieselStmtRpt.DieselStmtRptlist = dieselStmtRptList;

                        dieselStmtRpt.PageMetaData = new PaginationMetaData
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
            return dieselStmtRpt;
        }
        public async Task<ResponseModel> GetDieselStmtRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@Branch",          request.FilterStr),
                            new SqlParameter("@VehicleMasterID",    request.FilterStr1),
                            new SqlParameter("@TripAdjusted",      request.FilterStr2),
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDieselStmtRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Diesel Statement Report " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy") +
                                                " To " + request.ToDate;
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dataSet.Tables[0].Rows[i]["Trans Ref No"] = "'" + dataSet.Tables[0].Rows[i]["Trans Ref No"].ToString();
                        }
                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Diesel Statement Report", filter);

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
                            new SqlParameter("@DocRenewalID",       request.FilterStr1),
                            new SqlParameter("@VehicleMasterid",    request.FilterStr2),
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
                            new SqlParameter("@FromDate",           request.FromDate),
                            new SqlParameter("@ToDate",             request.ToDate),
                            new SqlParameter("@DocRenewalID",       request.FilterStr1),
                            new SqlParameter("@VehicleMasterid",    request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDocRenewalRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + request.FromDate + " To " + request.ToDate;

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Document Renewal Report", filter);
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
        public async Task<DailyLoadingRptListModel> GetDailyLoadingRptList(ReportRequestModel request)
        {
            DailyLoadingRptListModel dailyLoadingRptList = new();
            List<DailyLoadingRptModel> dailyLoadings = new();
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
                            new SqlParameter("@VehicleMasterid",    request.FilterStr1),
                            new SqlParameter("@OpenThrough",        request.FilterStr2),
                            new SqlParameter("@LoadEmptyType",      request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDailyLoadingRptList", param);
                    int totalRecords = 0;
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dailyLoadings.Add(new DailyLoadingRptModel
                            {
                                TripBranchName = Convert.ToString(dataSet.Tables[0].Rows[i]["TripBranchName"]),
                                NewTripDate = Convert.ToString(dataSet.Tables[0].Rows[i]["NewTripDate"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                TripNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TripNo"]),
                                LoadEmptyType = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadEmptyType"]),
                                FromPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlace"]),
                                ToPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]),
                                OpenThrough = Convert.ToString(dataSet.Tables[0].Rows[i]["openthrough"]),
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                LoadContents = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadContents"]),
                                LoadingFor = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingFor"]),
                                LRNo = Convert.ToString(dataSet.Tables[0].Rows[i]["LRNo"]),
                            });
                        }

                        dailyLoadingRptList.DailyLoadingRptsList = dailyLoadings;

                        dailyLoadingRptList.PageMetaData = new PaginationMetaData
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
            return dailyLoadingRptList;
        }
        public async Task<ResponseModel> GetDailyLoadingRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@Branch",             request.FilterStr),
                            new SqlParameter("@VehicleMasterid",    request.FilterStr1),
                            new SqlParameter("@OpenThrough",        request.FilterStr2),
                            new SqlParameter("@LoadEmptyType",      request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDailyLoadingRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Trip From " + request.FromDate + " To " + request.ToDate;
                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Daily Loading Report", filter);
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
        public async Task<TripStatusRptListModel> GetTripStatusRptList(ReportRequestModel request)
        {
            TripStatusRptListModel tripStatusRpt = new();
            List<TripStatusRptModel> tripStatusRptList = new();
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
                            new SqlParameter("@TripLink",           request.FilterStr),
                            new SqlParameter("@Status",             request.FilterStr1),
                            new SqlParameter("@VehicleMasterid",    request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripStatusRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tripStatusRptList.Add(new TripStatusRptModel
                            {
                                Branch = Convert.ToString(dataSet.Tables[0].Rows[i]["Branch"]),
                                TripOpenDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TripOpenDate"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                TripNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TripNo"]),
                                ExUlDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ExUlDate"]),
                                DistanceTripKM_1 = Convert.ToString(dataSet.Tables[0].Rows[i]["DistanceTripKM_1"]),
                                FromPoint = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPoint"]),
                                ToPoint = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPoint"]),
                                //  TripStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["TripStatus"]),
                                //  TripCloseDt = Convert.ToString(dataSet.Tables[0].Rows[i]["TripCloseDt"]),
                                //  TripLinkYN = Convert.ToString(dataSet.Tables[0].Rows[i]["TripLinkYN"]),
                                //   LoadType = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadType"]),
                            });
                        }

                        tripStatusRpt.TripStatusRptlist = tripStatusRptList;

                        tripStatusRpt.PageMetaData = new PaginationMetaData
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
            return tripStatusRpt;
        }
        public async Task<ResponseModel> GetTripStatusRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@TripLink",           request.FilterStr),
                            new SqlParameter("@Status",             request.FilterStr1),
                            new SqlParameter("@VehicleMasterid",    request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripStatusRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Payment From " + request.FromDate + " To " + request.ToDate;
                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Trip Status Report", filter);
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
        public async Task<List<DropDownListModel>> GetTripPaymentsCreditList()
        {
            List<DropDownListModel> creditacList = new();
            try
            {
                if (dbconnection != null)
                {

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripPaymentsCreditList", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            creditacList.Add(new DropDownListModel
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
            return creditacList;
        }
        public async Task<TripPaymentsRptListModel> GetTripPaymentsRptList(ReportRequestModel request)
        {
            TripPaymentsRptListModel tripPaymentsRpt = new();
            List<TripPaymentsRptModel> tripPaymentsRptList = new();
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
                            new SqlParameter("@VehicleMasterID",    request.FilterStr1),
                            new SqlParameter("@TransType",          request.FilterStr2),
                            new SqlParameter("@PmtType",            request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripPaymentsRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tripPaymentsRptList.Add(new TripPaymentsRptModel
                            {
                                PaymentBr = Convert.ToString(dataSet.Tables[0].Rows[i]["PaymentBr"]),
                                PmtDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtDate"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                TransType = Convert.ToString(dataSet.Tables[0].Rows[i]["TransType"]),
                                QtyLtrs = Convert.ToString(dataSet.Tables[0].Rows[i]["QtyLtrs"]),
                                AmountPaid = Convert.ToString(dataSet.Tables[0].Rows[i]["AmountPaid"]),
                                PmtType = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),
                                CreditAffect = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAffect"]),
                                TripAdj = Convert.ToString(dataSet.Tables[0].Rows[i]["TripAdj"]),
                                TripNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TripNo"]),
                                FillingStnName = Convert.ToString(dataSet.Tables[0].Rows[i]["FillingStnName"]),

                            });
                        }

                        tripPaymentsRpt.TripPaymentsRptlist = tripPaymentsRptList;

                        tripPaymentsRpt.PageMetaData = new PaginationMetaData
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
            return tripPaymentsRpt;
        }
        public async Task<ResponseModel> ExcelTripPaymentsRptList(ReportRequestModel request)
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
                            new SqlParameter("@Branch",          request.FilterStr),
                            new SqlParameter("@VehicleMasterID",            request.FilterStr1),
                            new SqlParameter("@TransType",    request.FilterStr2),
                            new SqlParameter("@PmtType",           request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripPaymentsRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Trip Payments From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy") + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Trip Payments Report", filter);

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
        public async Task<TripSummaryRptListModel> GetTripSummaryRptList(ReportRequestModel request)
        {
            TripSummaryRptListModel tripSummaryRpt = new();
            List<TripSummaryRptModel> tripSummaryRptList = new();
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
                            new SqlParameter("@VehicleMasterId",    request.FilterStr),
                            new SqlParameter("@DriverMasterId",          request.FilterStr1),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripSummaryRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tripSummaryRptList.Add(new TripSummaryRptModel
                            {
                                TripBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["TripBranch"]),
                                TripNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TripNo"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                StmtDate = Convert.ToString(dataSet.Tables[0].Rows[i]["StmtDate"]),
                                DeptDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DeptDate"]),
                                EndDate = Convert.ToString(dataSet.Tables[0].Rows[i]["EndDate"]),
                                NoOfDays = Convert.ToString(dataSet.Tables[0].Rows[i]["NoOfDays"]),
                                DistanceTripKM = Convert.ToString(dataSet.Tables[0].Rows[i]["DistanceTripKM"]),
                                TripTotalFreight = Convert.ToString(dataSet.Tables[0].Rows[i]["TripTotalFreight"]),
                                TripTotalExpenses = Convert.ToString(dataSet.Tables[0].Rows[i]["TripTotalExpenses"]),
                                TripMargin = Convert.ToString(dataSet.Tables[0].Rows[i]["TripMargin"]),
                                MarginPerKM = Convert.ToString(dataSet.Tables[0].Rows[i]["MarginPerKM"]),
                                TripStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["TripStatus"]),


                            });
                        }

                        tripSummaryRpt.TripSummaryRptlist = tripSummaryRptList;

                        tripSummaryRpt.PageMetaData = new PaginationMetaData
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
            return tripSummaryRpt;
        }
        public async Task<ResponseModel> ExcelTripSummaryRptList(ReportRequestModel request)
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
                            new SqlParameter("@VehicleMasterID",          request.FilterStr),
                            new SqlParameter("@DriverMasterId",            request.FilterStr1),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripSummaryRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Trip Vehicle Summary " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy") + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Trip Vehicle Summary", filter);

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
        public async Task<ResponseModel> GetVehicleFrtOutstandingRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@VehicleMasterId",          request.FilterStr),
                            new SqlParameter("@Party",          request.FilterStr1),
                            new SqlParameter("@RptType",          request.FilterStr2),

                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleFrtOutstandingRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Vehicle Freight Outstanding Report " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy") + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Vehicle Freight Outstanding Report", filter);

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
        public async Task<VehicleFrtOutstandingRptListModel> GetVehicleFrtOutstandingRptList(ReportRequestModel request)
        {
            VehicleFrtOutstandingRptListModel vehicleFrtOutstandingRpt = new();
            List<VehicleFrtOutstandingRptModel> vehicleFrtOutstandingRptList = new();
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
                            new SqlParameter("@VehicleMasterId",          request.FilterStr),
                            new SqlParameter("@Party",          request.FilterStr1),
                            new SqlParameter("@RptType",          request.FilterStr2),

                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleFrtOutstandingRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            vehicleFrtOutstandingRptList.Add(new VehicleFrtOutstandingRptModel
                            {
                                Branch = Convert.ToString(dataSet.Tables[0].Rows[i]["Branch"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                TripNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TripNo"]),
                                LoadDate = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadDate"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                FromPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlace"]),
                                ToPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]),

                                TotalHire = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalHire"]),
                                RecdAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["RecdAmt"]),
                                DedAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["DedAmt"]),
                                TdsAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsAmt"]),
                                DueAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["DueAmt"]),

                            });
                        }

                        vehicleFrtOutstandingRpt.VehicleFrtOutstandingRptList = vehicleFrtOutstandingRptList;

                        vehicleFrtOutstandingRpt.PageMetaData = new PaginationMetaData
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
            return vehicleFrtOutstandingRpt;
        }
        public async Task<ResponseModel> GetVehicleRepairsRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@VehicleMasterId",          request.FilterStr),
                            new SqlParameter("@SpareLubId",          request.FilterStr1),
                            new SqlParameter("@RptType",          request.FilterStr2),

                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleRepairsRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Statement From " + request.FromDate + " To " + request.ToDate;

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Vehicle Repairs Report", filter);

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
        public async Task<VehicleRepairsRptListModel> GetVehicleRepairsRptList(ReportRequestModel request)
        {
            VehicleRepairsRptListModel vehicleRepairsRpt = new();
            List<VehicleRepairsRptModel> vehicleRepairsRptList = new();
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
                            new SqlParameter("@VehicleMasterId",          request.FilterStr),
                            new SqlParameter("@SpareLubId",          request.FilterStr1),
                            new SqlParameter("@RptType",          request.FilterStr2),

                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleRepairsRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            vehicleRepairsRptList.Add(new VehicleRepairsRptModel
                            {
                                BranchName = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchName"]),
                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                MaintenanceDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["MaintenanceDesc"]),
                                VendorName = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorName"]),
                                VendorGstNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorGstNo"]),
                                GstType = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                ItemAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["ItemAmount"]),

                                SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                ItemNetAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["ItemNetAmount"]),
                                OtherAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherAmount"]),
                                RoundOff = Convert.ToString(dataSet.Tables[0].Rows[i]["RoundOff"]),
                                NetAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmount"]),
                            });
                        }

                        vehicleRepairsRpt.VehicleRepairsRptList = vehicleRepairsRptList;

                        vehicleRepairsRpt.PageMetaData = new PaginationMetaData
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
            return vehicleRepairsRpt;
        }
        public async Task<TyreMgntReportList> GetTyrePurchaseRptList(ReportRequestModel request)
        {
            TyreMgntReportList tyrePurchaseMasterList = new();
            List<TyreMgntReportModel> tyrePurchaseslist = new();
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
                            new SqlParameter("@VendorId",           request.FilterStr),
                            new SqlParameter("@RptType" ,           request.FilterStr1),
                            new SqlParameter("@GstInputTaken" ,     request.FilterStr2),
                            new SqlParameter("@BrandID" ,           request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyrePurchaseRptList", param);
                    int totalRecords = 0;
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tyrePurchaseslist.Add(new TyreMgntReportModel
                            {
                                BranchName = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchName"]),
                                PurchaseDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PurchaseDate"]),
                                PurchaseType = Convert.ToString(dataSet.Tables[0].Rows[i]["PurchaseType"]),
                                VendorName = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorName"]),
                                VendorInvDt = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvDt"]),
                                VendorInvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvNo"]),
                                TotalTyresAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalTyresAmt"]),
                                TotalSgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalSgstAmt"]),
                                TotalCgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalCgstAmt"]),
                                TotalIgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalIgstAmt"]),
                                NetAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmount"]),
                            });
                        }

                        tyrePurchaseMasterList.TyreList = tyrePurchaseslist;

                        tyrePurchaseMasterList.PageMetaData = new PaginationMetaData
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
            return tyrePurchaseMasterList;
        }
        public async Task<ResponseModel> GetTyrePurchaseRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",         request.PageNumber),
                            new SqlParameter("@PageSize",           1000),
                            new SqlParameter("@SortColumn",         request.SortColumn),
                            new SqlParameter("@SortOrder",          request.SortOrder),
                            new SqlParameter("@Search",             request.Search),
                            new SqlParameter("@FromDate",           request.FromDate),
                            new SqlParameter("@ToDate",             request.ToDate),
                            new SqlParameter("@VendorId",           request.FilterStr),
                            new SqlParameter("@RptType" ,           request.FilterStr1),
                            new SqlParameter("@GstInputTaken" ,     request.FilterStr2),
                            new SqlParameter("@BrandID" ,           request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyrePurchaseRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        DataTable dt = dataSet.Tables[0];

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            response = await sharedRepository.GetCompanyDetail();

                            int colcnt = 0;
                            if (request.FilterStr1 == "S")
                            {
                                colcnt = 10;
                            }
                            else
                            {
                                colcnt = 12;
                            }

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = response.Message;
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
                            ws.Range(3, 1, 3, colcnt).Value = "Tyre Purchase Report";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = "Trip From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy") +
                                                                " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            if (request.FilterStr1 == "S")
                            {
                                ws.Cell(5, 1).Value = "Branch";
                                ws.Cell(5, 2).Value = "Purchase Date";
                                ws.Cell(5, 3).Value = "Purchase Type";
                                ws.Cell(5, 4).Value = "Invoice No";
                                ws.Cell(5, 5).Value = "Invoice Date";
                                ws.Cell(5, 6).Value = "Total Tyres Amt";
                                ws.Cell(5, 7).Value = "Total Sgst Amt";
                                ws.Cell(5, 8).Value = "Total Cgst Amt";
                                ws.Cell(5, 9).Value = "Total Igst Amt";
                                ws.Cell(5, 10).Value = "Net Amount";
                            }
                            else
                            {
                                ws.Cell(5, 1).Value = "Branch";
                                ws.Cell(5, 2).Value = "Purchase Date";
                                ws.Cell(5, 3).Value = "Purchase Type";
                                ws.Cell(5, 4).Value = "Invoice No";
                                ws.Cell(5, 5).Value = "Invoice Date";
                                ws.Cell(5, 6).Value = "Tyre No";
                                ws.Cell(5, 7).Value = "Brand Name";
                                ws.Cell(5, 8).Value = "Tyres Amt";
                                ws.Cell(5, 9).Value = "Sgst Amt";
                                ws.Cell(5, 10).Value = "Cgst Amt";
                                ws.Cell(5, 11).Value = "Igst Amt";
                                ws.Cell(5, 12).Value = "Net Amount";
                            }

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int j = 0;
                            int row = 6;
                            var VendorName = "";

                            for (j = 0; j < dt.Rows.Count; j++)
                            {
                                if (VendorName != dt.Rows[j]["VendorName"].ToString())
                                {
                                    ws.Range(row, 1, row, colcnt).Merge();
                                    ws.Range(row, 1, row, colcnt).Value = dt.Rows[j]["VendorName"].ToString();
                                    ws.Range(row, 1, row, colcnt).Style.Font.FontColor = XLColor.Red;
                                    row++;

                                    VendorName = dt.Rows[j]["VendorName"].ToString();
                                }
                                if (request.FilterStr1 == "S")
                                {
                                    ws.Cell(row, 1).Value = dt.Rows[j]["BranchName"].ToString();
                                    ws.Cell(row, 2).Value = dt.Rows[j]["PurchaseDate"].ToString();
                                    ws.Cell(row, 3).Value = dt.Rows[j]["purchaseType"].ToString();
                                    ws.Cell(row, 4).Value = dt.Rows[j]["VendorInvNo"].ToString();
                                    ws.Cell(row, 5).Value = dt.Rows[j]["VendorInvDt"].ToString();
                                    ws.Cell(row, 6).Value = dt.Rows[j]["TotalTyresAmt"].ToString();
                                    ws.Cell(row, 7).Value = dt.Rows[j]["TotalSgstAmt"].ToString();
                                    ws.Cell(row, 8).Value = dt.Rows[j]["TotalCgstAmt"].ToString();
                                    ws.Cell(row, 9).Value = dt.Rows[j]["TotalIgstAmt"].ToString();
                                    ws.Cell(row, 10).Value = dt.Rows[j]["NetAmount"].ToString();
                                }
                                else
                                {

                                    ws.Cell(row, 1).Value = dt.Rows[j]["BranchName"].ToString();
                                    ws.Cell(row, 2).Value = dt.Rows[j]["PurchaseDate"].ToString();
                                    ws.Cell(row, 3).Value = dt.Rows[j]["purchaseType"].ToString();
                                    ws.Cell(row, 4).Value = dt.Rows[j]["VendorInvNo"].ToString();
                                    ws.Cell(row, 5).Value = dt.Rows[j]["VendorInvDt"].ToString();
                                    ws.Cell(row, 6).Value = dt.Rows[j]["TyreNo"].ToString();
                                    ws.Cell(row, 7).Value = dt.Rows[j]["BrandName"].ToString();
                                    ws.Cell(row, 8).Value = dt.Rows[j]["TotalTyresAmt"].ToString();
                                    ws.Cell(row, 9).Value = dt.Rows[j]["TotalSgstAmt"].ToString();
                                    ws.Cell(row, 10).Value = dt.Rows[j]["TotalCgstAmt"].ToString();
                                    ws.Cell(row, 11).Value = dt.Rows[j]["TotalIgstAmt"].ToString();
                                    ws.Cell(row, 12).Value = dt.Rows[j]["NetAmount"].ToString();
                                }
                                row++;
                            }
                            for (int k = 1; k <= colcnt; k++)
                            {
                                ws.Column(k).AdjustToContents();
                            }

                            ws.Range(5, 1, row - 1, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, row - 1, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("Reports", "Download");
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

                            response.Status = true;
                            response.Message = filename;

                        }
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
        public async Task<TyreMgntReportList> GetActiveTyreRptList(ReportRequestModel request)
        {
            TyreMgntReportList tyrePurchaseMasterList = new();
            List<TyreMgntReportModel> tyrePurchaseslist = new();
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
                            new SqlParameter("@VehicleNo",          request.FilterStr),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreActiveRpt", param);
                    int totalRecords = 0;
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tyrePurchaseslist.Add(new TyreMgntReportModel
                            {
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CurrentVehicleNo"]),
                                TyreNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreNo"]),
                                BrandName = Convert.ToString(dataSet.Tables[0].Rows[i]["BrandName"]),
                                PurchaseDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CurrentStatusDate"]),
                                Kmr = Convert.ToString(dataSet.Tables[0].Rows[i]["Kmr"]),
                                TyreRunKM = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreRunKM"]),
                                TyreRunKM_RGR = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreRunKM_RGR"]),
                                RegroupDoneYN = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreReGrouped"]),
                            });
                        }

                        tyrePurchaseMasterList.TyreList = tyrePurchaseslist;

                        tyrePurchaseMasterList.PageMetaData = new PaginationMetaData
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
            return tyrePurchaseMasterList;
        }
        public async Task<ResponseModel> GetActiveTyreRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",         1),
                            new SqlParameter("@PageSize",           1000),
                            new SqlParameter("@SortColumn",         request.SortColumn),
                            new SqlParameter("@SortOrder",          request.SortOrder),
                            new SqlParameter("@Search",             request.Search),
                            new SqlParameter("@VehicleNo",          request.FilterStr),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreActiveRpt", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        DataTable dt = dataSet.Tables[0];

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            response = await sharedRepository.GetCompanyDetail();

                            int colcnt = 7;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = response.Message;
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
                            ws.Range(3, 1, 3, colcnt).Value = "Active Tyre Report";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = "";
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Cell(5, 1).Value = "Tyre No";
                            ws.Cell(5, 2).Value = "Brand";
                            ws.Cell(5, 3).Value = "Activate Date";
                            ws.Cell(5, 4).Value = "Act KMs";
                            ws.Cell(5, 5).Value = "Tyre Run KMs";
                            ws.Cell(5, 6).Value = "Tyre Run KMs RGR";
                            ws.Cell(5, 7).Value = "TyreReGrouped";

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int j = 0;
                            int row = 6;
                            var VehicleNo = "";

                            for (j = 0; j < dt.Rows.Count; j++)
                            {
                                if (VehicleNo != dt.Rows[j]["CurrentVehicleNo"].ToString())
                                {
                                    ws.Range(row, 1, row, colcnt).Merge();
                                    ws.Range(row, 1, row, colcnt).Value = dt.Rows[j]["CurrentVehicleNo"].ToString();
                                    ws.Range(row, 1, row, colcnt).Style.Font.FontColor = XLColor.Red;
                                    row++;

                                    VehicleNo = dt.Rows[j]["CurrentVehicleNo"].ToString();
                                }

                                ws.Cell(row, 1).Value = dt.Rows[j]["TyreNo"].ToString();
                                ws.Cell(row, 2).Value = dt.Rows[j]["BrandName"].ToString();
                                ws.Cell(row, 3).Value = dt.Rows[j]["CurrentStatusDate"].ToString();
                                ws.Cell(row, 4).Value = dt.Rows[j]["Kmr"].ToString();
                                ws.Cell(row, 5).Value = dt.Rows[j]["TyreRunKM"].ToString();
                                ws.Cell(row, 6).Value = dt.Rows[j]["TyreRunKM_RGR"].ToString();
                                ws.Cell(row, 7).Value = dt.Rows[j]["TyreReGrouped"].ToString();

                                row++;
                            }
                            for (int k = 1; k <= colcnt; k++)
                            {
                                ws.Column(k).AdjustToContents();
                            }

                            ws.Range(5, 1, row - 1, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, row - 1, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("Reports", "Download");
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

                            response.Status = true;
                            response.Message = filename;

                        }
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
        public async Task<TyreMgntReportList> GetTyreActivatedRptList(ReportRequestModel request)
        {
            TyreMgntReportList tyrePurchaseMasterList = new();
            List<TyreMgntReportModel> tyrePurchaseslist = new();
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
                            new SqlParameter("@VehicleMasterId",    request.FilterStr),
                            new SqlParameter("@BrandID",            request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreActivationRptList", param);
                    int totalRecords = 0;
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tyrePurchaseslist.Add(new TyreMgntReportModel
                            {
                                BranchName = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchName"]),
                                PurchaseDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ActivateDate"]),
                                RefNo = Convert.ToString(dataSet.Tables[0].Rows[i]["RefNo"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                TyreNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreNo"]),
                                BrandName = Convert.ToString(dataSet.Tables[0].Rows[i]["BrandName"]),
                                TyrePosition = Convert.ToString(dataSet.Tables[0].Rows[i]["TyrePosition"]),
                                FittedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["FittedBy"]),
                                InspectedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["InspectedBy"]),
                                Kmr = Convert.ToString(dataSet.Tables[0].Rows[i]["Kmr"]),
                                NetAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmt"]),
                                TotalTyresAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreCostAmt"]),
                            });
                        }

                        tyrePurchaseMasterList.TyreList = tyrePurchaseslist;

                        tyrePurchaseMasterList.PageMetaData = new PaginationMetaData
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
            return tyrePurchaseMasterList;
        }
        public async Task<ResponseModel> GetTyreActivatedRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",         1),
                            new SqlParameter("@PageSize",           1000),
                            new SqlParameter("@SortColumn",         request.SortColumn),
                            new SqlParameter("@SortOrder",          request.SortOrder),
                            new SqlParameter("@Search",             request.Search),
                            new SqlParameter("@FromDate",           request.FromDate),
                            new SqlParameter("@ToDate",             request.ToDate),
                            new SqlParameter("@VehicleMasterId",    request.FilterStr),
                            new SqlParameter("@BrandID",            request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreActivationRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        DataTable dt = dataSet.Tables[0];

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            response = await sharedRepository.GetCompanyDetail();

                            int colcnt = 12;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = response.Message;
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
                            ws.Range(3, 1, 3, colcnt).Value = "Tyre Activation Report";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = "";
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Cell(5, 1).Value = "Branch";
                            ws.Cell(5, 2).Value = "Activate Date";
                            ws.Cell(5, 3).Value = "Ref No";
                            ws.Cell(5, 4).Value = "Vehicle No";
                            ws.Cell(5, 5).Value = "Tyre No";
                            ws.Cell(5, 6).Value = "Brand";
                            ws.Cell(5, 7).Value = "Tyre Position";
                            ws.Cell(5, 8).Value = "Fitted By";
                            ws.Cell(5, 9).Value = "Inspected By";
                            ws.Cell(5, 10).Value = "KMR";
                            ws.Cell(5, 11).Value = "Net Amt";
                            ws.Cell(5, 12).Value = "Tyres Amt";

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int j = 0;
                            int row = 6;

                            for (j = 0; j < dt.Rows.Count; j++)
                            {
                                ws.Cell(row, 1).Value = dt.Rows[j]["BranchName"].ToString();
                                ws.Cell(row, 2).Value = dt.Rows[j]["ActivateDate"].ToString();
                                ws.Cell(row, 3).Value = dt.Rows[j]["RefNo"].ToString();
                                ws.Cell(row, 4).Value = dt.Rows[j]["VehicleNo"].ToString();
                                ws.Cell(row, 5).Value = dt.Rows[j]["TyreNo"].ToString();
                                ws.Cell(row, 6).Value = dt.Rows[j]["BrandName"].ToString();
                                ws.Cell(row, 7).Value = dt.Rows[j]["TyrePosition"].ToString();
                                ws.Cell(row, 8).Value = dt.Rows[j]["FittedBy"].ToString();
                                ws.Cell(row, 9).Value = dt.Rows[j]["InspectedBy"].ToString();
                                ws.Cell(row, 10).Value = dt.Rows[j]["Kmr"].ToString();
                                ws.Cell(row, 11).Value = dt.Rows[j]["NetAmt"].ToString();
                                ws.Cell(row, 12).Value = dt.Rows[j]["TyreCostAmt"].ToString();

                                row++;
                            }
                            for (int k = 1; k <= colcnt; k++)
                            {
                                ws.Column(k).AdjustToContents();
                            }

                            ws.Range(5, 1, row - 1, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, row - 1, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("Reports", "Download");
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

                            response.Status = true;
                            response.Message = filename;

                        }
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
        public async Task<TyreMgntReportList> GetTyreDeActivatedRptList(ReportRequestModel request)
        {
            TyreMgntReportList tyrePurchaseMasterList = new();
            List<TyreMgntReportModel> tyrePurchaseslist = new();
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
                            new SqlParameter("@VehicleMasterId",    request.FilterStr),
                            new SqlParameter("@BrandID",            request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreDeActivationRptList", param);
                    int totalRecords = 0;
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tyrePurchaseslist.Add(new TyreMgntReportModel
                            {
                                BranchName = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchName"]),
                                PurchaseDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DeActivateDate"]),
                                RefNo = Convert.ToString(dataSet.Tables[0].Rows[i]["RefNo"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                TyreNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreNo"]),
                                BrandName = Convert.ToString(dataSet.Tables[0].Rows[i]["BrandName"]),
                                RemovedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["RemovedBy"]),
                                InspectedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["InspectedBy"]),
                                Kmr = Convert.ToString(dataSet.Tables[0].Rows[i]["Kmr"]),
                                UsableAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["UsableAmount"]),
                                RemoveStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["RemoveStatus"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                            });
                        }

                        tyrePurchaseMasterList.TyreList = tyrePurchaseslist;

                        tyrePurchaseMasterList.PageMetaData = new PaginationMetaData
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
            return tyrePurchaseMasterList;
        }
        public async Task<ResponseModel> GetTyreDeActivatedRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",         1),
                            new SqlParameter("@PageSize",           1000),
                            new SqlParameter("@SortColumn",         request.SortColumn),
                            new SqlParameter("@SortOrder",          request.SortOrder),
                            new SqlParameter("@Search",             request.Search),
                            new SqlParameter("@FromDate",           request.FromDate),
                            new SqlParameter("@ToDate",             request.ToDate),
                            new SqlParameter("@VehicleMasterId",    request.FilterStr),
                            new SqlParameter("@BrandID",            request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreDeActivationRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        DataTable dt = dataSet.Tables[0];

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            response = await sharedRepository.GetCompanyDetail();

                            int colcnt = 12;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = response.Message;
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
                            ws.Range(3, 1, 3, colcnt).Value = "Tyre DeActivation Report";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = "";
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Cell(5, 1).Value = "Branch";
                            ws.Cell(5, 2).Value = "Deactivate Date";
                            ws.Cell(5, 3).Value = "Ref No";
                            ws.Cell(5, 4).Value = "Vehicle No";
                            ws.Cell(5, 5).Value = "Tyre No";
                            ws.Cell(5, 6).Value = "Brand";
                            ws.Cell(5, 7).Value = "Removed By";
                            ws.Cell(5, 8).Value = "Inspected By";
                            ws.Cell(5, 9).Value = "KMR";
                            ws.Cell(5, 10).Value = "Usable Amt";
                            ws.Cell(5, 11).Value = "Remove Status";
                            ws.Cell(5, 12).Value = "Remarks";

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int j = 0;
                            int row = 6;

                            for (j = 0; j < dt.Rows.Count; j++)
                            {
                                ws.Cell(row, 1).Value = dt.Rows[j]["BranchName"].ToString();
                                ws.Cell(row, 2).Value = dt.Rows[j]["DeActivateDate"].ToString();
                                ws.Cell(row, 3).Value = dt.Rows[j]["RefNo"].ToString();
                                ws.Cell(row, 4).Value = dt.Rows[j]["VehicleNo"].ToString();
                                ws.Cell(row, 5).Value = dt.Rows[j]["TyreNo"].ToString();
                                ws.Cell(row, 6).Value = dt.Rows[j]["BrandName"].ToString();
                                ws.Cell(row, 7).Value = dt.Rows[j]["RemovedBy"].ToString();
                                ws.Cell(row, 8).Value = dt.Rows[j]["InspectedBy"].ToString();
                                ws.Cell(row, 9).Value = dt.Rows[j]["Kmr"].ToString();
                                ws.Cell(row, 10).Value = dt.Rows[j]["UsableAmount"].ToString();
                                ws.Cell(row, 11).Value = dt.Rows[j]["RemoveStatus"].ToString();
                                ws.Cell(row, 12).Value = dt.Rows[j]["Remarks"].ToString();

                                row++;
                            }
                            for (int k = 1; k <= colcnt; k++)
                            {
                                ws.Column(k).AdjustToContents();
                            }

                            ws.Range(5, 1, row - 1, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, row - 1, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("Reports", "Download");
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

                            response.Status = true;
                            response.Message = filename;

                        }
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
        public async Task<TyreMgntReportList> GetTyreReGroupIssRptList(ReportRequestModel request)
        {
            TyreMgntReportList tyrePurchaseMasterList = new();
            List<TyreMgntReportModel> tyrePurchaseslist = new();
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
                            new SqlParameter("@VendorId",           request.FilterStr),
                            new SqlParameter("@BrandID",            request.FilterStr1),
                            new SqlParameter("@TyreRecdStatus",     request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreReGroupIssRptList", param);
                    int totalRecords = 0;
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tyrePurchaseslist.Add(new TyreMgntReportModel
                            {
                                BranchName = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchName"]),
                                PurchaseDate = Convert.ToString(dataSet.Tables[0].Rows[i]["RegroupIssDate"]),
                                IssueIncharge = Convert.ToString(dataSet.Tables[0].Rows[i]["IssueIncharge"]),
                                VendorName = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorName"]),
                                TyreNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreNo"]),
                                BrandName = Convert.ToString(dataSet.Tables[0].Rows[i]["BrandName"]),
                                UsableAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreUsableAmt"]),
                                TyreStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreRecdStatus"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                            });
                        }

                        tyrePurchaseMasterList.TyreList = tyrePurchaseslist;

                        tyrePurchaseMasterList.PageMetaData = new PaginationMetaData
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
            return tyrePurchaseMasterList;
        }
        public async Task<ResponseModel> GetTyreReGroupIssRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",         1),
                            new SqlParameter("@PageSize",           1000),
                            new SqlParameter("@SortColumn",         request.SortColumn),
                            new SqlParameter("@SortOrder",          request.SortOrder),
                            new SqlParameter("@Search",             request.Search),
                            new SqlParameter("@FromDate",           request.FromDate),
                            new SqlParameter("@ToDate",             request.ToDate),
                            new SqlParameter("@VendorId",           request.FilterStr),
                            new SqlParameter("@BrandID",            request.FilterStr1),
                            new SqlParameter("@TyreRecdStatus",     request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreReGroupIssRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        DataTable dt = dataSet.Tables[0];

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            response = await sharedRepository.GetCompanyDetail();

                            int colcnt = 9;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = response.Message;
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
                            ws.Range(3, 1, 3, colcnt).Value = "Tyre Regroup Issued Report";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = "";
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Cell(5, 1).Value = "Branch";
                            ws.Cell(5, 2).Value = "Regroup Issue Date";
                            ws.Cell(5, 3).Value = "Issue Incharge";
                            ws.Cell(5, 4).Value = "Vendor Name";
                            ws.Cell(5, 5).Value = "Tyre No";
                            ws.Cell(5, 6).Value = "Brand";
                            ws.Cell(5, 7).Value = "Tyre Usable Amt";
                            ws.Cell(5, 8).Value = "Tyre Recd Status";
                            ws.Cell(5, 9).Value = "Remarks";

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int j = 0;
                            int row = 6;
                            var VehicleNo = "";

                            for (j = 0; j < dt.Rows.Count; j++)
                            {
                                ws.Cell(row, 1).Value = dt.Rows[j]["BranchName"].ToString();
                                ws.Cell(row, 2).Value = dt.Rows[j]["RegroupIssDate"].ToString();
                                ws.Cell(row, 3).Value = dt.Rows[j]["IssueIncharge"].ToString();
                                ws.Cell(row, 4).Value = dt.Rows[j]["VendorName"].ToString();
                                ws.Cell(row, 5).Value = dt.Rows[j]["TyreNo"].ToString();
                                ws.Cell(row, 6).Value = dt.Rows[j]["BrandName"].ToString();
                                ws.Cell(row, 7).Value = dt.Rows[j]["TyreUsableAmt"].ToString();
                                ws.Cell(row, 8).Value = dt.Rows[j]["TyreRecdStatus"].ToString();
                                ws.Cell(row, 9).Value = dt.Rows[j]["Remarks"].ToString();

                                row++;
                            }
                            for (int k = 1; k <= colcnt; k++)
                            {
                                ws.Column(k).AdjustToContents();
                            }

                            ws.Range(5, 1, row - 1, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, row - 1, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("Reports", "Download");
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

                            response.Status = true;
                            response.Message = filename;

                        }
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
        public async Task<TyreMgntReportList> GetTyreReGroupRcvdRptList(ReportRequestModel request)
        {
            TyreMgntReportList tyrePurchaseMasterList = new();
            List<TyreMgntReportModel> tyrePurchaseslist = new();
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
                            new SqlParameter("@VendorId",           request.FilterStr),
                            new SqlParameter("@BrandID",            request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreReGroupRcvdRptList", param);
                    int totalRecords = 0;
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tyrePurchaseslist.Add(new TyreMgntReportModel
                            {
                                BranchName = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchName"]),
                                PurchaseDate = Convert.ToString(dataSet.Tables[0].Rows[i]["RecdDate"]),
                                VendorName = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorName"]),
                                VendorInvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorBillNo"]),
                                VendorInvDt = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorBillDt"]),
                                TyreNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreNo"]),
                                BrandName = Convert.ToString(dataSet.Tables[0].Rows[i]["BrandName"]),
                                RegroupAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["RegroupAmount"]),
                                RegroupDoneYN = Convert.ToString(dataSet.Tables[0].Rows[i]["RegroupDoneYN"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                            });
                        }

                        tyrePurchaseMasterList.TyreList = tyrePurchaseslist;

                        tyrePurchaseMasterList.PageMetaData = new PaginationMetaData
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
            return tyrePurchaseMasterList;
        }
        public async Task<ResponseModel> GetTyreReGroupRcvdRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",         1),
                            new SqlParameter("@PageSize",           1000),
                            new SqlParameter("@SortColumn",         request.SortColumn),
                            new SqlParameter("@SortOrder",          request.SortOrder),
                            new SqlParameter("@Search",             request.Search),
                            new SqlParameter("@FromDate",           request.FromDate),
                            new SqlParameter("@ToDate",             request.ToDate),
                            new SqlParameter("@VendorId",           request.FilterStr),
                            new SqlParameter("@BrandID",            request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreReGroupRcvdRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        DataTable dt = dataSet.Tables[0];

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            response = await sharedRepository.GetCompanyDetail();

                            int colcnt = 10;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = response.Message;
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
                            ws.Range(3, 1, 3, colcnt).Value = "Tyre Regroup Recvd Report";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = "";
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Cell(5, 1).Value = "Branch";
                            ws.Cell(5, 2).Value = "Regroup Recd Date";
                            ws.Cell(5, 3).Value = "Vendor Name";
                            ws.Cell(5, 4).Value = "Vendor Bill No";
                            ws.Cell(5, 5).Value = "Vendor Bill Date";
                            ws.Cell(5, 6).Value = "Tyre No";
                            ws.Cell(5, 7).Value = "Brand";
                            ws.Cell(5, 8).Value = "Regroup Amount";
                            ws.Cell(5, 9).Value = "Regroup Done YN";
                            ws.Cell(5, 10).Value = "Remarks";

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int j = 0;
                            int row = 6;

                            for (j = 0; j < dt.Rows.Count; j++)
                            {
                                ws.Cell(row, 1).Value = dt.Rows[j]["BranchName"].ToString();
                                ws.Cell(row, 2).Value = dt.Rows[j]["RecdDate"].ToString();
                                ws.Cell(row, 3).Value = dt.Rows[j]["VendorName"].ToString();
                                ws.Cell(row, 4).Value = dt.Rows[j]["VendorBillNo"].ToString();
                                ws.Cell(row, 5).Value = dt.Rows[j]["VendorBillDt"].ToString();
                                ws.Cell(row, 6).Value = dt.Rows[j]["TyreNo"].ToString();
                                ws.Cell(row, 7).Value = dt.Rows[j]["BrandName"].ToString();
                                ws.Cell(row, 8).Value = dt.Rows[j]["RegroupAmount"].ToString();
                                ws.Cell(row, 9).Value = dt.Rows[j]["RegroupDoneYN"].ToString();
                                ws.Cell(row, 10).Value = dt.Rows[j]["Remarks"].ToString();

                                row++;
                            }
                            for (int k = 1; k <= colcnt; k++)
                            {
                                ws.Column(k).AdjustToContents();
                            }

                            ws.Range(5, 1, row - 1, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, row - 1, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("Reports", "Download");
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

                            response.Status = true;
                            response.Message = filename;

                        }
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
        public async Task<TyreMgntReportList> GetTyreHistoryRptList(RequestModel request)
        {
            TyreMgntReportList tyrePurchaseMasterList = new();
            List<TyreMgntReportModel> tyrePurchaseslist = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TyreNo" ,    request.strRequest),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreHistoryRpt", param);
                    int totalRecords = 0;
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tyrePurchaseslist.Add(new TyreMgntReportModel
                            {
                                TyreNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreNo"]),
                                BrandName = Convert.ToString(dataSet.Tables[0].Rows[i]["BrandName"]),
                                PurchaseDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                TyreStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreStatus"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                Kmr = Convert.ToString(dataSet.Tables[0].Rows[i]["EstLifeKM"]),
                                TyreRunKM = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreRunKM"]),
                            });
                        }

                        tyrePurchaseMasterList.TyreList = tyrePurchaseslist;

                        tyrePurchaseMasterList.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = 100
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return tyrePurchaseMasterList;
        }
        public async Task<ResponseModel> GetTyreHistoryRptExcel(RequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TyreNo" ,    request.strRequest),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreHistoryRpt", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        DataTable dt = dataSet.Tables[0];

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            response = await sharedRepository.GetCompanyDetail();

                            int colcnt = 4;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = response.Message;
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
                            ws.Range(3, 1, 3, colcnt).Value = "Tyre History Report";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;


                            ws.Range(4, 1, 4, 2).Merge();
                            ws.Range(4, 1, 4, 2).Value = "Tyre No: " + Convert.ToString(dataSet.Tables[0].Rows[0]["TyreNo"]);

                            ws.Range(4, 3, 4, 4).Merge();
                            ws.Range(4, 3, 4, 4).Value = "Brand: " + Convert.ToString(dataSet.Tables[0].Rows[0]["BrandName"]);

                            ws.Range(5, 1, 5, 2).Merge();
                            ws.Range(5, 1, 5, 2).Value = "Est Life KM: " + Convert.ToString(dataSet.Tables[0].Rows[0]["EstLifeKM"]);

                            ws.Range(5, 3, 5, 4).Merge();
                            ws.Range(5, 3, 5, 4).Value = "Tyre Run KM: " + Convert.ToString(dataSet.Tables[0].Rows[0]["TyreRunKM"]);


                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 4, colcnt).Style.Font.FontSize = 12;

                            ws.Cell(6, 1).Value = "Trans Date";
                            ws.Cell(6, 2).Value = "Tyre Status";
                            ws.Range(6, 3, 5, colcnt).Merge();
                            ws.Range(6, 3, 5, colcnt).Value = "Vehicle No";

                            ws.Range(6, 1, 6, colcnt).Style.Font.Bold = true;
                            ws.Range(6, 1, 6, colcnt).Style.Font.FontSize = 12;
                            ws.Range(6, 1, 6, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int j = 0;
                            int row = 7;

                            for (j = 0; j < dt.Rows.Count; j++)
                            {
                                ws.Cell(row, 1).Value = dt.Rows[j]["TransDate"].ToString();
                                ws.Cell(row, 2).Value = dt.Rows[j]["TyreStatus"].ToString();
                                ws.Range(row, 3, row, colcnt).Merge();
                                ws.Range(row, 3, row, colcnt).Value = dt.Rows[j]["VehicleNo"].ToString();

                                row++;
                            }
                            for (int k = 1; k <= colcnt; k++)
                            {
                                ws.Column(k).AdjustToContents();
                            }

                            ws.Range(6, 1, row - 1, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(6, 1, row - 1, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("Reports", "Download");
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

                            response.Status = true;
                            response.Message = filename;

                        }
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
        public async Task<TyreMgntReportList> GetTyreStockRptList(ReportRequestModel request)
        {
            TyreMgntReportList tyrePurchaseMasterList = new();
            List<TyreMgntReportModel> tyrePurchaseslist = new();
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
                            new SqlParameter("@BrandId",            request.FilterStr),
                            new SqlParameter("@RptType" ,           request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreStockRptList", param);
                    int totalRecords = 0;
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tyrePurchaseslist.Add(new TyreMgntReportModel
                            {
                                TyreNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreNo"]),
                                BrandName = Convert.ToString(dataSet.Tables[0].Rows[i]["BrandName"]),
                                PurchaseDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CurrentStatusDate"]),
                                TyreStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["CurrentTyreStatus"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                            });
                        }

                        tyrePurchaseMasterList.TyreList = tyrePurchaseslist;

                        tyrePurchaseMasterList.PageMetaData = new PaginationMetaData
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
            return tyrePurchaseMasterList;
        }
        public async Task<ResponseModel> GetTyreStockRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@BrandId",            request.FilterStr),
                            new SqlParameter("@RptType" ,           request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreStockRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        DataTable dt = dataSet.Tables[0];

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            response = await sharedRepository.GetCompanyDetail();

                            int colcnt = 0;
                            if (request.FilterStr1 == "N")
                            {
                                colcnt = 5;
                            }
                            else
                            {
                                colcnt = 7;
                            }

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = response.Message;
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
                            ws.Range(3, 1, 3, colcnt).Value = "Tyre Stock Report";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = "";
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            if (request.FilterStr1 == "N")
                            {
                                ws.Cell(5, 1).Value = "Tyre No";
                                ws.Cell(5, 2).Value = "Brand";
                                ws.Cell(5, 3).Value = "Last Status Date";
                                ws.Cell(5, 4).Value = "Last Status"; ;
                                ws.Cell(5, 5).Value = "Last Vehicle No";
                            }
                            else
                            {
                                ws.Cell(5, 1).Value = "Tyre No";
                                ws.Cell(5, 2).Value = "Brand";
                                ws.Cell(5, 3).Value = "Last Status Date";
                                ws.Cell(5, 4).Value = "Last Status"; ;
                                ws.Cell(5, 5).Value = "Last Vehicle No";
                                ws.Cell(5, 6).Value = "Regroup Recd Date";
                                ws.Cell(5, 7).Value = "Regroup Amount";
                            }

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int j = 0;
                            int row = 6;
                            var BrandName = "";

                            for (j = 0; j < dt.Rows.Count; j++)
                            {
                                if (BrandName != dt.Rows[j]["BrandName"].ToString())
                                {
                                    ws.Range(row, 1, row, colcnt).Merge();
                                    ws.Range(row, 1, row, colcnt).Value = dt.Rows[j]["BrandName"].ToString();
                                    ws.Range(row, 1, row, colcnt).Style.Font.FontColor = XLColor.Red;
                                    row++;

                                    BrandName = dt.Rows[j]["BrandName"].ToString();
                                }
                                if (request.FilterStr1 == "N")
                                {
                                    ws.Cell(row, 1).Value = dt.Rows[j]["TyreNo"].ToString();
                                    ws.Cell(row, 2).Value = dt.Rows[j]["BrandName"].ToString();
                                    ws.Cell(row, 3).Value = dt.Rows[j]["CurrentStatusDate"].ToString();
                                    ws.Cell(row, 4).Value = dt.Rows[j]["CurrentTyreStatus"].ToString();
                                    ws.Cell(row, 5).Value = dt.Rows[j]["VehicleNo"].ToString();
                                }
                                else
                                {
                                    ws.Cell(row, 1).Value = dt.Rows[j]["TyreNo"].ToString();
                                    ws.Cell(row, 2).Value = dt.Rows[j]["BrandName"].ToString();
                                    ws.Cell(row, 3).Value = dt.Rows[j]["CurrentStatusDate"].ToString();
                                    ws.Cell(row, 4).Value = dt.Rows[j]["CurrentTyreStatus"].ToString();
                                    ws.Cell(row, 5).Value = dt.Rows[j]["VehicleNo"].ToString();
                                    ws.Cell(row, 6).Value = dt.Rows[j]["RecdDate"].ToString();
                                    ws.Cell(row, 7).Value = dt.Rows[j]["RegroupAmount"].ToString();
                                }
                                row++;
                            }
                            for (int k = 1; k <= colcnt; k++)
                            {
                                ws.Column(k).AdjustToContents();
                            }

                            ws.Range(5, 1, row - 1, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, row - 1, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("Reports", "Download");
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

                            response.Status = true;
                            response.Message = filename;

                        }
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
        public async Task<SparesPurchaseRptListModel> GetSparesPurchaseRptList(ReportRequestModel request)
        {
            SparesPurchaseRptListModel sparesPurchaseRpt = new();
            List<SparesPurchaseRptModel> sparesPurchaseRptList = new();
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
                            new SqlParameter("@RptType",          request.FilterStr1),

                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getSparesPurchaseRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            sparesPurchaseRptList.Add(new SparesPurchaseRptModel
                            {
                                BranchName = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchName"]),
                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                VendorName = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorName"]),
                                VendorInvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvNo"]),
                                VendorGstNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorGstNo"]),
                                GstType = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                ItemAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["ItemAmount"]),
                                TotBillAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotBillAmt"]),
                            });
                        }

                        sparesPurchaseRpt.SparesPurchaseRptList = sparesPurchaseRptList;

                        sparesPurchaseRpt.PageMetaData = new PaginationMetaData
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
            return sparesPurchaseRpt;
        }
        public async Task<ResponseModel> GetSparesPurchaseRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@RptType",          request.FilterStr),

                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getSparesPurchaseRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Statement From " + request.FromDate + " To " + request.ToDate;

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Spares Purchase Report", filter);

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
        public async Task<SparesStockRptListModel> GetSparesStockRptList(ReportRequestModel request)
        {
            SparesStockRptListModel sparesStockRptListModel = new();
            List<SparesStockRptModel> sparesStockRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@RptType",    request.FilterStr1),

                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getSparesStockRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            sparesStockRptList.Add(new SparesStockRptModel
                            {
                                SpareLubName = Convert.ToString(dataSet.Tables[0].Rows[i]["SpareLubName"]),
                                OpeningQty = Convert.ToString(dataSet.Tables[0].Rows[i]["OpeningQty"]),
                                PurchQty = Convert.ToString(dataSet.Tables[0].Rows[i]["PurchQty"]),
                                IssueQty = Convert.ToString(dataSet.Tables[0].Rows[i]["IssueQty"]),
                            });
                        }

                        sparesStockRptListModel.SparesStockRptList = sparesStockRptList;

                        sparesStockRptListModel.PageMetaData = new PaginationMetaData
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
            return sparesStockRptListModel;
        }
        public async Task<ResponseModel> GetSparesStockRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {

                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@RptType",    request.FilterStr1),

                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getSparesStockRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "";

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Spares Stock Report", filter);
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
        public async Task<SparesHistoryRptListModel> GetSparesUsageHistoryRptList(ReportRequestModel request)
        {
            SparesHistoryRptListModel sparesStockRptListModel = new();
            List<SparesHistoryRptModel> sparesStockRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@RptType",    request.FilterStr1),
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getSparesIssueRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            sparesStockRptList.Add(new SparesHistoryRptModel
                            {
                                SpareLubName = Convert.ToString(dataSet.Tables[0].Rows[i]["SpareLubName"]),
                                BrandName = Convert.ToString(dataSet.Tables[0].Rows[i]["BrandName"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                StockType = Convert.ToString(dataSet.Tables[0].Rows[i]["StockType"]),
                                KmReading = Convert.ToString(dataSet.Tables[0].Rows[i]["KmReading"]),
                                ItemQty = Convert.ToString(dataSet.Tables[0].Rows[i]["ItemQty"]),
                                NetAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmount"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                            });
                        }

                        sparesStockRptListModel.SparessHistoryRptList = sparesStockRptList;

                        sparesStockRptListModel.PageMetaData = new PaginationMetaData
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
            return sparesStockRptListModel;
        }
        public async Task<ResponseModel> GetSparesUsageHistoryRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {

                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@RptType",    request.FilterStr1),

                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getSparesIssueRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "";

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Spares Usage History Report", filter);
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
    }












}
