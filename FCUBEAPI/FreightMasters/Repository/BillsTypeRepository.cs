using DocumentFormat.OpenXml.Drawing;
using FreightMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public class BillsTypeRepository: IBillsTypeRepository
    {

        private readonly IOptions<DBModel> dbconnection;
        public BillsTypeRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> BillsTypeSave(BillsTypeModel billsTypeModel)
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
                          new SqlParameter("@BillTypeId", billsTypeModel.BillTypeId),
                            new SqlParameter("@BillTypeDesc", billsTypeModel.BillTypeDesc),
                            new SqlParameter("@MainAc", billsTypeModel.MainAc),
                            new SqlParameter("@OtherAc", billsTypeModel.OtherAc),
                            new SqlParameter("@OtherAc2", billsTypeModel.OtherAc2),
                            new SqlParameter("@OtherAc3", billsTypeModel.OtherAc3),
                            new SqlParameter("@SACCode", billsTypeModel.SACCode),

                            new SqlParameter("@LoggedInUser", billsTypeModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BillsTypeSave", param);

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
        public async Task<List<DropDownListModel>> GetFinAcList()
        {
            List<DropDownListModel> creditacList = new();
            try
            {
                if (dbconnection != null)
                {


                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "GetFinAcList_Select", null);

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
        public async Task<BillsTypeListModel> GetBillsTypeList(PageRequest request)
        {
            BillsTypeListModel billsTypeListModel = new();
            List<BillsTypeModel> typeList = new();
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
                            new SqlParameter("@Search", request.Search)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillsTypeList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            typeList.Add(new BillsTypeModel
                            {
                                BillTypeId = Convert.ToString(dataSet.Tables[0].Rows[i]["BillTypeId"]),
                                BillTypeDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["BillTypeDesc"]),
                                MainAc = Convert.ToString(dataSet.Tables[0].Rows[i]["MainAc"]),
                                OtherAc = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherAc"]),
                                OtherAc2 = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherAc2"]),
                                OtherAc3 = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherAc3"]),
                                SACCode = Convert.ToString(dataSet.Tables[0].Rows[i]["SACCode"])
                              

                            });
                        }

                        billsTypeListModel.TypeList = typeList;

                        billsTypeListModel.PageMetaData = new PaginationMetaData
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
            return billsTypeListModel;
        }
        public async Task<ResponseModel> BillsTypeDelete(RequestModel requestModel)
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
                            new SqlParameter("@BillTypeId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BillsTypeDelete", param);

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


    }
}
