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
        public async Task<TyrePurchaseMasterList> GetTyrePurchaseRptList(ReportRequestModel request)
        {
            TyrePurchaseMasterList tyrePurchaseMasterList = new();
            List<TyrePurchaseMasterModel> tyrePurchaseslist = new();
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
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyrePurchaseRptList", param);
                    int totalRecords = 0;
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tyrePurchaseslist.Add(new TyrePurchaseMasterModel
                            {
                                VendorName  = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorName"]),
                                VendorInvDt = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvDt"]),
                                VendorInvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvNo"]),
                                NetAmount   = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmount"]),                           
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
                            new SqlParameter("@FromDate",           request.FromDate),
                            new SqlParameter("@ToDate",             request.ToDate),
                            new SqlParameter("@VendorId",           request.FilterStr),
                            new SqlParameter("@RptType" ,           request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyrePurchaseRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        DataTable dt = dataSet.Tables[0];

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            response = await sharedRepository.GetCompanyDetail();

                            int colcnt = dt.Columns.Count-1;

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
                                ws.Cell(5, 1).Value = "Date";
                                ws.Cell(5, 2).Value = "Invoice No";
                                ws.Cell(5, 3).Value = "Amount";
                            }
                            else
                            {
                                ws.Cell(5, 1).Value = "Date";
                                ws.Cell(5, 2).Value = "Invoice No";
                                ws.Cell(5, 3).Value = "Tyre No";
                                ws.Cell(5, 4).Value = "Brand";
                                ws.Cell(5, 5).Value = "Amount";
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
                                    ws.Cell(row, 1).Value = dt.Rows[j]["VendorInvDt"].ToString();
                                    ws.Cell(row, 2).Value = dt.Rows[j]["VendorInvNo"].ToString();
                                    ws.Cell(row, 3).Value = dt.Rows[j]["NetAmount"].ToString();
                                }
                                else
                                {
                                    ws.Cell(row, 1).Value = dt.Rows[j]["VendorInvDt"].ToString();
                                    ws.Cell(row, 2).Value = dt.Rows[j]["VendorInvNo"].ToString();
                                    ws.Cell(row, 3).Value = dt.Rows[j]["TyreNo"].ToString();
                                    ws.Cell(row, 4).Value = dt.Rows[j]["Brand"].ToString();
                                    ws.Cell(row, 5).Value = dt.Rows[j]["NetAmount"].ToString();
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
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<TyreMasterList> GetTyreStockRptList(ReportRequestModel request)
        {
            TyreMasterList tyrePurchaseMasterList = new();
            List<TyrePurchaseDtlListmodel> tyrePurchaseslist = new();
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
                            tyrePurchaseslist.Add(new TyrePurchaseDtlListmodel
                            {
                                TyreNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreNo"]),
                                BrandID = Convert.ToString(dataSet.Tables[0].Rows[i]["BrandName"]),
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
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<TyreMasterList> GetTyreHistoryRptList(RequestModel request)
        {
            TyreMasterList tyrePurchaseMasterList = new();
            List<TyrePurchaseDtlListmodel> tyrePurchaseslist = new();
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
                            tyrePurchaseslist.Add(new TyrePurchaseDtlListmodel
                            {
                                TyreNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreNo"]),
                                PurchaseDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                TyrePattern = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreStatus"]),
                                TyreModel = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                BrandID = Convert.ToString(dataSet.Tables[0].Rows[i]["BrandName"]),
                                EstLifeKM = Convert.ToString(dataSet.Tables[0].Rows[i]["KM"]),
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
