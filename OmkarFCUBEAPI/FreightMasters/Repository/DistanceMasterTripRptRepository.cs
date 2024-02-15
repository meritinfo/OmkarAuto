
using Microsoft.Extensions.Options;
using FreightMasters.Models;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using Shared.Repository;

namespace FreightMasters.Repository
{
    public class DistanceMasterTripRptRepository : IDistanceMasterTripRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public DistanceMasterTripRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<DistanceMasterTripRptListModel> GetDistanceMasterTripRptList(ReportRequestModel request)
        {
            DistanceMasterTripRptListModel distanceMasterTripRpt = new();
            List<DistanceMasterTripRptModel> distanceMasterTripRptList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDistanceMasterTripRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            distanceMasterTripRptList.Add(new DistanceMasterTripRptModel
                            {
                                OriginPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["OriginPlace"]),
                                Destination = Convert.ToString(dataSet.Tables[0].Rows[i]["Destination"]),
                                KMS = Convert.ToString(dataSet.Tables[0].Rows[i]["KMS"]),
                                EnrouteExpTruck = Convert.ToString(dataSet.Tables[0].Rows[i]["EnrouteExpTruck"]),
                                EnrouteExpTrailer = Convert.ToString(dataSet.Tables[0].Rows[i]["EnrouteExpTrailer"]),
                                EnrouteExpCarCarrier = Convert.ToString(dataSet.Tables[0].Rows[i]["EnrouteExpCarCarrier"]),
                                EnrouteExpEmpty = Convert.ToString(dataSet.Tables[0].Rows[i]["EnrouteExpEmpty"]),
                                EnrouteExpRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["EnrouteExpRemarks"]),
                            });
                        }

                        distanceMasterTripRpt.DistanceMasterTripRptList = distanceMasterTripRptList;

                        distanceMasterTripRpt.PageMetaData = new PaginationMetaData
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
            return distanceMasterTripRpt;
        }
        public async Task<ResponseModel> ExcelDistanceMasterTripRptList(ReportRequestModel request)
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDistanceMasterTripRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + dataSet.Tables[0].Rows[0]["Origin Place"].ToString();

                        if (request.FilterStr1!= "")
                        {
                            filter = filter  + " To " + dataSet.Tables[0].Rows[0]["Destination"].ToString();
                        }

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Distance Trip Report", filter);
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
