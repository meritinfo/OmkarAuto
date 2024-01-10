using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using AdminMasters.Models;
using Shared.Models;

namespace AdminMasters.Repository
{
    public class HrMasterRepository : IHrMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public HrMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save role master details
        /// </summary>
        /// <param name="roleMasterModel"></param>
        /// <returns>ResponseModel</returns>
        /// 
        public async Task<HrMasterList> GetHrMasterList(PageRequest request)
        {
            HrMasterList hrMasterList = new();
            List<HrMasterModel> hrList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "HrMasterList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            hrList.Add(new HrMasterModel
                            {
                                HRId = Convert.ToString(dataSet.Tables[0].Rows[i]["HRId"]),
                                HRCode = Convert.ToString(dataSet.Tables[0].Rows[i]["HRCode"]),

                                Description = Convert.ToString(dataSet.Tables[0].Rows[i]["Description"]),
                                HrType = Convert.ToString(dataSet.Tables[0].Rows[i]["HrType"]),



                            });
                        }

                        hrMasterList.HrList = hrList;

                        hrMasterList.PageMetaData = new PaginationMetaData
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
            return hrMasterList;
        }

    

    public async Task<ResponseModel> HrMasterSave(HrMasterModel hrMasterModel)
    {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@HrId", hrMasterModel.HRId),
                            new SqlParameter("@HRCode", hrMasterModel.HRCode),
                            new SqlParameter("@Description", hrMasterModel.Description),
                            new SqlParameter("@HrType", hrMasterModel.HrType),
                             new SqlParameter("@LoggedInUser", hrMasterModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "HrMasterNew_Insert", param);

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
