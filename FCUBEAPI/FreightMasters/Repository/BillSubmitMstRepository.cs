
using DocumentFormat.OpenXml.Office2016.Excel;
using FreightMasters.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public class BillSubmitMstRepository: IBillSubmitMstRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public BillSubmitMstRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> BillSubmitMstSave(BillSubmitMasterModel billSubmitMasterModel)
        {
            ResponseModel responseModel = new();

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                             new SqlParameter("@SubmitMstId" , billSubmitMasterModel.SubmitMstId),
                             new SqlParameter("@SubmitStn" , billSubmitMasterModel.SubmitStn),
                             new SqlParameter("@SubmitNo" , billSubmitMasterModel.SubmitNo),
                             new SqlParameter("@SubmitDt" , billSubmitMasterModel.SubmitDt),
                             new SqlParameter("@SubmitType" , billSubmitMasterModel.SubmitType),
                             new SqlParameter("@CourierCo" , billSubmitMasterModel.CourierCo),
                             new SqlParameter("@CourierDocketNo" , billSubmitMasterModel.CourierDocketNo),
                             new SqlParameter("@PartyCode" , billSubmitMasterModel.PartyCode),
                             new SqlParameter("@SubmitLocation" , billSubmitMasterModel.SubmitLocation),
                             new SqlParameter("@DeptId" , billSubmitMasterModel.DeptId),
                             new SqlParameter("@BillsUptoDt" , billSubmitMasterModel.BillsUptoDt),
                             new SqlParameter("@KindAttnTo" , billSubmitMasterModel.KindAttnTo),
                             new SqlParameter("@Remarks" , billSubmitMasterModel.Remarks),
                             //new SqlParameter("@PartyAcceptDt" , billSubmitMasterModel.PartyAcceptDt),
                            // new SqlParameter("@PartyAccceptRemarks" , billSubmitMasterModel.PartyAccceptRemarks),
                             new SqlParameter("@TotalSubmitAmt" , billSubmitMasterModel.TotalSubmitAmt),
                             new SqlParameter("@YearID" , billSubmitMasterModel.YearID),
                            new SqlParameter("@LoggedInUser",       billSubmitMasterModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BillSubmitMstSave", param);
                    string SubmitMstId = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        SubmitMstId = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < billSubmitMasterModel.BillSubmitMasterDtlList.Count; i++)
                            {
                                if (billSubmitMasterModel.BillSubmitMasterDtlList[i].Selected)
                               {
                                    billSubmitMasterModel.BillSubmitMasterDtlList[i].SubmitMstId = SubmitMstId;


                                    responseModel = await BillSubmitMstDetailSave(transaction, billSubmitMasterModel.BillSubmitMasterDtlList[i]);
                                    if (!responseModel.Status)
                                    {
                                        transaction.Rollback();
                                        i = billSubmitMasterModel.BillSubmitMasterDtlList.Count;
                                    }
                               }
                            }
                        }
                    }
                    if (responseModel.Status)
                    {
                        transaction.Commit();
                    }
                    else { transaction.Rollback(); }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<ResponseModel> GetBillSubmitPrint(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                string baseUrl = dbconnection.Value.apiPath + "api/BillSubmit/";

                string UrlParam = "?SubmitMstId=" + request.strRequest+
                                    "&PrintSign=" + request.strRequest1;
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


                HttpResponseMessage response = client.GetAsync(UrlParam).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    dynamic data = JsonConvert.DeserializeObject(result);
                    if (data!="500")
                    {
                        responseModel.Status = true;
                        responseModel.Message = data;
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = data;
                    }


                    client.Dispose();
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = "Error Fetching Report";
            }
            return responseModel;
        }
        public async Task<ResponseModel> BillSubmitMasterDelete(RequestModel req)
        {
            ResponseModel responseModel = new();

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@SubmitMstId", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BillSubmitMasterDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status) { transaction.Commit(); }
                        else { transaction.Rollback(); }
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<BillSubmitMasterModel> GetBillSubmitSearchList(ReportRequestModel request)
        {
            BillSubmitMasterModel billSubmitMasterDtlLists = new();
            List<BillSubmitMasterDtlListmodel> billSubmitMasterDtlList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@partycode",   request.FilterStr),
                            new SqlParameter("@submitlocation",   request.FilterStr1),
                            new SqlParameter("@uptodate",   request.FromDate),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillSubmitSearchList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = 0;
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billSubmitMasterDtlList.Add(new BillSubmitMasterDtlListmodel
                            {
                               // SubmitDtlId = Convert.ToString(resultData.Tables[0].Rows[i]["SubmitDtlId"]),
                             //   SubmitMstId = Convert.ToString(resultData.Tables[0].Rows[i]["SubmitMstId"]),
                              //  SubmitDt = Convert.ToString(resultData.Tables[0].Rows[i]["SubmitDt"]),
                                BillsMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["BillsMasterId"]),
                                BillAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalGtotal"]),
                                BillNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BillNo"]),
                                BillDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BillDate"]),
                                //   DtlRemarks = Convert.ToString(resultData.Tables[0].Rows[i]["DtlRemarks"]),


                                // Selected = false
                            });
                        }

                        billSubmitMasterDtlLists.BillSubmitMasterDtlList = billSubmitMasterDtlList;
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
            return billSubmitMasterDtlLists;
        }
        public async Task<BillSubmitMasterModel> GetBillSubmitMasterInnerGridList(RequestModel request)
        {
            BillSubmitMasterModel billSubmitMasterInnerGridList = new()
            {
                BillSubmitMasterDtlList = new List<BillSubmitMasterDtlListmodel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@SubmitMstId", request.strRequest),
                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillSubmitMasterInnerGridList", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            billSubmitMasterInnerGridList.BillSubmitMasterDtlList.Add(new BillSubmitMasterDtlListmodel
                            {
                                SubmitDtlId = Convert.ToString(resultData.Tables[0].Rows[i]["SubmitDtlId"]),
                                SubmitMstId = Convert.ToString(resultData.Tables[0].Rows[i]["SubmitMstId"]),
                                SubmitDt = Convert.ToString(resultData.Tables[0].Rows[i]["SubmitDt"]),
                                BillsMasterId = Convert.ToString(resultData.Tables[0].Rows[i]["BillsMasterId"]),
                                BillAmt = Convert.ToString(resultData.Tables[0].Rows[i]["BillAmt"]),
                                BillNo = Convert.ToString(resultData.Tables[0].Rows[i]["BillNo"]),
                                BillDate = Convert.ToString(resultData.Tables[0].Rows[i]["BillDate"]),
                                DtlRemarks = Convert.ToString(resultData.Tables[0].Rows[i]["DtlRemarks"]),
                              
                            });
                        }
                    }


                }
            }
            catch (Exception ex)
            {

            }
            return billSubmitMasterInnerGridList;
        }
        public async Task<List<DropDownListModel>> GetDeptList()
        {
            List<DropDownListModel> cardAcList = new();
            try
            {
                if (dbconnection != null)
                {


                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DeptList_Select", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            cardAcList.Add(new DropDownListModel
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
            return cardAcList;
        }

        public async Task<ResponseModel> BillSubmitMstDetailSave(SqlTransaction transaction, BillSubmitMasterDtlListmodel billSubmitMasterDtlListmodel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@SubmitDtlId",             billSubmitMasterDtlListmodel.SubmitDtlId),
                            new SqlParameter("@SubmitMstId",   billSubmitMasterDtlListmodel.SubmitMstId),
                            new SqlParameter("@SubmitDt",       billSubmitMasterDtlListmodel.SubmitDt ),
                            new SqlParameter("@BillsMasterId",            billSubmitMasterDtlListmodel.BillsMasterId),
                            new SqlParameter("@BillAmt",             billSubmitMasterDtlListmodel.BillAmt),
                            new SqlParameter("@DtlRemarks",        billSubmitMasterDtlListmodel.DtlRemarks ) ,
                           
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BillSubmitDetailSave", param);

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

            }
            return responseModel;
        }
        public async Task<BillSubmitMasterList> GetBillSubmitMasterList(ReportRequestModel request)
        {
            BillSubmitMasterList billSubmitMasterList = new();
            List<BillSubmitMasterModel> submitList = new();
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
                             new SqlParameter("@SubmitNo",     request.FilterStr1),
                               new SqlParameter("@PartyCode",     request.FilterStr2),
                           // new SqlParameter("@Type",       request.FilterStr)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillSubmitList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            submitList.Add(new BillSubmitMasterModel
                            {
                                SubmitMstId = Convert.ToString(dataSet.Tables[0].Rows[i]["SubmitMstId"]),
                                SubmitStn = Convert.ToString(dataSet.Tables[0].Rows[i]["SubmitStn"]),
                                SubmitNo = Convert.ToString(dataSet.Tables[0].Rows[i]["SubmitNo"]),
                                SubmitDt = Convert.ToString(dataSet.Tables[0].Rows[i]["SubmitDt"]),
                                SubmitType = Convert.ToString(dataSet.Tables[0].Rows[i]["SubmitType"]),
                                CourierCo = Convert.ToString(dataSet.Tables[0].Rows[i]["CourierCo"]),
                                CourierDocketNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CourierDocketNo"]),
                                PartyCode = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyCode"]),
                                SubmitLocation = Convert.ToString(dataSet.Tables[0].Rows[i]["SubmitLocation"]),
                                DeptId = Convert.ToString(dataSet.Tables[0].Rows[i]["DeptId"]),
                                BillsUptoDt = Convert.ToString(dataSet.Tables[0].Rows[i]["BillsUptoDt"]),
                                KindAttnTo = Convert.ToString(dataSet.Tables[0].Rows[i]["KindAttnTo"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                PartyAcceptDt = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyAcceptDt"]),
                                PartyAccceptRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyAccceptRemarks"]),
                                TotalSubmitAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalSubmitAmt"]),
                                Sname = Convert.ToString(dataSet.Tables[0].Rows[i]["Sname"]),
                                Lname = Convert.ToString(dataSet.Tables[0].Rows[i]["Lname"]),
                                dname = Convert.ToString(dataSet.Tables[0].Rows[i]["dname"]),
                                party = Convert.ToString(dataSet.Tables[0].Rows[i]["party"]),
                            });
                        }

                        billSubmitMasterList.SubmitList = submitList;

                        billSubmitMasterList.PageMetaData = new PaginationMetaData
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
            return billSubmitMasterList;
        }


    }
}
