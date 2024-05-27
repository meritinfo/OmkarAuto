using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public interface IChallanMasterRepository
    {
        Task<ChallanListModel> GetChallanMasterList(ReportRequestModel request);
        Task<ChallanMasterModel> GetChallanInnerGridList(RequestModel request);
        Task<ResponseModel> ChallanMasterSave(ChallanMasterModel challanModel);
        Task<ResponseModel> ChallanMasterDelete(RequestModel requestModel);
    }
}
