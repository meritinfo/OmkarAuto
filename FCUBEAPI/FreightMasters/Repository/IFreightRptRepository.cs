using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public interface IFreightRptRepository
    {
        Task<ResponseModel> GetAgeingSummRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetAgeingSummBranchRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetAgeingSummPartyRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetAgeingDetailRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetOutstandingSummRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetOutstandingDetailRptExcel(ReportRequestModel request);
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

        Task<UnBilledRptListModel> GetUnBilledRptList(ReportRequestModel request);
        Task<ResponseModel> GetUnBilledRptExcel(ReportRequestModel request);

        Task<ResponseModel> GetPendingDelvAckRptExcel(ReportRequestModel request);


        Task<DriverLicRptListModel> GetDriverLicRptList(ReportRequestModel request);
        Task<ResponseModel> ExcelDriverLicRptList(ReportRequestModel request);

        Task<DprRptListModel> GetDPRRptList(ReportRequestModel request);
        Task<ResponseModel> GetDPRRptExcel(ReportRequestModel request);

    }
}
