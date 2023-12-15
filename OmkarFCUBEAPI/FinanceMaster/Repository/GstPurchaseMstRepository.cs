
using FinanceMaster.Models;
using FinanceMaster.Repository;
using FinanceMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;

namespace FinanceMasters.Repository
{
    public class GstPurchaseMstRepository : IGstPurchaseMstRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public GstPurchaseMstRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save fin schedule master  details
        /// </summary>
        /// <param name="GstPurchaseDtlModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> GstPurchaseMstSave(GstPurchaseMstModel gstPurchaseMstModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Masterid", gstPurchaseMstModel.Masterid),
                            new SqlParameter("@TransDate", gstPurchaseMstModel.TransDate),
                            new SqlParameter("@BranchCode", gstPurchaseMstModel.BranchCode),
                            new SqlParameter("@GstType", gstPurchaseMstModel.GstType),
                            new SqlParameter("@PmtType", gstPurchaseMstModel.PmtType),
                            new SqlParameter("@VendorId", gstPurchaseMstModel.VendorId),
                            new SqlParameter("@VendorName", gstPurchaseMstModel.VendorName),
                            new SqlParameter("@VendorAddress", gstPurchaseMstModel.VendorAddress),
                            new SqlParameter("@VendorState", gstPurchaseMstModel.VendorState),
                            new SqlParameter("@VendorGstNo", gstPurchaseMstModel.VendorGstNo),
                            new SqlParameter("@VendorInvNo", gstPurchaseMstModel.VendorInvNo),
                            new SqlParameter("@VendorInvDt", gstPurchaseMstModel.VendorInvDt),
                            new SqlParameter("@TotalItemAmt", gstPurchaseMstModel.TotalItemAmt),
                            new SqlParameter("@TotalSgstAmt", gstPurchaseMstModel.TotalSgstAmt),
                            new SqlParameter("@TotalCgstAmt", gstPurchaseMstModel.TotalCgstAmt),
                            new SqlParameter("@TotalIgstAmt", gstPurchaseMstModel.TotalIgstAmt),
                            new SqlParameter("@TotalAmount", gstPurchaseMstModel.TotalAmount),
                             new SqlParameter("@TDSAmt", gstPurchaseMstModel.TDSAmt),
                            new SqlParameter("@OtherDedAmt", gstPurchaseMstModel.OtherDedAmt),
                            new SqlParameter("@RoundOff", gstPurchaseMstModel.RoundOff),
                            new SqlParameter("@NetAmount", gstPurchaseMstModel.NetAmount),
                            new SqlParameter("@CreditAc", gstPurchaseMstModel.RoundOff),
                            new SqlParameter("@TdsAc", gstPurchaseMstModel.TdsAc),
                            new SqlParameter("@NeftPmt", gstPurchaseMstModel.NeftPmt),
                            new SqlParameter("@ChequeNo", gstPurchaseMstModel.ChequeNo),
                            new SqlParameter("@ChequeDate", gstPurchaseMstModel.ChequeDate),
                            new SqlParameter("@Findocid", gstPurchaseMstModel.Findocid),
                            new SqlParameter("@FindocidJV", gstPurchaseMstModel.FindocidJV),
                            new SqlParameter("@FindocidOpp", gstPurchaseMstModel.FindocidOpp),
                            new SqlParameter("@FindocidJVOpp", gstPurchaseMstModel.FindocidJVOpp),
                            new SqlParameter("@YearId", gstPurchaseMstModel.YearId),
                            new SqlParameter("@BeneficiaryId", gstPurchaseMstModel.BeneficiaryId),
                            new SqlParameter("@VerifiedYN", gstPurchaseMstModel.VerifiedYN),
                            new SqlParameter("@VerifiedDt", gstPurchaseMstModel.VerifiedDt),
                            new SqlParameter("@VerifiedBy", gstPurchaseMstModel.VerifiedBy),
                            new SqlParameter("@ApprovedYN", gstPurchaseMstModel.ApprovedYN),
                            new SqlParameter("@ApprovedDt", gstPurchaseMstModel.ApprovedDt),
                            new SqlParameter("@ApprovedBy", gstPurchaseMstModel.ApprovedBy),
                            new SqlParameter("@DownloadYN", gstPurchaseMstModel.DownloadYN),
                            new SqlParameter("@DownloadDt", gstPurchaseMstModel.DownloadDt),
                            new SqlParameter("@BankPmtAppRejYN", gstPurchaseMstModel.BankPmtAppRejDt),
                            new SqlParameter("@BankPmtAppRejBy", gstPurchaseMstModel.BankPmtAppRejBy),
                            new SqlParameter("@ActLinkedYN", gstPurchaseMstModel.ActLinkedYN),
                            new SqlParameter("@ActLinkedDt", gstPurchaseMstModel.ActLinkedDt),
                            new SqlParameter("@ActLinkedBy", gstPurchaseMstModel.ActLinkedBy),
                            new SqlParameter("@AttatchFile2", gstPurchaseMstModel.AttatchFile2),
                            new SqlParameter("@ModifyRemarks", gstPurchaseMstModel.ModifyRemarks),
                            new SqlParameter("@LoggedInUser", gstPurchaseMstModel.LoggedInUser)





                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "GstPurchaseMst_Insert", param);

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
