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
    public class DailyLoadingRptRepository : IDailyLoadingRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public DailyLoadingRptRepository(IOptions<DBModel> _dbconnection, 
            ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<DailyLoadingRptListModel> GetDailyLoadingRptList(ReportRequestModel request)
        {
            DailyLoadingRptListModel dailyLoadingRptList = new();
            List<DailyLoadingRptModel> dailyLoadings = new();
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
                            new SqlParameter("@Branch",             request.FilterStr),
                            new SqlParameter("@VehicleMasterid",    request.FilterStr1),
                            new SqlParameter("@OpenThrough",        request.FilterStr2),
                            new SqlParameter("@LoadEmptyType",      request.FilterStr3),                           
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDailyLoadingRptList", param);
                    int totalRecords = 0;
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dailyLoadings.Add(new DailyLoadingRptModel
                            {
                                FromPlace       = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlace"]),
                                ToPlace         = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]),
                                OpenThrough     = Convert.ToString(dataSet.Tables[0].Rows[i]["openthrough"]),
                                PartyName       = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                LoadContents    = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadContents"]),
                                LoadingFor      = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingFor"]),
                                LRNo            = Convert.ToString(dataSet.Tables[0].Rows[i]["LRNo"]),                               
                            });
                        }

                        dailyLoadingRptList.DailyLoadingRptsList = dailyLoadings;

                        dailyLoadingRptList.PageMetaData = new PaginationMetaData
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
            return dailyLoadingRptList;
        }
        public async Task<ResponseModel> GetDailyLoadingRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@Branch",             request.FilterStr),
                            new SqlParameter("@VehicleMasterid",    request.FilterStr1),
                            new SqlParameter("@OpenThrough",        request.FilterStr2),
                            new SqlParameter("@LoadEmptyType",      request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDailyLoadingRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Trip From " + request.FromDate + " To " + request.ToDate;
                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Daily Loading Report", filter);
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
