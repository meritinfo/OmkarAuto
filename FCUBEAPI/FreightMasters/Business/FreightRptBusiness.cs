using DocumentFormat.OpenXml.Office2016.Excel;
using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public class FreightRptBusiness : IFreightRptBusiness
    {
        readonly IFreightRptRepository freightRptRepository;
        public FreightRptBusiness(IFreightRptRepository _freightRptRepository)
        {
            freightRptRepository = _freightRptRepository;
        }
        public async Task<ResponseModel> GetAgeingSummRptExcel(ReportAgeModel request)
        {
            return await freightRptRepository.GetAgeingSummRptExcel(request);
        }
        public async Task<ResponseModel> GetAgeingSummBranchRptExcel(ReportAgeModel request)
        {
            return await freightRptRepository.GetAgeingSummBranchRptExcel(request);
        }
        public async Task<ResponseModel> GetAgeingSummPartyRptExcel(ReportAgeModel request)
        {
            return await freightRptRepository.GetAgeingSummPartyRptExcel(request);
        }
        public async Task<ResponseModel> GetAgeingDetailRptExcel(ReportAgeModel request)
        {
            return await freightRptRepository.GetAgeingDetailRptExcel(request);
        }

        public async Task<ResponseModel> GetOutstandingSummRptExcel(ReportAgeModel request)
        {
            return await freightRptRepository.GetOutstandingSummRptExcel(request);
        }
        public async Task<ResponseModel> GetOutstandingDetailRptExcel(ReportAgeModel request)
        {
            return await freightRptRepository.GetOutstandingDetailRptExcel(request);
        }
        public async Task<ResponseModel> GetOutstandingDetailPartyRptExcel(ReportAgeModel request)
        {
            return await freightRptRepository.GetOutstandingDetailPartyRptExcel(request);
        }
        public async Task<BillOutstandingRptListModel> GetOutstandingDetailPartyRptList(ReportAgeModel request)
        {
            return await freightRptRepository.GetOutstandingDetailPartyRptList(request);
        }
        public async Task<ResponseModel> GetBillSubmittedSummRptExcel(ReportAgeModel request)
        {
            return await freightRptRepository.GetBillSubmittedSummRptExcel(request);
        }
        public async Task<ResponseModel> GetBillSubmittedDetailRptExcel(ReportAgeModel request)
        {
            return await freightRptRepository.GetBillSubmittedDetailRptExcel(request);
        }
        public async Task<ResponseModel> GetOutstandingAnalysisRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetOutstandingAnalysisRptExcel(request);
        }
        public async Task<OutstandingAnalRptListModel> GetOutstandingAnalysisRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetOutstandingAnalysisRptList(request);
        }

        public async Task<BillRegisterRptListModel> GetBillRegisterRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetBillRegisterRptList(request);
        }
        public async Task<ResponseModel> GetBillRegisterRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetBillRegisterRptExcel(request);
        }
        public async Task<BookingRegisterRptListModel> GetBookingRegisterRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetBookingRegisterRptList(request);
        }
        public async Task<ResponseModel> GetBookingRegisterRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetBookingRegisterRptExcel(request);
        }

        public async Task<BusinessSummRptListModel> GetBusinessSummRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetBusinessSummRptList(request);
        }
        public async Task<ResponseModel> GetBusinessSummRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetBusinessSummRptExcel(request);
        }

        public async Task<ChallanRegisterRptListModel> GetChallanRegisterRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetChallanRegisterRptList(request);
        }
        public async Task<ResponseModel> GetChallanRegisterRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetChallanRegisterRptExcel(request);
        }
        public async Task<ChallanRegisterRptListModel> GetChallanTdsStatementRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetChallanTdsStatementRptList(request);
        }
        public async Task<ResponseModel> GetChallanTdsStatementRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetChallanTdsStatementRptExcel(request);
        }


        public async Task<DistanceMasterFrtRptListModel> GetDistanceMasterFrtRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetDistanceMasterFrtRptList(request);
        }
        public async Task<ResponseModel> ExcelDistanceMasterFrtRptList(ReportRequestModel request)
        {
            return await freightRptRepository.ExcelDistanceMasterFrtRptList(request);
        }

        public async Task<DistanceMasterTripRptListModel> GetDistanceMasterTripRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetDistanceMasterTripRptList(request);
        }
        public async Task<ResponseModel> ExcelDistanceMasterTripRptList(ReportRequestModel request)
        {
            return await freightRptRepository.ExcelDistanceMasterTripRptList(request);
        }

        public async Task<GSTRegisterRptListModel> GetGSTRegisterRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetGSTRegisterRptList(request);
        }
        public async Task<ResponseModel> GetGSTRegisterRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetGSTRegisterRptExcel(request);
        }


        public async Task<LHExtraPmtReconRptListModel> GetLHExtraPmtReconRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetLHExtraPmtReconRptList(request);
        }
        public async Task<ResponseModel> GetLHExtraPmtReconRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetLHExtraPmtReconRptExcel(request);
        }

        public async Task<LhPayableStatusRptListModel> GetLhPayableStatusRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetLhPayableStatusRptList(request);
        }
        public async Task<ResponseModel> GetLhPayableStatusRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetLhPayableStatusRptExcel(request);
        }


        public async Task<LHPMVarianceRptListModel> GetLHPMVarianceRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetLHPMVarianceRptList(request);
        }
        public async Task<ResponseModel> GetLHPMVarianceRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetLHPMVarianceRptExcel(request);
        }

        public async Task<LRCostingRptListModel> GetLRCostingRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetLRCostingRptList(request);
        }
        public async Task<ResponseModel> GetLRCostingRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetLRCostingRptExcel(request);
        }

        public async Task<LRWithOutChallanRptListModel> GetLRWithOutChallanRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetLRWithOutChallanRptList(request);
        }
        public async Task<ResponseModel> GetLRWithOutChallanRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetLRWithOutChallanRptExcel(request);
        }

        public async Task<MRRegisterRptListModel> GetMRRegisterRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetMRRegisterRptList(request);
        }
        public async Task<ResponseModel> GetMRRegisterRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetMRRegisterRptExcel(request);
        }

        public async Task<OnAccountMRStatusRptListModel> GetOnAccountMRStatusRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetOnAccountMRStatusRptList(request);
        }
        public async Task<ResponseModel> GetOnAccountMRStatusRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetOnAccountMRStatusRptExcel(request);
        }

        public async Task<UnBilledRptListModel> GetUnBilledRptList(RepReqModel request)
        {
            return await freightRptRepository.GetUnBilledRptList(request);
        }
        public async Task<ResponseModel> GetUnBilledRptExcel(RepReqModel request)
        {
            return await freightRptRepository.GetUnBilledRptExcel(request);
        }

        public async Task<ResponseModel> GetPendingDelvAckRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetPendingDelvAckRptExcel(request);
        }
        public async Task<DriverLicRptListModel> GetDriverLicRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetDriverLicRptList(request);
        }
        public async Task<ResponseModel> ExcelDriverLicRptList(ReportRequestModel request)
        {
            return await freightRptRepository.ExcelDriverLicRptList(request);
        }

        public async Task<DprRptListModel> GetDPRRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetDPRRptList(request);
        }
        public async Task<ResponseModel> GetDPRRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetDPRRptExcel(request);
        }

        public async Task<ResponseModel> GetLHPaymentSummRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetLHPaymentSummRptExcel(request);
        }

        public async Task<DetentionRptListModel> GetDetentionRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetDetentionRptList(request);
        }
        public async Task<ResponseModel> GetDetentionRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetDetentionRptExcel(request);
        }

        public async Task<MrListModel> GetDeductionRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetDeductionRptList(request);
        }
        public async Task<ResponseModel> GetDeductionRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetDeductionRptExcel(request);
        }

        public async Task<DocumentAllotmentListModel> GetMissingDocRptList(ReportRequestModel request)
        {
            return await freightRptRepository.GetMissingDocRptList(request);
        }
        public async Task<ResponseModel> GetMissingDocRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetMissingDocRptExcel(request);
        }

        public async Task<ResponseModel> GetBillGstRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetBillGstRptExcel(request);
        }
        public async Task<ResponseModel> GetDeliveryDisputeRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetDeliveryDisputeRptExcel(request);
        }

        public async Task<ResponseModel> GetPartyMISRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetPartyMISRptExcel(request);
        }
        public async Task<List<DropDownListModel>> GetPartyMisList()
        {
            return await freightRptRepository.GetPartyMisList();
        }
        public async Task<ResponseModel> GetBillInterestLossRptExcel(ReportRequestModel request)
        {
            return await freightRptRepository.GetBillInterestLossRptExcel(request);
        }
    }
}
