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
        Task<TripSheetList> GetTripSheetList(PageRequestDtBrVh request);
        Task<List<DropDownListModel>> GetDriverList();
        Task<ResponseModel> GetOpeningBal(OpBalModel request);
        Task<ResponseModel> GetDslOpeningBal(OpBalModel request);
        Task<ResponseModel> GetAdblueOpeningBal(OpBalModel request);
        Task<DriverDetailModel> GetDriverDetail(DriverRequestModel request);
        Task<ResponseModel> GetIncentiveRate(IncentiveRateModel request);
        Task<ResponseModel> GetPenaltyRate(PenaltyRateModel request);
        Task<ResponseModel> GetBhattaRate(BhattaRateModel request);
        Task<TripSheetList> GetOtherTripOpenList(PageFromDtToDtRequest request);
        Task<ResponseModel> OtherTripOpenSave(TripMasterModel tripMasterModel);
        Task<ResponseModel> OtherTripOpenDelete(Request request);
        Task<ResponseModel> GetNextTripNo(OpBalModel tripNoFilter);
        Task<TripSheetInnerGridListModel> GetTripSheetInnerGridList(TripSheetInnerGridListRequest request);
    }
}
