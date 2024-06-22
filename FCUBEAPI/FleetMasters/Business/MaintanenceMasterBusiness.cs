using FleetMasters.Models;
using FleetMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Business
{
    public class MaintanenceMasterBusiness: IMaintanenceMasterBusiness
    {
        readonly IMaintanenceMasterRepository maintanenceMasterRepository;
        public MaintanenceMasterBusiness(IMaintanenceMasterRepository _maintanenceMasterRepository)
        {
            maintanenceMasterRepository = _maintanenceMasterRepository;
        }
        public async Task<ResponseModel> MaintanenceMasterSave(MaintanenceMasterModel maintanenceMasterModel)
        {
            return await maintanenceMasterRepository.MaintanenceMasterSave(maintanenceMasterModel);
        }
        public async Task<MaintanenceMasterList> GetMaintanenceMasterList(ReportRequestModel request)
        {
            return await maintanenceMasterRepository.GetMaintanenceMasterList(request);
        }
        public async Task<ResponseModel> MaintanenceMasterDelete(RequestModel requestModel)
        {
            return await maintanenceMasterRepository.MaintanenceMasterDelete(requestModel);
        }
        public async Task<ResponseModel> CheckDuplicateMaintanence(RequestModel requestModel)
        {
            return await maintanenceMasterRepository.CheckDuplicateMaintanence(requestModel);
        }


    }
}
