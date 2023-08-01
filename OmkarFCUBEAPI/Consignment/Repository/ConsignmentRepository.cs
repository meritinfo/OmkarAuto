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

                                Kms = Convert.ToString(dataSet.Tables[0].Rows[i]["Kms"]),
                                BillingBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["BillingBranch"]),
                                CnorCode = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorCode"]),
                                CneeCode = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeCode"]),
                                CnorInvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorInvNo"]),
                                CnorInvDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorInvDate"]),
                                PoNo = Convert.ToString(dataSet.Tables[0].Rows[i]["PoNo"]),
                                PoDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PoDate"]),
                                WoNo = Convert.ToString(dataSet.Tables[0].Rows[i]["WoNo"]),
                                WoDate = Convert.ToString(dataSet.Tables[0].Rows[i]["WoDate"]),
                                RiskBy = Convert.ToString(dataSet.Tables[0].Rows[i]["RiskBy"]),
                                BillingParty = Convert.ToString(dataSet.Tables[0].Rows[i]["BillingParty"]),
                                OwnTruck = Convert.ToString(dataSet.Tables[0].Rows[i]["OwnTruck"]),
                                TruckId = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckId"]),
                                TruckNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckNo"]),
                                ProductId = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductId"]),
                                GstHSN = Convert.ToString(dataSet.Tables[0].Rows[i]["GstHSN"]),
                                NoPackages = Convert.ToString(dataSet.Tables[0].Rows[i]["NoPackages"]),
                                WeightType = Convert.ToString(dataSet.Tables[0].Rows[i]["WeightType"]),
                                ActualWt = Convert.ToString(dataSet.Tables[0].Rows[i]["ActualWt"]),
                                Chargewt = Convert.ToString(dataSet.Tables[0].Rows[i]["Chargewt"]),
                                BulkYN = Convert.ToString(dataSet.Tables[0].Rows[i]["BulkYN"]),
                                LoadLength = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadLength"]),
                                LoadWidth = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadWidth"]),
                                LoadCFT = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadCFT"]),
                                DelType = Convert.ToString(dataSet.Tables[0].Rows[i]["DelType"]),
                                LoadType = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadType"]),
                                RateType = Convert.ToString(dataSet.Tables[0].Rows[i]["RateType"]),
                                PrivateMark = Convert.ToString(dataSet.Tables[0].Rows[i]["PrivateMark"]),
                                StaxGstBy = Convert.ToString(dataSet.Tables[0].Rows[i]["StaxGstBy"]),
                                RateRs = Convert.ToString(dataSet.Tables[0].Rows[i]["RateRs"]),
                                FreightRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightRs"]),
                                StatisticalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["StatisticalRs"]),
                                AocRs = Convert.ToString(dataSet.Tables[0].Rows[i]["AocRs"]),
                                FovRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FovRs"]),
                                HandlingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["HandlingRs"]),
                                DoorCollRs = Convert.ToString(dataSet.Tables[0].Rows[i]["DoorCollRs"]),
                                DoorDeliRs = Convert.ToString(dataSet.Tables[0].Rows[i]["DoorDeliRs"]),
                                WithPassRs = Convert.ToString(dataSet.Tables[0].Rows[i]["WithPassRs"]),
                                InsuranceRs = Convert.ToString(dataSet.Tables[0].Rows[i]["InsuranceRs"]),
                                PackingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["PackingRs"]),
                                DccRs = Convert.ToString(dataSet.Tables[0].Rows[i]["DccRs"]),
                                LoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingDetnRs"]),
                                EnrouteRs = Convert.ToString(dataSet.Tables[0].Rows[i]["EnrouteRs"]),
                                MiscRs = Convert.ToString(dataSet.Tables[0].Rows[i]["MiscRs"]),
                                ExtrasRS = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtrasRS"]),
                                UnLoadingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["UnLoadingRs"]),
                                DetentionRs = Convert.ToString(dataSet.Tables[0].Rows[i]["DetentionRs"]),
                                StorageRs = Convert.ToString(dataSet.Tables[0].Rows[i]["StorageRs"]),
                                WarehousingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["WarehousingRs"]),
                                OthersRs = Convert.ToString(dataSet.Tables[0].Rows[i]["OthersRs"]),
                                OthersRs1 = Convert.ToString(dataSet.Tables[0].Rows[i]["OthersRs1"]),
                                OthersRs2 = Convert.ToString(dataSet.Tables[0].Rows[i]["OthersRs2"]),
                                OthersRs3 = Convert.ToString(dataSet.Tables[0].Rows[i]["OthersRs3"]),
                                OthersRs4 = Convert.ToString(dataSet.Tables[0].Rows[i]["OthersRs4"]),
                                SubTotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["SubTotalRs"]),
                                GstType = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                GstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["GstPct"]),
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                NonGstAmt1 = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmt1"]),
                                NonGstAmt1Desc = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmt1Desc"]),
                                NonGstAmt2 = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmt2"]),
                                NonGstAmt2Desc = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmt2Desc"]),
                                GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["GtotalRs"]),
                                AdvanceRs = Convert.ToString(dataSet.Tables[0].Rows[i]["AdvanceRs"]),
                                GeneralRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["GeneralRemarks"]),
                                IncludeCnYn = Convert.ToString(dataSet.Tables[0].Rows[i]["IncludeCnYn"]),
                                IncludeCnNo = Convert.ToString(dataSet.Tables[0].Rows[i]["IncludeCnNo"]),


                                Attachedfile = Convert.ToString(dataSet.Tables[0].Rows[i]["Attachedfile"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),


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
                            new SqlParameter("@Kms", ConsignmentModel.Kms),
                            new SqlParameter("@BillingBranch", ConsignmentModel.BillingBranch),
                            new SqlParameter("@CnorCode", ConsignmentModel.CnorCode),
                            new SqlParameter("@CneeCode", ConsignmentModel.CneeCode),
                            new SqlParameter("@CnorInvNo", ConsignmentModel.CnorInvNo),
                            new SqlParameter("@CnorInvDate", ConsignmentModel.CnorInvDate),
                            new SqlParameter("@PoNo", ConsignmentModel.PoNo),
                            new SqlParameter("@PoDate", ConsignmentModel.PoDate),
                            new SqlParameter("@WoNo", ConsignmentModel.WoNo),
                            new SqlParameter("@WoDate", ConsignmentModel.WoDate),
                            new SqlParameter("@RiskBy", ConsignmentModel.RiskBy),
                            new SqlParameter("@BillingParty", ConsignmentModel.BillingParty),
                            new SqlParameter("@OwnTruck", ConsignmentModel.OwnTruck),
                            new SqlParameter("@TruckId", ConsignmentModel.TruckId),
                            new SqlParameter("@TruckNo", ConsignmentModel.TruckNo),
                            new SqlParameter("@ProductId", ConsignmentModel.ProductId),
                            new SqlParameter("@GstHSN", ConsignmentModel.GstHSN),
                            new SqlParameter("@NoPackages", ConsignmentModel.NoPackages),
                            new SqlParameter("@WeightType", ConsignmentModel.WeightType),
                            new SqlParameter("@ActualWt", ConsignmentModel.ActualWt),
                            new SqlParameter("@Chargewt", ConsignmentModel.Chargewt),
                            new SqlParameter("@BulkYN", ConsignmentModel.BulkYN),
                            new SqlParameter("@LoadLength", ConsignmentModel.LoadLength),
                            new SqlParameter("@LoadWidth", ConsignmentModel.LoadWidth),
                            new SqlParameter("@LoadHeight", ConsignmentModel.LoadHeight),
                            new SqlParameter("@LoadCFT", ConsignmentModel.LoadCFT),
                            new SqlParameter("@DelType", ConsignmentModel.DelType),
                            new SqlParameter("@LoadType", ConsignmentModel.LoadType),
                            new SqlParameter("@RateType", ConsignmentModel.RateType),
                            new SqlParameter("@PrivateMark", ConsignmentModel.PrivateMark),
                            new SqlParameter("@StaxGstBy", ConsignmentModel.StaxGstBy),
                            new SqlParameter("@RateRs", ConsignmentModel.RateRs),
                            new SqlParameter("@FreightRs", ConsignmentModel.FreightRs),
                            new SqlParameter("@StatisticalRs", ConsignmentModel.StatisticalRs),
                            new SqlParameter("@AocRs", ConsignmentModel.AocRs),
                            new SqlParameter("@FovRs", ConsignmentModel.FovRs),
                            new SqlParameter("@HandlingRs", ConsignmentModel.HandlingRs),
                            new SqlParameter("@DoorCollRs", ConsignmentModel.DoorCollRs),
                            new SqlParameter("@DoorDeliRs", ConsignmentModel.DoorDeliRs),
                            new SqlParameter("@WithPassRs", ConsignmentModel.WithPassRs),
                            new SqlParameter("@InsuranceRs", ConsignmentModel.InsuranceRs),
                            new SqlParameter("@PackingRs", ConsignmentModel.PackingRs),
                            new SqlParameter("@DccRs", ConsignmentModel.DccRs),
                            new SqlParameter("@LoadingDetnRs", ConsignmentModel.LoadingDetnRs),
                            new SqlParameter("@EnrouteRs", ConsignmentModel.EnrouteRs),
                            new SqlParameter("@MiscRs", ConsignmentModel.MiscRs),
                            new SqlParameter("@ExtrasRS", ConsignmentModel.ExtrasRS),
                            new SqlParameter("@UnLoadingRs", ConsignmentModel.UnLoadingRs),
                            new SqlParameter("@DetentionRs", ConsignmentModel.DetentionRs),
                            new SqlParameter("@StorageRs", ConsignmentModel.StorageRs),
                            new SqlParameter("@WarehousingRs", ConsignmentModel.WarehousingRs),
                            new SqlParameter("@OthersRs", ConsignmentModel.OthersRs),
                            new SqlParameter("@OthersRs1", ConsignmentModel.OthersRs1),
                            new SqlParameter("@OthersRs2", ConsignmentModel.OthersRs2),
                            new SqlParameter("@OthersRs3", ConsignmentModel.OthersRs3),
                            new SqlParameter("@OthersRs4", ConsignmentModel.OthersRs4),
                            new SqlParameter("@SubTotalRs", ConsignmentModel.SubTotalRs),
                            new SqlParameter("@GstType", ConsignmentModel.GstType),
                            new SqlParameter("@GstPct", ConsignmentModel.GstPct),
                            new SqlParameter("@SgstAmt", ConsignmentModel.SgstAmt),
                            new SqlParameter("@CgstAmt", ConsignmentModel.CgstAmt),
                            new SqlParameter("@IgstAmt", ConsignmentModel.IgstAmt),
                            new SqlParameter("@NonGstAmt1", ConsignmentModel.NonGstAmt1),
                            new SqlParameter("@NonGstAmt1Desc", ConsignmentModel.NonGstAmt1Desc),
                            new SqlParameter("@NonGstAmt2", ConsignmentModel.NonGstAmt2),
                            new SqlParameter("@NonGstAmt2Desc", ConsignmentModel.NonGstAmt2Desc),
                            new SqlParameter("@GtotalRs", ConsignmentModel.GtotalRs),
                            new SqlParameter("@AdvanceRs", ConsignmentModel.AdvanceRs),
                            new SqlParameter("@GeneralRemarks", ConsignmentModel.GeneralRemarks),
                            new SqlParameter("@IncludeCnYn", ConsignmentModel.IncludeCnYn),
                            new SqlParameter("@IncludeCnNo", ConsignmentModel.IncludeCnNo),
                            new SqlParameter("@Attachedfile", ConsignmentModel.Attachedfile),
                            new SqlParameter("@YearId", ConsignmentModel.YearId),
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
        public async Task<List<BranchListModel>> GetLocationList(ConsignmentModel request)
        {
            List<BranchListModel> locationList = new();
            try
            {
                if (dbconnection != null)
                {

                    SqlParameter[] param =
                       {
                            new SqlParameter("@SearchValue", request.FromPlace),

                        };
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
    }
}
