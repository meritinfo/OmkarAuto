using FleetMasters.Models;
using FleetMasters.Repository;
using Shared.Models;

namespace FleetMasters.Business
{
    public class DriverMasterBusiness : IDriverMasterBusiness
    {
        readonly IDriverMasterRepository driverMasterRepository;
        public DriverMasterBusiness(IDriverMasterRepository _driverMasterRepository)
        {
            driverMasterRepository = _driverMasterRepository;
        }

        /// <summary>
        /// Business method for save vehicle type group master details
        /// </summary>
        /// <param name="vehicleTypeMasterModel"></param>
        public async Task<ResponseModel> DriverMasterSave(DriverMasterModel driverMasterModel)
        {
            return await driverMasterRepository.DriverMasterSave(driverMasterModel);
        }

        public async Task<DriverMasterList> GetDriverMasterList(DriverMasterListRequest request)
        {
            return await driverMasterRepository.GetDriverMasterList(request);
        }
        public async Task<ResponseModel> DriverMasterDetailsDelete(Request req)
        {
            return await driverMasterRepository.DriverMasterDetailsDelete(req);
        }

    }
}
