using FreightMasters.Models;

namespace FreightMasters.Business
{
    public interface IDistanceMasterFrtBusiness
    {
        Task<ResponseModel> DistanceMasterFrtSave(DistanceMasterFrtModel distanceMasterFrtModel);
        Task<DistanceMasterFrtList> GetDistanceMasterFrtList(DistanceMasterFreightListRequest request);
        //  Task<DistanceMasterFrtList> GetDistanceMasterFrtList(DistanceMasterFreightListRequest request);
        Task<DistanceMasterFrtModel> GetFreightInnerGridList(FreightTripInnerGridListRequest request);

    }
}
