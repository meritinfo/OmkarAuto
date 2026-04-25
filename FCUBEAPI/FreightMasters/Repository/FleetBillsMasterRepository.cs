using FreightMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System.Data.SqlClient;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace FreightMasters.Repository
{
    public class FleetBillsMasterRepository: IFleetBillsMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public FleetBillsMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<BillsMasterSearchListModel> GetFleetBillsMasterSearchList(RequestModel request)
        {
            BillsMasterSearchListModel billsMasterSearchList = new();
            List<BillsMasterSearchModel> billsMasterSearchModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BillingParty",   request.strRequest),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFleetBillsSearchList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = 0;
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billsMasterSearchModel.Add(new BillsMasterSearchModel
                            {
                                ConsignmentID = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentID"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                BookingPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingPlace"]),
                                GcNoteNo= Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                FromPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlace"]),
                                ToPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]),
                                RateRs = Convert.ToString(dataSet.Tables[0].Rows[i]["RateRs"]),
                                FreightRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightRs"]),
                                HandlingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["HandlingRs"]),
                                LoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingDetnRs"]),
                                MiscRs = Convert.ToString(dataSet.Tables[0].Rows[i]["MiscRs"]),
                                UnLoadingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["UnLoadingRs"]),
                                UnLoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[i]["UnLoadingDetnRs"]),
                                ExtrasRS = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtrasRS"]),
                                OthersRs = Convert.ToString(dataSet.Tables[0].Rows[i]["OthersRs"]),
                                SubTotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["SubTotalRs"]),
                                GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["GtotalRs"]),

                                Selected = false
                            });
                        }

                        billsMasterSearchList.BillsMasterSearchList = billsMasterSearchModel;
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return billsMasterSearchList;
        }
        public async Task<BillsListModel> GetFleetBillsMasterList(ReportRequestModel request)
        {
            BillsListModel billsMasterList = new();
            List<BillsMasterModel> billsList = new();
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
                            new SqlParameter("@SuppYN",     request.FilterStr),
                            new SqlParameter("@LoginBranch",request.SortOrder),
                            new SqlParameter("@YearId",     request.FilterStr1),
                            new SqlParameter("@Party",      request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFleetBillsMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billsList.Add(new BillsMasterModel
                            {
                                BillsMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["BillsMasterId"]),
                                BillingStation = Convert.ToString(dataSet.Tables[0].Rows[i]["BillingStation"]),
                                BillNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BillNo"]),
                                BillStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["BillStatus"]),
                                BillType = Convert.ToString(dataSet.Tables[0].Rows[i]["BillType"]),
                                SacHsn = Convert.ToString(dataSet.Tables[0].Rows[i]["SacHsn"]),
                                BillDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BillDate"]),
                                DueDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DueDate"]),
                                SuppYN = Convert.ToString(dataSet.Tables[0].Rows[i]["SuppYN"]),
                                PartyCode = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyCode"]),
                                PartyGstLocation = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyGstLocation"]),
                                CollBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["CollBranch"]),
                                GstType = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                GstBy  = Convert.ToString(dataSet.Tables[0].Rows[i]["GstBy"]),
                                TotalFreight = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalFreight"]),
                                TotalStatistical = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalStatistical"]),
                                TotalFov = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalFov"]),
                                TotalDoorColl = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDoorColl"]),
                                TotalHandling = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalHandling"]),
                                TotalLoadingDetn = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalLoadingDetn"]),
                                TotalEnroute = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalEnroute"]),
                                TotalMisc = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalMisc"]),
                                TotalDoorDel = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDoorDel"]),
                                TotalUnLoading = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalUnLoading"]),
                                TotalDetention = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDetention"]),
                                TotalExtras = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalExtras"]),
                                TotalOthers = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOthers"]),
                                TotalSubTotal = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalSubTotal"]),
                                TotalSgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalSgstAmt"]),
                                TotalCgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalCgstAmt"]),
                                TotalIgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalIgstAmt"]),
                                TotalNonGstAmt1 = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalNonGstAmt1"]),
                                TotalNonGstAmt2 = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalNonGstAmt2"]),
                                TotalGtotal = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalGtotal"]),
                                BillRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["BillRemarks"]),
                                EnlcosedDocs = Convert.ToString(dataSet.Tables[0].Rows[i]["EnlcosedDocs"]),
                                SuppParticulars = Convert.ToString(dataSet.Tables[0].Rows[i]["SuppParticulars"]),
                                Attachedfile = Convert.ToString(dataSet.Tables[0].Rows[i]["Attachedfile"]),
                                BillAmtCleared = Convert.ToString(dataSet.Tables[0].Rows[i]["BillAmtCleared"]),
                                BillDed = Convert.ToString(dataSet.Tables[0].Rows[i]["BillDed"]),
                                BillTDS = Convert.ToString(dataSet.Tables[0].Rows[i]["BillTDS"]),
                                Recoverable = Convert.ToString(dataSet.Tables[0].Rows[i]["Recoverable"]),
                                BillExcess = Convert.ToString(dataSet.Tables[0].Rows[i]["BillExcess"]),
                                SdEmdAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SdEmdAmt"]),
                                RecoveredAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["RecoveredAmt"]),
                                PrintedYN = Convert.ToString(dataSet.Tables[0].Rows[i]["PrintedYN"]),
                                PrintedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PrintedDate"]),
                                MRDone = Convert.ToString(dataSet.Tables[0].Rows[i]["MRDone"]),
                                MRDate = Convert.ToString(dataSet.Tables[0].Rows[i]["MRDate"]),
                                SubmitYN = Convert.ToString(dataSet.Tables[0].Rows[i]["SubmitYN"]),
                                SubmitDate = Convert.ToString(dataSet.Tables[0].Rows[i]["SubmitDate"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                FinFtmid = Convert.ToString(dataSet.Tables[0].Rows[i]["FinFtmid"]),
                                CheckedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CheckedBy"]),
                                ApprovedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ApprovedBy"]),
                                DisputeType = Convert.ToString(dataSet.Tables[0].Rows[i]["DisputeType"]),
                                DisputeDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DisputeDate"]),
                                DisputeCaseNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DisputeCaseNo"]),
                                DisputeCaseStory = Convert.ToString(dataSet.Tables[0].Rows[i]["DisputeCaseStory"]),
                                DisputeReleaseDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DisputeReleaseDate"]),
                                StationName = Convert.ToString(dataSet.Tables[0].Rows[i]["StationName"]),
                                Party = Convert.ToString(dataSet.Tables[0].Rows[i]["Party"]),
                                CollectionBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["CollectionBranch"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),
                            });
                        }

                        billsMasterList.BillsList = billsList;

                        billsMasterList.PageMetaData = new PaginationMetaData
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
            return billsMasterList;
        }
        public async Task<BillsMasterSearchListModel> GetFleetBillsInnerGridList(RequestModel request)
        {
            BillsMasterSearchListModel billsMasterSearchList = new();
            List<BillsMasterSearchModel> billsMasterSearchModel = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@BillsMasterId", request.strRequest)
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFleetBillsInnerGrid", param);
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billsMasterSearchModel.Add(new BillsMasterSearchModel
                            {
                                BookingPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingPlace"]),
                                ConsignmentID = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentID"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                FromPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlace"]),
                                ToPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]),
                                RateRs = Convert.ToString(dataSet.Tables[0].Rows[i]["RateRs"]),
                                FreightRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightRs"]),
                                StatisticalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["StatisticalRs"]),
                                FovRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FovRs"]),
                                DoorCollRs = Convert.ToString(dataSet.Tables[0].Rows[i]["DoorCollRs"]),
                                HandlingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["HandlingRs"]),
                                LoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingDetnRs"]),
                                EnrouteRs = Convert.ToString(dataSet.Tables[0].Rows[i]["EnrouteRs"]),
                                MiscRs = Convert.ToString(dataSet.Tables[0].Rows[i]["MiscRs"]),
                                DoorDelRs = Convert.ToString(dataSet.Tables[0].Rows[i]["DoorDelRs"]),
                                UnLoadingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["UnLoadingRs"]),
                                UnLoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[i]["UnLoadingDetnRs"]),
                                ExtrasRS = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtrasRS"]),
                                OthersRs = Convert.ToString(dataSet.Tables[0].Rows[i]["OthersRs"]),
                                SubTotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["SubTotalRs"]),
                                GstType = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                NonGstAmt1 = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmt1"]),
                                NonGstAmt2 = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmt2"]),
                                GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["GtotalRs"]),
                                Remarks1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks1"]),
                                Remarks2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks2"]),
                                Remarks3 = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks3"]),
                                //OtherAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherAmt"]),
                                Selected = true,
                            });
                        }

                        billsMasterSearchList.BillsMasterSearchList = billsMasterSearchModel;
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return billsMasterSearchList;
        }
        public async Task<ResponseModel> GetFleetBillPdf(ReportRequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                string baseUrl = "";
                if (request.Search=="S")
                {
                    baseUrl = dbconnection.Value.apiPath + "api/BillSupply/";
                }
                else
                {
                    baseUrl = dbconnection.Value.apiPath + "api/Bill/";
                }


                string UrlParam = "?BillingStn=" + request.FilterStr +
                                    "&BillNo=" + request.FilterStr1 +
                                    "&YearId=" + request.FilterStr2+
                                    "&PrintSign=" + request.FilterStr3;

                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.GetAsync(UrlParam).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    dynamic data = JsonConvert.DeserializeObject(result);
                    if (data!="500")
                    {
                        responseModel.Status = true;
                        responseModel.Message = data;
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = data;
                    }


                    client.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }
        public async Task<ResponseModel> GetFleetBillGsrPdf(ReportRequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                string baseUrl = dbconnection.Value.apiPath + "api/FleetBillGsr/";

                string UrlParam = "?BillingStn=" + request.FilterStr +
                                    "&BillNo=" + request.FilterStr1 +
                                    "&YearId=" + request.FilterStr2;

                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.GetAsync(UrlParam).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    dynamic data = JsonConvert.DeserializeObject(result);
                    if (data != "500")
                    {
                        responseModel.Status = true;
                        responseModel.Message = data;
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = data;
                    }


                    client.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }

    }
}


    

