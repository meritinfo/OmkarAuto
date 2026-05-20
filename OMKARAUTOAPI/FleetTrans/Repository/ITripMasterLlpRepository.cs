using FleetTrans.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FleetTrans.Repository
{
    public interface ITripMasterLlpRepository
    {
        Task<ResponseModel> TripMasterLlpSave(TripMasterModel tripMasterModel);
        Task<TripMasterList> GetTripMasterList(ReportRequestModel request);
        Task<TripMasterModel> GetTripMasterInnerSearchLlpList(ReportRequestModel request);
        Task<TripMasterModel> GetTripMasterInnerGridLlpList(RequestModel request);
        Task<TripMasterModel> GetTripMasterInnerGridRefreshLlpList(RequestModel request);        
        Task<ResponseModel> TripMasterLlpDelete(RequestModel requestModel);
        Task<List<DropDownListModel>> GetDriverList();
        Task<List<DropDownListModel>> GetExpList();
        Task<ResponseModel> GetNextTripNo(RequestModel request);
        Task<ResponseModel> CheckDupliTripNo(ReportRequestModel request);
        Task<ResponseModel> GetDslMileage(RequestModel request);
        Task<ResponseModel> GetBhattaRate(RequestModel request);
        Task<ReportRequestModel> GetOpeningBal(ReportRequestModel request);
        Task<ResponseModel> GetTripPrintPdf(RequestModel request);
    }
}
