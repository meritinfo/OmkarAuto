using FinanceMaster.Models;
using FinanceMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data;
using System.Data.SqlClient;
using Shared.Models;
using DocumentFormat.OpenXml.Spreadsheet;

namespace FinanceMasters.Repository
{
    public class FinAccountsMasterRepository : IFinAccountsMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public FinAccountsMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save fin accounts master details
        /// </summary>
        /// <param name="finAccountsMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> FinAccountsMasterSave(FinAccountsMasterModel finAccountsMasterModel)
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
                            new SqlParameter("@AccountId"			, finAccountsMasterModel.AccountId              ),
                            new SqlParameter("@AccountName"		    , finAccountsMasterModel.AccountName            ),
                            new SqlParameter("@AccountType"		    , finAccountsMasterModel.AccountType            ),
                            new SqlParameter("@SubAccountType"      , finAccountsMasterModel.SubAccountType         ),
                            new SqlParameter("@AccountGroupFlag"	, finAccountsMasterModel.AccountGroupFlag       ),
                            new SqlParameter("@GroupSortId"		    , finAccountsMasterModel.GroupSortId            ),
                            new SqlParameter("@AccountLedgerType"	, finAccountsMasterModel.AccountLedgerType      ),
                            new SqlParameter("@PrintName"			, finAccountsMasterModel.PrintName              ),
                            new SqlParameter("@AccountAddress1"	    , finAccountsMasterModel.AccountAddress1        ),
                            new SqlParameter("@AccountAddress2"		, finAccountsMasterModel.AccountAddress2        ),
                            new SqlParameter("@AccountAddress3"	    , finAccountsMasterModel.AccountAddress3        ),
                            new SqlParameter("@AccountAddress4"	    , finAccountsMasterModel.AccountAddress4        ),
                            new SqlParameter("@StateCode"			, finAccountsMasterModel.StateCode              ),
                            new SqlParameter("@PinCode"			    , finAccountsMasterModel.PinCode                ),
                            new SqlParameter("@AccountPhone"		, finAccountsMasterModel.AccountPhone           ),
                            new SqlParameter("@AccountContact"		, finAccountsMasterModel.AccountContact1        ),
                            new SqlParameter("@AccountMobile"		, finAccountsMasterModel.AccountMobile1         ),
                            new SqlParameter("@AccountFax"			, finAccountsMasterModel.AccountFax             ),
                            new SqlParameter("@AccountEmail"		, finAccountsMasterModel.AccountEmail1          ),
                            new SqlParameter("@AccountUrl"			, finAccountsMasterModel.AccountUrl             ),
                            new SqlParameter("@AccountTAN"			, finAccountsMasterModel.AccountTAN             ),
                            new SqlParameter("@AccountPAN"			, finAccountsMasterModel.AccountPAN             ),
                            new SqlParameter("@GstNo"				, finAccountsMasterModel.AccountGstNo           ),
                            new SqlParameter("@TDSRate"			    , finAccountsMasterModel.TDSRate                ),
                            new SqlParameter("@AccountCreditDays"	, finAccountsMasterModel.AccountCreditDays      ),
                            new SqlParameter("@AccountCreditLimit"  , finAccountsMasterModel.AccountCreditLimit     ),
                            new SqlParameter("@AccountSecurityDep"  , finAccountsMasterModel.AccountSecurityDep     ),
                            new SqlParameter("@AccountIntrstRate"	, finAccountsMasterModel.AccountInterestRate    ),
                            new SqlParameter("@AccountBG"			, finAccountsMasterModel.AccountBG              ),
                            new SqlParameter("@AccountRemRef"		, finAccountsMasterModel.AccountRemRef          ),
                            new SqlParameter("@AccountStatus"		, "Y"                                           ),
                            new SqlParameter("@GlobalAc"			, finAccountsMasterModel.GlobalAc               ),
                            new SqlParameter("@HO_Account"			, finAccountsMasterModel.HO_Account             ),
                            new SqlParameter("@IsLiabilityYNType"	, finAccountsMasterModel.IsExpForLiabilityYN    ),
                            new SqlParameter("@SubLedgerYN"		    , finAccountsMasterModel.SubLedgerYN            ),
                            new SqlParameter("@SubLedgerQry"		, finAccountsMasterModel.SubLedgerQry           ),
                            new SqlParameter("@CostCodeYN"			, finAccountsMasterModel.CostCodeYN             ),
                            new SqlParameter("@ManualJv"			, finAccountsMasterModel.ManualJv               ),
                            new SqlParameter("@IsAdminExpYN"		, finAccountsMasterModel.IsAdminExpYN           ),
                            new SqlParameter("@HideBranch"			, finAccountsMasterModel.HideBranch             ),
                            new SqlParameter("@HideNonAdmin"		, finAccountsMasterModel.HideNonAdmin           ),
                            new SqlParameter("@TdsLedgerYN"		    , finAccountsMasterModel.TdsLedgerYN            ),
                            new SqlParameter("@OnlineActiveYn"		, finAccountsMasterModel.OnlineActiveYn         ),
                            new SqlParameter("@Username"			, finAccountsMasterModel.Username               ),
                            new SqlParameter("@Password"			, finAccountsMasterModel.Password               ),
                            new SqlParameter("@SendEmail"			, finAccountsMasterModel.SendEmail              ),
                            new SqlParameter("@PartyType"			, finAccountsMasterModel.PartyType              ),
                            new SqlParameter("@ContractValidity"	, finAccountsMasterModel.ContractValidity       ),
                            new SqlParameter("@StaxEX"				, finAccountsMasterModel.StaxEX                 ),
                            new SqlParameter("@VendorCode"			, finAccountsMasterModel.VendorCode             ),
                            new SqlParameter("@BankName"			, finAccountsMasterModel.BankName               ),
                            new SqlParameter("@BankBranch"			, finAccountsMasterModel.BankBranch             ),
                            new SqlParameter("@BankAcType"			, finAccountsMasterModel.BankAcType             ),
                            new SqlParameter("@BankAcNo"			, finAccountsMasterModel.BankAcNo               ),
                            new SqlParameter("@BankIfsc"			, finAccountsMasterModel.BankIfsc               ),
                            new SqlParameter("@BlockAct"			, finAccountsMasterModel.BlockAct               ),
                            new SqlParameter("@StatusColor"		    , finAccountsMasterModel.StatusColor            ),
                            new SqlParameter("@DeleteFlag"			, "N"                                           ),
                            new SqlParameter("@SchID"				, finAccountsMasterModel.SchID                  ),
                            new SqlParameter("@CreatedBy"			, finAccountsMasterModel.LoggedInUserID         ),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_FinAccountSave", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status    = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message   = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
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
                        responseModel.Status    = false;
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
        public async Task<FinAccountsMasterList> GetFinAccountsMasterList(PageRequest request)
        {
            FinAccountsMasterList finAccountsMasterList = new();
            List<FinAccountsMasterModel> finAccountsList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFinAccountDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            finAccountsList.Add(new FinAccountsMasterModel
                            {
                                AccountId           = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountId"]),
                                AccountName         = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountName"]),
                                LedgerName          = Convert.ToString(dataSet.Tables[0].Rows[i]["LedgerName"]),
                                SubAccountName      = Convert.ToString(dataSet.Tables[0].Rows[i]["SubAccountName"]),
                                AccountType         = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountType"]),
                                SubAccountType      = Convert.ToString(dataSet.Tables[0].Rows[i]["SubAccountType"]),
                                AccountLedgerType   = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountLedgerType"]),
                                SchID               = Convert.ToString(dataSet.Tables[0].Rows[i]["SchID"]),
                                PrintName           = Convert.ToString(dataSet.Tables[0].Rows[i]["PrintName"]),
                                AccountAddress1     = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountAddress1"]),
                                AccountAddress2     = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountAddress2"]),
                                AccountAddress3     = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountAddress3"]),
                                AccountAddress4     = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountAddress4"]),
                                StateCode           = Convert.ToString(dataSet.Tables[0].Rows[i]["StateCode"]),
                                PinCode             = Convert.ToString(dataSet.Tables[0].Rows[i]["PinCode"]),
                                AccountPhone        = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountPhone"]),
                                AccountFax          = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountFax"]),
                                AccountContact1     = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountContact1"]),
                                AccountMobile1      = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountMobile1"]),
                                AccountEmail1       = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountEmail1"]),
                                AccountUrl          = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountUrl"]),
                                AccountPAN          = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountPAN"]),
                                AccountTAN          = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountTAN"]),
                                AccountGstNo        = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountGstNo"]),
                                AccountCreditDays   = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountCreditDays"]),
                                AccountCreditLimit  = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountCreditLimit"]),
                                AccountInterestRate = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountInterestRate"]),
                                AccountSecurityDep  = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountSecurityDep"]),
                                AccountBG           = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountBG"]),
                                AccountRemRef       = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountRemRef"]),
                                AccountStatus       = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountStatus"]),
                                GlobalAc            = Convert.ToString(dataSet.Tables[0].Rows[i]["GlobalAc"]),
                                HO_Account          = Convert.ToString(dataSet.Tables[0].Rows[i]["HO_Account"]),
                                IsExpForLiabilityYN = Convert.ToString(dataSet.Tables[0].Rows[i]["IsExpForLiabilityYN"]),
                                SubLedgerYN         = Convert.ToString(dataSet.Tables[0].Rows[i]["SubLedgerYN"]),
                                SubLedgerQry        = Convert.ToString(dataSet.Tables[0].Rows[i]["SubLedgerQry"]),
                                CostCodeYN          = Convert.ToString(dataSet.Tables[0].Rows[i]["CostCodeYN"]),
                                ManualJv            = Convert.ToString(dataSet.Tables[0].Rows[i]["ManualJv"]),
                                IsAdminExpYN        = Convert.ToString(dataSet.Tables[0].Rows[i]["IsAdminExpYN"]),
                                HideBranch          = Convert.ToString(dataSet.Tables[0].Rows[i]["HideBranch"]),
                                HideNonAdmin        = Convert.ToString(dataSet.Tables[0].Rows[i]["HideNonAdmin"]),
                                TdsLedgerYN         = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsLedgerYN"]),
                                OnlineActiveYn      = Convert.ToString(dataSet.Tables[0].Rows[i]["OnlineActiveYn"]),
                                Username            = Convert.ToString(dataSet.Tables[0].Rows[i]["Username"]),
                                Password            = Convert.ToString(dataSet.Tables[0].Rows[i]["UserPwd"]),
                                SendEmail           = Convert.ToString(dataSet.Tables[0].Rows[i]["SendEmail"]),
                                PartyType           = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyType"]),
                                ContractValidity    = Convert.ToString(dataSet.Tables[0].Rows[i]["ContractValidity"]),
                                BlockAct            = Convert.ToString(dataSet.Tables[0].Rows[i]["BlockAct"]),
                                StatusColor         = Convert.ToString(dataSet.Tables[0].Rows[i]["StatusColor"]),
                                VendorCode          = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorCode"]),
                                BankName            = Convert.ToString(dataSet.Tables[0].Rows[i]["BankName"]),
                                BankBranch          = Convert.ToString(dataSet.Tables[0].Rows[i]["BankBranch"]),
                                BankAcType          = Convert.ToString(dataSet.Tables[0].Rows[i]["BankAcType"]),
                                BankAcNo            = Convert.ToString(dataSet.Tables[0].Rows[i]["BankAcNo"]),
                                BankIfsc            = Convert.ToString(dataSet.Tables[0].Rows[i]["BankIfsc"]),
                            });
                        }

