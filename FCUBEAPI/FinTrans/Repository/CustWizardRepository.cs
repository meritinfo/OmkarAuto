using FinTrans.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Repository
{
    public class CustWizardRepository: ICustWizardRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public CustWizardRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<CustWizardList> GetCustWizardList(PageRequest request)
        {
            CustWizardList custWizardList = new();
            List<CustWizardModel> custList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize", request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder", request.SortOrder),
                            new SqlParameter("@Search", request.Search)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "CustWizardList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            custList.Add(new CustWizardModel
                            {
                                CustwizId = Convert.ToString(dataSet.Tables[0].Rows[i]["CustwizId"]),
                                CashAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CashAc"]),
                                FrtIncomeAc = Convert.ToString(dataSet.Tables[0].Rows[i]["FrtIncomeAc"]),
                                SgstOutputAc = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstOutputAc"]),
                                CgstOutputAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstOutputAc"]),
                                IgstOutputAc = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstOutputAc"]),
                                SgstInputAc = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstInputAc"]),
                                CgstInputAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstInputAc"]),
                                IgstInputAc = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstInputAc"]),
                                LH_LorryHireAc = Convert.ToString(dataSet.Tables[0].Rows[i]["LH_LorryHireAc"]),
                                LH_LorryHirePayableAc = Convert.ToString(dataSet.Tables[0].Rows[i]["LH_LorryHirePayableAc"]),
                                LH_TdsOnLorryHireAc = Convert.ToString(dataSet.Tables[0].Rows[i]["LH_TdsOnLorryHireAc"]),
                                LHP_HamaliAc = Convert.ToString(dataSet.Tables[0].Rows[i]["LHP_HamaliAc"]),
                                LHP_DetentionAc = Convert.ToString(dataSet.Tables[0].Rows[i]["LHP_DetentionAc"]),
                                LHP_OtherChargesAc = Convert.ToString(dataSet.Tables[0].Rows[i]["LHP_OtherChargesAc"]),
                                LHP_LhpmAc = Convert.ToString(dataSet.Tables[0].Rows[i]["LHP_LhpmAc"]),
                                LHP_RecoveryAc = Convert.ToString(dataSet.Tables[0].Rows[i]["LHP_RecoveryAc"]),
                                LHP_OthDedAc = Convert.ToString(dataSet.Tables[0].Rows[i]["LHP_OthDedAc"]),
                                MR_FrtDeductionAc = Convert.ToString(dataSet.Tables[0].Rows[i]["MR_FrtDeductionAc"]),
                                MR_ClaimsByPartyAc = Convert.ToString(dataSet.Tables[0].Rows[i]["MR_ClaimsByPartyAc"]),
                                MR_BadDebtsAc = Convert.ToString(dataSet.Tables[0].Rows[i]["MR_BadDebtsAc"]),
                                MR_MiscDedAc = Convert.ToString(dataSet.Tables[0].Rows[i]["MR_MiscDedAc"]),
                                MR_BankChargesAc = Convert.ToString(dataSet.Tables[0].Rows[i]["MR_BankChargesAc"]),
                                MR_CashDiscAc = Convert.ToString(dataSet.Tables[0].Rows[i]["MR_CashDiscAc"]),
                                MR_ExcessRecdAc = Convert.ToString(dataSet.Tables[0].Rows[i]["MR_ExcessRecdAc"]),
                                MR_TdsDedAc = Convert.ToString(dataSet.Tables[0].Rows[i]["MR_TdsDedAc"]),
                                MR_OthDedAc = Convert.ToString(dataSet.Tables[0].Rows[i]["MR_OthDedAc"]),
                                Flt_TyreStockAc = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_TyreStockAc"]),
                                Flt_TyreExpAc = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_TyreExpAc"]),
                                Flt_TyreSalesAc = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_TyreSalesAc"]),
                                Flt_SparesStockAc = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_SparesStockAc"]),
                                Flt_LubesStockAc = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_LubesStockAc"]),
                               // Flt_VehMa = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_VehMa"]),
                                Flt_TripDrAdvanceAc = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_TripDrAdvanceAc"]),
                                Flt_TripFrtIncomeAc = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_TripFrtIncomeAc"]),
                                Flt_FltFrtReceivableAc = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_FltFrtReceivableAc"]),
                                Flt_TripExpensesAc = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_TripExpensesAc"]),
                                Flt_DslPetroCardAc = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_DslPetroCardAc"]),
                                Flt_HappayCardAc = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_HappayCardAc"]),
                                Flt_TripDslExpAc = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_TripDslExpAc"]),
                                Flt_TripAdblueExpAc = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_TripAdblueExpAc"]),
                                Flt_DriverSalaryAc = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_DriverSalaryAc"]),
                                Flt_TripSuspenseAc = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_TripSuspenseAc"]),
                                Flt_ExtraChargesAc = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_ExtraChargesAc"]),
                                Flt_FrtDedAc = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_FrtDedAc"]),
                                Flt_TdsDedAc = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_TdsDedAc"]),
                                Flt_OthDedAc = Convert.ToString(dataSet.Tables[0].Rows[i]["Flt_OthDedAc"]),
                                MR_Others1RecdAc = Convert.ToString(dataSet.Tables[0].Rows[i]["MR_Others1RecdAc"]),
                                MR_Others2RecdAc = Convert.ToString(dataSet.Tables[0].Rows[i]["MR_Others2RecdAc"]),



                            });
                        }

                        custWizardList.CustList = custList;

                        custWizardList.PageMetaData = new PaginationMetaData
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
            return custWizardList;
        }

        public async Task<CustWizardModel> GetCustWizardDetail()
        {
            CustWizardModel custWizardModel = new();
            try
            {
                if (dbconnection != null)
                {

                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetCustWizardDetail");

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        custWizardModel.CustwizId = Convert.ToString(userData.Tables[0].Rows[0]["CustwizId"]);
                        custWizardModel.CashAc = Convert.ToString(userData.Tables[0].Rows[0]["CashAc"]);
                        custWizardModel.FrtIncomeAc = Convert.ToString(userData.Tables[0].Rows[0]["FrtIncomeAc"]);
                        custWizardModel.SgstOutputAc = Convert.ToString(userData.Tables[0].Rows[0]["SgstOutputAc"]);
                        custWizardModel.CgstOutputAc = Convert.ToString(userData.Tables[0].Rows[0]["CgstOutputAc"]);
                        custWizardModel.IgstOutputAc = Convert.ToString(userData.Tables[0].Rows[0]["IgstOutputAc"]);
                        custWizardModel.SgstInputAc = Convert.ToString(userData.Tables[0].Rows[0]["SgstInputAc"]);
                        custWizardModel.CgstInputAc = Convert.ToString(userData.Tables[0].Rows[0]["CgstInputAc"]);
                        custWizardModel.IgstInputAc = Convert.ToString(userData.Tables[0].Rows[0]["IgstInputAc"]);
                        custWizardModel.LH_LorryHireAc = Convert.ToString(userData.Tables[0].Rows[0]["LH_LorryHireAc"]);
                        custWizardModel.LH_LorryHirePayableAc = Convert.ToString(userData.Tables[0].Rows[0]["LH_LorryHirePayableAc"]);
                        custWizardModel.LH_TdsOnLorryHireAc = Convert.ToString(userData.Tables[0].Rows[0]["LH_TdsOnLorryHireAc"]);
                        custWizardModel.LHP_HamaliAc = Convert.ToString(userData.Tables[0].Rows[0]["LHP_HamaliAc"]);
                        custWizardModel.LHP_DetentionAc = Convert.ToString(userData.Tables[0].Rows[0]["LHP_DetentionAc"]);
                        custWizardModel.LHP_OtherChargesAc = Convert.ToString(userData.Tables[0].Rows[0]["LHP_OtherChargesAc"]);
                        custWizardModel.LHP_LhpmAc = Convert.ToString(userData.Tables[0].Rows[0]["LHP_LhpmAc"]);
                        custWizardModel.LHP_RecoveryAc = Convert.ToString(userData.Tables[0].Rows[0]["LHP_RecoveryAc"]);
                        custWizardModel.LHP_OthDedAc = Convert.ToString(userData.Tables[0].Rows[0]["LHP_OthDedAc"]);
                        custWizardModel.MR_FrtDeductionAc = Convert.ToString(userData.Tables[0].Rows[0]["MR_FrtDeductionAc"]);
                        custWizardModel.MR_ClaimsByPartyAc = Convert.ToString(userData.Tables[0].Rows[0]["MR_ClaimsByPartyAc"]);
                        custWizardModel.MR_BadDebtsAc = Convert.ToString(userData.Tables[0].Rows[0]["MR_BadDebtsAc"]);
                        custWizardModel.MR_MiscDedAc = Convert.ToString(userData.Tables[0].Rows[0]["MR_MiscDedAc"]);
                        custWizardModel.MR_BankChargesAc = Convert.ToString(userData.Tables[0].Rows[0]["MR_BankChargesAc"]);
                        custWizardModel.MR_CashDiscAc = Convert.ToString(userData.Tables[0].Rows[0]["MR_CashDiscAc"]);
                        custWizardModel.MR_ExcessRecdAc = Convert.ToString(userData.Tables[0].Rows[0]["MR_ExcessRecdAc"]);
                        custWizardModel.MR_TdsDedAc = Convert.ToString(userData.Tables[0].Rows[0]["MR_TdsDedAc"]);
                        custWizardModel.MR_OthDedAc = Convert.ToString(userData.Tables[0].Rows[0]["MR_OthDedAc"]);
                        custWizardModel.Flt_TyreStockAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_TyreStockAc"]);
                        custWizardModel.Flt_TyreExpAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_TyreExpAc"]);
                        custWizardModel.Flt_TyreSalesAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_TyreSalesAc"]);
                        custWizardModel.Flt_SparesStockAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_SparesStockAc"]);
                        custWizardModel.Flt_LubesStockAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_LubesStockAc"]);
                        custWizardModel.Flt_VehMaintExpAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_VehMaintExpAc"]);
                        // Flt_VehMa =  Convert.ToString(userData.Tables[0].Rows[0]["Flt_VehMa"]);
                        custWizardModel.Flt_TripDrAdvanceAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_TripDrAdvanceAc"]);
                        custWizardModel.Flt_TripFrtIncomeAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_TripFrtIncomeAc"]);
                        custWizardModel.Flt_FltFrtReceivableAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_FltFrtReceivableAc"]);
                        custWizardModel.Flt_TripExpensesAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_TripExpensesAc"]);
                        custWizardModel.Flt_DslPetroCardAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_DslPetroCardAc"]);
                        custWizardModel.Flt_HappayCardAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_HappayCardAc"]);
                        custWizardModel.Flt_TripDslExpAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_TripDslExpAc"]);
                        custWizardModel.Flt_TripAdblueExpAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_TripAdblueExpAc"]);
                        custWizardModel.Flt_DriverSalaryAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_DriverSalaryAc"]);
                        custWizardModel.Flt_TripSuspenseAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_TripSuspenseAc"]);
                        custWizardModel.Flt_ExtraChargesAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_ExtraChargesAc"]);
                        custWizardModel.Flt_FrtDedAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_FrtDedAc"]);
                        custWizardModel.Flt_TdsDedAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_TdsDedAc"]);
                        custWizardModel.Flt_OthDedAc = Convert.ToString(userData.Tables[0].Rows[0]["Flt_OthDedAc"]);
                        custWizardModel.MR_Others1RecdAc = Convert.ToString(userData.Tables[0].Rows[0]["MR_Others1RecdAc"]);
                        custWizardModel.MR_Others2RecdAc = Convert.ToString(userData.Tables[0].Rows[0]["MR_Others2RecdAc"]);
                    }
                    else
                    {

                    }
                }
            }
            catch (Exception ex)
            {

            }
            return custWizardModel;
        }
        public async Task<ResponseModel> CustWizardSave(CustWizardModel custWizardModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@CustwizId" , custWizardModel.CustwizId ),
                 new SqlParameter("@CashAc" , custWizardModel.CashAc ),
                 new SqlParameter("@FrtIncomeAc" , custWizardModel.FrtIncomeAc ),
                 new SqlParameter("@SgstOutputAc" , custWizardModel.SgstOutputAc ),
                 new SqlParameter("@CgstOutputAc" , custWizardModel.CgstOutputAc ),
                 new SqlParameter("@IgstOutputAc" , custWizardModel.IgstOutputAc ),
                 new SqlParameter("@SgstInputAc" , custWizardModel.SgstInputAc ),
                 new SqlParameter("@CgstInputAc" , custWizardModel.CgstInputAc ),
                 new SqlParameter("@IgstInputAc" , custWizardModel.IgstInputAc ),
                 new SqlParameter("@LH_LorryHireAc" , custWizardModel.LH_LorryHireAc ),
                 new SqlParameter("@LH_LorryHirePayableAc" , custWizardModel.LH_LorryHirePayableAc ),
                 new SqlParameter("@LH_TdsOnLorryHireAc" , custWizardModel.LH_TdsOnLorryHireAc ),
                 new SqlParameter("@LHP_HamaliAc" , custWizardModel.LHP_HamaliAc ),
                 new SqlParameter("@LHP_DetentionAc" , custWizardModel.LHP_DetentionAc ),
                 new SqlParameter("@LHP_OtherChargesAc " , custWizardModel.LHP_OtherChargesAc ),
                 new SqlParameter("@LHP_LhpmAc" , custWizardModel.LHP_LhpmAc ),
                 new SqlParameter("@LHP_RecoveryAc" , custWizardModel.LHP_RecoveryAc ),
                 new SqlParameter("@LHP_OthDedAc" , custWizardModel.LHP_OthDedAc ),
                 new SqlParameter("@MR_FrtDeductionAc" , custWizardModel.MR_FrtDeductionAc ),
                 new SqlParameter("@MR_ClaimsByPartyAc" , custWizardModel.MR_ClaimsByPartyAc ),
                 new SqlParameter("@MR_BadDebtsAc" , custWizardModel.MR_BadDebtsAc ),
                 new SqlParameter("@MR_MiscDedAc" , custWizardModel.MR_MiscDedAc ),
                 new SqlParameter("@MR_BankChargesAc" , custWizardModel.MR_BankChargesAc ),
                 new SqlParameter("@MR_CashDiscAc" , custWizardModel.MR_CashDiscAc ),
                 new SqlParameter("@MR_ExcessRecdAc" , custWizardModel.MR_ExcessRecdAc ),
                 new SqlParameter("@MR_TdsDedAc" , custWizardModel.MR_TdsDedAc ),
                 new SqlParameter("@MR_OthDedAc" , custWizardModel.MR_OthDedAc ),
                 new SqlParameter("@Flt_TyreStockAc" , custWizardModel.Flt_TyreStockAc ),
                 new SqlParameter("@Flt_TyreExpAc" , custWizardModel.Flt_TyreExpAc),
                 new SqlParameter("@Flt_TyreSalesAc" , custWizardModel.Flt_TyreSalesAc ),
                 new SqlParameter("@Flt_SparesStockAc" , custWizardModel.Flt_SparesStockAc ),
                 new SqlParameter("@Flt_LubesStockAc" , custWizardModel.Flt_LubesStockAc ),
                 new SqlParameter("@Flt_VehMaintExpAc" , custWizardModel.Flt_VehMaintExpAc ),
                 new SqlParameter("@Flt_TripDrAdvanceAc" , custWizardModel.Flt_TripDrAdvanceAc ),
                 new SqlParameter("@Flt_TripFrtIncomeAc" , custWizardModel.Flt_TripFrtIncomeAc ),
                 new SqlParameter("@Flt_FltFrtReceivableAc" , custWizardModel.Flt_FltFrtReceivableAc ),
                 new SqlParameter("@Flt_TripExpensesAc" , custWizardModel.Flt_TripExpensesAc ),
                 new SqlParameter("@Flt_DslPetroCardAc" , custWizardModel.Flt_DslPetroCardAc ),
                 new SqlParameter("@Flt_HappayCardAc" , custWizardModel.Flt_HappayCardAc ),
                 new SqlParameter("@Flt_TripDslExpAc" , custWizardModel.Flt_TripDslExpAc ),
                 new SqlParameter("@Flt_TripAdblueExpAc" , custWizardModel.Flt_TripAdblueExpAc ),
                 new SqlParameter("@Flt_DriverSalaryAc" , custWizardModel.Flt_DriverSalaryAc ),
                 new SqlParameter("@Flt_TripSuspenseAc" , custWizardModel.Flt_TripSuspenseAc ),
                 new SqlParameter("@Flt_ExtraChargesAc" , custWizardModel.Flt_ExtraChargesAc ),
                 new SqlParameter("@Flt_FrtDedAc" , custWizardModel.Flt_FrtDedAc ),
                 new SqlParameter("@Flt_TdsDedAc" , custWizardModel.Flt_TdsDedAc ),
                 new SqlParameter("@Flt_OthDedAc" , custWizardModel.Flt_OthDedAc ),
                 new SqlParameter("@MR_Others1RecdAc" , custWizardModel.MR_Others1RecdAc),
                 new SqlParameter("@MR_Others2RecdAc" , custWizardModel.MR_Others2RecdAc),
                   new SqlParameter("@HsdAc" , custWizardModel.HsdAc),
                    new SqlParameter("@DslDiscAc" , custWizardModel.DslDiscAc),
                     new SqlParameter("@DslTdsAc" , custWizardModel.DslTdsAc),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "CustWizard_Insert", param);

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
