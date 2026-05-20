
using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IBillSubmitMstBusiness
    {
        Task<ResponseModel> BillSubmitMstSave(BillSubmitMasterModel billSubmitMasterModel);
        Task<BillSubmitMasterModel> GetBillSubmitMasterInnerGridList(RequestModel request);
        Task<ResponseModel> GetBillSubmitPrint(RequestModel request);
        Task<BillSubmitMasterList> GetBillSubmitMasterList(ReportRequestModel request);
        Task<ResponseModel> BillSubmitMasterDelete(RequestModel req);
        Task<List<DropDownListModel>> GetDeptList();
        Task<BillSubmitMasterModel> GetBillSubmitSearchList(ReportRequestModel request);
    }
}
