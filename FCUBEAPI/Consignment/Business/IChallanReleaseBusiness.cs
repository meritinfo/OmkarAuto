using Consignment.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Business
{
    public interface IChallanReleaseBusiness
    {
        Task<ResponseModel> ChallanReleaseDelete(RequestModel requestModel);
        Task<ResponseModel> ChallanReleaseSave(ChallanReleaseModel challanReleaseModel);
        Task<ChallanReleaseListModel> GetChallanReleaseList(ReportRequestModel request);
        Task<ChallanMasterModel> SearchChallanDetails(ReportRequestModel req);


    }
}
