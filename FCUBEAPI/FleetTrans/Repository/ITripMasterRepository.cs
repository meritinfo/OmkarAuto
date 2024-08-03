using FleetTrans.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FleetTrans.Repository
{
    public interface ITripMasterRepository
    {
        Task<ResponseModel> TripMasterSave(TripMasterModel tripMasterModel);
        Task<TripSheetList> GetTripSheetList(ReportRequestModel request);
        Task<List<DropDownListModel>> GetDriverList();
        Task<ResponseModel> GetOpeningBal(OpBalModel request);
        Task<ResponseModel> GetDslOpeningBal(OpBalModel request);
        Task<ResponseModel> GetLastTripDriver(OpBalModel request);
        Task<ResponseModel> GetDslOpeningBalforPmt(OpBalModel request);
        Task<ResponseModel> GetAdblueOpeningBal(OpBalModel request);
        Task<DriverDetailModel> GetDriverDetail(RequestModel request);
        Task<ResponseModel> GetIncentiveRate(IncentiveRateModel request);
        Task<ResponseModel> GetPenaltyRate(PenaltyRateModel request);
        Task<PenaltyModel> GetPenaltyRateNew(PenaltyRateModel request);
        Task<ResponseModel> GetBhattaRate(BhattaRateModel request);
        Task<TripSheetList> GetOtherTripOpenList(ReportRequestModel request);
        Task<ResponseModel> OtherTripOpenSave(TripMasterModel tripMasterModel);
        Task<ResponseModel> OtherTripOpenDelete(RequestModel request);
        Task<ResponseModel> GetNextTripNo(OpBalModel tripNoFilter);
         Task<ResponseModel> TripMasterDelete(RequestModel requestModel);
        Task<UserTripRightsModel> GetUserDetails(RequestModel request);
     //   Task<TripSheetInnerGridListModel> GetTripSheetInnerGridList(TripSheetInnerGridListRequest request);
    }
}
