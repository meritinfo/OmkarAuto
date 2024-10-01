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
    public class LHPMVarianceRptRepository: ILHPMVarianceRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;

        public LHPMVarianceRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<LHPMVarianceRptListModel> GetLHPMVarianceRptList(ReportRequestModel request)
        {
            LHPMVarianceRptListModel lHPMVarianceRpt = new();

            List<LHPMVarianceRptModel> lHPMVarianceRptList = new();
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
                            new SqlParameter("@BrokerId",     request.FilterStr1),
                            new SqlParameter("@VarType",     request.FilterStr2),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLHPMVarianceRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            lHPMVarianceRptList.Add(new LHPMVarianceRptModel
                            {
                                ChStnName = Convert.ToString(dataSet.Tables[0].Rows[i]["ChStnName"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                ChallanDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanDate"]),
                                VehGroupCode = Convert.ToString(dataSet.Tables[0].Rows[i]["VehGroupCode"]),
                                VehicleDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleDesc"]),
                                TptName = Convert.ToString(dataSet.Tables[0].Rows[i]["TptName"]),
                                TotalHire = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalHire"]),
                                EstimateAdvLhpm = Convert.ToString(dataSet.Tables[0].Rows[i]["EstimateAdvLhpm"]),
                                EstimateBalLhpm = Convert.ToString(dataSet.Tables[0].Rows[i]["EstimateBalLhpm"]),
                              
                            });
                        }

                        lHPMVarianceRpt.LHPMVarianceRptList = lHPMVarianceRptList;

                        lHPMVarianceRpt.PageMetaData = new PaginationMetaData
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
            return lHPMVarianceRpt;
        }
        public async Task<ResponseModel> GetLHPMVarianceRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@BrokerId",     request.FilterStr1),
                            new SqlParameter("@VarType",     request.FilterStr2),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLHPMVarianceRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");


                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "LHPM Variation Report", filter);
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
