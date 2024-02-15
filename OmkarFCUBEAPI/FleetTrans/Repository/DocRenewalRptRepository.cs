using FleetTrans.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Shared.Repository;

namespace FleetTrans.Repository
{
    public class DocRenewalRptRepository: IDocRenewalRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public DocRenewalRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }

        public async Task<DocRenewalRptListModel> GetDocRenewalRptList(ReportRequestModel request)
        {
            DocRenewalRptListModel docRenewalRpt = new();
            List<DocRenewalRptModel> docRenewalRptList = new();
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
                            new SqlParameter("@DocRenewalID",       request.FilterStr1),
                            new SqlParameter("@VehicleMasterid",    request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDocRenewalRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            docRenewalRptList.Add(new DocRenewalRptModel
                            {
                                RenewalDocName = Convert.ToString(dataSet.Tables[0].Rows[i]["RenewalDocName"]),
                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                ValidFromDt = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidFromDt"]),
                                NetAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmount"]),
                                DocumentRefNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DocumentRefNo"]),
                            });
                        }

                        docRenewalRpt.DocRenewalRptlist = docRenewalRptList;

                        docRenewalRpt.PageMetaData = new PaginationMetaData
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
            return docRenewalRpt;
        }
        public async Task<ResponseModel> ExcelDocRenewalRptList(ReportRequestModel request)
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
                            new SqlParameter("@DocRenewalID",       request.FilterStr1),
                            new SqlParameter("@VehicleMasterid",    request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDocRenewalRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + request.FromDate + " To " + request.ToDate;                        

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Document Renewal Report", filter);
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
