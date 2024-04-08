using FleetTrans.Models;
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

namespace FleetTrans.Repository
{
    public class TripStatusRptRepository : ITripStatusRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public TripStatusRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<TripStatusRptListModel> GetTripStatusRptList(ReportRequestModel request)
        {
            TripStatusRptListModel tripStatusRpt = new();
            List<TripStatusRptModel> tripStatusRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",         request.PageNumber),
                            new SqlParameter("@PageSize",           request.PageSize),
                            new SqlParameter("@SortColumn",         request.SortColumn),
                            new SqlParameter("@SortOrder",          request.SortOrder),
                            new SqlParameter("@Search",             request.Search),
                            new SqlParameter("@FromDate",           request.FromDate),
                            new SqlParameter("@ToDate",             request.ToDate),
                            new SqlParameter("@TripLink",           request.FilterStr),
                            new SqlParameter("@Status",             request.FilterStr1),
                            new SqlParameter("@VehicleMasterid",    request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripStatusRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tripStatusRptList.Add(new TripStatusRptModel
                            {
                                Branch = Convert.ToString(dataSet.Tables[0].Rows[i]["Branch"]),
                                TripOpenDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TripOpenDate"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                TripNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TripNo"]),
                                ExUlDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ExUlDate"]),
                                DistanceTripKM_1 = Convert.ToString(dataSet.Tables[0].Rows[i]["DistanceTripKM_1"]),
                                FromPoint = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPoint"]),
                                ToPoint = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPoint"]),
                              //  TripStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["TripStatus"]),
                              //  TripCloseDt = Convert.ToString(dataSet.Tables[0].Rows[i]["TripCloseDt"]),
                              //  TripLinkYN = Convert.ToString(dataSet.Tables[0].Rows[i]["TripLinkYN"]),
                             //   LoadType = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadType"]),
                            });
                        }

                        tripStatusRpt.TripStatusRptlist = tripStatusRptList;

                        tripStatusRpt.PageMetaData = new PaginationMetaData
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
            return tripStatusRpt;
        }
        public async Task<ResponseModel> GetTripStatusRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {

                            new SqlParameter("@FromDate",           request.FromDate),
                            new SqlParameter("@ToDate",             request.ToDate),
                            new SqlParameter("@TripLink",           request.FilterStr),
                            new SqlParameter("@Status",             request.FilterStr1),
                            new SqlParameter("@VehicleMasterid",    request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripStatusRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Payment From " + request.FromDate + " To " + request.ToDate;
                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Trip Status Report", filter);
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
