using Consignment.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using DocumentFormat.OpenXml.Bibliography;

namespace Consignment.Repository
{
    public class DoTempGcRepository : IDoTempGcRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DoTempGcRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        public async Task<DoTempGcListModel> GetDoTempgcList(RepReqModel request)
        {
            DoTempGcListModel tempGcList = new();
            List<DoTempGcModel> gcList = new();
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
                            new SqlParameter("@PayParty",   request.FilterStr),
                            new SqlParameter("@Origin",     request.FilterStr1),
                            new SqlParameter("@Destination",request.FilterStr2),
                            new SqlParameter("@VehicleNo",  request.FilterStr3),
                            new SqlParameter("@MainLr",     request.SortColumn),
                            new SqlParameter("@LoginBranch",     request.SortOrder),
                            new SqlParameter("@GcNoteNo",  request.FilterStr4),
                            new SqlParameter("@YearId",  request.FilterStr5),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDoTempGcList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            gcList.Add(new DoTempGcModel
                            {                                                            
                                TempGcId            = Convert.ToString(dataSet.Tables[0].Rows[i]["TempGcId"]),
                                DoId               = Convert.ToString(dataSet.Tables[0].Rows[i]["DoId"]),
                                VehiclePlacedId     = Convert.ToString(dataSet.Tables[0].Rows[i]["VehiclePlacedId"]),
                                BookingPlace        = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingPlace"]),  
                                GcNoteNo            = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),  
                                BookingDate         = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),  
                                BookStatus          = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingStatus"]),  
                                VehiInDate          = Convert.ToString(dataSet.Tables[0].Rows[i]["VehiInDate"]),
                                PartyName           = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]), 
                                FromPlace           = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlace"]),   
                                ToPlace             = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]),
                                Fplace              = Convert.ToString(dataSet.Tables[0].Rows[i]["Fplace"]),
                                Tplace              = Convert.ToString(dataSet.Tables[0].Rows[i]["Tplace"]),
                                EwayBillType        = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillType"]),  
                                EwayBillNo          = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillNo"]),  
                                EwayBillDate        = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillDate"]),  
                                EwayBillExpDate     = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillExpDate"]),
                                InvoiceNo           = Convert.ToString(dataSet.Tables[0].Rows[i]["InvoiceNo"]),   
                                InvoiceDt           = Convert.ToString(dataSet.Tables[0].Rows[i]["InvoiceDt"]),   
                                GoodsValue          = Convert.ToString(dataSet.Tables[0].Rows[i]["GoodsValue"]),
                                CnorId              = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorId"]),
                                CnorName            = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorName"]),  
                                CnorAdd1            = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorAdd1"]),    
                                CnorAdd2            = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorAdd2"]),    
                                CnorAdd3            = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorAdd3"]),    
                                CnorState           = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorState"]),   
                                CnorPin             = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorPin"]),   
                                CnorGst             = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorGst"]),
                                CneeId              = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeId"]),
                                CneeName            = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeName"]),    
                                CneeAdd1            = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeAdd1"]),    
                                CneeAdd2            = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeAdd2"]),    
                                CneeAdd3            = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeAdd3"]),    
                                CneeState           = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeState"]),   
                                CneePin             = Convert.ToString(dataSet.Tables[0].Rows[i]["CneePin"]),   
                                CneeGst             = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeGst"]),   
                                CneeMob             = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeMob"]),   
                                ClassCode           = Convert.ToString(dataSet.Tables[0].Rows[i]["ClassCode"]),   
                                ProductCode         = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductCode"]),  
                                NoPackages          = Convert.ToString(dataSet.Tables[0].Rows[i]["NoPackages"]),  
                                ActualWt            = Convert.ToString(dataSet.Tables[0].Rows[i]["ActualWt"]),  
                                Chargewt            = Convert.ToString(dataSet.Tables[0].Rows[i]["Chargewt"]),  
                                VehicleInDt         = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleInDt"]),  
                                VehicleInTime       = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleInTime"]),  
                                VehicleOutDt        = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleOutDt"]),  
                                VehicleOutTime      = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleOutTime"]), 
                                CropDesc            = Convert.ToString(dataSet.Tables[0].Rows[i]["CropDesc"]), 
                                VehicleNo           = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),   
                                VehOwnerName        = Convert.ToString(dataSet.Tables[0].Rows[i]["VehOwnerName"]), 
                                OwnerPan            = Convert.ToString(dataSet.Tables[0].Rows[i]["OwnerPan"]),  
                                VehOwnerMobile      = Convert.ToString(dataSet.Tables[0].Rows[i]["VehOwnerMobile"]), 
                                DriverName          = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverName"]),  
                                DriverMob1          = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMob1"]),  
                                DriverLicNo         = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverLicNo"]), 
                                DriverLicDt         = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverLicDt"]), 
                                PayStn              = Convert.ToString(dataSet.Tables[0].Rows[i]["PayStn"]),  
                                PayParty            = Convert.ToString(dataSet.Tables[0].Rows[i]["PayParty"]),  
                                Businessby          = Convert.ToString(dataSet.Tables[0].Rows[i]["Businessby"]),  
                                GstBy               = Convert.ToString(dataSet.Tables[0].Rows[i]["GstBy"]),   
                                Remarks             = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                MainCn              = Convert.ToString(dataSet.Tables[0].Rows[i]["MainCn"]),
                                CreatedBy       = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate     = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy      = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate    = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),
                            });
                        }

                        tempGcList.DoTempGcList = gcList;

                        tempGcList.PageMetaData = new PaginationMetaData
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
            return tempGcList;
        }
        public async Task<DoTempGcModel> GetDoTempgcInnerGridList(RequestModel request)
        {
            DoTempGcModel tempGc = new()
            {
                InvList  = new List<TempGcInvModel>(),
                SealList  = new List<TempGcSealModel>(),
            };

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@MasterId", request.strRequest)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDoTempGcInnerGrid", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tempGc.InvList.Add(new TempGcInvModel
                            {
                                TempGcId = Convert.ToString(dataSet.Tables[0].Rows[i]["TempGcId"]),
                                InvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["InvNo"]),
                                InvDate = Convert.ToString(dataSet.Tables[0].Rows[i]["InvDate"]),
                                InvValue = Convert.ToString(dataSet.Tables[0].Rows[i]["InvValue"]),
                            });
                        }
                        for (int j = 0; j < dataSet.Tables[1].Rows.Count; j++)
                        {
                            tempGc.SealList.Add(new TempGcSealModel
                            {
                                TempGcId = Convert.ToString(dataSet.Tables[1].Rows[j]["TempGcId"]),
                                SealNo = Convert.ToString(dataSet.Tables[1].Rows[j]["SealNo"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                
            }
            return tempGc;
        }
        public async Task<ResponseModel> DoTempgcSave(DoTempGcModel tempgc)
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
                            new SqlParameter("@TempGcId",               tempgc.TempGcId  ),
                            new SqlParameter("@DoId",                   tempgc.DoId   ),
                            new SqlParameter("@VehiclePlacedId",        tempgc.VehiclePlacedId ),
                            new SqlParameter("@BookingPlace",           tempgc.BookingPlace  ),
                            new SqlParameter("@GcNoteNo",               tempgc.GcNoteNo   ),
                            new SqlParameter("@BookingDate",            tempgc.BookingDate  ),
                            new SqlParameter("@BookStatus",             tempgc.BookStatus  ),
                            new SqlParameter("@FromPlace",              tempgc.FromPlace   ),
                            new SqlParameter("@ToPlace",                tempgc.ToPlace    ),
                            new SqlParameter("@EwayBillType",           tempgc.EwayBillType   ),
                            new SqlParameter("@EwayBillNo",             tempgc.EwayBillNo  ),
                            new SqlParameter("@EwayBillDate",           tempgc.EwayBillDate ),
                            new SqlParameter("@EwayBillExpDate",        tempgc.EwayBillExpDate  ),
                            new SqlParameter("@InvoiceNo",              tempgc.InvoiceNo ),
                            new SqlParameter("@InvoiceDt",              tempgc.InvoiceDt  ),
                            new SqlParameter("@GoodsValue",             tempgc.GoodsValue ),
                            new SqlParameter("@CnorId",                 tempgc.CnorId  ),
                            new SqlParameter("@CnorName",               tempgc.CnorName  ),
                            new SqlParameter("@CnorAdd1",               tempgc.CnorAdd1 ),
                            new SqlParameter("@CnorAdd2",               tempgc.CnorAdd2 ),
                            new SqlParameter("@CnorAdd3",               tempgc.CnorAdd3  ),
                            new SqlParameter("@CnorState",              tempgc.CnorState  ),
                            new SqlParameter("@CnorPin",                tempgc.CnorPin   ),
                            new SqlParameter("@CnorGst",                tempgc.CnorGst   ),
                            new SqlParameter("@CneeId",                 tempgc.CneeId  ),
                            new SqlParameter("@CneeName",               tempgc.CneeName  ),
                            new SqlParameter("@CneeAdd1",               tempgc.CneeAdd1  ),
                            new SqlParameter("@CneeAdd2",               tempgc.CneeAdd2 ),
                            new SqlParameter("@CneeAdd3",               tempgc.CneeAdd3  ),
                            new SqlParameter("@CneeState",              tempgc.CneeState ),
                            new SqlParameter("@CneePin",                tempgc.CneePin  ),
                            new SqlParameter("@CneeGst",                tempgc.CneeGst  ),
                            new SqlParameter("@CneeMob",                tempgc.CneeMob  ),
                            new SqlParameter("@ClassCode",              tempgc.ClassCode  ),
                            new SqlParameter("@ProductCode",            tempgc.ProductCode  ),
                            new SqlParameter("@NoPackages",             tempgc.NoPackages ),
                            new SqlParameter("@ActualWt",               tempgc.ActualWt ),
                            new SqlParameter("@Chargewt",               tempgc.Chargewt  ),
                            new SqlParameter("@VehicleInDt",            tempgc.VehicleInDt + " " + tempgc.VehicleInTime),
                            new SqlParameter("@VehicleOutDt",           tempgc.VehicleOutDt + " " +  tempgc.VehicleOutTime),
                            new SqlParameter("@CropDesc",               tempgc.CropDesc ),
                            new SqlParameter("@VehicleNo",              tempgc.VehicleNo ),
                            new SqlParameter("@DriverName",             tempgc.DriverName  ),
                            new SqlParameter("@DriverMob1",             tempgc.DriverMob1  ),
                            new SqlParameter("@DriverLicNo",            tempgc.DriverLicNo  ),
                            new SqlParameter("@DriverLicDt",            tempgc.DriverLicDt  ),
                            new SqlParameter("@PayStn",                 tempgc.PayStn  ),
                            new SqlParameter("@PayParty",               tempgc.PayParty ),
                            new SqlParameter("@Businessby",             tempgc.Businessby),
                            new SqlParameter("@GstBy",                  tempgc.GstBy ),
                            new SqlParameter("@Remarks",                tempgc.Remarks  ),
                            new SqlParameter("@YearId",                 tempgc.YearId  ),                            
                            new SqlParameter("@LoggedInUser",           tempgc.LoggedInUser),
                            
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DoTempGcSave", param);
                    var TempGcId = "0";

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        TempGcId = responseModel.Message;

                        if (responseModel.Status) {
                            for (int i = 0; i < tempgc.InvList.Count; i++)
                            {
                                tempgc.InvList[i].TempGcId= TempGcId.ToString();
                                responseModel = await InvDetailsSave(transaction, tempgc.InvList[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = tempgc.InvList.Count;
                                }
                            }
                        }

                        if (responseModel.Status)
                        {                            
                            for (int i = 0; i < tempgc.SealList.Count; i++)
                            {
                                tempgc.SealList[i].TempGcId= TempGcId.ToString();
                                responseModel = await SealDetailsSave(transaction, tempgc.SealList[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = tempgc.SealList.Count;
                                }
                            }
                        }

                        if (responseModel.Status)
                        {
                            transaction.Commit();
                            responseModel.Message = "Temp LR saved Successfully";
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
                responseModel.Status = false; 
                responseModel.Message = ex.Message;
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<ResponseModel> InvDetailsSave(SqlTransaction transaction, TempGcInvModel inv)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TempGcId",   inv.TempGcId),
                            new SqlParameter("@InvNo",      inv.InvNo),
                            new SqlParameter("@InvDate",    inv.InvDate),
                            new SqlParameter("@InvValue",   inv.InvValue),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DoTempGcInvDtlsSave", param);

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
        public async Task<ResponseModel> SealDetailsSave(SqlTransaction transaction, TempGcSealModel inv)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TempGcId",   inv.TempGcId),
                            new SqlParameter("@SealNo",      inv.SealNo),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DoTempGcSealDtlsSave", param);

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
        public async Task<ResponseModel> DoTempGcDelete(RequestModel requestModel)
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
                            new SqlParameter("@TempGcId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DoTempGcDelete", param);

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
