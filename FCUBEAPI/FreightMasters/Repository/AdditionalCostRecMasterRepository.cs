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
    public class AdditionalCostRecMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public AdditionalCostRecMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> AdditionalCostRecMasterSave(AdditionalCostRecMasterModel additionalCostRecMasterModel)
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
                             new SqlParameter("@AddCostID" , additionalCostRecMasterModel.AddCostID  ),
                             new SqlParameter("@AddCostCode" , additionalCostRecMasterModel.AddCostCode  ),
                             new SqlParameter("@AddCostType" , additionalCostRecMasterModel.AddCostType  ),
                             new SqlParameter("@AddCostDescription" , additionalCostRecMasterModel.AddCostDescription ),
                             new SqlParameter("@AccountID" , additionalCostRecMasterModel.AccountID),
                             new SqlParameter("@AffectCosting" , additionalCostRecMasterModel.AffectCosting),
                          
                           //  new SqlParameter("@OLD_CnorCnee_ID " , consigneeMasterModel.OLD_CnorCnee_ID ),
                             new SqlParameter("@LoggedInUser " , additionalCostRecMasterModel.LoggedInUser ),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_AdditionalCostRecMasterSave", param);

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
        public async Task<AdditionalCostRecMasterList> GetAdditionalCostRecMasterList(PageRequest request)
        {
            AdditionalCostRecMasterList additionalCostRecMasterList = new();
            List<AdditionalCostRecMasterModel> additionalList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_GetConsigneeCnorList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            additionalList.Add(new AdditionalCostRecMasterModel
                            {
                                AddCostID = Convert.ToString(dataSet.Tables[0].Rows[i]["AddCostID"]),
                                AddCostCode = Convert.ToString(dataSet.Tables[0].Rows[i]["AddCostCode"]),
                                AddCostType = Convert.ToString(dataSet.Tables[0].Rows[i]["AddCostType"]),
                                AddCostDescription = Convert.ToString(dataSet.Tables[0].Rows[i]["AddCostDescription"]),
                              
                                // LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser "]),

                            });
                        }

                        additionalCostRecMasterList.AdditionalList = additionalList;

                        additionalCostRecMasterList.PageMetaData = new PaginationMetaData
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
            return additionalCostRecMasterList;
        }
        public async Task<ResponseModel> GetAdditionalCostRecDelete(RequestModel requestModel)
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
                            new SqlParameter("@AddCostID", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_AdditionalCostRecMasterDelete", param);

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
