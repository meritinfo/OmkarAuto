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
    public class CompanyInfoRepository: ICompanyInfoRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public CompanyInfoRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<CompanyInfoModel> GetCompanyDetail()
        {
            CompanyInfoModel companyInfoModel = new();
            try
            {
                if (dbconnection != null)
                {
                  
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetCompanyDetail");

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        companyInfoModel.CompanyName = Convert.ToString(userData.Tables[0].Rows[0]["CompanyName"]);
                        companyInfoModel.CompanyShortCode = Convert.ToString(userData.Tables[0].Rows[0]["CompanyShortCode"]);
                        companyInfoModel.Address1 = Convert.ToString(userData.Tables[0].Rows[0]["Address1"]);
                        companyInfoModel.Address2 = Convert.ToString(userData.Tables[0].Rows[0]["Address2"]);
                        companyInfoModel.Address3 = Convert.ToString(userData.Tables[0].Rows[0]["Address3"]);
                        companyInfoModel.City = Convert.ToString(userData.Tables[0].Rows[0]["City"]);
                        companyInfoModel.State = Convert.ToString(userData.Tables[0].Rows[0]["State"]);
                        companyInfoModel.PinCode = Convert.ToString(userData.Tables[0].Rows[0]["PinCode"]);
                        companyInfoModel.OffPhone1 = Convert.ToString(userData.Tables[0].Rows[0]["OffPhone1"]);
                        companyInfoModel.OffPhone2 = Convert.ToString(userData.Tables[0].Rows[0]["OffPhone2"]);
                        companyInfoModel.OffPhone3 = Convert.ToString(userData.Tables[0].Rows[0]["OffPhone3"]);
                        companyInfoModel.OffMbl = Convert.ToString(userData.Tables[0].Rows[0]["OffMbl"]);
                        companyInfoModel.Email = Convert.ToString(userData.Tables[0].Rows[0]["Email"]);
                        companyInfoModel.Email2 = Convert.ToString(userData.Tables[0].Rows[0]["Email2"]);
                        companyInfoModel.WebUrl = Convert.ToString(userData.Tables[0].Rows[0]["WebUrl"]);
                        companyInfoModel.PanNo = Convert.ToString(userData.Tables[0].Rows[0]["PanNo"]);
                        companyInfoModel.GstNo = Convert.ToString(userData.Tables[0].Rows[0]["GstNo"]);
                        companyInfoModel.CinNo = Convert.ToString(userData.Tables[0].Rows[0]["CinNo"]);
                        companyInfoModel.Jurisdiction = Convert.ToString(userData.Tables[0].Rows[0]["Jurisdiction"]);
                        companyInfoModel.MSMENo = Convert.ToString(userData.Tables[0].Rows[0]["MSMENo"]);
                        companyInfoModel.Bank1Name = Convert.ToString(userData.Tables[0].Rows[0]["Bank1Name"]);
                        companyInfoModel.Bank1Add = Convert.ToString(userData.Tables[0].Rows[0]["Bank1Add"]);
                        companyInfoModel.Bank1AcNo = Convert.ToString(userData.Tables[0].Rows[0]["Bank1AcNo"]);
                        companyInfoModel.Bank1Ifsc = Convert.ToString(userData.Tables[0].Rows[0]["Bank1Ifsc"]);
                        companyInfoModel.Bank2Name = Convert.ToString(userData.Tables[0].Rows[0]["Bank2Name"]);
                        companyInfoModel.Bank2Add = Convert.ToString(userData.Tables[0].Rows[0]["Bank2Add"]);
                        companyInfoModel.Bank2AcNo = Convert.ToString(userData.Tables[0].Rows[0]["Bank2AcNo"]);
                        companyInfoModel.Bank2Ifsc = Convert.ToString(userData.Tables[0].Rows[0]["Bank2Ifsc"]);
                    }
                    else
                    {

                    }
                }
            }
            catch (Exception ex)
            {

            }
            return companyInfoModel;
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
                            new SqlParameter("@CompanyID", "1"),
                            new SqlParameter("@CompanyName", companyInfoModel.CompanyName),
                            new SqlParameter("@CompanyShortCode", companyInfoModel.CompanyShortCode),
                         
                            new SqlParameter("@Address1", companyInfoModel.Address1),
                            new SqlParameter("@Address2", companyInfoModel.Address2),
                            new SqlParameter("@Address3", companyInfoModel.Address3),
                            new SqlParameter("@City", companyInfoModel.City),
                             new SqlParameter("@State", companyInfoModel.State),
                             new SqlParameter("@PinCode", companyInfoModel.PinCode),
                              new SqlParameter("@OffPhone1", companyInfoModel.OffPhone1),
                              new SqlParameter("@OffPhone2", companyInfoModel.OffPhone2),
                            new SqlParameter("@OffPhone3", companyInfoModel.OffPhone3),
                            
                                  new SqlParameter("@OffMbl", companyInfoModel.OffMbl),
                            new SqlParameter("@Email", companyInfoModel.Email),
                            new SqlParameter("@Email2", companyInfoModel.Email2),
                            new SqlParameter("@WebUrl", companyInfoModel.WebUrl),
                            new SqlParameter("@PanNo", companyInfoModel.PanNo),
                            new SqlParameter("@GstNo", companyInfoModel.GstNo),
                            new SqlParameter("@CinNo", companyInfoModel.CinNo),
                            new SqlParameter("@Jurisdiction", companyInfoModel.Jurisdiction),
                            new SqlParameter("@MSMENo", companyInfoModel.MSMENo),
                         new SqlParameter("@Bank1Name", companyInfoModel.Bank1Name),
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
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "CompanyInfo_Update", param);

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
