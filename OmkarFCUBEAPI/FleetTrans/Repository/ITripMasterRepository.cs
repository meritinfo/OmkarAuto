using FleetTrans.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public interface ITripMasterRepository
    {
        Task<ResponseModel> TripMasterSave(TripMasterModel tripMasterModel);
        Task<TripSheetList> GetTripSheetList(TripSheetListRequest request);
        Task<List<BranchListModel>> GetDriverList();
        Task<TripSheetInnerGridListModel> GetTripSheetInnerGridList();
    }
}
