
using FinanceMaster.Models;
using FinanceMaster.Repository;
using FinanceMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;

namespace FinanceMasters.Repository
{
    public class GstPurchaseDtlRepository : IGstPurchaseDtlRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public GstPurchaseDtlRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save fin schedule master  details
        /// </summary>
        /// <param name="GstPurchaseDtlModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> GstPurchaseDtlSave(GstPurchaseDtlModel gstPurchaseDtlModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Detailid", gstPurchaseDtlModel.Detailid),
                            new SqlParameter("@Masterid", gstPurchaseDtlModel.Masterid),
                            new SqlParameter("@DebitAc", gstPurchaseDtlModel.DebitAc),
                            new SqlParameter("@Narration", gstPurchaseDtlModel.Narration),
                            new SqlParameter("@SacHsnCode", gstPurchaseDtlModel.SacHsnCode),
                            new SqlParameter("@SubLedger", gstPurchaseDtlModel.SubLedger),
                            new SqlParameter("@CostCode", gstPurchaseDtlModel.CostCode),
                            new SqlParameter("@ItemAmt", gstPurchaseDtlModel.ItemAmt),
                            new SqlParameter("@SgstPct", gstPurchaseDtlModel.SgstPct),
                            new SqlParameter("@SgstAmt", gstPurchaseDtlModel.SgstAmt),
                            new SqlParameter("@CgstPct", gstPurchaseDtlModel.CgstPct),
                            new SqlParameter("@CgstAmt", gstPurchaseDtlModel.CgstAmt),
                            new SqlParameter("@IgstPct", gstPurchaseDtlModel.IgstPct),
                            new SqlParameter("@IgstAmt", gstPurchaseDtlModel.IgstAmt),
                            new SqlParameter("@TotAmount", gstPurchaseDtlModel.TotAmount),
                            new SqlParameter("@RefDoc", gstPurchaseDtlModel.RefDoc),
                            new SqlParameter("@RefDocNo", gstPurchaseDtlModel.RefDocNo),
                

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "GstPurchaseDtl_Insert", param);

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

        public async Task<GstPurchaseDtlList> GetGstPurchaseDtlList(PageRequest request)
        {
            GstPurchaseDtlList gstPurchaseDtlList = new();
            List<GstPurchaseDtlModel> gstPurchaseList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "GstPurchaseDtlList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            gstPurchaseList.Add(new GstPurchaseDtlModel
                            {
                                Detailid = Convert.ToString(dataSet.Tables[0].Rows[i]["Detailid"]),
                                Masterid = Convert.ToString(dataSet.Tables[0].Rows[i]["Masterid"]),
                                DebitAc = Convert.ToString(dataSet.Tables[0].Rows[i]["DebitAc"]),

                                Narration = Convert.ToString(dataSet.Tables[0].Rows[i]["Narration"]),
                                SacHsnCode = Convert.ToString(dataSet.Tables[0].Rows[i]["SacHsnCode"]),
                                SubLedger = Convert.ToString(dataSet.Tables[0].Rows[i]["SubLedger"]),
                                CostCode = Convert.ToString(dataSet.Tables[0].Rows[i]["CostCode"]),
                                ItemAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["ItemAmt"]),

                                SgstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstPct"]),
                                SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                CgstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstPct"]),
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstPct"]),

                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                TotAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["TotAmount"]),
                                RefDoc = Convert.ToString(dataSet.Tables[0].Rows[i]["RefDoc"]),
                                RefDocNo = Convert.ToString(dataSet.Tables[0].Rows[i]["RefDocNo"]),
                                

                            });
                        }

                        gstPurchaseDtlList.GstPurchaseList = gstPurchaseList;

                        gstPurchaseDtlList.PageMetaData = new PaginationMetaData
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
            return gstPurchaseDtlList;
        }
    }
}
