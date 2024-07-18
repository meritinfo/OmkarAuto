using FreightMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    internal class CompanyInfoRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public CompanyInfoRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> CompanyInfoSave(CompanyInfoModel companyInfoModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@CompanyID", companyInfoModel.CompanyID),
                            new SqlParameter("@CompanyName", companyInfoModel.CompanyName),
                            new SqlParameter("@CompanyShortCode", companyInfoModel.CompanyShortCode),
                         
                            new SqlParameter("@Address1", companyInfoModel.Address1),
                            new SqlParameter("@Address2", companyInfoModel.Address2),
                            new SqlParameter("@Address3", companyInfoModel.Address3),
                            new SqlParameter("@City", companyInfoModel.City),
                            new SqlParameter("@OffPhone3", companyInfoModel.OffPhone3),
                            new SqlParameter("@Email", companyInfoModel.Email),
                            new SqlParameter("@Email2", companyInfoModel.Email2),
                            new SqlParameter("@WebUrl", companyInfoModel.WebUrl),
                            new SqlParameter("@PanNo", companyInfoModel.PanNo),
                            new SqlParameter("@GstNo", companyInfoModel.GstNo),
                            new SqlParameter("@CinNo", companyInfoModel.CinNo),
                            new SqlParameter("@Jurisdiction", companyInfoModel.Jurisdiction),
                            new SqlParameter("@MSMENo", companyInfoModel.MSMENo),
                       
                            new SqlParameter("@Bank1Add", companyInfoModel.Bank1Add),
                            new SqlParameter("@Bank1AcNo", companyInfoModel.Bank1AcNo),
                            new SqlParameter("@Bank1Ifsc", companyInfoModel.Bank1Ifsc),
                            new SqlParameter("@Bank2Name", companyInfoModel.Bank2Name),
                            new SqlParameter("@Bank2Add", companyInfoModel.Bank2Add),
                            new SqlParameter("@Bank2AcNo", companyInfoModel.Bank2AcNo),
                            new SqlParameter("@Bank2Ifsc", companyInfoModel.Bank2Ifsc),
                           // new SqlParameter("@LockYN", companyInfoModel.LockYN),
                            //new SqlParameter("@LoggedInUser", companyInfoModel.LoggedInUser),
                           
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "CompanyInfo_Insert", param);

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
