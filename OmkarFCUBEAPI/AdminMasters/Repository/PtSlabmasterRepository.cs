using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using AdminMasters.Models;
using Shared.Models;



namespace AdminMasters.Repository
{
    public class PtSlabmasterRepository : IPtSlabmasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public PtSlabmasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save role master details
        /// </summary>
        /// <param name="roleMasterModel"></param>
        /// <returns>ResponseModel</returns>
        /// 
    
  
    public async Task<ResponseModel> PtSlabMasterSave(PtSlabMasterModel hrTypeModel)
    {
        ResponseModel responseModel = new();
        try
        {
            if (dbconnection != null)
            {
                SqlParameter[] param =
                    {
                            new SqlParameter("@PtId", hrTypeModel.PtId),
                            new SqlParameter("@StateCode", hrTypeModel.StateCode),
                            new SqlParameter("@RangeFrom", hrTypeModel.RangeFrom),
                              new SqlParameter("@RangeTo", hrTypeModel.RangeTo),
                                new SqlParameter("@PtDedAmt", hrTypeModel.PtDedAmt),

                             new SqlParameter("@LoggedInUser", hrTypeModel.LoggedInUser)

                        };
                var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "PtSlabmaster_Insert", param);

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
        public async Task<PtSlabList> GetPtSlabMasterList(PageRequest request)
        {
            PtSlabList ptSlabList = new();
            List<PtSlabMasterModel> slabList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "PtSlabMasterList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            slabList.Add(new PtSlabMasterModel
                            {
                                PtId = Convert.ToString(dataSet.Tables[0].Rows[i]["PtId"]),
                                StateCode = Convert.ToString(dataSet.Tables[0].Rows[i]["StateCode"]),

                                RangeFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["RangeFrom"]),
                                RangeTo = Convert.ToString(dataSet.Tables[0].Rows[i]["RangeTo"]),
                                PtDedAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["PtDedAmt"]),




                            });
                        }

                        ptSlabList.SlabList = slabList;

                        ptSlabList.PageMetaData = new PaginationMetaData
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
            return ptSlabList;
        }


    }


}


