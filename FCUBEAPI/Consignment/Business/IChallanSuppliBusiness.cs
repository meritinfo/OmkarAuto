using Consignment.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Business
{
    public interface IChallanSuppliBusiness
    {
        Task<ChallanListModel> GetChallanSuppliList(ReportRequestModel request);
        Task<ResponseModel> ChallanSuppliSave(ChallanMasterModel challanModel);
        Task<ResponseModel> ChallanSuppliDelete(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateChallanSuppli(RequestModel requestModel);
    }
}
