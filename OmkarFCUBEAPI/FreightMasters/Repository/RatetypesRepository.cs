using FreightMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace FreightMasters.Repository
{
    public class RatetypesRepository:IRatetypesRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public RatetypesRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        /// <summary>
        /// Service method for save destination master details
        /// </summary>
        /// <param name="ratetypesModel"></param>
        /// <returns>ResponseModel</returns>
        /// 

        public async Task<ResponseModel> RatetypesDetailsSave(RatetypesModel ratetypesModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@RateTypeId", ratetypesModel.RateTypeId),
                            new SqlParameter("@RateDesc", ratetypesModel.RateDesc),
                            new SqlParameter("@RateMethod", ratetypesModel.RateMethod),
                            new SqlParameter("@DeleteFlag", ratetypesModel.DeleteFlag),
                            new SqlParameter("@LoggedInUser", ratetypesModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "Ratetypes_Insert", param);

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
               
            }
            return responseModel;
        }
        public async Task<RateTypesList> GetRateTypesList(RateTypesListRequest request)
        {
            RateTypesList ratetypesList = new();
            List<RatetypesModel> rateTypesList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "RateTypesList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            rateTypesList.Add(new RatetypesModel
                            {
                                RateTypeId = Convert.ToString(dataSet.Tables[0].Rows[i]["RateTypeId"]),
                                RateMethod = Convert.ToString(dataSet.Tables[0].Rows[i]["RateMethod"]),
                                RateDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["RateDesc"]),
                             

                            });
                        }

                        ratetypesList.rateTypesList = rateTypesList;

                        ratetypesList.PageMetaData = new PaginationMetaData
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
            return ratetypesList;
        }

    }
}
