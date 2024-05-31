using Consignment.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Repository
{
    public interface IChallanMasterRepository
    {
        Task<ChallanListModel> GetChallanMasterList(ReportRequestModel request);
        Task<ChallanMasterModel> GetChallanInnerGridList(RequestModel request);
        Task<ResponseModel> ChallanMasterSave(ChallanMasterModel challanModel);
        Task<ResponseModel> ChallanMasterDelete(RequestModel requestModel);
        Task<ResponseModel> GetChallanNo(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateChallan(RequestModel requestModel);
        Task<ResponseModel> GetConsignmentId(RequestModel requestModel);
        Task<PanApiResultModel> GetPanValidDetails(RequestModel request);
    }
}
