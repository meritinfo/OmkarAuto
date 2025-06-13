using Consignment.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Wordprocessing;
using DocumentFormat.OpenXml.VariantTypes;
using System.Data.Common;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Office2016.Excel;
using Shared.Repository;
using System.Data;

namespace Consignment.Repository
{
    public class DirectPmtRepository : IDirectPmtRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DirectPmtRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<List<DropDownListModel>> GetDirectBankList()
        {
            List<DropDownListModel> locationList = new();
            try
            {
                if (dbconnection != null)
                {

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDirectBankList", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            locationList.Add(new DropDownListModel
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
            return locationList;
        }
        public async Task<DirectPmtListModel> GetDirectPaymentList(ReportRequestModel request)
        {
            DirectPmtListModel lorryHire = new();
            List<DirectPmtModel> lorryHireMasters = new();
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
                            new SqlParameter("@LoginBranch",request.FilterStr),
                            new SqlParameter("@DirectBankId",     request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDirectBankPaymentList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            lorryHireMasters.Add(new DirectPmtModel
                            {
                                DtlId = Convert.ToString(dataSet.Tables[0].Rows[i]["DtlId"]),
                                PmtNo = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtNo"]),
                                PmtDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtDate"]),
                                HireAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["HireAmt"]),
                                NetAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmt"]),
                                BankCoCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BankCoCode"]),
                                BankPrCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BankPrCode"]),
                                Ptype = Convert.ToString(dataSet.Tables[0].Rows[i]["Ptype"]),
                                BankAcNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BankAcNo"]),
                                BenName = Convert.ToString(dataSet.Tables[0].Rows[i]["BenName"]),
                                BenBankIfsc = Convert.ToString(dataSet.Tables[0].Rows[i]["BenBankIfsc"]),
                                BenBankAcNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BenBankAcNo"]),
                                BankCoName = Convert.ToString(dataSet.Tables[0].Rows[i]["BankCoName"]),
                                Narr = Convert.ToString(dataSet.Tables[0].Rows[i]["Narr"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                
                            });
                        }

                        lorryHire.PmtList = lorryHireMasters;

                        lorryHire.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = 0,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return lorryHire;
        }
        public async Task<ResponseModel> DownLoadDirectExcel(DirectPmtListModel lorryHire)
        {
            ResponseModel responseModel = new();
            RequestModel request = new RequestModel();

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();


            var foldername = System.IO.Path.Combine("reports", "Download");
            var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
            var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";


            try
            {
                using (XLWorkbook wb = new XLWorkbook())
                {

                    var ws = wb.Worksheets.Add("worksheet");

                    for (int j = 0; j < lorryHire.PmtList.Count; j++)
                    {
                        ws.Cell(j + 1, 1).Value = lorryHire.PmtList[j].BankCoCode?.ToString();
                        ws.Cell(j + 1, 2).Value = lorryHire.PmtList[j].BankPrCode?.ToString();
                        ws.Cell(j + 1, 3).Value = lorryHire.PmtList[j].Ptype?.ToString();
                        ws.Cell(j + 1, 4).Value = "";
                        ws.Cell(j + 1, 5).Value = DateTime.Now.ToString("dd/MM/yyyy");
                        ws.Cell(j + 1, 6).Value = "'" + lorryHire.PmtList[j].BankAcNo?.ToString();
                        ws.Cell(j + 1, 7).Value = lorryHire.PmtList[j].NetAmt?.ToString();
                        ws.Cell(j + 1, 8).Value = "";
                        ws.Cell(j + 1, 9).Value = lorryHire.PmtList[j].BenName?.ToString();
                        ws.Cell(j + 1, 10).Value = lorryHire.PmtList[j].BenBankIfsc?.ToString();
                        ws.Cell(j + 1, 11).Value = "'" + lorryHire.PmtList[j].BenBankAcNo?.ToString();
                        ws.Cell(j + 1, 12).Value = "";
                        ws.Cell(j + 1, 13).Value = "";
                        ws.Cell(j + 1, 14).Value = lorryHire.PmtList[j].BenName?.ToString();
                        ws.Cell(j + 1, 15).Value = lorryHire.PmtList[j].BankCoName?.ToString();
                        ws.Cell(j + 1, 16).Value = lorryHire.PmtList[j].Narr?.ToString();
                        ws.Cell(j + 1, 17).Value = lorryHire.PmtList[j].Remarks?.ToString();
                    }

                    for (int m = 1; m <= 17; m++)
                    {
                        ws.Column(m).AdjustToContents();
                    }

                    ws.Range(1, 1, lorryHire.PmtList.Count, 17).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    ws.Range(1, 1, lorryHire.PmtList.Count, 17).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;


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
                if (responseModel.Status)
                {
                    for (int j = 0; j < lorryHire.PmtList.Count; j++)
                    {
                        request.strRequest = lorryHire.PmtList[j].DtlId?.ToString();
                        request.strRequest1 = lorryHire.PmtList[j].LoggedInUser?.ToString();
                        responseModel = await DirectPmtDownloadUpd(transaction, request);

                        if (!responseModel.Status)
                        {
                            j = lorryHire.PmtList.Count;
                        }
                    }
                }
                if (responseModel.Status)
                {

                    responseModel.Status = true;
                    responseModel.Message = filename;
                    transaction.Commit();
                }
                else {
                    transaction.Rollback();
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<ResponseModel> DirectPmtDownloadUpd(SqlTransaction transaction, RequestModel req)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DtlId", req.strRequest),
                            new SqlParameter("@LoggedInUser", req.strRequest1),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DirectPmtDownloadUpd", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);                        
                    }
                    else
                    {
                        responseModel.Status = false;
                    }
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
            }
            return responseModel;
        }
        public async Task<DirectPmtListModel> GetDirectPmtDownloadedList(ReportRequestModel request)
        {
            DirectPmtListModel lorryHire = new();
            List<DirectPmtModel> lorryHireMasters = new();
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
                            new SqlParameter("@LoginBranch",request.FilterStr),
                            new SqlParameter("@DirectBankId",     request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDirectPmtDownloadedList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            lorryHireMasters.Add(new DirectPmtModel
                            {
                                DtlId = Convert.ToString(dataSet.Tables[0].Rows[i]["DtlId"]),
                                PmtNo = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtNo"]),
                                PmtDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtDate"]),
                                HireAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["HireAmt"]),
                                NetAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmt"]),
                                BankCoCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BankCoCode"]),
                                BankPrCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BankPrCode"]),
                                Ptype = Convert.ToString(dataSet.Tables[0].Rows[i]["Ptype"]),
                                BankAcNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BankAcNo"]),
                                BenName = Convert.ToString(dataSet.Tables[0].Rows[i]["BenName"]),
                                BenBankIfsc = Convert.ToString(dataSet.Tables[0].Rows[i]["BenBankIfsc"]),
                                BenBankAcNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BenBankAcNo"]),
                                BankCoName = Convert.ToString(dataSet.Tables[0].Rows[i]["BankCoName"]),
                                Narr = Convert.ToString(dataSet.Tables[0].Rows[i]["Narr"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),

                            });
                        }

                        lorryHire.PmtList = lorryHireMasters;

                        lorryHire.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = 0,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return lorryHire;
        }
        public async Task<ResponseModel> UpdateDirectPmt(DirectPmtListModel lorryHire)
        {
            ResponseModel responseModel = new();

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();

            try
            {
                for (int j = 0; j < lorryHire.PmtList.Count; j++)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@DtlId", lorryHire.PmtList[j].DtlId?.ToString()),
                        new SqlParameter("@BankDoneYN", lorryHire.PmtList[j].Selected?"Y":"N"),
                        new SqlParameter("@LoggedInUser", lorryHire.PmtList[j].LoggedInUser?.ToString()),
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DirectPmtBankUpd", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }

                    if (!responseModel.Status)
                    {
                        j = lorryHire.PmtList.Count;
                    }
                }
                if (responseModel.Status)
                {
                    transaction.Commit();
                }
                else
                {
                    transaction.Rollback();
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
                transaction.Rollback();
            }
            return responseModel;
        }

        public async Task<List<DropDownListModel>> GetPmtList(RequestModel request)
        {
            List<DropDownListModel> locationList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.strRequest),
                            new SqlParameter("@ToDate",     request.strRequest1),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDirectPmtPendingList", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            locationList.Add(new DropDownListModel
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
            return locationList;
        }


    }

}

