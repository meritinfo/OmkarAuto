using Microsoft.Extensions.Options;
using FinTrans.Models;
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
 
        public class OpBrsEntryRepository : IOpBrsEntryRepository
        {
            private readonly IOptions<DBModel> dbconnection;

            public OpBrsEntryRepository(IOptions<DBModel> _dbconnection)
            {
                dbconnection = _dbconnection;
            }
        /// <param name="BrandMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> OpBrsEntrySave(BrsEntryModel brsEntryModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TransId", brsEntryModel.TransId),
                            new SqlParameter("@TransDate", brsEntryModel.TransDate),
                            new SqlParameter("@BankAc", brsEntryModel.BankAc),
                            new SqlParameter("@DocNo", brsEntryModel.DocNo),
                            new SqlParameter("@DebitRs", brsEntryModel.DebitRs),
                            new SqlParameter("@CreditRs", brsEntryModel.CreditRs),
                            new SqlParameter("@ChequeNo", brsEntryModel.ChequeNo),
                            new SqlParameter("@ChequeDate", brsEntryModel.ChequeDate),
                            new SqlParameter("@Narration", brsEntryModel.Narration),
                            new SqlParameter("@ClearDate", brsEntryModel.ClearDate),
                            new SqlParameter("@YearId", brsEntryModel.YearId),
                            new SqlParameter("@Typesign", brsEntryModel.Typesign),
                            new SqlParameter("@OtherAc", brsEntryModel.OtherAc),
                            new SqlParameter("@AmountRs", brsEntryModel.AmountRs),
                            new SqlParameter("@BranchCode", brsEntryModel.BranchCode),
                          new SqlParameter("@LoggedInUser", brsEntryModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "OpBrsEntry_Insert", param);

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
        public async Task<OpBrsEntryList> GetOpBrsEntryList(PageRequest request)
        {
            OpBrsEntryList opBrsEntryList = new();
            List<BrsEntryModel> brsEntryList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "OpBrsEntryList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            brsEntryList.Add(new BrsEntryModel
                            {
                                TransId = Convert.ToString(dataSet.Tables[0].Rows[i]["TransId"]),
                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),

                                DebitRs = Convert.ToString(dataSet.Tables[0].Rows[i]["DebitRs"]),
                                BankAc = Convert.ToString(dataSet.Tables[0].Rows[i]["BankAc"]),
                                DocNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DocNo"]),
                           
                                CreditRs = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditRs"]),

                                ChequeNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeNo"]),
                                ChequeDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDate"]),
                                Narration = Convert.ToString(dataSet.Tables[0].Rows[i]["Narration"]),
                                ClearDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ClearDate"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                OtherAc = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherAc"]),
                                AmountRs = Convert.ToString(dataSet.Tables[0].Rows[i]["AmountRs"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser"]),



                            });
                        }

                        opBrsEntryList.BrsEntryList = brsEntryList;

                        opBrsEntryList.PageMetaData = new PaginationMetaData
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
            return opBrsEntryList;
        }
    }
}
