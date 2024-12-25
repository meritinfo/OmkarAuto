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
    public class LhPayableStatusRptRepository:ILhPayableStatusRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;

        public LhPayableStatusRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<LhPayableStatusRptListModel> GetLhPayableStatusRptList(ReportRequestModel request)
        {
            LhPayableStatusRptListModel lhPayableStatusRpt = new();

            List<LhPayableStatusRptModel> lhPayableStatusRptList = new();
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
                            new SqlParameter("@RptType",     request.FilterStr),
                            new SqlParameter("@Broker",    request.FilterStr1),


                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLhPayableStatusRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            lhPayableStatusRptList.Add(new LhPayableStatusRptModel
                            {
                                ChStnName = Convert.ToString(dataSet.Tables[0].Rows[i]["ChStnName"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                ChallanDateTime = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanDateTime"]),
                                ChFromPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["ChFromPlace"]),
                                ChToPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["ChToPlace"]),
                                BalPayAt = Convert.ToString(dataSet.Tables[0].Rows[i]["BalPayAt"]),
                                BrokerName = Convert.ToString(dataSet.Tables[0].Rows[i]["BrokerName"]),
                                BrokerMblNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BrokerMblNo"]),
                                TruckNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckNo"]),
                                HireAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["HireAmt"]),
                                HirePaid = Convert.ToString(dataSet.Tables[0].Rows[i]["HirePaid"]),
                                TotDed = Convert.ToString(dataSet.Tables[0].Rows[i]["TotDed"]),
                                ExtHamali = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtHamali"]),
                                ExtDeten = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtDeten"]),
                                ExtOth = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtOth"]),
                            });
                        }

                        lhPayableStatusRpt.LhPayableStatusRptList = lhPayableStatusRptList;

                        lhPayableStatusRpt.PageMetaData = new PaginationMetaData
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
            return lhPayableStatusRpt;
        }
        public async Task<ResponseModel> GetLhPayableStatusRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@RptType",    request.FilterStr),
                            new SqlParameter("@Broker",    request.FilterStr1),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLhPayableStatusRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");
                       

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Lorry Hire Payable", filter);
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
