using Consignment.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace Consignment.Repository
{
    public class ConsignmentRepository : IConsignmentRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public ConsignmentRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save fin accounts master details
        /// </summary>
        /// <param name="ConsignmentModel"></param>
        /// <returns>ResponseModel</returns>
        /// 
        public async Task<ConsignmentList> GetConsignmentList(ConsignmentListRequest request)
        {
            ConsignmentList cnList = new();
            List<ConsignmentModel> consignmentList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "ConsignmentList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            consignmentList.Add(new ConsignmentModel
                            {
                                ConsignmentID = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentID"]),
                                BookingPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingPlace"]),
                                GcSeries = Convert.ToString(dataSet.Tables[0].Rows[i]["GcSeries"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                GcSlNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcSlNo"]),
                                BookingStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingStatus"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                EwayBillEntryType = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillEntryType"]),
                                EwayBillNo = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillNo"]),
                                EwayBillDate = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillDate"]),
                                EwayBillExpDate = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillExpDate"]),
                                EwayBillExpExtDate = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillExpExtDate"]),
                                FromPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlace"]),
                                ToPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]),
                                FromPin = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPin"]),
                                ToPin = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPin"]),
                                Kms = Convert.ToString(dataSet.Tables[0].Rows[i]["Kms"]),
                                OwnTruck = Convert.ToString(dataSet.Tables[0].Rows[i]["OwnTruck"]),
                                TruckId = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckId"]),
                                TruckNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckNo"]),
                                BillingParty = Convert.ToString(dataSet.Tables[0].Rows[i]["BillingParty"]),
                                BillingBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["BillingBranch"]),
                                CnorCode = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorCode"]),
                                CnorGst = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorGst"]),
                                CnorPlantCode = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorPlantCode"]),
                                CnorInvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorInvNo"]),
                                CnorInvDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorInvDate"]),
                                DeclaredValue = Convert.ToString(dataSet.Tables[0].Rows[i]["DeclaredValue"]),
                                CneeCode = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeCode"]),
                                CneeAdd1 = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeAdd1"]),
                                CneeAdd2 = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeAdd2"]),
                                CneeAdd3 = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeAdd3"]),
                                CneeGst = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeGst"]),
                                CneeDealrCode = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeDealrCode"]),
                                ShipmentNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ShipmentNo"]),
                                ShipmentDt = Convert.ToString(dataSet.Tables[0].Rows[i]["ShipmentDt"]),
                                ProductId = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductId"]),
                                ProductDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductDesc"]),
                                NoPackages = Convert.ToString(dataSet.Tables[0].Rows[i]["NoPackages"]),
                                ActualWt = Convert.ToString(dataSet.Tables[0].Rows[i]["ActualWt"]),
                                Chargewt = Convert.ToString(dataSet.Tables[0].Rows[i]["Chargewt"]),
                                RateType = Convert.ToString(dataSet.Tables[0].Rows[i]["RateType"]),
                                RateRs = Convert.ToString(dataSet.Tables[0].Rows[i]["RateRs"]),
                                FreightRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightRs"]),
                                StatisticalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["StatisticalRs"]),
                                HandlingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["HandlingRs"]),
                                LoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingDetnRs"]),
                                MiscRs = Convert.ToString(dataSet.Tables[0].Rows[i]["MiscRs"]),
                                ExtrasRS = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtrasRS"]),
                                UnLoadingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["UnLoadingRs"]),
                                DetentionRs = Convert.ToString(dataSet.Tables[0].Rows[i]["DetentionRs"]),
                                OthersRs = Convert.ToString(dataSet.Tables[0].Rows[i]["OthersRs"]),
                                SubTotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["SubTotalRs"]),
                                GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["GtotalRs"]),
                                GeneralRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["GeneralRemarks"]),
                                Attachedfile = Convert.ToString(dataSet.Tables[0].Rows[i]["Attachedfile"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                BookedAt = Convert.ToString(dataSet.Tables[0].Rows[i]["BookedAt"]),
                                FPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FPlace"]),
                                TPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["TPlace"]),
                                VehicelNO = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicelNO"]),
                               // TripOpenBy = Convert.ToString(dataSet.Tables[0].Rows[i]["TripOpenBy"]),


                            });
                        }

                        cnList.cnList = consignmentList;

                        cnList.PageMetaData = new PaginationMetaData
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
            return cnList;
        }
        public async Task<List<RateListModel>> GetRateList()
        {
            List<RateListModel> rateList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "RateList_Select", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            rateList.Add(new RateListModel
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
            return rateList;
        }
        public async Task<List<LrSeriesListModel>> GetLRSeries()
        {
            List<LrSeriesListModel> lrSeries = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "GetLRSeries_Select", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            lrSeries.Add(new LrSeriesListModel
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
            return lrSeries;
        }
        public async Task<ResponseModel> ConsignmentSave(ConsignmentModel ConsignmentModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@ConsignmentID", ConsignmentModel.ConsignmentID),
                            new SqlParameter("@BookingPlace", ConsignmentModel.BookingPlace),
                            new SqlParameter("@GcSeries", ConsignmentModel.GcSeries),
                            new SqlParameter("@GcSlNo", ConsignmentModel.GcSlNo),
                            new SqlParameter("@GcAlpha", ConsignmentModel.GcAlpha),
                            new SqlParameter("@GcNoteNo", ConsignmentModel.GcNoteNo),
                            new SqlParameter("@BookingDate", ConsignmentModel.BookingDate),
                            new SqlParameter("@BookingStatus", ConsignmentModel.BookingStatus),
                            new SqlParameter("@EwayBillEntryType", ConsignmentModel.EwayBillEntryType),
                            new SqlParameter("@EwayBillNo", ConsignmentModel.EwayBillNo),
                            new SqlParameter("@EwayBillDate", ConsignmentModel.EwayBillDate),
                            new SqlParameter("@EwayBillExpDate", ConsignmentModel.EwayBillExpDate),
                            new SqlParameter("@EwayBillExpExtDate", ConsignmentModel.EwayBillExpExtDate),
                            new SqlParameter("@FromPlace", ConsignmentModel.FromPlace),
                            new SqlParameter("@ToPlace", ConsignmentModel.ToPlace),
                             new SqlParameter("@FromPin", ConsignmentModel.FromPin),
                              new SqlParameter("@ToPin", ConsignmentModel.ToPin),
                            new SqlParameter("@Kms", ConsignmentModel.Kms),
                            new SqlParameter("@OwnTruck", ConsignmentModel.OwnTruck ),
                            new SqlParameter("@TruckId", ConsignmentModel.TruckId ),
                            new SqlParameter("@TruckNo", ConsignmentModel.TruckNo ),
                              new SqlParameter("@BillingParty ", ConsignmentModel.BillingParty ),
                                new SqlParameter("@BillingBranch ", ConsignmentModel.BillingBranch ),
                                  new SqlParameter("@CnorCode ", ConsignmentModel.CnorCode ),
                            new SqlParameter("@CnorGst ", ConsignmentModel.CnorGst ),
                            new SqlParameter("@CnorPlantCode ", ConsignmentModel.CnorPlantCode ),
                            new SqlParameter("@CnorInvNo ", ConsignmentModel.CnorInvNo ),
                            new SqlParameter("@CnorInvDate  ", ConsignmentModel.CnorInvDate ),
                            new SqlParameter("@DeclaredValue ", ConsignmentModel.DeclaredValue ),
                            new SqlParameter("@CneeCode ", ConsignmentModel.CneeCode),
                            new SqlParameter("@CneeAdd1 ", ConsignmentModel.CneeAdd1 ),
                            new SqlParameter("@CneeAdd2 ", ConsignmentModel.CneeAdd2 ),
                            new SqlParameter("@CneeAdd3 ", ConsignmentModel.CneeAdd3 ),
                            new SqlParameter("@CneeGst ", ConsignmentModel.CneeGst ),
                            new SqlParameter("@CneeDealrCode ", ConsignmentModel.CneeDealrCode ),
                            new SqlParameter("@ShipmentNo ", ConsignmentModel.ShipmentNo ),
                            new SqlParameter("@ShipmentDt ", ConsignmentModel.ShipmentDt),
                            new SqlParameter("@ProductId ", ConsignmentModel.ProductId ),
                            new SqlParameter("@ProductDesc ", ConsignmentModel.ProductDesc ),
                            new SqlParameter("@NoPackages ", ConsignmentModel.NoPackages ),
                            new SqlParameter("@ActualWt ", ConsignmentModel.ActualWt ),
                            new SqlParameter("@Chargewt ", ConsignmentModel.Chargewt ),
                            new SqlParameter("@RateType ", ConsignmentModel.RateType ),
                            new SqlParameter("@RateRs ", ConsignmentModel.RateRs ),
                            new SqlParameter("@FreightRs", ConsignmentModel.FreightRs),
                            new SqlParameter("@StatisticalRs ", ConsignmentModel.StatisticalRs ),
                            new SqlParameter("@HandlingRs ", ConsignmentModel.HandlingRs ),
                            new SqlParameter("@LoadingDetnRs ", ConsignmentModel.LoadingDetnRs),
                            new SqlParameter("@MiscRs ", ConsignmentModel.MiscRs ),
                            new SqlParameter("@ExtrasRS ", ConsignmentModel.ExtrasRS ),
                            new SqlParameter("@UnLoadingRs ", ConsignmentModel.UnLoadingRs ),
                            new SqlParameter("@DetentionRs", ConsignmentModel.DetentionRs),
                            new SqlParameter("@OthersRs ", ConsignmentModel.OthersRs ),
                            new SqlParameter("@SubTotalRs ", ConsignmentModel.SubTotalRs ),
                            new SqlParameter("@GtotalRs ", ConsignmentModel.GtotalRs ),
                            new SqlParameter("@GeneralRemarks ", ConsignmentModel.GeneralRemarks),
                            new SqlParameter("@Attachedfile ", ConsignmentModel.Attachedfile ),
                            new SqlParameter("@YearId ", ConsignmentModel.YearId ),
                       //     new SqlParameter("@TripOpenBy ", ConsignmentModel.LoggedInUser ),


                            new SqlParameter("@LoggedInUser", ConsignmentModel.LoggedInUser),

                         };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "Consignment_Insert", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
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
        public async Task<ResponseModel> TripSave(TripModel tripModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@NewTripDate", tripModel.NewTripDate),
                            new SqlParameter("@OpenThrough", tripModel.OpenThrough),
                            new SqlParameter("@TripOpenBy", tripModel.TripOpenBy),
                            new SqlParameter("@TripOpenDate", tripModel.TripOpenDate),
                            new SqlParameter("@DistanceTripKM_1", tripModel.DistanceTripKM_1),
                            new SqlParameter("@ExpectedReportingDt", tripModel.ExpectedReportingDt),
                            new SqlParameter("@ExpectedReportingDays", tripModel.ExpectedReportingDays),
                        


                        

                         };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "Consignment_Insert", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
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
        public async Task<List<BranchListModel>> GetLocationList()
        {
            List<BranchListModel> locationList = new();
            try
            {
                if (dbconnection != null)
                {

                 
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "LocationList_Select", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            locationList.Add(new BranchListModel
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
            return locationList;
        }
        public async Task<List<BranchListModel>> GetVehicleNoList()
        {
            List<BranchListModel> vehicleList = new();
            try
            {
                if (dbconnection != null)
                {


                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "VehicleNoList_Select", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            vehicleList.Add(new BranchListModel
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
            return vehicleList;
        }
        public async Task<ResponseModel> GetKms(KmsModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TransDate", request.TransDate),
                            new SqlParameter("@FromLocation", request.FromLocation),
                    new SqlParameter("@ToLocation", request.ToLocation)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetFrtKms", param);
                   
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                       responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                       responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
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
        public async Task<ResponseModel> GetTripKms(KmsModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TransDate", request.TransDate),
                            new SqlParameter("@FromLocation", request.FromLocation),
                    new SqlParameter("@ToLocation", request.ToLocation)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetTripKms", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
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
        public async Task<TripKmsModel> GetTripKms2(KmsModel request)
        {
            TripKmsModel tripKmsModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                       {
                            new SqlParameter("@TransDate", request.TransDate),
                            new SqlParameter("@FromLocation", request.FromLocation),
                    new SqlParameter("@ToLocation", request.ToLocation)
                        };
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetTripKms", param);

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        tripKmsModel.KMS = Convert.ToString(userData.Tables[0].Rows[0]["KMS"]);
                        tripKmsModel.EnrouteExpTruck = Convert.ToString(userData.Tables[0].Rows[0]["EnrouteExpTruck"]);
                        tripKmsModel.EnrouteExpTrailer = Convert.ToString(userData.Tables[0].Rows[0]["EnrouteExpTrailer"]);
                        tripKmsModel.EnrouteExpCarCarrier = Convert.ToString(userData.Tables[0].Rows[0]["EnrouteExpCarCarrier"]);
                        tripKmsModel.EnrouteExpEmpty = Convert.ToString(userData.Tables[0].Rows[0]["EnrouteExpEmpty"]);
                        tripKmsModel.DefinedTollExp = Convert.ToString(userData.Tables[0].Rows[0]["DefinedTollExp"]);
                      //  tripKmsModel.Status = Convert.ToBoolean(userData.Tables[0].Rows[0]["Status"]);
                     //   tripKmsModel.Message = Convert.ToString(userData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {

                        //tripKmsModel.Status = false;
                       // tripKmsModel.Message = "data not found";
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
            return tripKmsModel;
        }
        public async Task<ResponseModel> GetDslToBe(DslModel request)
        {
           ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TransDate", request.TransDate),
                            new SqlParameter("@TripKms", request.TripKms),
                    new SqlParameter("@LoadType", request.LoadType),
                    new SqlParameter("@VehicleMasterId", request.VehicleMasterId)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetDslToBe", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                    }
                    else
                    {
                       // responseModel.Status = false;
                      //  responseModel.Message = "Unable to process";
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


        public async Task<ResponseModel> CheckDuplicateLr(GcModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@GcSlNo", request.GcSlNo),
                           
                 
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_CheckDuplicateLR", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
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
        public async Task<ResponseModel> GetAdBlueToBe(AdBlueModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TransDate", request.TransDate),
                             new SqlParameter("@TripKms", request.TripKms),
                              new SqlParameter("@VehicleMasterId", request.VehicleMasterId),


                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetAdblueToBe", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                       // responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                       // responseModel.Status = false;
                      //  responseModel.Message = "Unable to process";
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
        public async Task<List<BranchListModel>> GetContentList()
        {
            List<BranchListModel> contentList = new();
            try
            {
                if (dbconnection != null)
                {


                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "ContentList_Select", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            contentList.Add(new BranchListModel
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
            return contentList;
        }
        public async Task<ResponseModel> GetGcSeries()
        {
            ResponseModel content = new();
            try
            {
                if (dbconnection != null)
                {


                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "GetGcSeries_Select", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        content.Message = Convert.ToString(statusData.Tables[0].Rows[0]["message"]);
                        content.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
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
            return content;
        }
        public async Task<List<BranchListModel>> GetBillingPartyList()
        {
            List<BranchListModel> partyList = new();
            try
            {
                if (dbconnection != null)
                {


                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "BillingPartyList_Select", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            partyList.Add(new BranchListModel
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
            return partyList;
        }
    }
}
