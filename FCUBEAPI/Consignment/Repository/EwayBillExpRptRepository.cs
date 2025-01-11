using Consignment.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using Shared.Repository;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Newtonsoft.Json;
using System;
using System.Data;
using DocumentFormat.OpenXml.VariantTypes;

namespace Consignment.Repository
{
    public class EwayBillExpRptRepository : IEwayBillExpRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private ISharedRepository sharedRepository;

        public EwayBillExpRptRepository(IOptions<DBModel> _dbconnection, 
            ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<EwayBillExtListModel> GetEWayBillExtRptList(ReportRequestModel request)
        {
            EwayBillExtListModel ewayBillExt = new();
            List<EwayBillExtModel> ewayBillExtList = new();
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
                        new SqlParameter("@FromDate",       request.FromDate),
                        new SqlParameter("@ToDate",         request.ToDate),
                        new SqlParameter("@BillingParty",   request.FilterStr1),
                        new SqlParameter("@BookingPlace",   request.FilterStr2),
                    };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEwayBillExtRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            ewayBillExtList.Add(new EwayBillExtModel
                            {
                                BookedAt = Convert.ToString(dataSet.Tables[0].Rows[i]["BookedAt"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                FromLocation = Convert.ToString(dataSet.Tables[0].Rows[i]["FromLocation"]),
                                Destination = Convert.ToString(dataSet.Tables[0].Rows[i]["Destination"]),
                                EwayBillNo = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillNo"]),
                                EwayBillDate = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillDate"]),
                                EwayBillExpDate = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillExpDate"]),
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                Consignor = Convert.ToString(dataSet.Tables[0].Rows[i]["Consignor"]),
                                Consignee = Convert.ToString(dataSet.Tables[0].Rows[i]["Consignee"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                FromPin = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPin"]),
                                AccountCity = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountCity"]),
                                CnorState = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorState"]),
                                AccountAddress1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address"]),
                            });
                        }

                        ewayBillExt.EwaybillextList = ewayBillExtList;

                        ewayBillExt.PageMetaData = new PaginationMetaData
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
            return ewayBillExt;
        }

        public async Task<ResponseModel> GetEWayBillExtRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@FromDate",       request.FromDate),
                        new SqlParameter("@ToDate",         request.ToDate),
                        new SqlParameter("@BillingParty",   request.FilterStr1),
                        new SqlParameter("@BookingPlace",   request.FilterStr2),
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEwayBillExtRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Eway Bill Expiry From " + request.FromDate + " To " + request.ToDate;
                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Ewaybill Expiry Report", filter);
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
