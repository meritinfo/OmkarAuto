

using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;

namespace FreightMasters.Business
{
    public class DistanceMasterTripBusiness : IDistanceMasterTripBusiness
    {
        readonly IDistanceMasterTripRepository distanceMasterTripRepository;
        public DistanceMasterTripBusiness(IDistanceMasterTripRepository _distanceMasterTripRepository)
        {
            distanceMasterTripRepository = _distanceMasterTripRepository;
        }

        /// <summary>
        /// Business method for save FreightRatesDtl details
        /// </summary>
        /// <param name="FreightRatesDtlModel"></param>
        public async Task<ResponseModel> DistanceMasterTripSave(DistanceMasterTripModel distanceMasterTripModel)
        {
            return await distanceMasterTripRepository.DistanceMasterTripSave(distanceMasterTripModel);
        }
        public async Task<DistanceMasterTripList> GetDistanceMasterTripList(PageRequestDtBrVh request)


        {
            return await distanceMasterTripRepository.GetDistanceMasterTripList(request);
        }
        public async Task<DistanceMasterTripModel> GetFreightTripInnerGridList(FreightTripInnerGridListRequest request)
        {
            return await distanceMasterTripRepository.GetFreightTripInnerGridList(request);
        }
        public async Task<ResponseModel> DistanceMasterTripDelete(Request req)
        {
            return await distanceMasterTripRepository.DistanceMasterTripDelete(req);
        }
        public async Task<ResponseModel> ChkdistanceTripValidity(DistanceMasterTripModel distanceMasterTripModel)
        {
            return await distanceMasterTripRepository.ChkdistanceTripValidity(distanceMasterTripModel);
        }
        public async Task<ResponseModel> DistanceDetailTripSave(DistanceDetailTripModel distanceDetailTripModel)
        {
            return await distanceMasterTripRepository.DistanceDetailTripSave(distanceDetailTripModel);
        }
        public async Task<List<DropDownListModel>> GetDistanceTripFromLocationList()
        {
            return await distanceMasterTripRepository.GetDistanceTripFromLocationList();
        }
        public async Task<DistanceTripEditModel> GetDistanceTripDtls(Request request)
        {
            return await distanceMasterTripRepository.GetDistanceTripDtls(request);
        }
        public async Task<DistanceTripEditModel> GetDistanceTripEditDetails(DistanceTripEditModel distanceFrtEdit)
        {
            return await distanceMasterTripRepository.GetDistanceTripEditDetails(distanceFrtEdit);
        }
        public async Task<ResponseModel> DistanceTripEditDetailsSave(DistanceTripEditModel distanceFrtEdit)
        {
            return await distanceMasterTripRepository.DistanceTripEditDetailsSave(distanceFrtEdit);
        }
       
         


    }
}

