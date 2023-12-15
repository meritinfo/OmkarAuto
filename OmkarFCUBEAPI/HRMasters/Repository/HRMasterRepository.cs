
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using HRMasters.Models;
using HRMasters.Repository;
using Shared.Models;

namespace FreightMasters.Repository
{
    public class HRMasterRepository : IHRMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public HRMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save HR master details
        /// </summary>
        /// <param name="HRMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> HRMasterSave(HRMasterModel hrMasterModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@HRId", hrMasterModel.HRId),
                            new SqlParameter("@@HRCode", hrMasterModel.HRCode),
                            new SqlParameter("@Description", hrMasterModel.Description),
                            new SqlParameter("@HRType", hrMasterModel.HRType),
                            new SqlParameter("@@LwfYN", hrMasterModel.@LwfYN),
                            new SqlParameter("@Grade", hrMasterModel.Grade),
                            new SqlParameter("@LoggedInUser", hrMasterModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "HRMaster_Insert", param);

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
