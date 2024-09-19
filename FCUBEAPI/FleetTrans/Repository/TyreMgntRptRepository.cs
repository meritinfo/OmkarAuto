using ClosedXML.Excel;
using FleetTrans.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using Shared.Repository;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public class TyreMgntRptRepository : ITyreMgntRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public TyreMgntRptRepository(IOptions<DBModel> _dbconnection, 
            ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
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
                                BranchName      = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchName"]),
                                PurchaseDate    = Convert.ToString(dataSet.Tables[0].Rows[i]["PurchaseDate"]),
                                PurchaseType    = Convert.ToString(dataSet.Tables[0].Rows[i]["PurchaseType"]),
                                VendorName      = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorName"]),
                                VendorInvDt     = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvDt"]),
                                VendorInvNo     = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvNo"]),
                                TotalTyresAmt   = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalTyresAmt"]),
                                TotalSgstAmt    = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalSgstAmt"]),
                                TotalCgstAmt    = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalCgstAmt"]),
                                TotalIgstAmt    = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalIgstAmt"]),
                                NetAmount       = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmount"]),                           
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
                            if (request.FilterStr1=="S")
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

                            if (request.FilterStr1=="S")
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
                                if(VendorName !=  dt.Rows[j]["VendorName"].ToString())
                                {
                                    ws.Range(row, 1, row, colcnt).Merge();
                                    ws.Range(row, 1, row, colcnt).Value = dt.Rows[j]["VendorName"].ToString();
                                    ws.Range(row, 1, row, colcnt).Style.Font.FontColor = XLColor.Red;
                                    row ++;

                                    VendorName = dt.Rows[j]["VendorName"].ToString();
                                }
                                if (request.FilterStr1=="S")
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

                            ws.Range(5, 1, row-1, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, row-1, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

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
                            new SqlParameter("@BrandId",    request.FilterStr),
                            new SqlParameter("@RptType" ,   request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreStockRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        DataTable dt = dataSet.Tables[0];

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            response = await sharedRepository.GetCompanyDetail();

                            int colcnt = dt.Columns.Count - 1;

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
                            ws.Range(4, 1, 4, colcnt).Value = "" ;
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            if (request.FilterStr1 == "N")
                            {
                                ws.Cell(5, 1).Value = "Tyre No";
                            }
                            else
                            {
                                ws.Cell(5, 1).Value = "Tyre No";
                                ws.Cell(5, 2).Value = "Date";
                                ws.Cell(5, 3).Value = "Amount";
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
                                }
                                else
                                {
                                    ws.Cell(row, 1).Value = dt.Rows[j]["TyreNo"].ToString();
                                    ws.Cell(row, 2).Value = dt.Rows[j]["RecdDate"].ToString();
                                    ws.Cell(row, 3).Value = dt.Rows[j]["RegroupAmount"].ToString();
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
                                PurchaseDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                TyreStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreStatus"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                BrandName = Convert.ToString(dataSet.Tables[0].Rows[i]["BrandName"]),
                                Kmr = Convert.ToString(dataSet.Tables[0].Rows[i]["KM"]),
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

                            int colcnt = dt.Columns.Count - 1;

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

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = "";
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                          
                            ws.Cell(5, 1).Value = "Trans Date";
                            ws.Cell(5, 2).Value = "Vehicle No";
                            ws.Cell(5, 3).Value = "Tyre Status";
                            ws.Cell(5, 4).Value = "Brand Name";
                            ws.Cell(5, 5).Value = "KM";

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int j = 0;
                            int row = 6;

                            for (j = 0; j < dt.Rows.Count; j++)
                            {
                                ws.Cell(row, 1).Value = dt.Rows[j]["TransDate"].ToString();
                                ws.Cell(row, 2).Value = dt.Rows[j]["VehicleNo"].ToString();
                                ws.Cell(row, 3).Value = dt.Rows[j]["TyreStatus"].ToString();
                                ws.Cell(row, 4).Value = dt.Rows[j]["BrandName"].ToString();
                                ws.Cell(row, 5).Value = dt.Rows[j]["KM"].ToString();

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
                                TyreModel = Convert.ToString(dataSet.Tables[0].Rows[i]["CurrentVehicleNo"]),
                                TyreNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreNo"]),
                                PurchaseDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CurrentStatusDate"]),
                                BrandName = Convert.ToString(dataSet.Tables[0].Rows[i]["BrandName"]),
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

                            int colcnt = 3;

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
                            ws.Cell(5, 2).Value = "Activate Date";
                            ws.Cell(5, 3).Value = "Brand";

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
                                ws.Cell(row, 2).Value = dt.Rows[j]["CurrentStatusDate"].ToString();
                                ws.Cell(row, 3).Value = dt.Rows[j]["BrandName"].ToString();

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
                                ws.Cell(row, 1).Value  = dt.Rows[j]["BranchName"].ToString();
                                ws.Cell(row, 2).Value  = dt.Rows[j]["ActivateDate"].ToString();
                                ws.Cell(row, 3).Value  = dt.Rows[j]["RefNo"].ToString();
                                ws.Cell(row, 4).Value  = dt.Rows[j]["VehicleNo"].ToString();
                                ws.Cell(row, 5).Value  = dt.Rows[j]["TyreNo"].ToString();
                                ws.Cell(row, 6).Value  = dt.Rows[j]["BrandName"].ToString();
                                ws.Cell(row, 7).Value  = dt.Rows[j]["TyrePosition"].ToString();
                                ws.Cell(row, 8).Value  = dt.Rows[j]["FittedBy"].ToString();
                                ws.Cell(row, 9).Value  = dt.Rows[j]["InspectedBy"].ToString();
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
                                Remarks= Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
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
                                ws.Cell(row, 1).Value  = dt.Rows[j]["BranchName"].ToString();
                                ws.Cell(row, 2).Value  = dt.Rows[j]["DeActivateDate"].ToString();
                                ws.Cell(row, 3).Value  = dt.Rows[j]["RefNo"].ToString();
                                ws.Cell(row, 4).Value  = dt.Rows[j]["VehicleNo"].ToString();
                                ws.Cell(row, 5).Value  = dt.Rows[j]["TyreNo"].ToString();
                                ws.Cell(row, 6).Value  = dt.Rows[j]["BrandName"].ToString();
                                ws.Cell(row, 7).Value  = dt.Rows[j]["RemovedBy"].ToString();
                                ws.Cell(row, 8).Value  = dt.Rows[j]["InspectedBy"].ToString();
                                ws.Cell(row, 9).Value  = dt.Rows[j]["Kmr"].ToString();
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
                                TyreNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreNo"]),
                                PurchaseDate = Convert.ToString(dataSet.Tables[0].Rows[i]["RegroupIssDate"]),
                                BrandName = Convert.ToString(dataSet.Tables[0].Rows[i]["BrandName"]),
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
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreReGroupIssRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        DataTable dt = dataSet.Tables[0];

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            response = await sharedRepository.GetCompanyDetail();

                            int colcnt = 3;

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

                            ws.Cell(5, 1).Value = "Tyre No";
                            ws.Cell(5, 2).Value = "Regroup Issued Date";
                            ws.Cell(5, 3).Value = "Brand";

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int j = 0;
                            int row = 6;
                            var VehicleNo = "";

                            for (j = 0; j < dt.Rows.Count; j++)
                            {
                                ws.Cell(row, 1).Value = dt.Rows[j]["TyreNo"].ToString();
                                ws.Cell(row, 2).Value = dt.Rows[j]["RegroupIssDate"].ToString();
                                ws.Cell(row, 3).Value = dt.Rows[j]["BrandName"].ToString();

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
                                TyreNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreNo"]),
                                PurchaseDate = Convert.ToString(dataSet.Tables[0].Rows[i]["RecdDate"]),
                                TyreModel = Convert.ToString(dataSet.Tables[0].Rows[i]["RegroupDoneYN"]),
                                BrandName = Convert.ToString(dataSet.Tables[0].Rows[i]["BrandName"]),
                                RegroupAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["RegroupAmount"]),
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
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreReGroupRcvdRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        DataTable dt = dataSet.Tables[0];

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            response = await sharedRepository.GetCompanyDetail();

                            int colcnt = 5;

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

                            ws.Cell(5, 1).Value = "Tyre No";
                            ws.Cell(5, 2).Value = "Recd Date";
                            ws.Cell(5, 3).Value = "Regroup Done YN";
                            ws.Cell(5, 4).Value = "Brand";
                            ws.Cell(5, 5).Value = "Regroup Amount";

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int j = 0;
                            int row = 6;
                            var VehicleNo = "";

                            for (j = 0; j < dt.Rows.Count; j++)
                            {
                                ws.Cell(row, 1).Value = dt.Rows[j]["TyreNo"].ToString();
                                ws.Cell(row, 2).Value = dt.Rows[j]["RecdDate"].ToString();
                                ws.Cell(row, 3).Value = dt.Rows[j]["RegroupDoneYN"].ToString();
                                ws.Cell(row, 4).Value = dt.Rows[j]["BrandName"].ToString();
                                ws.Cell(row, 5).Value = dt.Rows[j]["RegroupAmount"].ToString();

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

    }
}
