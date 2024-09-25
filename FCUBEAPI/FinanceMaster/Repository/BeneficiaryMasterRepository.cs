using FinanceMaster.Models;
using FinanceMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Repository
{
    public class BeneficiaryMasterRepository: IBeneficiaryMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public BeneficiaryMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> BeneficiaryMasterSave(BeneficiaryMasterModel beneficiaryMasterModel)
        {
            ResponseModel responseModel = new();

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                             new SqlParameter("@MasterId" , beneficiaryMasterModel.MasterId),
                             new SqlParameter("@BenType" , beneficiaryMasterModel.BenType),
                             new SqlParameter("@BenCode" , beneficiaryMasterModel.BenCode),
                             new SqlParameter("@BenName" , beneficiaryMasterModel.BenName),
                             new SqlParameter("@BenCoAcName" , beneficiaryMasterModel.BenCoAcName),
                             new SqlParameter("@BenAdd1" , beneficiaryMasterModel.BenAdd1),
                             new SqlParameter("@BenAdd2" , beneficiaryMasterModel.BenAdd2),
                             new SqlParameter("@BenAdd3 " , beneficiaryMasterModel.BenAdd3 ),
                             new SqlParameter("@PinCode" , beneficiaryMasterModel.PinCode),
                             new SqlParameter("@StateCode" , beneficiaryMasterModel.StateCode),
                             new SqlParameter("@BenPhone" , beneficiaryMasterModel.BenPhone),
                             new SqlParameter("@BenMobile" , beneficiaryMasterModel.BenMobile),
                             new SqlParameter("@BenEmail" , beneficiaryMasterModel.BenEmail),
                             new SqlParameter("@BenBankName" , beneficiaryMasterModel.BenBankName),
                             new SqlParameter("@BenBankBranch" , beneficiaryMasterModel.BenBankBranch),
                             new SqlParameter("@BenBankAcNo" , beneficiaryMasterModel.BenBankAcNo),
                             new SqlParameter("@BenBankIfsc" , beneficiaryMasterModel.BenBankIfsc),
                             new SqlParameter("@AmountLimit" , beneficiaryMasterModel.AmountLimit),
                             new SqlParameter("@Remarks" , beneficiaryMasterModel.Remarks),
                             new SqlParameter("@CancelCheqAttach" , beneficiaryMasterModel.CancelCheqAttach),
                             new SqlParameter("@VendorAttachedfile" , beneficiaryMasterModel.VendorAttachedfile),
                             new SqlParameter("@BenRefByEmployeeId" , beneficiaryMasterModel.BenRefByEmployeeId),
                             new SqlParameter("@ApprovedBy" , beneficiaryMasterModel.ApprovedBy),
                             new SqlParameter("@ApprovedDate" , beneficiaryMasterModel.ApprovedDate),
                             new SqlParameter("@ApprovedRemarks" , beneficiaryMasterModel.ApprovedRemarks),
                             new SqlParameter("@ApiUsedForApp" , beneficiaryMasterModel.ApiUsedForApp),
                             new SqlParameter("@BlockYN" , beneficiaryMasterModel.BlockYN),
                             new SqlParameter("@BlockDate" , beneficiaryMasterModel.BlockDate),
                             new SqlParameter("@BlockBy" , beneficiaryMasterModel.BlockBy),
                             new SqlParameter("@BlockReason" , beneficiaryMasterModel.BlockReason),
                           //  new SqlParameter("@DeleteFlag" , beneficiaryMasterModel.DeleteFlag),
                             new SqlParameter("@PanNo" , beneficiaryMasterModel.PanNo),
                             new SqlParameter("@GlobalYN" , beneficiaryMasterModel.GlobalYN),
                             new SqlParameter("@BranchCode" , beneficiaryMasterModel.BranchCode),
                             new SqlParameter("@LoggedInUserID" , beneficiaryMasterModel.LoggedInUserID),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BeneficiaryMasterSave", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]))
                        {
                            transaction.Commit();
                        }
                        else
                        {
                            transaction.Rollback();
                        }
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<ResponseModel> BeneficiaryMasterDelete(RequestModel requestModel)
        {
            ResponseModel responseModel = new();

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BeneficiaryMasterDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status) { transaction.Commit(); }
                        else { transaction.Rollback(); }
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }


        public async Task<BeneficiaryMasterList> GetBeneficiaryMasterList(PageRequest request)
        {
            BeneficiaryMasterList beneficiaryMasterList = new();
            List<BeneficiaryMasterModel> beneficiaryList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber"  , request.PageNumber),
                            new SqlParameter("@PageSize"    , request.PageSize),
                            new SqlParameter("@SortColumn"  , request.SortColumn),
                            new SqlParameter("@SortOrder"   , request.SortOrder),
                            new SqlParameter("@Search"      , request.Search)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBeneficiaryMasterlist", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            beneficiaryList.Add(new BeneficiaryMasterModel
                            {
                                MasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterId"]),
                                BenType = Convert.ToString(dataSet.Tables[0].Rows[i]["BenType"]),
                                BenCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BenCode"]),
                                BenName = Convert.ToString(dataSet.Tables[0].Rows[i]["BenName"]),
                                BenCoAcName = Convert.ToString(dataSet.Tables[0].Rows[i]["BenCoAcName"]),
                                BenAdd1 = Convert.ToString(dataSet.Tables[0].Rows[i]["BenAdd1"]),
                                BenAdd2 = Convert.ToString(dataSet.Tables[0].Rows[i]["BenAdd2"]),
                                BenAdd3 = Convert.ToString(dataSet.Tables[0].Rows[i]["BenAdd3"]),
                                PinCode = Convert.ToString(dataSet.Tables[0].Rows[i]["PinCode"]),
                                StateCode = Convert.ToString(dataSet.Tables[0].Rows[i]["StateCode"]),
                                BenPhone = Convert.ToString(dataSet.Tables[0].Rows[i]["BenPhone"]),
                                BenMobile = Convert.ToString(dataSet.Tables[0].Rows[i]["BenMobile"]),
                                BenEmail = Convert.ToString(dataSet.Tables[0].Rows[i]["BenEmail"]),
                                BenBankName = Convert.ToString(dataSet.Tables[0].Rows[i]["BenBankName"]),
                                BenBankBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["BenBankBranch"]),
                                BenBankAcNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BenBankAcNo"]),
                                BenBankIfsc = Convert.ToString(dataSet.Tables[0].Rows[i]["BenBankIfsc"]),
                                AmountLimit = Convert.ToString(dataSet.Tables[0].Rows[i]["AmountLimit"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                CancelCheqAttach = Convert.ToString(dataSet.Tables[0].Rows[i]["CancelCheqAttach"]),
                                VendorAttachedfile = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorAttachedfile"]),
                                BenRefByEmployeeId = Convert.ToString(dataSet.Tables[0].Rows[i]["BenRefByEmployeeId"]),
                                ApprovedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ApprovedBy"]),
                                ApprovedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ApprovedDate"]),
                                ApprovedRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["ApprovedRemarks"]),
                                ApiUsedForApp = Convert.ToString(dataSet.Tables[0].Rows[i]["ApiUsedForApp"]),
                                BlockYN = Convert.ToString(dataSet.Tables[0].Rows[i]["BlockYN"]),
                                BlockDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BlockDate"]),
                                BlockBy = Convert.ToString(dataSet.Tables[0].Rows[i]["BlockBy"]),
                                BlockReason = Convert.ToString(dataSet.Tables[0].Rows[i]["BlockReason"]),
                               // DeleteFlag = Convert.ToString(dataSet.Tables[0].Rows[i]["DeleteFlag"]),
                                PanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["PanNo"]),
                                GlobalYN = Convert.ToString(dataSet.Tables[0].Rows[i]["GlobalYN"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                LoggedInUserID = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUserID"]),
                            });
                        }

                        beneficiaryMasterList.BeneficiaryList = beneficiaryList;

                        beneficiaryMasterList.PageMetaData = new PaginationMetaData
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
            return beneficiaryMasterList;
        }
    }
}
