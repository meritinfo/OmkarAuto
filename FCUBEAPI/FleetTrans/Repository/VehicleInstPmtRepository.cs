using FleetTrans.Models;
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

namespace FleetTrans.Repository
{
    public class VehicleInstPmtRepository : IVehicleInstPmtRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        public VehicleInstPmtRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> VehicleInstPmtSave(VehicleInstPmtModel vehicleInstPmtModel)
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
                            new SqlParameter("@PmtId", vehicleInstPmtModel.PmtId),
                            new SqlParameter("@BranchCode", vehicleInstPmtModel.BranchCode),
                            new SqlParameter("@PmtDate", vehicleInstPmtModel.PmtDate),
                            new SqlParameter("@LoanType", vehicleInstPmtModel.LoanType),
                            new SqlParameter("@VehicleMasterid", vehicleInstPmtModel.VehicleMasterid),
                            new SqlParameter("@InstNo", vehicleInstPmtModel.InstNo),
                            new SqlParameter("@InstId", vehicleInstPmtModel.InstId),
                            new SqlParameter("@PriAmt", vehicleInstPmtModel.PriAmt),
                            new SqlParameter("@IntAmt", vehicleInstPmtModel.IntAmt),
                            new SqlParameter("@TotAmt", vehicleInstPmtModel.TotAmt),
                            new SqlParameter("@Remarks", vehicleInstPmtModel.Remarks),
                            new SqlParameter("@PmtType", vehicleInstPmtModel.PmtType),
                            new SqlParameter("@NeftYN", vehicleInstPmtModel.NeftYN),
                            new SqlParameter("@CheqNo", vehicleInstPmtModel.CheqNo),
                            new SqlParameter("@CheqDate", vehicleInstPmtModel.CheqDate),
                            new SqlParameter("@CreditAc", vehicleInstPmtModel.CreditAc),
                            new SqlParameter("@Yearid", vehicleInstPmtModel.Yearid),
                            new SqlParameter("@LoggedInUser", vehicleInstPmtModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VehicleInstPmtSave", param);

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
        public async Task<VehicleInstPmtList> GetVehicleInstPmtMasterList(PageFromDtToDtRequest request)
        {
            VehicleInstPmtList tyreModelMasterList = new();
            List<VehicleInstPmtModel> pmtList = new();
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
                            new SqlParameter("@FromDate", request.FromDate),
                            new SqlParameter("@ToDate", request.ToDate)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleInstPmtList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            pmtList.Add(new VehicleInstPmtModel
                            {
                                PmtId = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtId"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                PmtDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtDate"]),
                                LoanType = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanType"]),
                                LoanAc = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanAc"]),
                                VehicleMasterid = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterid"]),
                                InstNo = Convert.ToString(dataSet.Tables[0].Rows[i]["InstNo"]),
                                InstId = Convert.ToString(dataSet.Tables[0].Rows[i]["InstId"]),
                                PriAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["PriAmt"]),
                                IntAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IntAmt"]),
                                TotAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotAmt"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                PmtType = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),
                                NeftYN = Convert.ToString(dataSet.Tables[0].Rows[i]["NeftYN"]),
                                CheqNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CheqNo"]),
                                CheqDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CheqDate"]),
                                CreditAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),
                                Findocid = Convert.ToString(dataSet.Tables[0].Rows[i]["Findocid"]),
                                Yearid = Convert.ToString(dataSet.Tables[0].Rows[i]["Yearid"]),
                                Branch = Convert.ToString(dataSet.Tables[0].Rows[i]["Branch"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),
                                // LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser"]),
                            });
                        }

                        tyreModelMasterList.PmtList = pmtList;

                        tyreModelMasterList.PageMetaData = new PaginationMetaData
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
            return tyreModelMasterList;
        }


        public async Task<ResponseModel> VehicleInstPmtMasterDelete(RequestModel requestModel)
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
                            new SqlParameter("@PmtId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VehicleInstPmtDelete", param);

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

        public async Task<ResponseModel> checkVehicleLoanType(RequestModel requestModel)
        {
            ResponseModel responseModel = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehicleMasterid", requestModel.strRequest),
                            new SqlParameter("@LoanType", requestModel.strRequest1),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_CheckVehicleLoanType", param);

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

        public async Task<List<DropDownListModel>> GetVehicleNoLoan(RequestModel request)
        {
            List<DropDownListModel> rateList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@LoanAccount", request.strRequest),
                            new SqlParameter("@LoanType", request.strRequest1),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLoanVehicleNo", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            rateList.Add(new DropDownListModel
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
            return rateList;
        }
        public async Task<List<DropDownListModel>> GetVehicleInstNo(RequestModel request)
        {
            List<DropDownListModel> rateList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehicleMasterid", request.strRequest),
                            new SqlParameter("@LoanType", request.strRequest1),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleInstNo", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            rateList.Add(new DropDownListModel
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
            return rateList;
        }

        public async Task<RequestModel> GetVehicleInstAmount(RequestModel request)
        {
            RequestModel instAmount = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehicleMasterid", request.strRequest),
                            new SqlParameter("@InstId", request.strRequest1),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleInstAmount", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        instAmount.strRequest = Convert.ToString(statusData.Tables[0].Rows[0]["Pri_InstAmt"]);
                        instAmount.strRequest1 = Convert.ToString(statusData.Tables[0].Rows[0]["Int_InstAmt"]);
                        instAmount.strRequest2 = Convert.ToString(statusData.Tables[0].Rows[0]["Tot_InstAmt"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return instAmount;
        }

    }
}
