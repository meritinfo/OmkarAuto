//using FleetMasters.Models;
//using Microsoft.Extensions.Options;
//using Shared.Models;
//using SqlHelper.Models;
//using System;
//using System.Collections.Generic;
//using System.Data.SqlClient;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace FleetMasters.Repository
//{
//    public class ProductMasterRepository: IProductMasterRepository
//    {
//        private readonly IOptions<DBModel> dbconnection;

//        public ProductMasterRepository(IOptions<DBModel> _dbconnection)
//        {
//            dbconnection = _dbconnection;
//        }
//        public async Task<ResponseModel> ProductMasterSave(ProductMasterModel productMasterModel)
//        {
//            ResponseModel responseModel = new();

//            var connection = new SqlConnection(dbconnection.Value.DBConnection);
//            connection.Open();
//            SqlTransaction transaction;
//            transaction = connection.BeginTransaction();
//            try
//            {
//                if (dbconnection != null)
//                {
//                    SqlParameter[] param =
//                        {
//                            new SqlParameter("@ProductId", productMasterModel.ProductId),
//                            new SqlParameter("@ProductName", productMasterModel.ProductName),
//                            new SqlParameter("@IsActive", productMasterModel.IsActive),
                        

//                        };
//                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "ProductMaster_Insert", param);

//                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
//                    {
//                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
//                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
//                        if (responseModel.Status) { transaction.Commit(); }
//                        else { transaction.Rollback(); }
//                    }
//                    else
//                    {
//                        responseModel.Status = false;
//                        transaction.Rollback();
//                    }
//                }
//            }
//            catch (Exception ex)
//            {
//                transaction.Rollback();
//            }
//            return responseModel;
//        }
//        public async Task<ProductMasterList> GetProductMasterList(PageRequest request)
//        {
//            ProductMasterList productMasterList = new();
//            List<ProductMasterModel> productList = new();
//            try
//            {
//                if (dbconnection != null)
//                {
//                    SqlParameter[] param =
//                        {
//                            new SqlParameter("@PageNumber", request.PageNumber),
//                            new SqlParameter("@PageSize", request.PageSize),
//                            new SqlParameter("@SortColumn", request.SortColumn),
//                            new SqlParameter("@SortOrder", request.SortOrder),
//                            new SqlParameter("@Search", request.Search)
//                        };
//                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "ProductMasterList_Select", param);

//                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
//                    {
//                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
//                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
//                        {
//                            productList.Add(new ProductMasterModel
//                            {
//                                ProductId = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductId"]),
//                                ProductName = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductName"]),

//                                IsActive = Convert.ToString(dataSet.Tables[0].Rows[i]["IsActive"]),
//                            });

//                        }

//                        productMasterList.ProductMastersList = productList;

//                        productMasterList.PageMetaData = new PaginationMetaData
//                        {
//                            TotalCount = totalRecords,
//                            CurrentPage = request.PageNumber
//                        };
//                    }
//                }
//            }
//            catch (Exception ex)
//            {
//                // Log exception on database
//                //ExceptionModel exceptionModel = new()
//                //{
//                //    ExceptionMessage = Convert.ToString(ex.Message),
//                //    ExceptionType = Convert.ToString(ex.GetType().Name),
//                //    ExceptionSource = Convert.ToString(ex.StackTrace)
//                //};

//                //ExceptionRepository exception = new(dbconnection);
//                //await exception.SaveExceptionDetails(exceptionModel);
//            }
//            return productMasterList;
//        }

    

//}
//}
