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
        Task<List<DropDownListModel>> GetExpList();
        Task<ResponseModel> TripMasterDelete(RequestModel requestModel);
        Task<ResponseModel> GetNextTripNo(RequestModel request);
        Task<TripMasterModel> GetTripSheetInnerSearchList(ReportRequestModel request);
        Task<TripMasterModel> GetTripSheetInnerGridList(RequestModel request);
        Task<ResponseModel> GetDslMileage(RequestModel request);
        Task<ResponseModel> GetBhattaRate(RequestModel request);
        Task<ReportRequestModel> GetOpeningBal(ReportRequestModel request);
        Task<ResponseModel> GetTripPrintPdf(RequestModel request);
    }
}
