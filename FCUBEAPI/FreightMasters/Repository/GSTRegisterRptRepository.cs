using FreightMasters.Models;
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

namespace FreightMasters.Repository
{
    public class GSTRegisterRptRepository: IGSTRegisterRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;

        public GSTRegisterRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<GSTRegisterRptListModel> GetGSTRegisterRptList(ReportRequestModel request)
        {
            GSTRegisterRptListModel gSTRegisterRpt = new();

            List<GSTRegisterRptModel> gSTRegisterRptList = new();
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
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@RptType",     request.FilterStr1),
                             

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getGSTRegisterRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            gSTRegisterRptList.Add(new GSTRegisterRptModel
                            {
                                Branch = Convert.ToString(dataSet.Tables[0].Rows[i]["Branch"]),
                                BillInvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BillInvNo"]),
                                BillInvDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BillInvDate"]),
                                PartyVendorName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyVendorName"]),
                                PartyVendorGstNo = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyVendorGstNo"]),
                                Amt = Convert.ToString(dataSet.Tables[0].Rows[i]["Amt"]),
                                SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                GrandTotal = Convert.ToString(dataSet.Tables[0].Rows[i]["GrandTotal"]),
                                

                            });
                        }

                        gSTRegisterRpt.GSTRegisterRptList = gSTRegisterRptList;

                        gSTRegisterRpt.PageMetaData = new PaginationMetaData
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
            return gSTRegisterRpt;
        }
        public async Task<ResponseModel> GetGSTRegisterRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@RptType",     request.FilterStr1),
                            
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getGSTRegisterRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "GST Register", filter);
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
