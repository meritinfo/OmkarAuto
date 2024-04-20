
using Microsoft.Extensions.Options;
using FreightMasters.Models;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using Shared.Repository;

namespace FreightMasters.Repository
{
    public class DistanceMasterFrtRptRepository : IDistanceMasterFrtRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;

        public DistanceMasterFrtRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<DistanceMasterFrtRptListModel> GetDistanceMasterFrtRptList(ReportRequestModel request)
        {
            DistanceMasterFrtRptListModel distanceMasterRpt = new();
            List<DistanceMasterFrtRptModel> distanceMasterRptList = new();
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
                            new SqlParameter("@FromLocation",   request.FilterStr),
                            new SqlParameter("@ToLocation",     request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDistanceMasterFrtRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            distanceMasterRptList.Add(new DistanceMasterFrtRptModel
                            {
                                OriginPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["OriginPlace"]),
                                Destination = Convert.ToString(dataSet.Tables[0].Rows[i]["Destination"]),
                                KMS = Convert.ToString(dataSet.Tables[0].Rows[i]["KMS"]),
                                ValidFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidFrom"]),
                                ValidUpto = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidUpto"]), 
                            });
                        }

                        distanceMasterRpt.DistanceMasterRptList = distanceMasterRptList;

                        distanceMasterRpt.PageMetaData = new PaginationMetaData
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
            return distanceMasterRpt;
        }
        public async Task<ResponseModel> ExcelDistanceMasterFrtRptList(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {   
                            new SqlParameter("@FromLocation",   request.FilterStr),
                            new SqlParameter("@ToLocation",     request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDistanceMasterFrtRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + dataSet.Tables[0].Rows[0]["Origin Place"].ToString();

                        if (request.FilterStr1!= ""){
                            filter = filter  + " To " + dataSet.Tables[0].Rows[0]["Destination"].ToString();
                        }

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Distance Freight Report", filter);
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
