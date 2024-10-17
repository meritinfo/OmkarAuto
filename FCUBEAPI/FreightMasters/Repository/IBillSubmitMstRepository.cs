
using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public interface IBillSubmitMstRepository
    {
        Task<ResponseModel> BillSubmitMstSave(BillSubmitMasterModel billSubmitMasterModel);
        Task<BillSubmitMasterModel> GetBillSubmitMasterInnerGridList(RequestModel request);
        Task<BillSubmitMasterList> GetBillSubmitMasterList(PageFromDtToDtRequest request);
        Task<ResponseModel> BillSubmitMasterDelete(RequestModel req);
        Task<List<DropDownListModel>> GetDeptList();
        Task<BillSubmitMasterModel> GetBillSubmitSearchList(ReportRequestModel request);


    }
}
