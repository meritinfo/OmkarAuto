
using FinanceMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;

namespace FinanceMasters.Repository
{
    public class ChequeAllotmentDtlRepository : IChequeAllotmentDtlRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public ChequeAllotmentDtlRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save cheque accounts master details
        /// </summary>
        /// <param name="finAccountsMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> ChequeAllotmentDtlSave(ChequeAllotmentDtlModel ChequeAllotmentDtlModel)
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
                            new SqlParameter("@ChequeID", ChequeAllotmentDtlModel.ChequeID),
                            new SqlParameter("@ChequeAllotId", ChequeAllotmentDtlModel.ChequeAllotId),
                            new SqlParameter("@BankCode", ChequeAllotmentDtlModel.BankCode),
                            new SqlParameter("@BranchCode", ChequeAllotmentDtlModel.BranchCode),
                            new SqlParameter("@ChequeNo", ChequeAllotmentDtlModel.ChequeNo),
                            new SqlParameter("@CheqStatus", ChequeAllotmentDtlModel.CheqStatus),
                            new SqlParameter("@ChqValue", ChequeAllotmentDtlModel.ChqValue),
                            new SqlParameter("@ChqUsedValue", ChequeAllotmentDtlModel.ChqUsedValue),
                            new SqlParameter("@CancelRemarks", ChequeAllotmentDtlModel.CancelRemarks),
                            new SqlParameter("@CancelBy", ChequeAllotmentDtlModel.CancelBy),
                            new SqlParameter("@CancelDate", ChequeAllotmentDtlModel.CancelDate),
                            new SqlParameter("@CancelChqAttach", ChequeAllotmentDtlModel.CancelChqAttach),
                            new SqlParameter("@CheqValDefinedBy", ChequeAllotmentDtlModel.CheqValDefinedBy),
                            new SqlParameter("@CheqValDefinedDate", ChequeAllotmentDtlModel.CheqValDefinedDate),
                            new SqlParameter("@CheqValModifiedBy", ChequeAllotmentDtlModel.CheqValDefinedBy),
                            new SqlParameter("@CheqValModifiedDate", ChequeAllotmentDtlModel.CheqValModifiedDate),
                            new SqlParameter("@LoggedInUser", ChequeAllotmentDtlModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "ChequeAllotmentDtl_Insert", param);

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
    }
}
