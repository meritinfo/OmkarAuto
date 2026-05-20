using FleetMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Business
{
    public interface IMaintanenceMasterBusiness
    {
        Task<MaintanenceMasterList> GetMaintanenceMasterList(ReportRequestModel request);
        Task<ResponseModel> MaintanenceMasterSave(MaintanenceMasterModel maintanenceMasterModel);
        Task<ResponseModel> CheckDuplicateMaintanence(RequestModel requestModel);
        Task<ResponseModel> MaintanenceMasterDelete(RequestModel requestModel);
    }
}
