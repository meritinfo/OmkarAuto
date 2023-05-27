using FreightMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace FreightMasters.Repository
{
    public class LR_Bill_SeriesRepository : ILR_Bill_SeriesRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public LR_Bill_SeriesRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        /// <summary>
        /// Service method for save destination master details
        /// </summary>
        /// <param name="destinationMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> LR_Bill_SeriesDetailsSave(LR_Bill_SeriesModel lr_Bill_SeriesModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@SeriesId", lr_Bill_SeriesModel.SeriesId),
                            new SqlParameter("@SeriesCode", lr_Bill_SeriesModel.SeriesCode),
                            new SqlParameter("@LR_Bill_type", lr_Bill_SeriesModel.LR_Bill_type),
                            new SqlParameter("@BranchCode", lr_Bill_SeriesModel.BranchCode),
                            new SqlParameter("@IsActive", lr_Bill_SeriesModel.IsActive),
                            new SqlParameter("@LoggedInUser", lr_Bill_SeriesModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "LR_Bill_Series_Insert", param);

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
        public async Task<LRBillSeriesList> LRBillSeriesList(LRBillSeriesListRequest request)
        {
            LRBillSeriesList LlrBillSeriesList = new();
            List<LR_Bill_SeriesModel> lrbillList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "LRBillSeriesList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            lrbillList.Add(new LR_Bill_SeriesModel
                            {
                                SeriesId = Convert.ToInt32(dataSet.Tables[0].Rows[i]["SeriesId"]),
                                SeriesCode = Convert.ToString(dataSet.Tables[0].Rows[i]["SeriesCode"]),
                                LR_Bill_type = Convert.ToString(dataSet.Tables[0].Rows[i]["LR_Bill_type"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),


                            });
                        }

                        LlrBillSeriesList.lrbillseriesList = lrbillList;

                        LlrBillSeriesList.PageMetaData = new PaginationMetaData
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
            return LlrBillSeriesList;
        }

    }
}
