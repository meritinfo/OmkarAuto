using FinTrans.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using Shared.Repository;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Repository
{
    public class PlTransferRepository: IPlTransferRepository 
    {
        private readonly IOptions<DBModel> dbconnection;
        private ISharedRepository sharedRepository;
        public PlTransferRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository =  _sharedRepository;
        }
        public async Task<PlTransferModel> PlTransferList(RequestModel request)
        {
            PlTransferModel plTransferModel = new()
            {
                PlTransferDetails = new List<PlTransferDetails>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                      new SqlParameter("@Branch", request.strRequest),
                      new SqlParameter("@YearId", request.strRequest1)
                    }; 
                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getPLTransferList", param);
                    if (resultData != null  && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            plTransferModel.PlTransferDetails.Add(new PlTransferDetails
                            {
                                AccountName= Convert.ToString(resultData.Tables[0].Rows[i] ["AccountName"]),
                                AccountId = Convert.ToString(resultData.Tables[0].Rows[i]["AccountId"]),
                                DrAmt     = Convert.ToString(resultData.Tables[0].Rows[i]["DrAmt"]),
                                CrAmt     = Convert.ToString(resultData.Tables[0].Rows[i]["CrAmt"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return plTransferModel;
        }

        public async Task<ResponseModel> PLTransferSave(PlTransferModel plTransfer)
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
                      new SqlParameter("@TfrYear"      , plTransfer.TfrYear),
                      new SqlParameter("@TfrBranch"    , plTransfer.TfrBranch),
                      new SqlParameter("@TfrTotalDrAmt", plTransfer.TfrTotalDrAmt),
                      new SqlParameter("@TfrTotalCrAmt", plTransfer.TfrTotalCrAmt),
                      new SqlParameter("@TfrPLAmt"     , plTransfer.TfrPLAmt),
                      new SqlParameter("@LoggedInUser" , plTransfer.LoggedInUser),
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_PLTransferSave", param);
                    string MasterID = "0";

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        MasterID = Convert.ToString(responseModel.Message);
                    }
                    if (responseModel.Status)
                    {
                        for (int i = 0; i < plTransfer.PlTransferDetails.Count; i++)
                        {
                            plTransfer.PlTransferDetails[i].TfrId = MasterID.ToString();
                            responseModel = await PLTransferDetailSave(transaction, plTransfer.PlTransferDetails[i]);
                            if (!responseModel.Status)
                            {
                                transaction.Rollback();
                                i = plTransfer.PlTransferDetails.Count;
                            }
                        }
                    }
                    if (responseModel.Status)
                    {
                        transaction.Commit();
                    }
                    else { transaction.Rollback(); }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<ResponseModel> PLTransferDetailSave(SqlTransaction transaction, PlTransferDetails plTransfer)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                      new SqlParameter("@TfrId"    ,   plTransfer.TfrId),
                      new SqlParameter("@AccountId",   plTransfer.AccountId),
                      new SqlParameter("@DrAmt"    ,   plTransfer.DrAmt),
                      new SqlParameter("@CrAmt"    ,   plTransfer.CrAmt),
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_PLTransferDetailSave", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                    }
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
            }
            return responseModel;
        }
    }
}
