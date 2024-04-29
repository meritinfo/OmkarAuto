using Consignment.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using DocumentFormat.OpenXml.Drawing;

namespace Consignment.Repository
{
    public class DprVehiPlacedRepository : IDprVehiPlacedRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DprVehiPlacedRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        public async Task<DprVehiPlacedModel> GetDprVehiPlacedDetails(RequestModel request)
        {
            DprVehiPlacedModel dprVehi = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DprId", request.strRequest)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDprMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dprVehi.DprId           = Convert.ToString(dataSet.Tables[0].Rows[i]["DprId"]);
                            dprVehi.DprDate         = Convert.ToString(dataSet.Tables[0].Rows[i]["DprDate"]);
                            dprVehi.PayParty        = Convert.ToString(dataSet.Tables[0].Rows[i]["PayParty"]);
                            dprVehi.PartyName       = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]);
                            dprVehi.Origin          = Convert.ToString(dataSet.Tables[0].Rows[i]["Origin"]);
                            dprVehi.FromPlace       = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlace"]);
                            dprVehi.Destination     = Convert.ToString(dataSet.Tables[0].Rows[i]["Destination"]);
                            dprVehi.ToPlace         = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]);
                        }                        
                    }
                }
            }
            catch (Exception ex)
            {
                
            }
            return dprVehi;
        }
              

        public async Task<ResponseModel> DprMasterDelete(RequestModel requestModel)
        {
            ResponseModel responseModel = new();

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DprId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DprMstDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status) { transaction.Commit(); }
                        else { transaction.Rollback(); }
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }    


    }

}
