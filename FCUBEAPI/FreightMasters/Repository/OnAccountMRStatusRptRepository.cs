using FreightMasters.Models;
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

namespace FreightMasters.Repository
{
    public class OnAccountMRStatusRptRepository : IOnAccountMRStatusRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;

        public OnAccountMRStatusRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<OnAccountMRStatusRptListModel> GetOnAccountMRStatusRptList(ReportRequestModel request)
        {
            OnAccountMRStatusRptListModel onAccountMRStatusRpt = new();

            List<OnAccountMRStatusRptModel> onAccountMRStatusRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",     request.FilterStr1),
                            new SqlParameter("@RptType",     request.FilterStr2),
                            

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getOnAccountMRStatusRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            onAccountMRStatusRptList.Add(new OnAccountMRStatusRptModel
                            {
                                MrStn = Convert.ToString(dataSet.Tables[0].Rows[i]["MrStn"]),
                                MrNo = Convert.ToString(dataSet.Tables[0].Rows[i]["MrNo"]),
                                MrDate = Convert.ToString(dataSet.Tables[0].Rows[i]["MrDate"]),
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                CrAdviceNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CrAdviceNo"]),
                                OnAcAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcAmt"]),
                                OnAcStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcStatus"]),
                                MrType = Convert.ToString(dataSet.Tables[0].Rows[i]["MrType"]),
                                OnAcAdjAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcAdjAmt"]),
                                PendingAdjAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["PendingAdjAmt"]),
                                AdjInmr = Convert.ToString(dataSet.Tables[0].Rows[i]["AdjInmr"]),
                                AdjMrdate = Convert.ToString(dataSet.Tables[0].Rows[i]["AdjMrdate"]),
                                AdjAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["AdjAmt"]),
                                AsOndate = Convert.ToString(dataSet.Tables[0].Rows[i]["AsOndate"]),

                            });
                        }

                        onAccountMRStatusRpt.OnAccountMRStatusRptList = onAccountMRStatusRptList;

                        onAccountMRStatusRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return onAccountMRStatusRpt;
        }
        public async Task<ResponseModel> GetOnAccountMRStatusRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",     request.FilterStr1),
                            new SqlParameter("@RptType",     request.FilterStr2),
                           
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getOnAccountMRStatusRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "On A/c MR Status Report", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
    }
}
