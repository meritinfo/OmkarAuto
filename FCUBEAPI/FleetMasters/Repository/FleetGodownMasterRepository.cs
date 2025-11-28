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
    public class FleetGodownMasterRepository:IFleetGodownMasterRepository
    {

        private readonly IOptions<DBModel> dbconnection;

        public FleetGodownMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        public async Task<FleetGodownMasterList> GetFleetGodownMaserList(PageRequest request)
        {
            FleetGodownMasterList fleetGodownMasterList = new();
            List<FleetGodownMasterModel> fleetGodownMasterModel = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFltGodownMasterList", param);
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            fleetGodownMasterModel.Add(new FleetGodownMasterModel
                            {
                                GodownId = Convert.ToString(dataSet.Tables[0].Rows[i]["GodownId"]),
                                GodownShortCode = Convert.ToString(dataSet.Tables[0].Rows[i]["GodownShortCode"]),
                                GodownAddress = Convert.ToString(dataSet.Tables[0].Rows[i]["GodownAddress"]),
                                ControllingBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["ControllingBranch"]),
                                GodownIncharge = Convert.ToString(dataSet.Tables[0].Rows[i]["GodownIncharge"]),
                                InchargeMobile = Convert.ToString(dataSet.Tables[0].Rows[i]["InchargeMobile"]),
                                GodownDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["GodownDesc"]),
                                IsActive = Convert.ToString(dataSet.Tables[0].Rows[i]["IsActive"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                            });
                        }
                        fleetGodownMasterList.FleetGodownMasterModelList = fleetGodownMasterModel;

                        fleetGodownMasterList.PageMetaData = new PaginationMetaData
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
            return fleetGodownMasterList;
        }

        public async Task<ResponseModel> FleetGodownMaserSave(FleetGodownMasterModel obj)
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
                            new SqlParameter("@GodownId"         , obj.GodownId),
                            new SqlParameter("@GodownShortCode"  , obj.GodownShortCode),
                            new SqlParameter("@GodownDesc"       , obj.GodownDesc),
                            new SqlParameter("@GodownAddress"    , obj.GodownAddress),
                            new SqlParameter("@ControllingBranch", obj.ControllingBranch),
                            new SqlParameter("@GodownIncharge"   , obj.GodownIncharge),
                            new SqlParameter("@InchargeMobile"   , obj.InchargeMobile),
                            new SqlParameter("@IsActive"         , obj.IsActive),
                            new SqlParameter("@LoggedInUser"     , obj.LoggedInUser)
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_FltGodownMasterSave", param);
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

        public async Task<ResponseModel> FleetGodownMasterDelete(RequestModel requestModel)
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
                            new SqlParameter("@GodownId", requestModel.strRequest),
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_FltGodownMasterDelete", param);

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

        public async Task<ResponseModel> CheckDuplicateGodownShortCode(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@GodownShortCode", request.strRequest),

                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_CheckDuplicateGodownShortCode", param);

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

          public async Task<ResponseModel> CheckDuplicateGodownDesc(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@GodownDesc", request.strRequest),

                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_CheckDuplicateGodownDesc", param);

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
