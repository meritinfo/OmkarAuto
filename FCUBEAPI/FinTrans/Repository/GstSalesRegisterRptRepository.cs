using FinTrans.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using Shared.Repository;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Repository
{
    public class GstSalesRegisterRptRepository : IGstSalesRegisterRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;

        public GstSalesRegisterRptRepository(IOptions<DBModel> _dbconnection,
                ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<GstSalesRegisterRptListModel> GetGstSalesRegisterRptList(ReportRequestModel request)
        {
            GstSalesRegisterRptListModel gstSalesRegisterRptListModel = new();
            List<GstSalesRegisterRptModel> salesRpts = new();
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
                            new SqlParameter("@GstType",            request.FilterStr1),
                                new SqlParameter("@AccountID",          request.FilterStr),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getGstSalesRegisterRptList", param);
                    int totalRecords = 0;
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            salesRpts.Add(new GstSalesRegisterRptModel
                            {
                                InvDate = Convert.ToString(dataSet.Tables[0].Rows[i]["InvDate"]),
                                InvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["InvNo"]),
                                AccountGstNo = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountGstNo"]),
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                TotSubTotal = Convert.ToString(dataSet.Tables[0].Rows[i]["TotSubTotal"]),
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                TotalBillAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalBillAmt"]),
                          
                            });
                        }

                        gstSalesRegisterRptListModel.GstSalesList = salesRpts;

                        gstSalesRegisterRptListModel.PageMetaData = new PaginationMetaData
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
            return gstSalesRegisterRptListModel;
        }
        public async Task<DataSet> GstSalesReport(ReportRequestModel request)
        {
            DataSet reportData = new();
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
                         
                            new SqlParameter("@GstType",            request.FilterStr2),
                              new SqlParameter("@AccountID",          request.FilterStr),
                        };

                    reportData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getGstSalesRegisterRptList", param);
                }
            }
            catch (Exception ex)
            {

            }
            return reportData;
        }
        public async Task<ResponseModel> GetGstSalesRegisterRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@AccountID",          request.FilterStr),
                          //  new SqlParameter("@YearId",             request.FilterStr1),
                            new SqlParameter("@GstType",            request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getGstSalesRegisterRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Gst Sales From " + request.FromDate + " To " + request.ToDate;
                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Gst Sales Report", filter);
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
