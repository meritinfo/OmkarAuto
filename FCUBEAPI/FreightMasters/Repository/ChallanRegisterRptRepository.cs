
using Microsoft.Extensions.Options;
using FreightMasters.Models;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using Shared.Repository;

namespace FreightMasters.Repository
{
    public class ChallanRegisterRptRepository : IChallanRegisterRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;

        public ChallanRegisterRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<ChallanRegisterRptListModel> GetChallanRegisterRptList(ReportRequestModel request)
        {
            ChallanRegisterRptListModel challanRegisterRpt = new();
            
            List<ChallanRegisterRptModel> challanRegisterRptList = new();
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
                            new SqlParameter("@Origin",     request.FilterStr),
                            new SqlParameter("@Destination",     request.FilterStr1),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getChallanRegisterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            challanRegisterRptList.Add(new ChallanRegisterRptModel
                            {
                                ChBookStnname = Convert.ToString(dataSet.Tables[0].Rows[i]["ChBookStnname"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                ChStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["ChStatus"]),
                                ChallanDateTime = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanDateTime"]),
                                ExpArrivalDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpArrivalDate"]),
                                FromPlaceName = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlaceName"]),
                                ToPlaceName = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlaceName"]),
                                BrokerName = Convert.ToString(dataSet.Tables[0].Rows[i]["BrokerName"]),
                                TruckNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckNo"]),
                                VehicleOwnerName = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleOwnerName"]),
                                TotalHire = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalHire"]),
                                TotalAdvance = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalAdvance"]),
                                Balance = Convert.ToString(dataSet.Tables[0].Rows[i]["Balance"]),
                                BalPayAtBrName = Convert.ToString(dataSet.Tables[0].Rows[i]["BalPayAtBrName"]),
                                LrNo = Convert.ToString(dataSet.Tables[0].Rows[i]["LrNo"]),

                            });
                        }

                        challanRegisterRpt.ChallanRegisterRptList = challanRegisterRptList;

                        challanRegisterRpt.PageMetaData = new PaginationMetaData
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
            return challanRegisterRpt;
        }
        public async Task<ResponseModel> GetChallanRegisterRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@Origin",     request.FilterStr),
                            new SqlParameter("@Destination",     request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getChallanRegisterExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter  + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Challan Register", filter);
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
