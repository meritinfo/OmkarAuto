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
    public class SparesPurchaseRptRepository : ISparesPurchaseRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public SparesPurchaseRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<SparesPurchaseRptListModel> GetSparesPurchaseRptList(ReportRequestModel request)
        {
            SparesPurchaseRptListModel sparesPurchaseRpt = new();
            List<SparesPurchaseRptModel> sparesPurchaseRptList = new();
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
                            new SqlParameter("@RptType",          request.FilterStr1),
                             
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getSparesPurchaseRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            sparesPurchaseRptList.Add(new SparesPurchaseRptModel
                            {
                                BranchName = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchName"]),
                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                VendorName = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorName"]),
                                VendorInvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvNo"]),
                                VendorGstNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorGstNo"]),
                                GstType = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                ItemAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["ItemAmount"]),
                                TotBillAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotBillAmt"]),
                            });
                        }

                        sparesPurchaseRpt.SparesPurchaseRptList = sparesPurchaseRptList;

                        sparesPurchaseRpt.PageMetaData = new PaginationMetaData
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
            return sparesPurchaseRpt;
        }
        public async Task<ResponseModel> GetSparesPurchaseRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@RptType",          request.FilterStr),
                            
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getSparesPurchaseRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Statement From " + request.FromDate + " To " + request.ToDate;
                        
                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Spares Purchase Report", filter);
                        
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
