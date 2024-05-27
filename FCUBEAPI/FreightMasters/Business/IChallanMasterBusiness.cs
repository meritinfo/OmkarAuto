using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IChallanMasterBusiness
    {
        Task<ChallanListModel> GetChallanMasterList(ReportRequestModel request);
         Task<ChallanMasterModel> GetChallanInnerGridList(RequestModel request);
        Task<ResponseModel> ChallanMasterSave(ChallanMasterModel dprModel);
        Task<ResponseModel> ChallanMasterDelete(RequestModel requestModel);
    }
}
