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
    public class LHExtraPmtReconRptRepository: ILHExtraPmtReconRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;

        public LHExtraPmtReconRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<LHExtraPmtReconRptListModel> GetLHExtraPmtReconRptList(ReportRequestModel request)
        {
            LHExtraPmtReconRptListModel lHExtraPmtReconRpt = new();

            List<LHExtraPmtReconRptModel> lHExtraPmtReconRptList = new();
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
                            //new SqlParameter("@Party",     request.FilterStr1),
                            //new SqlParameter("@Origin",     request.FilterStr2),
                            //new SqlParameter("@Destination",     request.FilterStr3),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLHExtraPmtReconRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            lHExtraPmtReconRptList.Add(new LHExtraPmtReconRptModel
                            {
                                ChBookStnName = Convert.ToString(dataSet.Tables[0].Rows[i]["ChBookStnName"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                ChallanDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanDate"]),
                                ChFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["ChFrom"]),
                                ChTo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChTo"]),
                                LrNo = Convert.ToString(dataSet.Tables[0].Rows[i]["LrNo"]),
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                TruckNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckNo"]),
                                LrFrt = Convert.ToString(dataSet.Tables[0].Rows[i]["LrFrt"]),
                                LorryHire = Convert.ToString(dataSet.Tables[0].Rows[i]["LorryHire"]),
                                ExtHamaliPaid = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtHamaliPaid"]),
                                ExtDetnPaid = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtDetnPaid"]),
                                ExtOthersPaid = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtOthersPaid"]),
                                BilledHamali = Convert.ToString(dataSet.Tables[0].Rows[i]["BilledHamali"]),
                                BilledDetn = Convert.ToString(dataSet.Tables[0].Rows[i]["BilledDetn"]),
                                BilledOthers = Convert.ToString(dataSet.Tables[0].Rows[i]["BilledOthers"]),
                                BilledExtraSupp = Convert.ToString(dataSet.Tables[0].Rows[i]["BilledExtraSupp"]),
                                BillNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BillNo"]),
                                MRNo = Convert.ToString(dataSet.Tables[0].Rows[i]["MRNo"]),
                                MR_NR_Amt = Convert.ToString(dataSet.Tables[0].Rows[i]["MR_NR_Amt"]),

                            });
                        }

                        lHExtraPmtReconRpt.LHExtraPmtReconRptList = lHExtraPmtReconRptList;

                        lHExtraPmtReconRpt.PageMetaData = new PaginationMetaData
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
            return lHExtraPmtReconRpt;
        }
        public async Task<ResponseModel> GetLHExtraPmtReconRptExcel(ReportRequestModel request)
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
                            //new SqlParameter("@Party",     request.FilterStr1),
                            //new SqlParameter("@Origin",     request.FilterStr2),
                            //new SqlParameter("@Destination",     request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLHExtraPmtReconRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "LH Extra Pmt Reconciliation", filter);
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
