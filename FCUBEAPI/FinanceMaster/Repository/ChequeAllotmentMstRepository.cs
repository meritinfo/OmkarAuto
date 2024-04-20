
using FinanceMaster.Models;
using FinanceMasters.Repository;
using FinanceMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;

namespace FinanceMasters.Repository
{
    public class ChequeAllotmentMstRepository : IChequeAllotmentMstRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public ChequeAllotmentMstRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save cheque accounts master details
        /// </summary>
        /// <param name="finAccountsMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> ChequeAllotmentMstSave(ChequeAllotmentMstModel chequeAllotmentMstModel)
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
                            new SqlParameter("@ChequeAllotId", chequeAllotmentMstModel.ChequeAllotId),
                            new SqlParameter("@AllotDate", chequeAllotmentMstModel.AllotDate),
                            new SqlParameter("@BranchCode", chequeAllotmentMstModel.BranchCode),
                            new SqlParameter("@BankCode", chequeAllotmentMstModel.BankCode),
                            new SqlParameter("@StartSeries", chequeAllotmentMstModel.StartSeries),
                            new SqlParameter("@NoOfBooks", chequeAllotmentMstModel.NoOfBooks),
                            new SqlParameter("@NoOfLeavesBook", chequeAllotmentMstModel.NoOfLeavesBook),
                            new SqlParameter("@EndSeries", chequeAllotmentMstModel.EndSeries),
                            new SqlParameter("@StatusComplete", chequeAllotmentMstModel.StatusComplete),
                            new SqlParameter("@YearID", chequeAllotmentMstModel.YearID),                         
                            new SqlParameter("@LoggedInUser", chequeAllotmentMstModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "ChequeAllotmentMst_Insert", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0 )
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