                        finAccountsMasterList.FinaccountList = finAccountsList;

                        finAccountsMasterList.PageMetaData = new PaginationMetaData
                        {
                            TotalCount  = totalRecords,
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
            return finAccountsMasterList;
        }
        public async Task<List<DropDownListModel>> GetFinActLedgertype()
        {
            List<DropDownListModel> LedgerList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFinActLedgertype", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            LedgerList.Add(new DropDownListModel
                            {
                                DataId      = Convert.ToString(statusData.Tables[0].Rows[i]["DataId"]),
                                DataName    = Convert.ToString(statusData.Tables[0].Rows[i]["DataName"]),
                            });
                        }
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
            return LedgerList;
        }
        public async Task<List<DropDownListModel>> GetEmpList()
        {
            List<DropDownListModel> EmpList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            EmpList.Add(new DropDownListModel
                            {
                                DataId      = Convert.ToString(statusData.Tables[0].Rows[i]["DataId"]),
                                DataName    = Convert.ToString(statusData.Tables[0].Rows[i]["DataName"]),
                            });
                        }
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
            return EmpList;
        }

        public async Task<ResponseModel> FinAccountsGSTSave(FinAccountsMasterGstModel finAccountsMasterModel)
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
                    responseModel = await FinAccountGstDtlsDelete(transaction, finAccountsMasterModel.AccountId);
                    if (!responseModel.Status)
                    {
                        transaction.Rollback();
                    }
                    else
                    {
                        for (int i = 0; i < finAccountsMasterModel.finAccountsGstDetail.Count; i++)
                        {

                            SqlParameter[] param =
                            {
                                new SqlParameter("@AccountId"   , finAccountsMasterModel.finAccountsGstDetail[i].AccountId  ),
                                new SqlParameter("@Location"    , finAccountsMasterModel.finAccountsGstDetail[i].Location   ),
                                new SqlParameter("@GstNo"       , finAccountsMasterModel.finAccountsGstDetail[i].GstNo      ),
                                new SqlParameter("@Address1"    , finAccountsMasterModel.finAccountsGstDetail[i].Address1   ),
                                new SqlParameter("@Address2"    , finAccountsMasterModel.finAccountsGstDetail[i].Address2   ),
                                new SqlParameter("@Address3"    , finAccountsMasterModel.finAccountsGstDetail[i].Address3   ),
                                new SqlParameter("@Address4"    , finAccountsMasterModel.finAccountsGstDetail[i].Address4   ),
                                new SqlParameter("@City"        , finAccountsMasterModel.finAccountsGstDetail[i].City       ),
                                new SqlParameter("@StateCode"   , finAccountsMasterModel.finAccountsGstDetail[i].StateCode  ),
                                new SqlParameter("@PinCode"     , finAccountsMasterModel.finAccountsGstDetail[i].PinCode    ),
                                new SqlParameter("@MobileNo"    , finAccountsMasterModel.finAccountsGstDetail[i].MobileNo   ),
                                new SqlParameter("@Email"       , finAccountsMasterModel.finAccountsGstDetail[i].Email      ),
                            };
                            var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_FinAccountGSTSave", param);

                            if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                            {
                                responseModel.Status    = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                                responseModel.Message   = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                                if (!responseModel.Status)
                                {
                                   transaction.Rollback();
                                    i = finAccountsMasterModel.finAccountsGstDetail.Count;
                                }
                            }
                            else
                            {
                                responseModel.Status = false;
                                transaction.Rollback();
                            }
                        }
                        if (responseModel.Status)
                        {
                            transaction.Commit();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<ResponseModel> FinAccountGstDtlsDelete(SqlTransaction transaction, string req)
        {
            ResponseModel responseModel = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@AccountID", req),
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_FinAccountGSTDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
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

        public async Task<ResponseModel> FinAccountGstDelete(RequestModel request)
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
                    responseModel = await FinAccountGstDtlsDelete(transaction, request.strRequest);                    
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }

        public async Task<FinAccountsMasterGstModel> GetFinAccountGstList(RequestModel request)
        {
            FinAccountsMasterGstModel finAccountsMaster = new();
            List<FinAccountsMasterGstDetail> finAccountsMasterlist = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@AccountId", request.strRequest)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFinAccountGstInnerGrid", param);
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            finAccountsMasterlist.Add(new FinAccountsMasterGstDetail
                            {
                                AccountId = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountId"]),
                                Location = Convert.ToString(dataSet.Tables[0].Rows[i]["Location"]),
                                GstNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GstNo"]),
                                Address1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address1"]),
                                Address2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address2"]),
                                Address3 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address3"]),
                                Address4 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address4"]),
                                City = Convert.ToString(dataSet.Tables[0].Rows[i]["City"]),
                                StateCode = Convert.ToString(dataSet.Tables[0].Rows[i]["StateCode"]),
                                PinCode = Convert.ToString(dataSet.Tables[0].Rows[i]["PinCode"]),
                                MobileNo = Convert.ToString(dataSet.Tables[0].Rows[i]["MobileNo"]),
                                Email = Convert.ToString(dataSet.Tables[0].Rows[i]["Email"]),                               
                            });
                        }

                        finAccountsMaster.finAccountsGstDetail = finAccountsMasterlist;
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return finAccountsMaster;
        }

    }
}
