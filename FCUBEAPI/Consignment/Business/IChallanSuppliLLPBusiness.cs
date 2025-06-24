using Consignment.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Business
{
    public interface IChallanSuppliLLPBusiness
    {
        Task<ChallanListModel> GetChallanSuppliListLLP(ReportRequestModel request);
        Task<ResponseModel> ChallanSuppliSaveLLP(ChallanMasterModel challanModel);
        Task<ResponseModel> ChallanSuppliDeleteLLP(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateChallanSuppliLLP(RequestModel request);
    }
}
