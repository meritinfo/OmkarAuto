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
    public class TripOutstandingRptRepository: ITripOutstandingRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public TripOutstandingRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<TripOutstandingRptListModel> GetTripOutstandingRptList(ReportRequestModel request)
        {
            TripOutstandingRptListModel tripOutstandingRpt = new();
            List<TripOutstandingRptModel> tripOutstandingRptList = new();
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
                            new SqlParameter("@Party",          request.FilterStr1),
                             
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripOutstandingRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tripOutstandingRptList.Add(new TripOutstandingRptModel
                            {
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                TripNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TripNo"]),
                                TripDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TripDate"]),
                                OwnMarket = Convert.ToString(dataSet.Tables[0].Rows[i]["OwnMarket"]),
                                ChBrCode = Convert.ToString(dataSet.Tables[0].Rows[i]["ChBrCode"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                TripFromPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["TripFromPlace"]),
                                TripToPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["TripToPlace"]),
                                TptName = Convert.ToString(dataSet.Tables[0].Rows[i]["TptName"]),
                                TotalHire = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalHire"]),
                                RecdAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["RecdAmt"]),
                                DedAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["DedAmt"]),
                                TdsAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsAmt"]),
                                ExtraAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraAmt"]),

                            });
                        }

                        tripOutstandingRpt.TripOutstandingRptlist = tripOutstandingRptList;

                        tripOutstandingRpt.PageMetaData = new PaginationMetaData
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
            return tripOutstandingRpt;
        }
        public async Task<ResponseModel> ExcelTripOutstandingRptList(ReportRequestModel request)
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
                            new SqlParameter("@Party",            request.FilterStr1),
                          
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripOutstandingRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Trip Outstanding report " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy") + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Trip Outstanding report", filter);

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
