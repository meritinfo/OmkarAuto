using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using Shared.Models;
using DocumentFormat.OpenXml.Wordprocessing;
using DocumentFormat.OpenXml.Office2016.Excel;

namespace FleetTrans.Repository
{
    public class VehiEmiRepository : IVehiEmiRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        public VehiEmiRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<VehicleInstScheduleListModel> GetVehicleInstScheduleList(ReportRequestModel request)
        {
            VehicleInstScheduleListModel vehicleInstScheduleList = new();
            List<VehicleInstScheduleModel> VehicleInstSchdllist = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TripPaymentsList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            VehicleInstSchdllist.Add(new VehicleInstScheduleModel
                            {
                                MasterID        = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                                VehicleMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterId"]),
                                VehicleNo       = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                LoanType        = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanType"]),
                                LoanTp          = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanTp"]),
                                StartDate       = Convert.ToString(dataSet.Tables[0].Rows[i]["StartDate"]),
                                EndDate         = Convert.ToString(dataSet.Tables[0].Rows[i]["EndDate"]),
                                NoOfMonths      = Convert.ToString(dataSet.Tables[0].Rows[i]["NoOfMonths"]),
                                PrincipalEmi    = Convert.ToString(dataSet.Tables[0].Rows[i]["PrincipalEmi"]),
                                InterestEmi     = Convert.ToString(dataSet.Tables[0].Rows[i]["InterestEmi"]),
                                TotalEmi        = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalEmi"]),
                                ScheudleType    = Convert.ToString(dataSet.Tables[0].Rows[i]["ScheudleType"]),
                                TotalPrincipal  = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalPrincipal"]),
                                TotalInterest   = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalInterest"]),
                                TotalLoanAmt    = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalLoanAmt"]),
                                Remarks         = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                            });
                        }

                        vehicleInstScheduleList.VehicleInstSchedulelist = VehicleInstSchdllist;

                        vehicleInstScheduleList.PageMetaData = new PaginationMetaData
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
            return vehicleInstScheduleList;
        }
        public async Task<VehicleInstScheduleModel> GetVehicleInstScheduleInnerGridList(RequestModel request)
        {
            VehicleInstScheduleModel vehicleInstSchedule = new();
            List<VehicleInstScheduleDtlModel> VehicleInstSchdlDtlList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterId", request.strRequest),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleInstScheduleInnerGrid", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            VehicleInstSchdlDtlList.Add(new VehicleInstScheduleDtlModel
                            {
                                MasterID            = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                                VehicleMasterId     = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterId"]),
                                InstNo              = Convert.ToString(dataSet.Tables[0].Rows[i]["InstNo"]),
                                InstDate            = Convert.ToString(dataSet.Tables[0].Rows[i]["InstDate"]),
                                Pri_InstAmt         = Convert.ToString(dataSet.Tables[0].Rows[i]["Pri_InstAmt"]),
                                Int_InstAmt         = Convert.ToString(dataSet.Tables[0].Rows[i]["Int_InstAmt"]),
                                Tot_InstAmt         = Convert.ToString(dataSet.Tables[0].Rows[i]["Tot_InstAmt"]),
                                DtlRemarks          = Convert.ToString(dataSet.Tables[0].Rows[i]["DtlRemarks"]),
                                PaidAmt             = Convert.ToString(dataSet.Tables[0].Rows[i]["PaidAmt"]),
                            });
                        }
                        vehicleInstSchedule.InstScheduleDtls = VehicleInstSchdlDtlList;
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return vehicleInstSchedule;
        }
        public async Task<ResponseModel> VehicleInstScheduleMstSave(VehicleInstScheduleModel vehicleInst)
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
                            new SqlParameter("@MasterID       ",  vehicleInst.MasterID          ),
                            new SqlParameter("@VehicleMasterId",  vehicleInst.VehicleMasterId   ),
                            new SqlParameter("@LoanType       ",  vehicleInst.LoanType          ),
                            new SqlParameter("@StartDate      ",  vehicleInst.StartDate         ),
                            new SqlParameter("@EndDate        ",  vehicleInst.EndDate           ),
                            new SqlParameter("@NoOfMonths     ",  vehicleInst.NoOfMonths        ),
                            new SqlParameter("@PrincipalEmi   ",  vehicleInst.PrincipalEmi      ),
                            new SqlParameter("@InterestEmi    ",  vehicleInst.InterestEmi       ),
                            new SqlParameter("@TotalEmi       ",  vehicleInst.TotalEmi          ),
                            new SqlParameter("@ScheudleType   ",  vehicleInst.ScheudleType      ),
                            new SqlParameter("@TotalPrincipal ",  vehicleInst.TotalPrincipal    ),
                            new SqlParameter("@TotalInterest  ",  vehicleInst.TotalInterest     ),
                            new SqlParameter("@TotalLoanAmt   ",  vehicleInst.TotalLoanAmt      ),
                            new SqlParameter("@Remarks        ",  vehicleInst.Remarks           ),
                            new SqlParameter("@LoggedInUser   ",  vehicleInst.LoggedInUser      ),                          

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VehicleInstScheduleMstSave", param);
                    string MasterID = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        MasterID = Convert.ToString(responseModel.Message);
                    }
                    else
                    {
                        transaction.Rollback();
                        responseModel.Status = false;
                    }

                    if (responseModel.Status)
                    {
                        for (int i = 0; i < vehicleInst.InstScheduleDtls.Count; i++)
                        {
                           vehicleInst.InstScheduleDtls[i].MasterID = MasterID;
                           responseModel = await VehicleInstDetailSave(transaction, vehicleInst.InstScheduleDtls[i]);
                           if (!responseModel.Status)
                           {
                               i = vehicleInst.InstScheduleDtls.Count;
                           }
                        }
                    }
                    if (responseModel.Status)
                    {
                        transaction.Commit();
                    }
                    else
                    {
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
        public async Task<ResponseModel> VehicleInstDetailSave(SqlTransaction transaction, VehicleInstScheduleDtlModel vehiInstShdlDtl)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterID         ", vehiInstShdlDtl.MasterID         ),
                            new SqlParameter("@VehicleMasterId  ", vehiInstShdlDtl.VehicleMasterId  ),
                            new SqlParameter("@InstNo           ", vehiInstShdlDtl.InstNo           ),
                            new SqlParameter("@InstDate         ", vehiInstShdlDtl.InstDate         ),
                            new SqlParameter("@Pri_InstAmt      ", vehiInstShdlDtl.Pri_InstAmt      ),
                            new SqlParameter("@Int_InstAmt      ", vehiInstShdlDtl.Int_InstAmt      ),
                            new SqlParameter("@Tot_InstAmt      ", vehiInstShdlDtl.Tot_InstAmt      ),
                            new SqlParameter("@DtlRemarks       ", vehiInstShdlDtl.DtlRemarks       ),
                            new SqlParameter("@PaidAmt          ", vehiInstShdlDtl.PaidAmt          ),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_VehicleInstScheduleDtlSave", param);

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
        public async Task<ResponseModel> VehicleInstScheduleDelete(RequestModel req)
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
                            new SqlParameter("@MasterID", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VehicleInstScheduleMstDelete", param);

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
