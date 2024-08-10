
using Microsoft.Extensions.Options;
using FreightMasters.Models;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using Shared.Repository;

namespace FreightMasters.Repository
{
    public class LRWithOutChallanRptRepository : ILRWithOutChallanRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;

        public LRWithOutChallanRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<LRWithOutChallanRptListModel> GetLRWithOutChallanRptList(ReportRequestModel request)
        {
            LRWithOutChallanRptListModel lRWithOutChallanRpt = new();
            
            List<LRWithOutChallanRptModel> lRWithOutChallanRptList = new();
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
                            new SqlParameter("@Origin",     request.FilterStr2),
                            new SqlParameter("@Destination",     request.FilterStr3),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLRWithOutChallanRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            lRWithOutChallanRptList.Add(new LRWithOutChallanRptModel
                            {
                                BookedAt = Convert.ToString(dataSet.Tables[0].Rows[i]["BookedAt"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                BookingStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingStatus"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                FromLocation = Convert.ToString(dataSet.Tables[0].Rows[i]["FromLocation"]),
                                ToLocation = Convert.ToString(dataSet.Tables[0].Rows[i]["ToLocation"]),
                                TruckNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckNo"]),
                                NoPackages = Convert.ToString(dataSet.Tables[0].Rows[i]["NoPackages"]),
                                ActualWt = Convert.ToString(dataSet.Tables[0].Rows[i]["ActualWt"]),
                                Chargewt = Convert.ToString(dataSet.Tables[0].Rows[i]["Chargewt"]),
                                Billparty = Convert.ToString(dataSet.Tables[0].Rows[i]["Billparty"]),
                                VehTypeDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["VehTypeDesc"]),
                                GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["GtotalRs"]),
                                 
                            });
                        }

                        lRWithOutChallanRpt.LRWithOutChallanRptList = lRWithOutChallanRptList;

                        lRWithOutChallanRpt.PageMetaData = new PaginationMetaData
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
            return lRWithOutChallanRpt;
        }
        public async Task<ResponseModel> GetLRWithOutChallanRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@Origin",     request.FilterStr2),
                            new SqlParameter("@Destination",     request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLRWithOutChallanRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter  + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "LR With Out Challan Report", filter);
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
