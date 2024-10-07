
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Repository
{
    public class PartyGroupMasterRepository : IPartyGroupMasterRepository

    {
        private readonly IOptions<DBModel> dbconnection;

        public PartyGroupMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save product master details
        /// </summary>
        /// <param name="productMasterModel"></param>
        /// <returns>ResponseModel</returns>

        public async Task<PartyGroupMasterList> GetPartyGroupMasterList(PageFromDtToDtRequest request)
        {
            PartyGroupMasterList partyGroupMasterList = new();
            List<PartyGroupMasterModel> PartyGroupMasterlist = new();
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
                            new SqlParameter("@Search", request.Search),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getPartyGroupMasterlist", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            PartyGroupMasterlist.Add(new PartyGroupMasterModel
                            {
                                PartyGroupId = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyGroupId"]),
                                PartyGroupDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyGroupDesc"]),
                            });
                        }

                        partyGroupMasterList.PartyGroupMasterLists = PartyGroupMasterlist;

                        partyGroupMasterList.PageMetaData = new PaginationMetaData
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
            return partyGroupMasterList;
        }
        public async Task<PartyGroupMasterModel> GetPartyGroupDetailInnergrid(RequestModel request)
        {
            PartyGroupMasterModel tripSheetInnerGridList = new()
            {

                PartyGroupDetailModellist = new List<PartyGroupDetailModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PartyGroupId", request.strRequest)
                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getPartyGroupDetailInnergrid", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.PartyGroupDetailModellist.Add(new PartyGroupDetailModel
                            {
                                PartyGroupId = Convert.ToString(resultData.Tables[0].Rows[i]["PartyGroupId"]),
                                PartyGroupDtlId = Convert.ToString(resultData.Tables[0].Rows[i]["PartyGroupDtlId"]),
                                PartyId = Convert.ToString(resultData.Tables[0].Rows[i]["PartyId"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return tripSheetInnerGridList;
        }

        public async Task<ResponseModel> PartyGroupMasterDelete(RequestModel requestModel)
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
                            new SqlParameter("@PartyGroupId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_PartyGroupMasterDelete", param);

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

        public async Task<ResponseModel> PartyGroupMasterSave(PartyGroupMasterModel partyGroupMasterModel)
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

                            new SqlParameter("@PartyGroupId", partyGroupMasterModel.PartyGroupId),
                            new SqlParameter("@PartyGroupDesc", partyGroupMasterModel.PartyGroupDesc),
                            new SqlParameter("@DeleteFlag", partyGroupMasterModel.DeleteFlag),
                            new SqlParameter("@LoggedInUser", partyGroupMasterModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_PartyGroupMasterSave", param);
                    string PartyGroupId = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        PartyGroupId = Convert.ToString(responseModel.Message);
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }

                    if (responseModel.Status)
                    {
                        for (int i = 0; i < partyGroupMasterModel.PartyGroupDetailModellist.Count; i++)
                        {
                            partyGroupMasterModel.PartyGroupDetailModellist[i].PartyGroupId = PartyGroupId;
                            responseModel = await PartyGroupMasterDetailSave(transaction, partyGroupMasterModel.PartyGroupDetailModellist[i]);
                            if (!responseModel.Status)
                            {
                                transaction.Rollback();
                                i = partyGroupMasterModel.PartyGroupDetailModellist.Count;
                            }
                        }
                    }
                    if (responseModel.Status)
                    {
                        transaction.Commit();
                    }
                    else { transaction.Rollback(); }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }

        public async Task<ResponseModel> PartyGroupMasterDetailSave(SqlTransaction transaction, PartyGroupDetailModel partyGroupDetailModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                         new SqlParameter("@PartyGroupDtlId",    partyGroupDetailModel.PartyGroupDtlId),
                            new SqlParameter("@PartyGroupId",    partyGroupDetailModel.PartyGroupId),
                            new SqlParameter("@PartyId",         partyGroupDetailModel.PartyId),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_PartyGroupDetailSave", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }

    }


}
