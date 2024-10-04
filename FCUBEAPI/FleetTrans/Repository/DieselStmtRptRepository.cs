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
    public class DieselStmtRptRepository: IDieselStmtRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public DieselStmtRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<DieselStmtRptListModel> GetDieselStmtRptList(ReportRequestModel request)
        {
            DieselStmtRptListModel dieselStmtRpt = new();
            List<DieselStmtRptModel> dieselStmtRptList = new();
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
                            new SqlParameter("@Branch",          request.FilterStr),
                            new SqlParameter("@VehicleMasterID",    request.FilterStr1),
                            new SqlParameter("@TripAdjusted",      request.FilterStr2),
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDieselStmtRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dieselStmtRptList.Add(new DieselStmtRptModel
                            {
                                Branch = Convert.ToString(dataSet.Tables[0].Rows[i]["Branch"]),
                                Vehicleno = Convert.ToString(dataSet.Tables[0].Rows[i]["Vehicleno"]),
                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                TransRefNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TransRefNo"]),
                                DslQty = Convert.ToString(dataSet.Tables[0].Rows[i]["DslQty"]),
                                DslRate = Convert.ToString(dataSet.Tables[0].Rows[i]["DslRate"]),
                                Amount = Convert.ToString(dataSet.Tables[0].Rows[i]["Amount"]),
                                TripAdj = Convert.ToString(dataSet.Tables[0].Rows[i]["TripAdj"]),
                                TripNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TripNo"]),
                                FillingStnName = Convert.ToString(dataSet.Tables[0].Rows[i]["FillingStnName"]),
                            });
                        }

                        dieselStmtRpt.DieselStmtRptlist = dieselStmtRptList;

                        dieselStmtRpt.PageMetaData = new PaginationMetaData
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
            return dieselStmtRpt;
        }
        public async Task<ResponseModel> GetDieselStmtRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@Branch",          request.FilterStr),
                            new SqlParameter("@VehicleMasterID",    request.FilterStr1),
                            new SqlParameter("@TripAdjusted",      request.FilterStr2),
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDieselStmtRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Diesel Statement Report " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy") + 
                                                " To " + request.ToDate;
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dataSet.Tables[0].Rows[i]["Trans Ref No"] = "'" + dataSet.Tables[0].Rows[i]["Trans Ref No"].ToString();
                        }
                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Diesel Statement Report", filter);
                        
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
