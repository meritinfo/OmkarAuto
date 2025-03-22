using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IBillsMasterBusinessLLP
    {
        Task<BillsListModelLLP> GetBillsMasterList(ReportRequestModel request);
        Task<BillsMasterSearchListModelLLP> GetBillsInnerGridList(RequestModel request);
        Task<ResponseModel> BillsMasterSaveLLP(BillsMasterModelLLP challanModel);
        Task<ResponseModel> BillsMasterDelete(RequestModel requestModel);
        Task<ResponseModel> LrBillUpdate(RequestModel reqmodel);
        Task<BillsMasterSearchListModelLLP> GetBillsMasterSearchList(RequestModel request);
        Task<List<DropDownListModel>> GetBillPartyGstLocationList(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateBillsNo(ReportRequestModel request);
        Task<ResponseModel> GetBillTypeSacHsn(RequestModel requestModel);
        Task<ResponseModel> GetBillPdf(ReportRequestModel request);
        Task<BillsMasterModelLLP> GetBillEnqDetails(RequestModel req);
        Task<BillsMasterModelLLP> GetBillEnqInnerGridList(RequestModel request);
        Task<ResponseModel> GetBillNoLLP(RequestModel req);

    }
}
