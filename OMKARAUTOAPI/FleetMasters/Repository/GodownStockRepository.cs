using FleetMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Repository
{
    public class GodownStockRepository : IGodownStockRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public GodownStockRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        public async Task<ResponseModel> GodownStockSave(GodownStockModel godownStockModel)
        {
            ResponseModel responseModel = new();

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction = connection.BeginTransaction();

            try
            {
                if (dbconnection != null && godownStockModel.GodownStockModellst != null && godownStockModel.GodownStockModellst.Count > 0)
                {

                    var StockDel = await SparesLubesStockDelete(godownStockModel.GodownId, connection, transaction);

                    if (!StockDel.Status)
                    {
                        transaction.Rollback();
                        return StockDel;
                    }
                    for (int i = 0; i < godownStockModel.GodownStockModellst.Count; i++)
                    {
                        var item = godownStockModel.GodownStockModellst[i];

                        SqlParameter[] param =
                        {
                            new SqlParameter("@SpareLubId"   , item.SpareLubId),
                            new SqlParameter("@BrandId"      , item.BrandId),
                            new SqlParameter("@OpeningQty"   , item.OpeningQty),
                            new SqlParameter("@OpeningValue" , item.OpeningValue),
                            new SqlParameter("@GodownId"     , item.GodownId)
                        };

                        var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_GodownStockSave", param);

                        if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                        {
                            responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                            responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                            if (!responseModel.Status)
                            {
                                transaction.Rollback();
                                return responseModel;
                            }
                        }
                        else
                        {
                            responseModel.Status = false;
                            responseModel.Message = "No data returned from database.";
                            transaction.Rollback();
                            return responseModel;
                        }
                    }

                    transaction.Commit();
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                responseModel.Status = false;
                responseModel.Message = $"Error: {ex.Message}";
            }
            finally
            {
                connection.Close();
            }

            return responseModel;
        }

        public async Task<ResponseModel> SparesLubesStockDelete( string GodownId,SqlConnection connection, SqlTransaction transaction)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                       new SqlParameter("@GodownId",GodownId),
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync( transaction, "usp_SparesLubesStockDelete",  param);
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "No data returned.";
                    }
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = $"Error: {ex.Message}";
            }
            return responseModel;
        }


        public async Task<List<DropDownListModel>> GetFltGodownList()
        {
            List<DropDownListModel> FleetCardList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFltGodownList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            FleetCardList.Add(new DropDownListModel
                            {
                                DataId = Convert.ToString(statusData.Tables[0].Rows[i]["DataId"]),
                                DataName = Convert.ToString(statusData.Tables[0].Rows[i]["DataName"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return FleetCardList;
        }

        public async Task<GodownStockModel> GetSparesLubesStockInnergrid(RequestModel request)
        {
            GodownStockModel godownStockModelLst = new()
            {
                GodownStockModellst = new List<GodownStockModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@GodownId", request.strRequest)
                    };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getSparesLubesStockInnergrid", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            godownStockModelLst.GodownStockModellst.Add(new GodownStockModel
                            {
                                SpareLubId   = Convert.ToString(resultData.Tables[0].Rows[i]["SpareLubId"]),
                                BrandId      = Convert.ToString(resultData.Tables[0].Rows[i]["BrandId"]),
                                OpeningQty   = Convert.ToString(resultData.Tables[0].Rows[i]["OpeningQty"]),
                                OpeningValue = Convert.ToString(resultData.Tables[0].Rows[i]["OpeningValue"]),

                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return godownStockModelLst;
        }
    }
}
