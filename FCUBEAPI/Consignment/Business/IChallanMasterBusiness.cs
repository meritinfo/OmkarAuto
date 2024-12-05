using Consignment.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Business
{
    public interface IChallanMasterBusiness
    {
        Task<ChallanListModel> GetChallanMasterList(ReportRequestModel request);
         Task<ChallanMasterModel> GetChallanInnerGridList(RequestModel request);
        Task<ResponseModel> ChallanMasterSave(ChallanMasterModel dprModel);
        Task<ResponseModel> ChallanMasterDelete(RequestModel requestModel);
        Task<ResponseModel> GetChallanNo(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateChallan(RequestModel requestModel);
        Task<ChallanMasterModel> GetConsignmentId(RequestModel requestModel);
        Task<ChallanMasterModel> GetChallanDetailsFromLR(RequestModel requestModel);
        Task<PanApiResultModel> GetPanValidDetails(RequestModel request);
        Task<ResponseModel> CheckChallanPrepForLr(RequestModel request);
        Task<ChallanMasterModel> GetChallanEnqDetails(RequestModel req);
        Task<ChallanMasterModel> GetChallanEnqInnerGridList(RequestModel request);
        Task<ResponseModel> GetChallanPrintPdf(RequestModel request);
    }
}
