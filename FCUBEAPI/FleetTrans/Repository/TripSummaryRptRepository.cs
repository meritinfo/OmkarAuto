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
    public class TripSummaryRptRepository: ITripSummaryRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public TripSummaryRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<TripSummaryRptListModel> GetTripSummaryRptList(ReportRequestModel request)
        {
            TripSummaryRptListModel tripSummaryRpt = new();
            List<TripSummaryRptModel> tripSummaryRptList = new();
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
                            new SqlParameter("@VehicleMasterId",    request.FilterStr),
                            new SqlParameter("@DriverMasterId",          request.FilterStr1),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripSummaryRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tripSummaryRptList.Add(new TripSummaryRptModel
                            {
                                TripBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["TripBranch"]),
                                TripNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TripNo"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                StmtDate = Convert.ToString(dataSet.Tables[0].Rows[i]["StmtDate"]),
                                DeptDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DeptDate"]),
                                EndDate = Convert.ToString(dataSet.Tables[0].Rows[i]["EndDate"]),
                                NoOfDays = Convert.ToString(dataSet.Tables[0].Rows[i]["NoOfDays"]),
                                DistanceTripKM = Convert.ToString(dataSet.Tables[0].Rows[i]["DistanceTripKM"]),
                                TripTotalFreight = Convert.ToString(dataSet.Tables[0].Rows[i]["TripTotalFreight"]),
                                TripTotalExpenses = Convert.ToString(dataSet.Tables[0].Rows[i]["TripTotalExpenses"]),
                                TripMargin = Convert.ToString(dataSet.Tables[0].Rows[i]["TripMargin"]),
                                MarginPerKM = Convert.ToString(dataSet.Tables[0].Rows[i]["MarginPerKM"]),
                                TripStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["TripStatus"]),
                              

                            });
                        }

                        tripSummaryRpt.TripSummaryRptlist = tripSummaryRptList;

                        tripSummaryRpt.PageMetaData = new PaginationMetaData
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
            return tripSummaryRpt;
        }
        public async Task<ResponseModel> ExcelTripSummaryRptList(ReportRequestModel request)
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
                            new SqlParameter("@VehicleMasterID",          request.FilterStr),
                            new SqlParameter("@DriverMasterId",            request.FilterStr1),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripSummaryRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Trip Vehicle Summary " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy") + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Trip Vehicle Summary", filter);

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
