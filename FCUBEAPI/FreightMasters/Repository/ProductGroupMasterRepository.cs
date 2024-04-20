
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Repository
{
    public class ProductGroupMasterRepository : IProductGroupMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public ProductGroupMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save product group master details
        /// </summary>
        /// <param name="productGroupMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> ProductGroupMasterDetailsSave(ProductGroupMasterModel productGroupMasterModel)
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
                            new SqlParameter("@ProductGroupId", productGroupMasterModel.ProductGroupId),
                            new SqlParameter("@GroupName", productGroupMasterModel.GroupName),
                            new SqlParameter("@GstHSN", productGroupMasterModel.GstHSN),
                             new SqlParameter("@LoggedInUser", productGroupMasterModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "ProductGroupMasterDetails_Insert", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status)
                        {
                            transaction.Commit();
                        }
                        else
                        {
                            transaction.Rollback();
                        }
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
        public async Task<ProductGroupMasterList> GetProductGroupMasterList(PageRequest request)
        {
            ProductGroupMasterList productGroupMasterList = new();
            List<ProductGroupMasterModel> productgroupList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "ProductGroupMasterList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            productgroupList.Add(new ProductGroupMasterModel
                            {
                                ProductGroupId = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductGroupId"]),
                                GroupName = Convert.ToString(dataSet.Tables[0].Rows[i]["GroupName"]),
                                GstHSN = Convert.ToString(dataSet.Tables[0].Rows[i]["GstHSN"]),
                              

                            });
                        }

                        productGroupMasterList.ProductGroupList = productgroupList;

                        productGroupMasterList.PageMetaData = new PaginationMetaData
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
            return productGroupMasterList;
        }

    }


}
