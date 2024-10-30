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
    public class AddCostRecorveryRptRepository: IAddCostRecorveryRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;

        public AddCostRecorveryRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<AddCostRecorveryRptListModel> GetAddCostRecorveryRptList(ReportRequestModel request)
        {
            AddCostRecorveryRptListModel addCostRecorveryRpt = new();

            List<AddCostRecorveryRptModel> addCostRecorveryRptList = new();
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
                            new SqlParameter("@AddCostType",     request.FilterStr1),
                            new SqlParameter("@RptType",     request.FilterStr2),


                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getAddCostRecorveryRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            addCostRecorveryRptList.Add(new AddCostRecorveryRptModel
                            {
                                Branch = Convert.ToString(dataSet.Tables[0].Rows[i]["Branch"]),
                                TransNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TransNo"]),
                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                AddCostDescription = Convert.ToString(dataSet.Tables[0].Rows[i]["AddCostDescription"]),
                                AddCostType = Convert.ToString(dataSet.Tables[0].Rows[i]["AddCostType"]),
                                Amount = Convert.ToString(dataSet.Tables[0].Rows[i]["Amount"]),
                                OthTot = Convert.ToString(dataSet.Tables[0].Rows[i]["OthTot"]),
                                NetTot = Convert.ToString(dataSet.Tables[0].Rows[i]["NetTot"]),
                            

                            });
                        }

                        addCostRecorveryRpt.AddCostRecorveryRptList = addCostRecorveryRptList;

                        addCostRecorveryRpt.PageMetaData = new PaginationMetaData
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
            return addCostRecorveryRpt;
        }
        public async Task<ResponseModel> GetAddCostRecorveryRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@AddCostType",     request.FilterStr1),
                            new SqlParameter("@RptType",     request.FilterStr2),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getAddCostRecorveryRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Addtional Cost/Rec Report", filter);
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
