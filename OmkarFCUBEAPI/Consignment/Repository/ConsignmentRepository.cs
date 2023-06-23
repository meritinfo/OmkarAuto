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
    }
}
