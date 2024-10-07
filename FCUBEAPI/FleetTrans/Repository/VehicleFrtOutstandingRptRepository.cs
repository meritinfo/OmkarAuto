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
    public class VehicleFrtOutstandingRptRepository: IVehicleFrtOutstandingRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public VehicleFrtOutstandingRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<VehicleFrtOutstandingRptListModel> GetVehicleFrtOutstandingRptList(ReportRequestModel request)
        {
            VehicleFrtOutstandingRptListModel vehicleFrtOutstandingRpt = new();
            List<VehicleFrtOutstandingRptModel> vehicleFrtOutstandingRptList = new();
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
                            new SqlParameter("@VehicleMasterId",          request.FilterStr),
                            new SqlParameter("@Party",          request.FilterStr1),
                            new SqlParameter("@RptType",          request.FilterStr2),

                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleFrtOutstandingRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            vehicleFrtOutstandingRptList.Add(new VehicleFrtOutstandingRptModel
                            {
                                Branch = Convert.ToString(dataSet.Tables[0].Rows[i]["Branch"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                TripNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TripNo"]),
                                LoadDate = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadDate"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                FromPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlace"]),
                                ToPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]),

                                TotalHire = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalHire"]),
                                RecdAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["RecdAmt"]),
                                DedAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["DedAmt"]),
                                TdsAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsAmt"]),
                                DueAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["DueAmt"]),
                                 
                            });
                        }

                        vehicleFrtOutstandingRpt.VehicleFrtOutstandingRptList = vehicleFrtOutstandingRptList;

                        vehicleFrtOutstandingRpt.PageMetaData = new PaginationMetaData
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
            return vehicleFrtOutstandingRpt;
        }
        public async Task<ResponseModel> GetVehicleFrtOutstandingRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@VehicleMasterId",          request.FilterStr),
                            new SqlParameter("@Party",          request.FilterStr1),
                            new SqlParameter("@RptType",          request.FilterStr2),

                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleFrtOutstandingRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Vehicle Freight Outstanding Report " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy") + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Vehicle Freight Outstanding Report", filter);

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
