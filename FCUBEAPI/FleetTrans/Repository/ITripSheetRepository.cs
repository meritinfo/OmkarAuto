using FleetTrans.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FleetTrans.Repository
{
    public interface ITripSheetRepository
    {
        Task<ResponseModel> TripSheetSave(TripSheetModel tripMasterModel);
        Task<TripSheetList> GetTripSheetList(ReportRequestModel request);
        Task<TripSheetModel> GetTripSheetInnerSearchList(ReportRequestModel request);
        Task<TripSheetModel> GetTripSheetInnerGridList(RequestModel request);
        Task<ResponseModel> TripSheetDelete(RequestModel requestModel);
        Task<ResponseModel> GetNextTripSalDate(RequestModel request);
        Task<ResponseModel> GetTripJetPrintPdf(RequestModel request);
    }
}
