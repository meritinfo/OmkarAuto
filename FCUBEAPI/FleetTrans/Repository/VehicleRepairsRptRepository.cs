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
    public class VehicleRepairsRptRepository: IVehicleRepairsRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public VehicleRepairsRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<VehicleRepairsRptListModel> GetVehicleRepairsRptList(ReportRequestModel request)
        {
            VehicleRepairsRptListModel vehicleRepairsRpt = new();
            List<VehicleRepairsRptModel> vehicleRepairsRptList = new();
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
                            new SqlParameter("@SpareLubId",          request.FilterStr1),
                            new SqlParameter("@RptType",          request.FilterStr2),

                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleRepairsRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            vehicleRepairsRptList.Add(new VehicleRepairsRptModel
                            {
                                BranchName = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchName"]),
                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                MaintenanceDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["MaintenanceDesc"]),
                                VendorName = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorName"]),
                                VendorGstNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorGstNo"]),
                                GstType = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                ItemAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["ItemAmount"]),

                                SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                ItemNetAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["ItemNetAmount"]),
                                OtherAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherAmount"]),
                                RoundOff = Convert.ToString(dataSet.Tables[0].Rows[i]["RoundOff"]),
                                NetAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmount"]),
                            });
                        }

                        vehicleRepairsRpt.VehicleRepairsRptList = vehicleRepairsRptList;

                        vehicleRepairsRpt.PageMetaData = new PaginationMetaData
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
            return vehicleRepairsRpt;
        }
        public async Task<ResponseModel> GetVehicleRepairsRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@SpareLubId",          request.FilterStr1),
                            new SqlParameter("@RptType",          request.FilterStr2),

                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleRepairsRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Statement From " + request.FromDate + " To " + request.ToDate;

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Vehicle Repairs Report", filter);

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
