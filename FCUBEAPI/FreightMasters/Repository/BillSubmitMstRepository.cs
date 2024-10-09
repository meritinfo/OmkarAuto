using FinanceMaster.Models;
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
    public class BillSubmitMstRepository: IBillSubmitMstRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public BillSubmitMstRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> BillSubmitMstSave(BillSubmitMasterModel billSubmitMasterModel)
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
                             new SqlParameter("@SubmitMstId" , billSubmitMasterModel.SubmitMstId),
                             new SqlParameter("@SubmitStn" , billSubmitMasterModel.SubmitStn),
                             new SqlParameter("@SubmitNo" , billSubmitMasterModel.SubmitNo),
                             new SqlParameter("@SubmitDt" , billSubmitMasterModel.SubmitDt),
                             new SqlParameter("@SubmitType" , billSubmitMasterModel.SubmitType),
                             new SqlParameter("@CourierCo" , billSubmitMasterModel.CourierCo),
                             new SqlParameter("@CourierDocketNo" , billSubmitMasterModel.CourierDocketNo),
                             new SqlParameter("@PartyCode" , billSubmitMasterModel.PartyCode),
                             new SqlParameter("@SubmitLocation" , billSubmitMasterModel.SubmitLocation),
                             new SqlParameter("@DeptId" , billSubmitMasterModel.DeptId),
                             new SqlParameter("@BillsUptoDt" , billSubmitMasterModel.BillsUptoDt),
                             new SqlParameter("@KindAttnTo" , billSubmitMasterModel.KindAttnTo),
                             new SqlParameter("@Remarks" , billSubmitMasterModel.Remarks),
                             new SqlParameter("@PartyAcceptDt" , billSubmitMasterModel.PartyAcceptDt),
                             new SqlParameter("@PartyAccceptRemarks" , billSubmitMasterModel.PartyAccceptRemarks),
                             new SqlParameter("@TotalSubmitAmt" , billSubmitMasterModel.TotalSubmitAmt),
                             new SqlParameter("@YearID" , billSubmitMasterModel.YearID),
                            new SqlParameter("@LoggedInUser",       billSubmitMasterModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TyrePurchaseMasterSave", param);
                    string PurchaseMasterID = "0";
                    //if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    //{
                    //    responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                    //    responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    //    PurchaseMasterID = Convert.ToString(responseModel.Message);

                    //    if (responseModel.Status)
                    //    {
                    //        for (int i = 0; i < billSubmitMasterModel.TyrePurchaseDtlList.Count; i++)
                    //        {
                    //            billSubmitMasterModel.TyrePurchaseDtlList[i].PurchaseMasterID = PurchaseMasterID;
                    //            billSubmitMasterModel.TyrePurchaseDtlList[i].PurchaseDate = billSubmitMasterModel.PurchaseDate;

                    //            responseModel = await TyrePurchaseMasterDetailSave(transaction, billSubmitMasterModel.TyrePurchaseDtlList[i]);
                    //            if (!responseModel.Status)
                    //            {
                    //                transaction.Rollback();
                    //                i = billSubmitMasterModel.TyrePurchaseDtlList.Count;
                    //            }
                    //        }
                    //    }
                    //}
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


    }
}
