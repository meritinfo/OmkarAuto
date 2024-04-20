using FleetMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;

namespace FleetMasters.Repository
{
    public class BrandMasterRepository : IBrandMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public BrandMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save vehicle type master details
        /// </summary>
        /// <param name="BrandMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> BrandMasterSave(BrandMasterModel brandMasterModel)
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
                            new SqlParameter("@BrandID", brandMasterModel.BrandID),
                            new SqlParameter("@BrandName", brandMasterModel.BrandName),
                            new SqlParameter("@BrandType", brandMasterModel.BrandType),
                            new SqlParameter("@IsActive", brandMasterModel.IsActive),        
                            new SqlParameter("@LoggedInUser", brandMasterModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "BrandMaster_Insert", param);

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
        public async Task<BrandMasterList> GetBrandMasterList(PageRequest request)
        {
            BrandMasterList brandMasterList = new();
            List<BrandMasterModel> brandList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "BrandMasterList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            brandList.Add(new BrandMasterModel
                            {
                                BrandID = Convert.ToString(dataSet.Tables[0].Rows[i]["BrandID"]),
                                BrandName = Convert.ToString(dataSet.Tables[0].Rows[i]["BrandName"]),
                 
                                BrandType = Convert.ToString(dataSet.Tables[0].Rows[i]["BrandType"]),
                              


                            });
                        }

                        brandMasterList.BrandList = brandList;

                        brandMasterList.PageMetaData = new PaginationMetaData
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
            return brandMasterList;
        }

    }
}
