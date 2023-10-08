using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace FleetTrans.Repository
{
    public class BillStatementRepository : IBillStatementRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public BillStatementRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        /// <summary>
        /// Service method for get Bill Statement Search List
        /// </summary>
        /// <returns>BillStatementSearchListModel</returns>
        public async Task<BillStatementSearchListModel> GetBillStatementSearchList(BillStatementSearchListRequest request)
        {
            BillStatementSearchListModel billStatementSearchList = new();
            List<BillStatementSearchModel> billStatementSearchModels = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BillingParty", request.BillingParty),
                            new SqlParameter("@FromPlace", request.FromPlace),
                            new SqlParameter("@ToPlace", request.ToPlace),
                            new SqlParameter("@CnorPlantCode", request.CnorPlantCode),
                            new SqlParameter("@ProductId", request.ProductId)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "BillStatementSearchList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billStatementSearchModels.Add(new BillStatementSearchModel
                            {
                                ConsignmentID = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentID"]),
                                BookedAt = Convert.ToString(dataSet.Tables[0].Rows[i]["BookedAt"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                ProductName = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductName"]),
                                NoPackages = Convert.ToString(dataSet.Tables[0].Rows[i]["NoPackages"]),
                                FreightRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightRs"]),
                                StatisticalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["StatisticalRs"]),
                                HandlingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["HandlingRs"]),
                                LoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingDetnRs"]),
                                EnrouteRs = Convert.ToString(dataSet.Tables[0].Rows[i]["EnrouteRs"]),
                                MiscRs = Convert.ToString(dataSet.Tables[0].Rows[i]["MiscRs"]),
                                ExtrasRs = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtrasRs"]),
                                UnloadingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["UnloadingRs"]),
                                DetentionRs = Convert.ToString(dataSet.Tables[0].Rows[i]["DetentionRs"]),
                                OthersRs = Convert.ToString(dataSet.Tables[0].Rows[i]["OthersRs"]),
                                GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["GtotalRs"]),
                                Selected = false
                            });
                        }

                        billStatementSearchList.BillStatementSearchList = billStatementSearchModels;
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return billStatementSearchList;
        }
    }
}
