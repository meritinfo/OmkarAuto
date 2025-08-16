using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IFreightRptBusiness
    {
        Task<ResponseModel> GetAgeingSummRptExcel(ReportAgeModel request);
        Task<ResponseModel> GetAgeingSummBranchRptExcel(ReportAgeModel request);
        Task<ResponseModel> GetAgeingSummPartyRptExcel(ReportAgeModel request);
        Task<ResponseModel> GetAgeingDetailRptExcel(ReportAgeModel request);
        Task<ResponseModel> GetOutstandingSummRptExcel(ReportAgeModel request);
        Task<ResponseModel> GetOutstandingDetailRptExcel(ReportAgeModel request);
        Task<ResponseModel> GetOutstandingDetailPartyRptExcel(ReportAgeModel request);
        Task<BillOutstandingRptListModel> GetOutstandingDetailPartyRptList(ReportAgeModel request);
        Task<ResponseModel> GetBillSubmittedSummRptExcel(ReportAgeModel request);
        Task<ResponseModel> GetBillSubmittedDetailRptExcel(ReportAgeModel request);
        Task<ResponseModel> GetOutstandingAnalysisRptExcel(ReportRequestModel request);
        Task<OutstandingAnalRptListModel> GetOutstandingAnalysisRptList(ReportRequestModel request);

        Task<BillRegisterRptListModel> GetBillRegisterRptList(ReportRequestModel request);
        Task<ResponseModel> GetBillRegisterRptExcel(ReportRequestModel request);

        Task<BookingRegisterRptListModel> GetBookingRegisterRptList(ReportRequestModel request);
        Task<ResponseModel> GetBookingRegisterRptExcel(ReportRequestModel request);

        Task<BusinessSummRptListModel> GetBusinessSummRptList(ReportRequestModel request);
        Task<ResponseModel> GetBusinessSummRptExcel(ReportRequestModel request);


        Task<ChallanRegisterRptListModel> GetChallanRegisterRptList(ReportRequestModel request);
        Task<ResponseModel> GetChallanRegisterRptExcel(ReportRequestModel request);

        Task<DistanceMasterFrtRptListModel> GetDistanceMasterFrtRptList(ReportRequestModel request);
        Task<ResponseModel> ExcelDistanceMasterFrtRptList(ReportRequestModel request);

        Task<DistanceMasterTripRptListModel> GetDistanceMasterTripRptList(ReportRequestModel request);
        Task<ResponseModel> ExcelDistanceMasterTripRptList(ReportRequestModel request);

        Task<GSTRegisterRptListModel> GetGSTRegisterRptList(ReportRequestModel request);
        Task<ResponseModel> GetGSTRegisterRptExcel(ReportRequestModel request);

        Task<LHExtraPmtReconRptListModel> GetLHExtraPmtReconRptList(ReportRequestModel request);
        Task<ResponseModel> GetLHExtraPmtReconRptExcel(ReportRequestModel request);

        Task<LhPayableStatusRptListModel> GetLhPayableStatusRptList(ReportRequestModel request);
        Task<ResponseModel> GetLhPayableStatusRptExcel(ReportRequestModel request);

        Task<LHPMVarianceRptListModel> GetLHPMVarianceRptList(ReportRequestModel request);
        Task<ResponseModel> GetLHPMVarianceRptExcel(ReportRequestModel request);

        Task<LRCostingRptListModel> GetLRCostingRptList(ReportRequestModel request);
        Task<ResponseModel> GetLRCostingRptExcel(ReportRequestModel request);

        Task<LRWithOutChallanRptListModel> GetLRWithOutChallanRptList(ReportRequestModel request);
        Task<ResponseModel> GetLRWithOutChallanRptExcel(ReportRequestModel request);

        Task<MRRegisterRptListModel> GetMRRegisterRptList(ReportRequestModel request);
        Task<ResponseModel> GetMRRegisterRptExcel(ReportRequestModel request);

        Task<OnAccountMRStatusRptListModel> GetOnAccountMRStatusRptList(ReportRequestModel request);
        Task<ResponseModel> GetOnAccountMRStatusRptExcel(ReportRequestModel request);

        Task<UnBilledRptListModel> GetUnBilledRptList(RepReqModel request);
        Task<ResponseModel> GetUnBilledRptExcel(RepReqModel request);

        Task<ResponseModel> GetPendingDelvAckRptExcel(ReportRequestModel request);

        Task<DriverLicRptListModel> GetDriverLicRptList(ReportRequestModel request);
        Task<ResponseModel> ExcelDriverLicRptList(ReportRequestModel request);

        Task<DprRptListModel> GetDPRRptList(ReportRequestModel request);
        Task<ResponseModel> GetDPRRptExcel(ReportRequestModel request);

        Task<ResponseModel> GetLHPaymentSummRptExcel(ReportRequestModel request);

        Task<DetentionRptListModel> GetDetentionRptList(ReportRequestModel request);
        Task<ResponseModel> GetDetentionRptExcel(ReportRequestModel request);

        Task<MrListModel> GetDeductionRptList(ReportRequestModel request);
        Task<ResponseModel> GetDeductionRptExcel(ReportRequestModel request);

        Task<DocumentAllotmentListModel> GetMissingDocRptList(ReportRequestModel request);
        Task<ResponseModel> GetMissingDocRptExcel(ReportRequestModel request);

        Task<ResponseModel> GetBillGstRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetDeliveryDisputeRptExcel(ReportRequestModel request);

        Task<ResponseModel> GetPartyMISRptExcel(ReportRequestModel request);
        Task<List<DropDownListModel>> GetPartyMisList();
        Task<ResponseModel> GetBillInterestLossRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetChallanTdsStatementRptExcel(ReportRequestModel request);
        Task<ChallanRegisterRptListModel> GetChallanTdsStatementRptList(ReportRequestModel request);
    }
}
