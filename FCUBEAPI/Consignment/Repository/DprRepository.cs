using Consignment.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Wordprocessing;
using DocumentFormat.OpenXml.Bibliography;

namespace Consignment.Repository
{
    public class DprRepository : IDprRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DprRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        public async Task<DprListModel> GetDprMasterList(ReportRequestModel request)
        {
            DprListModel dprMasterList = new();
            List<DprModel> dprList = new();
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
                            new SqlParameter("@Type",       request.FilterStr),
                            new SqlParameter("@Origin",     request.FilterStr1),
                            new SqlParameter("@Destination",request.FilterStr2),
                            new SqlParameter("@LoginBranch",request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDprMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dprList.Add(new DprModel
                            {
                                DprId               = Convert.ToString(dataSet.Tables[0].Rows[i]["DprId"]),
                                DprBranch           = Convert.ToString(dataSet.Tables[0].Rows[i]["DprBranch"]),
                                DprSlNo             = Convert.ToString(dataSet.Tables[0].Rows[i]["DprSlNo"]),
                                DprDate             = Convert.ToString(dataSet.Tables[0].Rows[i]["DprDate"]),
                                PayParty            = Convert.ToString(dataSet.Tables[0].Rows[i]["PayParty"]),
                                PartyName           = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                BookStatus          = Convert.ToString(dataSet.Tables[0].Rows[i]["BookStatus"]),
                                Origin              = Convert.ToString(dataSet.Tables[0].Rows[i]["Origin"]),
                                FromPlace           = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlace"]),
                                Destination         = Convert.ToString(dataSet.Tables[0].Rows[i]["Destination"]),
                                ToPlace             = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]),
                                VehicleTypeId       = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleTypeId"]),
                                VehTypeDesc         = Convert.ToString(dataSet.Tables[0].Rows[i]["VehTypeDesc"]),
                                ActualWt            = Convert.ToString(dataSet.Tables[0].Rows[i]["ActualWt"]),
                                ChargeWt            = Convert.ToString(dataSet.Tables[0].Rows[i]["ChargeWt"]),
                                OdcDimensions       = Convert.ToString(dataSet.Tables[0].Rows[i]["OdcDimensions"]),
                                OdcCft              = Convert.ToString(dataSet.Tables[0].Rows[i]["OdcCft"]),
                                RateType            = Convert.ToString(dataSet.Tables[0].Rows[i]["RateType"]),
                                RateRs              = Convert.ToString(dataSet.Tables[0].Rows[i]["RateRs"]),
                                FreightRs           = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightRs"]),
                                HamaliAmt           = Convert.ToString(dataSet.Tables[0].Rows[i]["HamaliAmt"]),
                                HamaliDesc          = Convert.ToString(dataSet.Tables[0].Rows[i]["HamaliDesc"]),
                                LDDetenAmt          = Convert.ToString(dataSet.Tables[0].Rows[i]["LDDetenAmt"]),
                                LDDetenDesc         = Convert.ToString(dataSet.Tables[0].Rows[i]["LDDetenDesc"]),
                                ExtraAmt            = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraAmt"]),
                                ExtraDesc           = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraDesc"]),
                                OtherAmt            = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherAmt"]),
                                OtherDesc           = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherDesc"]),
                                TotFreightAmt       = Convert.ToString(dataSet.Tables[0].Rows[i]["TotFreightAmt"]),
                                AttachConfirmDoc    = Convert.ToString(dataSet.Tables[0].Rows[i]["AttachConfirmDoc"]),
                                Dpr_Status          = Convert.ToString(dataSet.Tables[0].Rows[i]["DPR_Status"]),
                                VehicleNo           = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                BrokerName          = Convert.ToString(dataSet.Tables[0].Rows[i]["BrokerName"]),
                                DriverName          = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverName"]),
                                DriverMob           = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMob"]),
                                NoofLr              = Convert.ToString(dataSet.Tables[0].Rows[i]["NoofLr"]),
                                BusinessBy          = Convert.ToString(dataSet.Tables[0].Rows[i]["BusinessBy"]),
                                CreatedBy           = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate         = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy           = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate        = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),

                            });
                        }

                        dprMasterList.DprList = dprList;

                        dprMasterList.PageMetaData = new PaginationMetaData
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
            return dprMasterList;
        }

        public async Task<DprModel> GetDprInnerGridList(RequestModel request)
        {
            DprModel dprModel = new()
            {
                DprDtls  = new List<DprDtlModel>(),
            };

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@MasterId", request.strRequest)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDprInnerGrid", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dprModel.DprDtls.Add(new DprDtlModel
                            {
                                DprDtlId = Convert.ToString(dataSet.Tables[0].Rows[i]["DprDtlId"]),
                                DprId = Convert.ToString(dataSet.Tables[0].Rows[i]["DprId"]),
                                FromPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlace"]),
                                ToPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]),
                                FromStn = Convert.ToString(dataSet.Tables[0].Rows[i]["FromStn"]),
                                ToStn   = Convert.ToString(dataSet.Tables[0].Rows[i]["ToStn"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                MainGcYN = Convert.ToString(dataSet.Tables[0].Rows[i]["MainGcYN"]),
                                SpecialRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["SpecialRemarks"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                
            }
            return dprModel;
        }
        public async Task<ResponseModel> DprMasterSave(DprModel dprModel)
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
                            new SqlParameter("@DprId",              dprModel.DprId),
                            new SqlParameter("@DprBranch",          dprModel.DprBranch),
                            new SqlParameter("@DprDate",            dprModel.DprDate),
                            new SqlParameter("@PayParty",           dprModel.PayParty),
                            new SqlParameter("@BookStatus",         dprModel.BookStatus),
                            new SqlParameter("@Origin",             dprModel.Origin),
                            new SqlParameter("@Destination",        dprModel.Destination),
                            new SqlParameter("@BusinessBy",         dprModel.BusinessBy),
                            new SqlParameter("@VehicleTypeId",      dprModel.VehicleTypeId),
                            new SqlParameter("@ActualWt",           dprModel.ActualWt),
                            new SqlParameter("@ChargeWt",           dprModel.ChargeWt),
                            new SqlParameter("@OdcDimensions",      dprModel.OdcDimensions),
                            new SqlParameter("@RateType",           dprModel.RateType),
                            new SqlParameter("@RateRs",             dprModel.RateRs),
                            new SqlParameter("@FreightRs",          dprModel.FreightRs),
                            new SqlParameter("@HamaliAmt",          dprModel.HamaliAmt),
                            new SqlParameter("@HamaliDesc",         dprModel.HamaliDesc),
                            new SqlParameter("@LDDetenAmt",         dprModel.LDDetenAmt),
                            new SqlParameter("@LDDetenDesc",        dprModel.LDDetenDesc),
                            new SqlParameter("@ExtraAmt",           dprModel.ExtraAmt),
                            new SqlParameter("@ExtraDesc",          dprModel.ExtraDesc),
                            new SqlParameter("@OtherAmt",           dprModel.OtherAmt),
                            new SqlParameter("@OtherDesc",          dprModel.OtherDesc),
                            new SqlParameter("@TotFreightAmt",      dprModel.TotFreightAmt),
                            new SqlParameter("@Dpr_Status",         dprModel.Dpr_Status),                            
                            new SqlParameter("@YearId",             dprModel.YearId),                            
                            new SqlParameter("@AttachConfirmDoc",   dprModel.AttachConfirmDoc),                    
                            new SqlParameter("@LoggedInUser",       dprModel.LoggedInUserID)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DprMstSave", param);
                    var DprId = "0";

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        DprId = responseModel.Message;

                        if (responseModel.Status) {
                            for (int i = 0; i < dprModel.DprDtls.Count; i++)
                            {
                                dprModel.DprDtls[i].DprId= DprId.ToString();
                                responseModel = await DprDtlSave(transaction, dprModel.DprDtls[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = dprModel.DprDtls.Count;
                                }
                            }
                        }
                        if (responseModel.Status)
                        {
                            transaction.Commit();
                        }
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

        public async Task<ResponseModel> DprDtlSave(SqlTransaction transaction, DprDtlModel dprDtl)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterID",   dprDtl.DprId),
                            new SqlParameter("@DestState",  dprDtl.FromPlace),
                            new SqlParameter("@ToPlace",    dprDtl.ToPlace),
                            new SqlParameter("@RateTypeId", dprDtl.SpecialRemarks),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DprDtlsSave", param);

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
            return responseModel;
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
