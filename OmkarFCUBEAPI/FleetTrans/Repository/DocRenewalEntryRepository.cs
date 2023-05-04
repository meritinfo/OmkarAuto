using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace FleetTrans.Repository
{
    public class DocRenewalEntryRepository : IDocRenewalEntryRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DocRenewalEntryRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        /// <summary>
        /// Service method for save Branch master details
        /// </summary>
        /// <param name=" DocRenewalEntry"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> DocRenewalEntryDetailsSave(DocRenewalEntryModel docRenewalEntryModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DocRenewalEntryId", docRenewalEntryModel.DocRenewalEntryId),
                            new SqlParameter("@TransDate", docRenewalEntryModel.TransDate),
                            new SqlParameter("@DocRenewalID", docRenewalEntryModel.DocRenewalID),
                            new SqlParameter("@VehicleMasterID", docRenewalEntryModel.VehicleMasterID),
                            new SqlParameter("@DocumentRefNo", docRenewalEntryModel.DocumentRefNo),
                            new SqlParameter("@RenewalCompany", docRenewalEntryModel.RenewalCompany),
                            new SqlParameter("@ValidFromDt", docRenewalEntryModel.ValidFromDt),
                            new SqlParameter("@ValidToDt", docRenewalEntryModel.ValidToDt),
                            new SqlParameter("@BasicAmt", docRenewalEntryModel.BasicAmt),
                            new SqlParameter("@SgstPct", docRenewalEntryModel.SgstPct),
                            new SqlParameter("@SgstAmt", docRenewalEntryModel.SgstAmt),
                            new SqlParameter("@CgstPct", docRenewalEntryModel.CgstPct),
                            new SqlParameter("@CgstAmt", docRenewalEntryModel.CgstAmt),
                            new SqlParameter("@IgstPct", docRenewalEntryModel.IgstPct),
                            new SqlParameter("@IgstAmt", docRenewalEntryModel.IgstAmt),
                            new SqlParameter("@HsnCode1", docRenewalEntryModel.HsnCode1),
                            new SqlParameter("@BasicAmt2", docRenewalEntryModel.BasicAmt2),
                            new SqlParameter("@SgstPct2", docRenewalEntryModel.SgstPct2),
                            new SqlParameter("@SgstAmt2", docRenewalEntryModel.SgstAmt2),
                            new SqlParameter("@CgstPct2", docRenewalEntryModel.CgstPct2),
                            new SqlParameter("@CgstAmt2", docRenewalEntryModel.CgstAmt2),
                            new SqlParameter("@IgstPct2", docRenewalEntryModel.IgstPct2),
                            new SqlParameter("@IgstAmt2", docRenewalEntryModel.IgstAmt2),
                            new SqlParameter("@HsnCode2", docRenewalEntryModel.HsnCode2),
                            new SqlParameter("@NonGstAmount", docRenewalEntryModel.NonGstAmount),
                            new SqlParameter("@NonGstAmtDesc", docRenewalEntryModel.NonGstAmtDesc),
                            new SqlParameter("@SubTotal", docRenewalEntryModel.SubTotal),
                            new SqlParameter("@RoundOff", docRenewalEntryModel.RoundOff),
                            new SqlParameter("@NetAmount", docRenewalEntryModel.NetAmount),
                            new SqlParameter("@PmtType", docRenewalEntryModel.PmtType),
                            new SqlParameter("@CreditAc", docRenewalEntryModel.CreditAc),
                            new SqlParameter("@NeftPmt", docRenewalEntryModel.NeftPmt),
                            new SqlParameter("@ChequeNo", docRenewalEntryModel.ChequeNo),
                            new SqlParameter("@ChequeDt", docRenewalEntryModel.ChequeDt),
                            new SqlParameter("@FinDocID", docRenewalEntryModel.FinDocID),
                            new SqlParameter("@Attach1", docRenewalEntryModel.Attach1),
                             new SqlParameter("@Attach2", docRenewalEntryModel.Attach2),
                            new SqlParameter("@Remarks", docRenewalEntryModel.Remarks),
                            new SqlParameter("@BranchCode", docRenewalEntryModel.BranchCode),
                            new SqlParameter("@YearID", docRenewalEntryModel.YearID),
                            new SqlParameter("@DeleteFlag", docRenewalEntryModel.DeleteFlag),
                            new SqlParameter("@LoggedInUser", docRenewalEntryModel.LoggedInUser),
                         
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, " DocRenewalEntryDetails_Insert", param);

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
                //Log exception on database
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

        /// <summary>
        /// Service method for get branch list
        /// </summary>
        /// <returns>List<BranchListModel></returns>
      
        
    }
}
