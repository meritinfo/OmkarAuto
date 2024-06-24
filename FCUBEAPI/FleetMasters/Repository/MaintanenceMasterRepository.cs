using FleetMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Repository
{
    public class MaintanenceMasterRepository: IMaintanenceMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        public MaintanenceMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> MaintanenceMasterSave(MaintanenceMasterModel maintanenceMasterModel)
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
                            new SqlParameter("@MaintId ", maintanenceMasterModel.MaintId ),
                            new SqlParameter("@MaintenanceDesc ", maintanenceMasterModel.MaintenanceDesc ),
                         
                            new SqlParameter("@MaintType ", maintanenceMasterModel.MaintType ),
                            new SqlParameter("@IsActive  ", maintanenceMasterModel.IsActive  ),
                            new SqlParameter("@LoggedInUser", maintanenceMasterModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_MaintanenceMasterSave", param);

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
        public async Task<MaintanenceMasterList> GetMaintanenceMasterList(ReportRequestModel request)
        {
            MaintanenceMasterList maintanenceMasterList = new();
            List<MaintanenceMasterModel> maintanenceList = new();
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
                            //new SqlParameter("@FromDate", request.FromDate),
                            //new SqlParameter("@ToDate", request.ToDate)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getMaintanenceMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            maintanenceList.Add(new MaintanenceMasterModel
                            {
                                MaintId = Convert.ToString(dataSet.Tables[0].Rows[i]["MaintId"]),
                                MaintenanceDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["MaintenanceDesc"]),
                                MaintType = Convert.ToString(dataSet.Tables[0].Rows[i]["MaintType"]),
                                IsActive = Convert.ToString(dataSet.Tables[0].Rows[i]["IsActive"]),
                               
                                // LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser"]),
                            });
                        }

                        maintanenceMasterList.MaintanenceList = maintanenceList;

                        maintanenceMasterList.PageMetaData = new PaginationMetaData
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
            return maintanenceMasterList;
        }
        public async Task<ResponseModel> CheckDuplicateMaintanence(RequestModel requestModel)
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
                            new SqlParameter("@MaintanenceList", requestModel.strRequest),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ChkDuplicateMaintanence", param);

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
        public async Task<ResponseModel> MaintanenceMasterDelete(RequestModel requestModel)
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
                            new SqlParameter("@MaintId ", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_MaintanenceMasterDelete", param);

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
