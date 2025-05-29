using FreightMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public class PartyMisLocationRepository: IPartyMisLocationRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public PartyMisLocationRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> PartyMisLocationSave(PartyMisLocationModel partyMisLocationModel)
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
                                 new SqlParameter( "@PartyId", partyMisLocationModel.PartyId )
                               
                     };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_PartyMisLocationSave", param);
                    string RateId = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        RateId = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < partyMisLocationModel.PartyMisLocationDetailList.Count; i++)
                            {
                               // partyMisLocationModel.PartyMisLocationDetailList[i].RateId = RateId;
                                // ratesMasterNewModel.RatesMasterNewDetailList[i].TransDate = ratesMasterNewModel.TransDate;

                                responseModel = await PartyMisLocationDetailSave(transaction, partyMisLocationModel.PartyMisLocationDetailList[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = partyMisLocationModel.PartyMisLocationDetailList.Count;
                                }
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
        public async Task<PartyMisLocationModel> GetPartyMisLocationInnerGridList(RequestModel request)
        {
            PartyMisLocationModel getPartyMisLocationInnerGridList = new()
            {
                PartyMisLocationDetailList = new List<PartyMisLocationDtlModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@PartyId", request.strRequest)
                    };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getPartyMisLocationInnerGridList", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            getPartyMisLocationInnerGridList.PartyMisLocationDetailList.Add(new PartyMisLocationDtlModel
                            {
                                // Id = Convert.ToString(resultData.Tables[0].Rows[i]["Id"]),

                                // SpareLubId = Convert.ToString(resultData.Tables[0].Rows[i]["SpareLubId"]),
                                LocationId = Convert.ToString(resultData.Tables[0].Rows[i]["LocationId"]),
                              
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return getPartyMisLocationInnerGridList;
        }
        public async Task<ResponseModel> PartyMisLocationDelete(RequestModel requestModel)
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
                            new SqlParameter("@PartyId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_PartyMisLocationsDelete", param);

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
        public async Task<PartyMisLocationsList> GetPartyMisLocationList(ReportRequestModel request)
        {
            PartyMisLocationsList partyMisLocationsList = new();
            List<PartyMisLocationModel> misList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getPartyMisLocationsList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            misList.Add(new PartyMisLocationModel
                            {
                                PartyId = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyId"]),
                                Party = Convert.ToString(dataSet.Tables[0].Rows[i]["Party"]),


                                // ToLocationType = Convert.ToString(dataSet.Tables[0].Rows[i]["ToLocationType"]),
                                // ProductType = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductType"]),
                                // ProductType = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductType"]),
                                // LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser"]),
                            });
                        }

                        partyMisLocationsList.MisList = misList;

                        partyMisLocationsList.PageMetaData = new PaginationMetaData
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
            return partyMisLocationsList;
        }
        public async Task<ResponseModel> CheckDuplicateLocation(RequestModel requestModel)
        {
            ResponseModel responseModel = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PartyId", requestModel.strRequest),
                            new SqlParameter("@LocationId",         requestModel.strRequest1),
                         
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_CheckDuplicateLocation", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                    }
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }

        public async Task<ResponseModel> PartyMisLocationDetailSave(SqlTransaction transaction, PartyMisLocationDtlModel partyMisLocationDtlModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PartyId",               partyMisLocationDtlModel.PartyId ),
                             new SqlParameter("@LocationId", partyMisLocationDtlModel.LocationId  ),

                    };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_PartyMisLocationDetailSave", param);

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
