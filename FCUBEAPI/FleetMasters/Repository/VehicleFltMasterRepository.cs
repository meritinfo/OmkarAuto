using FleetMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.Common;
using System.Data.SqlClient;
using Shared.Models;

namespace FleetMasters.Repository
{
    public class VehicleFltMasterRepository : IVehicleFltMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public VehicleFltMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>  
        /// Service method for save vehicle flt master details
        /// </summary>
        /// <param name="vehicleTypeMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> VehicleFltMasterSave(VehicleFltMasterModel vehicleFltMasterModel)
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
                           new SqlParameter("@VehicleMasterID", vehicleFltMasterModel.VehicleMasterID),
                           new SqlParameter("@VehicleNo", vehicleFltMasterModel.VehicleNo),
                           new SqlParameter("@FleetStation", vehicleFltMasterModel.FleetStation),
                           new SqlParameter("@RegnDate", vehicleFltMasterModel.RegnDate),
                           new SqlParameter("@RegdOwner", vehicleFltMasterModel.RegdOwner),
                           new SqlParameter("@ChasisNo", vehicleFltMasterModel.ChasisNo),
                           new SqlParameter("@EngineNo", vehicleFltMasterModel.EngineNo),
                           new SqlParameter("@VehicleTypeID", vehicleFltMasterModel.VehicleTypeID),
                           new SqlParameter("@VehicleTypeGroupId", vehicleFltMasterModel.VehicleTypeGroupId),
                           new SqlParameter("@VehMfrId", vehicleFltMasterModel.VehMfrId),
                           new SqlParameter("@MfrModelName", vehicleFltMasterModel.MfrModelName),
                           new SqlParameter("@FuelType", vehicleFltMasterModel.FuelType),
                           new SqlParameter("@MakeYear", vehicleFltMasterModel.MakeYear),
                           new SqlParameter("@TankCap", vehicleFltMasterModel.TankCap),
                           new SqlParameter("@GrossWt", vehicleFltMasterModel.GrossWt),
                           new SqlParameter("@UnLadenWT", vehicleFltMasterModel.UnLadenWT),
                           new SqlParameter("@NoOfTyres", vehicleFltMasterModel.NoOfTyres),
                           new SqlParameter("@MileageLt", vehicleFltMasterModel.MileageLt),
                           new SqlParameter("@VehLength", vehicleFltMasterModel.VehLength),
                           new SqlParameter("@VehBreadth", vehicleFltMasterModel.VehBreadth),
                           new SqlParameter("@VehHeight", vehicleFltMasterModel.VehHeight),
                           new SqlParameter("@VehVolumeCFT", vehicleFltMasterModel.VehVolumeCFT),
                           new SqlParameter("@Remarks", vehicleFltMasterModel.Remarks),
                           new SqlParameter("@OwnershipType", vehicleFltMasterModel.OwnershipType),
                           new SqlParameter("@FastTagYN", vehicleFltMasterModel.FastTagYN),
                           new SqlParameter("@FastTagCo", vehicleFltMasterModel.FastTagCo),
                           new SqlParameter("@FastTagNo", vehicleFltMasterModel.FastTagNo),
                           new SqlParameter("@PetroCardYN", vehicleFltMasterModel.PetroCardYN),
                           new SqlParameter("@PetroCo", vehicleFltMasterModel.PetroCo),
                           new SqlParameter("@PetroCardNo", vehicleFltMasterModel.PetroCardNo),
                           new SqlParameter("@PetroCardPin", vehicleFltMasterModel.PetroCardPin),
                           new SqlParameter("@HappayCardYN", vehicleFltMasterModel.HappayCardYN),
                           new SqlParameter("@HappayCardNo", vehicleFltMasterModel.HappayCardNo),
                           new SqlParameter("@HappayCardPin", vehicleFltMasterModel.HappayCardPin),
                           new SqlParameter("@FipYN", vehicleFltMasterModel.FipYN),
                           new SqlParameter("@FipNo", vehicleFltMasterModel.FipNo),
                           new SqlParameter("@SoldYN", vehicleFltMasterModel.SoldYN),
                           new SqlParameter("@SoldTo", vehicleFltMasterModel.SoldTo),
                           new SqlParameter("@SoldDate", vehicleFltMasterModel.SoldDate),
                           new SqlParameter("@SoldValue", vehicleFltMasterModel.SoldValue),
                           new SqlParameter("@TfrYN", vehicleFltMasterModel.TfrYN),
                           new SqlParameter("@TfrDate", vehicleFltMasterModel.TfrDate),
                           new SqlParameter("@TfrVehicleNo", vehicleFltMasterModel.TfrVehicleNo),
                           new SqlParameter("@TfrVehicleId", vehicleFltMasterModel.TfrVehicleId),
                           new SqlParameter("@VehicleLedgerAc", vehicleFltMasterModel.VehicleLedgerAc),
                           new SqlParameter("@VehicleAssetAc", vehicleFltMasterModel.VehicleAssetAc),
                           new SqlParameter("@Attach1Desc", vehicleFltMasterModel.Attach1Desc),
                           new SqlParameter("@Attach1Link", vehicleFltMasterModel.Attach1Link),
                           new SqlParameter("@Attach2Desc", vehicleFltMasterModel.Attach2Desc),
                           new SqlParameter("@Attach2Link", vehicleFltMasterModel.Attach2Link),
                           new SqlParameter("@Attach3Desc", vehicleFltMasterModel.Attach3Desc),
                           new SqlParameter("@Attach3Desc", vehicleFltMasterModel.Attach3Desc),
                           new SqlParameter("@DeleteFlag", 'N'),
                           new SqlParameter("@LoggedInUser", vehicleFltMasterModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VehicleFltMasterSave", param);
                    string VehiMasterID = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        VehiMasterID = Convert.ToString(responseModel.Message);
                        if (!responseModel.Status) { transaction.Rollback(); }
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                    if (responseModel.Status)
                    {
                        for (int i = 0; i < vehicleFltMasterModel.VehiclefltDetailList.Count; i++)
                        {
                            vehicleFltMasterModel.VehiclefltDetailList[i].Index = i.ToString();
                            vehicleFltMasterModel.VehiclefltDetailList[i].VehicleMasterID=VehiMasterID.ToString();
                            responseModel = await VehicleFltDtlsSave( transaction, vehicleFltMasterModel.VehiclefltDetailList[i]);
                            if (!responseModel.Status) 
                            { 
                                transaction.Rollback();
                                i = vehicleFltMasterModel.VehiclefltDetailList.Count;
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

        public async Task<ResponseModel> VehicleFltDtlsSave(SqlTransaction transaction, VehicleFltDtlsModel vehicleFltDtlsModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                           // new SqlParameter("@DetailID", vehicleFltDtlsModel.DetailID),
                            new SqlParameter("@VehicleMasterID", vehicleFltDtlsModel.VehicleMasterID),
                            new SqlParameter("@ValidFrom", vehicleFltDtlsModel.ValidFrom),
                            new SqlParameter("@ValidTo", vehicleFltDtlsModel.ValidTo),
                            new SqlParameter("@VehicleAvgLoad", vehicleFltDtlsModel.VehicleAvgLoad),
                            new SqlParameter("@VehicleAvgEmpty", vehicleFltDtlsModel.VehicleAvgEmpty),
                            new SqlParameter("@AdBlue", vehicleFltDtlsModel.AdBlue),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VehicleFltDtlsSave", param);

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



        public async Task<ResponseModel> VehicalMasterDetailsDelete(RequestModel req)
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
                           new SqlParameter("@VehicleMasterID", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VehicleFltMasterDelete", param);

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



        public async Task<VehicleFltMasterList> GetVehicleFltMasterList(PageRequest request)
        {
            VehicleFltMasterList vehicleFltMasterList = new();
            List<VehicleFltMasterModel> VehiclefltList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleFltMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            VehiclefltList.Add(new VehicleFltMasterModel
                            {
                                VehicleMasterID= Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterID"]),
                                VehicleTypeID = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleTypeID"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                FleetStation = Convert.ToString(dataSet.Tables[0].Rows[i]["FleetStation"]),
                                RegnDate = Convert.ToString(dataSet.Tables[0].Rows[i]["RegnDate"]),
                                RegdOwner = Convert.ToString(dataSet.Tables[0].Rows[i]["RegdOwner"]),
                                ChasisNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChasisNo"]),
                                EngineNo = Convert.ToString(dataSet.Tables[0].Rows[i]["EngineNo"]),
                                VehicleTypeGroupId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleTypeGroupId"]),
                                MfrModelName = Convert.ToString(dataSet.Tables[0].Rows[i]["MfrModelName"]),
                                FuelType = Convert.ToString(dataSet.Tables[0].Rows[i]["FuelType"]),
                                MakeYear = Convert.ToString(dataSet.Tables[0].Rows[i]["MakeYear"]),
                                TankCap = Convert.ToString(dataSet.Tables[0].Rows[i]["TankCap"]),
                                VehMfrId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehMfrId"]),
                                GrossWt = Convert.ToString(dataSet.Tables[0].Rows[i]["GrossWt"]),
                                UnLadenWT = Convert.ToString(dataSet.Tables[0].Rows[i]["UnLadenWT"]),
                                NoOfTyres = Convert.ToString(dataSet.Tables[0].Rows[i]["NoOfTyres"]),
                                MileageLt = Convert.ToString(dataSet.Tables[0].Rows[i]["MileageLt"]),
                                VehLength = Convert.ToString(dataSet.Tables[0].Rows[i]["VehLength"]),
                                VehBreadth = Convert.ToString(dataSet.Tables[0].Rows[i]["VehBreadth"]),
                                VehHeight = Convert.ToString(dataSet.Tables[0].Rows[i]["VehHeight"]),
                                VehVolumeCFT = Convert.ToString(dataSet.Tables[0].Rows[i]["VehVolumeCFT"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                OwnershipType = Convert.ToString(dataSet.Tables[0].Rows[i]["OwnershipType"]),
                                FastTagYN = Convert.ToString(dataSet.Tables[0].Rows[i]["FastTagYN"]),
                                FastTagCo = Convert.ToString(dataSet.Tables[0].Rows[i]["FastTagCo"]),
                                FastTagNo = Convert.ToString(dataSet.Tables[0].Rows[i]["FastTagNo"]),
                                PetroCardYN = Convert.ToString(dataSet.Tables[0].Rows[i]["PetroCardYN"]),
                                PetroCo = Convert.ToString(dataSet.Tables[0].Rows[i]["PetroCo"]),
                                PetroCardNo = Convert.ToString(dataSet.Tables[0].Rows[i]["PetroCardNo"]),
                                PetroCardPin = Convert.ToString(dataSet.Tables[0].Rows[i]["PetroCardPin"]),
                                HappayCardYN = Convert.ToString(dataSet.Tables[0].Rows[i]["HappayCardYN"]),
                                HappayCardNo = Convert.ToString(dataSet.Tables[0].Rows[i]["HappayCardNo"]),
                                HappayCardPin = Convert.ToString(dataSet.Tables[0].Rows[i]["HappayCardPin"]),
                                FipYN = Convert.ToString(dataSet.Tables[0].Rows[i]["FipYN"]),
                                FipNo = Convert.ToString(dataSet.Tables[0].Rows[i]["FipNo"]),
                                SoldYN = Convert.ToString(dataSet.Tables[0].Rows[i]["SoldYN"]),
                                SoldTo = Convert.ToString(dataSet.Tables[0].Rows[i]["SoldTo"]),
                                SoldDate = Convert.ToString(dataSet.Tables[0].Rows[i]["SoldDate"]),
                                SoldValue = Convert.ToString(dataSet.Tables[0].Rows[i]["SoldValue"]),
                                TfrYN = Convert.ToString(dataSet.Tables[0].Rows[i]["TfrYN"]),
                                TfrDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TfrDate"]),
                                TfrVehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TfrVehicleNo"]),
                                TfrVehicleId = Convert.ToString(dataSet.Tables[0].Rows[i]["TfrVehicleId"]),
                                VehicleLedgerAc = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleLedgerAc"]),
                                VehicleAssetAc = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleAssetAc"]),
                                Attach1Desc = Convert.ToString(dataSet.Tables[0].Rows[i]["Attach1Desc"]),
                                Attach1Link = Convert.ToString(dataSet.Tables[0].Rows[i]["Attach1Link"]),
                                Attach2Desc = Convert.ToString(dataSet.Tables[0].Rows[i]["Attach2Desc"]),
                                Attach2Link = Convert.ToString(dataSet.Tables[0].Rows[i]["Attach2Link"]),
                                Attach3Desc = Convert.ToString(dataSet.Tables[0].Rows[i]["Attach3Desc"]),
                                Attach3Link = Convert.ToString(dataSet.Tables[0].Rows[i]["Attach3Link"]),
                            });
                        }

                        vehicleFltMasterList.vehicleFltMasterList = VehiclefltList;

                        vehicleFltMasterList.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
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
            return vehicleFltMasterList;
        }

        /// <summary>
        /// Service method for get Vehical Type List
        /// </summary>
        /// <returns>List<DropDownListModel></returns>
        public async Task<List<DropDownListModel>> GetVehicalTypeList()
        {
            List<DropDownListModel> VehicalTypeList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleTypeList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            VehicalTypeList.Add(new DropDownListModel
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
            return VehicalTypeList;
        }

        public async Task<List<DropDownListModel>> GetVehicalTypeGroupList()
        {
            List<DropDownListModel> VehicalTypeList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleGroupTypes", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            VehicalTypeList.Add(new DropDownListModel
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
            return VehicalTypeList;
        }
        public async Task<List<DropDownListModel>> GetVehicalTypeFltGroupList()
        {
            List<DropDownListModel> VehicalTypeGrpList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleFltGroupTypes", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            VehicalTypeGrpList.Add(new DropDownListModel
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
            return VehicalTypeGrpList;
        }


        /// <summary>
        /// Service method for get Vehical Ledger Account List
        /// </summary>
        /// <returns>List<DropDownListModel></returns>
        public async Task<List<DropDownListModel>> GetVehicalLedgerAccountList()
        {
            List<DropDownListModel> VehicalLedgerList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleLedgerAccount", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            VehicalLedgerList.Add(new DropDownListModel
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
            return VehicalLedgerList; 
        }

        /// <summary>
        /// Service method for get Vehical Ledger Account List
        /// </summary>
        /// <returns>List<DropDownListModel></returns>
        public async Task<List<DropDownListModel>> GetVehicalAssetAccountList()
        {
            List<DropDownListModel> VehicalAssetList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleAssetAccount", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            VehicalAssetList.Add(new DropDownListModel
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
            return VehicalAssetList;
        }

        /// <summary>
        /// Service method for get Vehical Mfr List
        /// </summary>
        /// <returns>List<DropDownListModel></returns>
        public async Task<List<DropDownListModel>> GetVehicalMfrList()
        {
            List<DropDownListModel> VehicalMfrList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleMfrMasterList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            VehicalMfrList.Add(new DropDownListModel
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
            return VehicalMfrList;
        }
        
        public async Task<ResponseModel> ChkVehicalNoExist(RequestModel req)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                           new SqlParameter("@VehicleNo", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_ChkVehicalNoExists", param);

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


        public async Task<VehicleFltMasterModel> GetVehicleFltInnerGridList(RequestModel request)
        {
            VehicleFltMasterModel vehicleFltMasterModel = new()
            {
                VehiclefltDetailList = new List<VehicleFltDtlsModel>(),

            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehicleMasterID", request.strRequest)
                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleFltInnerGridList", param);

                    // LR Details
                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            vehicleFltMasterModel.VehiclefltDetailList.Add(new VehicleFltDtlsModel
                            {
                               // DetailID        = Convert.ToString(resultData.Tables[0].Rows[i]["DetailID"]),
                                VehicleMasterID = Convert.ToString(resultData.Tables[0].Rows[i]["VehicleMasterID"]),
                                ValidFrom       = Convert.ToString(resultData.Tables[0].Rows[i]["ValidFrom"]),
                                ValidTo         = Convert.ToString(resultData.Tables[0].Rows[i]["ValidTo"]),
                                VehicleAvgLoad  = Convert.ToString(resultData.Tables[0].Rows[i]["VehicleAvgLoad"]),
                                VehicleAvgEmpty = Convert.ToString(resultData.Tables[0].Rows[i]["VehicleAvgEmpty"]),
                                AdBlue          = Convert.ToString(resultData.Tables[0].Rows[i]["AdBlue"]),
                               
                            });
                        }
                    }



                }
            }
            catch (Exception ex)
            {
                //Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return vehicleFltMasterModel;
        }
    }
}
