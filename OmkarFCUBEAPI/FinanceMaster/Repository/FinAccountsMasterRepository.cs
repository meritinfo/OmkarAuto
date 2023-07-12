using FinanceMaster.Models;
using FinanceMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace FinanceMasters.Repository
{
    public class FinAccountsMasterRepository : IFinAccountsMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public FinAccountsMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save fin accounts master details
        /// </summary>
        /// <param name="finAccountsMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> FinAccountsMasterSave(FinAccountsMasterModel finAccountsMasterModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@AccountId", finAccountsMasterModel.AccountId),
                            new SqlParameter("@AccountType", finAccountsMasterModel.AccountType),
                            new SqlParameter("@AccountGroupFlag", finAccountsMasterModel.AccountGroupFlag),
                            new SqlParameter("@AccountGroupNo", finAccountsMasterModel.AccountGroupNo),
                            new SqlParameter("@AccountLevelNo", finAccountsMasterModel.AccountLevelNo),
                            new SqlParameter("@AccountIndexNo", finAccountsMasterModel.AccountIndexNo),
                            new SqlParameter("@AccountName", finAccountsMasterModel.AccountName),
                            new SqlParameter("@SchID", finAccountsMasterModel.SchID),
                            new SqlParameter("@LoggedInUser", finAccountsMasterModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "FinAccountsMaster_Insert", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
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

        public async Task<FinAccountsMasterList> GetFinAccountsMasterList(FinAccountsMasterListRequest request)
        {
            FinAccountsMasterList finAccountsMasterList = new();
            List<FinAccountsMasterModel> finAccountsList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "FinAccountsMasterList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            finAccountsList.Add(new FinAccountsMasterModel
                            {
                                AccountId = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountId"]),
                                AccountType = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountType"]),
                                AccountGroupFlag = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountGroupFlag"]),

                                AccountGroupNo = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountGroupNo"]),
                                AccountLevelNo = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountLevelNo"]),
                                AccountIndexNo = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountIndexNo"]),
                                AccountName = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountName"]),
                                SchID = Convert.ToString(dataSet.Tables[0].Rows[i]["SchID"]),
                               


                            });
                        }

                        finAccountsMasterList.FinAccountsList = finAccountsList;

                        finAccountsMasterList.PageMetaData = new PaginationMetaData
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
            return finAccountsMasterList;
        }
    }
}
