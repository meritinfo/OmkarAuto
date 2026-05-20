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
    public class LhpmSlabMasterRepository: ILhpmSlabMasterRepository
    {

        private readonly IOptions<DBModel> dbconnection;

        public LhpmSlabMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> LhpmSlabMasterSave(LhpmSlabMasterModel lhpmSlabMasterModel)
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
                            new SqlParameter("@LhpmSlabID", lhpmSlabMasterModel.LhpmSlabID ),
                            new SqlParameter("@VehCode", lhpmSlabMasterModel.VehCode ),
                            new SqlParameter("@FromDt", lhpmSlabMasterModel.FromDt ),
                            new SqlParameter("@ToDt",lhpmSlabMasterModel.ToDt ),
                            new SqlParameter("@HireFrom", lhpmSlabMasterModel.HireFrom ),
                            new SqlParameter("@HireTo", lhpmSlabMasterModel.HireTo ),
                            new SqlParameter("@LhpmAmt", lhpmSlabMasterModel.LhpmAmt ),
                            new SqlParameter("@LoggedInUser", lhpmSlabMasterModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_LhpmSlabMasterSave", param);

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
        public async Task<LhpmSlabMasterList> GetLhpmSlabMasterList(PageRequest request)
        {
            LhpmSlabMasterList lhpmSlabMasterList = new();
            List<LhpmSlabMasterModel> slabList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize", request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder", request.SortOrder),
                            new SqlParameter("@Search", request.Search)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLhpmSlabMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            slabList.Add(new LhpmSlabMasterModel
                            {
                                LhpmSlabID = Convert.ToString(dataSet.Tables[0].Rows[i]["LhpmSlabID"]),
                                VehCode = Convert.ToString(dataSet.Tables[0].Rows[i]["VehCode"]),
                                FromDt = Convert.ToString(dataSet.Tables[0].Rows[i]["FromDt"]),
                                ToDt = Convert.ToString(dataSet.Tables[0].Rows[i]["ToDt"]),
                                HireFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["HireFrom"]),
                                HireTo = Convert.ToString(dataSet.Tables[0].Rows[i]["HireTo"]),
                                LhpmAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["LhpmAmt"]),
                                Vcode = Convert.ToString(dataSet.Tables[0].Rows[i]["Vcode"]),

                            });
                        }

                        lhpmSlabMasterList.SlabList = slabList;

                        lhpmSlabMasterList.PageMetaData = new PaginationMetaData
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
            return lhpmSlabMasterList;
        }
        public async Task<ResponseModel> LhpmSlabMasterDelete(RequestModel requestModel)
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
                            new SqlParameter("@LhpmSlabID", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_LhpmSlabMasterDelete", param);

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
