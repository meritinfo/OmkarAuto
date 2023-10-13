using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using FreightMasters.Models;

namespace FreightMasters.Repository
{
    public class FreightRatesMstRepository : IFreightRatesMstRepository
    {
        private readonly IOptions<DBModel> dbconnection;

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
                            new SqlParameter("@CreatedBy", freightRatesMstModel.CreatedBy),
                            new SqlParameter("@CreatedDate", freightRatesMstModel.RateMethod),
                            new SqlParameter("@ModifiedBy", freightRatesMstModel.RateForStateOrToPlace),
                            new SqlParameter("@ModifiedDate", freightRatesMstModel.CreatedBy),

                           new SqlParameter("@LoggedInUser", freightRatesMstModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "freightRatesMst_Insert", param);

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
                    if (responseModel.Status)
                    {
                        for (int i = 0; i < freightRatesMstModel.FreightRatesDetailsList.Count; i++)
                        {
                            if (i == 0)
                            {
                                freightRatesMstModel.FreightRatesDetailsList[i].Index = i.ToString();
                            }
                            freightRatesMstModel.FreightRatesDetailsList[i].MasterID = responseModel.Message;
                            responseModel = await FreightRatesDtlSave(freightRatesMstModel.FreightRatesDetailsList[i]);
                        }
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
        public async Task<FreightRatesMstList> GetFreightRatesList(FreightRatesListRequest request)
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "FreightratesMstList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            ratesMasterList.Add(new FreightRatesMstModel
                            {
                                MasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                                ValidFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidFrom"]),
                                ValidUpto = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidUpto"]),
                                FromPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["Fromplace"]),
                                FromPoint = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPoint"]),
                                AccountName = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountName"]),
                                RateMethod = Convert.ToString(dataSet.Tables[0].Rows[i]["RateMethod"]),


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
        public async Task<ResponseModel> FreightRatesDtlSave(FreightRatesDtlModel freightRatesDtlModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DtlId", freightRatesDtlModel.DtlId),
                            new SqlParameter("@MasterID", freightRatesDtlModel.MasterID),
                            new SqlParameter("@DestState", freightRatesDtlModel.DestState),
                            new SqlParameter("@ToPlace", freightRatesDtlModel.ToPlace),
                            new SqlParameter("@RateTypeId", freightRatesDtlModel.RateTypeId),
                            new SqlParameter("@Rate", freightRatesDtlModel.Rate),



                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "freightRatesDtl_Insert", param);

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
    }


}