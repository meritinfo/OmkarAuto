using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using FreightMasters.Models;
using Shared.Models;
using System.Data.Common;
using System.Data;

namespace FreightMasters.Repository
{
    public class FreightRatesMstRepository : IFreightRatesMstRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public object FreightRatesDtlList { get; private set; }

        public FreightRatesMstRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save product master details
        /// </summary>
        /// <param name="productMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> FreightRatesMstSave(FreightRatesMstModel freightRatesMstModel)
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
                            new SqlParameter("@MasterID", freightRatesMstModel.MasterID),
                            new SqlParameter("@Accountid", freightRatesMstModel.Accountid),
                            new SqlParameter("@FromPlace", freightRatesMstModel.FromPlace),
                            new SqlParameter("@ValidFrom", freightRatesMstModel.ValidFrom),
                            new SqlParameter("@ValidUpto", freightRatesMstModel.ValidUpto),
                            new SqlParameter("@RateTypeId", freightRatesMstModel.RateTypeId),
                            new SqlParameter("@RateMethod", freightRatesMstModel.RateMethod),
                            new SqlParameter("@RateForStateOrToPlace", freightRatesMstModel.RateForStateOrToPlace),
                            new SqlParameter("@VehicleTypeGroupId", freightRatesMstModel.VehicleTypeGroupId),
                            new SqlParameter("@LoggedInUser", freightRatesMstModel.LoggedInUser)

                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_FreightRatesMstSave", param);
                    string MasterID = "0";

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        MasterID = Convert.ToString(responseModel.Message);
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                    if (responseModel.Status)
                    {
                        for (int i = 0; i < freightRatesMstModel.freightRatesDetailsList.Count; i++)
                        {
                            freightRatesMstModel.freightRatesDetailsList[i].Index = i.ToString();
                            freightRatesMstModel.freightRatesDetailsList[i].MasterID = MasterID.ToString();
                            freightRatesMstModel.freightRatesDetailsList[i].RateTypeId = freightRatesMstModel.RateTypeId.ToString();
                            responseModel = await FreightRatesDtlSave(transaction, freightRatesMstModel.freightRatesDetailsList[i]);
                            if (!responseModel.Status) { 
                                transaction.Rollback();
                                i = freightRatesMstModel.freightRatesDetailsList.Count;
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
        public async Task<ResponseModel> FreightRatesDtlSave(SqlTransaction transaction, FreightRatesDtlModel freightRatesDtlModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DtlId",      freightRatesDtlModel.DtlId),
                            new SqlParameter("@MasterID",   freightRatesDtlModel.MasterID),
                            new SqlParameter("@DestState",  freightRatesDtlModel.DestState),
                            new SqlParameter("@ToPlace",    freightRatesDtlModel.ToPlace),
                            new SqlParameter("@RateTypeId", freightRatesDtlModel.RateTypeId),
                            new SqlParameter("@Rate",       freightRatesDtlModel.Rate),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_FreightRatesDtlsSave", param);

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
            return responseModel;
        }

        public async Task<FreightRatesMstList> GetFreightRatesList(PageRequest request)
        {
            FreightRatesMstList freightRatesMstList = new();
            List<FreightRatesMstModel> ratesMasterList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFreightRatesMstList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            ratesMasterList.Add(new FreightRatesMstModel
                            {
                                MasterID                = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                                AccountName             = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountName"]),
                                FromPoint               = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPoint"]),
                                ValidFrom               = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidFrom"]),
                                ValidUpto               = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidUpto"]),
                                RateTypeId              = Convert.ToString(dataSet.Tables[0].Rows[i]["RateTypeId"]),
                                RateMethod              = Convert.ToString(dataSet.Tables[0].Rows[i]["RateMethod"]),
                                FromPlace               = Convert.ToString(dataSet.Tables[0].Rows[i]["Fromplace"]),
                                RateDesc                = Convert.ToString(dataSet.Tables[0].Rows[i]["RateDesc"]),
                                Accountid               = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountID"]),
                                RateForStateOrToPlace   = Convert.ToString(dataSet.Tables[0].Rows[i]["RateForStateOrToPlace"]),
                                VehicleTypeGroupId      = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleTypeGroupId"]),
                            });
                        }

                        freightRatesMstList.RatesMasterList = ratesMasterList;

                        freightRatesMstList.PageMetaData = new PaginationMetaData
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
            return freightRatesMstList;
        }
      
       
        public async Task<FreightRatesMstModel> GetFreightRateInnerGridList(RequestModel req)
        {
            FreightRatesMstModel FreightRatesMstModel = new()
            {
                freightRatesDetailsList  = new List<FreightRatesDtlModel>(),

            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterId", req.strRequest)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFreightRateInnerGridList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            FreightRatesMstModel.freightRatesDetailsList.Add(new FreightRatesDtlModel
                            {
                                MasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                                DestState = Convert.ToString(dataSet.Tables[0].Rows[i]["DestState"]),
                                ToPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]),
                                Rate = Convert.ToString(dataSet.Tables[0].Rows[i]["Rate"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                //Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return FreightRatesMstModel;
        }

        public async Task<ResponseModel> FreightRatesMasterDetailsDelete(RequestModel req)
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
                           new SqlParameter("@MasterID", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_FreightRatesMstDelete", param);

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

        public async Task<List<DropDownListModel>> GetPartyList()
        {
            List<DropDownListModel> partyList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getPartyList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            partyList.Add(new DropDownListModel
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
            return partyList;
        }


    }
}