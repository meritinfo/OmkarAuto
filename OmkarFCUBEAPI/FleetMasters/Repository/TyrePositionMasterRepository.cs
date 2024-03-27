using FleetMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;

namespace FleetMasters.Repository
{
    public class TyrePositionMasterRepository : ITyrePositionMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public TyrePositionMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> TyrePositionMasterSave(TyrePositionMasterModel tyrePositionMasterModel)
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
                            new SqlParameter("@TyrePosID", tyrePositionMasterModel.TyrePosID),
                            new SqlParameter("@PositionDesc", tyrePositionMasterModel.PositionDesc),
                            new SqlParameter("@ActiveYN", tyrePositionMasterModel.ActiveYN),
                            new SqlParameter("@DeleteFlag", tyrePositionMasterModel.DeleteFlag),
                            new SqlParameter("@LoggedInUser", tyrePositionMasterModel.LoggedInUser)                             

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "TyrePositionMaster_Insert", param);

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
        public async Task<TyrePositionMasterList> GetTyrePositionMasterList(PageRequest request)
        {
            TyrePositionMasterList TyrePositionMasterList = new();
            List<TyrePositionMasterModel> tyrePositionMasterList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TyrePositionMasterList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tyrePositionMasterList.Add(new TyrePositionMasterModel
                            {
                                TyrePosID = Convert.ToString(dataSet.Tables[0].Rows[i]["TyrePosID"]),
                                PositionDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["PositionDesc"]),
                            });
                        }

                        TyrePositionMasterList.tyrePositionMasterList = tyrePositionMasterList;

                        TyrePositionMasterList.PageMetaData = new PaginationMetaData
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
            return TyrePositionMasterList;
        }

    }
}

