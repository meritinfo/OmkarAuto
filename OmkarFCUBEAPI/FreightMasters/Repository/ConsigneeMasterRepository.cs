
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using FreightMasters.Models;

namespace FreightMasters.Repository
{
    public class ConsigneeMasterRepository : IConsigneeMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public ConsigneeMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save product master details
        /// </summary>
        /// <param name="consigneeMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> ConsigneeMasterSave(ConsigneeMasterModel consigneeMasterModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@CnorCneeID", consigneeMasterModel.CnorCneeID),
                            new SqlParameter("@CnorCneeName", consigneeMasterModel.CnorCneeName),
                            new SqlParameter("@PrintName", consigneeMasterModel.PrintName),
                            new SqlParameter("@CnorCneeFlag", consigneeMasterModel.CnorCneeFlag),
                            new SqlParameter("@BranchCode", consigneeMasterModel.BranchCode),
                            new SqlParameter("@Address1", consigneeMasterModel.Address1),
                            new SqlParameter("@Address2", consigneeMasterModel.Address2),
                            new SqlParameter("@Address3", consigneeMasterModel.Address3),
                            new SqlParameter("@Address4", consigneeMasterModel.Address4),
                            new SqlParameter("@StateCode", consigneeMasterModel.StateCode),
                            new SqlParameter("@PinCode", consigneeMasterModel.PinCode),
                            new SqlParameter("@Phone", consigneeMasterModel.Phone),
                            new SqlParameter("@Email", consigneeMasterModel.Email),
                            new SqlParameter("@ContactPerson1", consigneeMasterModel.ContactPerson1),
                            new SqlParameter("@Mobile1", consigneeMasterModel.Mobile1),
                            new SqlParameter("@ContactPerson2", consigneeMasterModel.ContactPerson2),
                            new SqlParameter("@Mobile2", consigneeMasterModel.Mobile2),
                            new SqlParameter("@ContactPerson3", consigneeMasterModel.ContactPerson3),
                            new SqlParameter("@Mobile3", consigneeMasterModel.Mobile3),
                            new SqlParameter("@GstNo", consigneeMasterModel.GstNo),
                            new SqlParameter("@VendorCode", consigneeMasterModel.VendorCode),
                            new SqlParameter("@IsActive", consigneeMasterModel.IsActive),
                            new SqlParameter("@InActiveDate", consigneeMasterModel.InActiveDate),
                            new SqlParameter("@AccountID", consigneeMasterModel.AccountID),
                            new SqlParameter("@LoggedInUser", consigneeMasterModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "ConsigneeMaster_Insert", param);

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
