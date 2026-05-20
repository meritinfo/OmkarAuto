using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public interface IAddCostRecRepository
    {
        Task<AddCostRecListModel> GetAddCostRecMstList(ReportRequestModel request);
        Task<AddCostRecMstModel> GetAddCostRecInnerGridList(RequestModel request);
        Task<ResponseModel> AddCostRecSave(AddCostRecMstModel addCostRec);
        Task<ResponseModel> AddCostRecDelete(RequestModel request);
        Task<ResponseModel> GetAddCostRecEntryTranNo(RequestModel requestModel);
        Task<AddCostRecMstModel> GetAddCostRecEntryDocDetails(ReportRequestModel request);
        Task<AddCostRecMstModel> GetAddCostRecEntrySearchList(ReportRequestModel request);
        Task<List<DropDownListModel>> GetAddCostRecList();
        Task<List<DropDownListModel>> GetcostCodeList(RequestModel requestModel);
        Task<AddCostRecorveryRptListModel> GetAddCostRecorveryRptList(ReportRequestModel request);
        Task<ResponseModel> GetAddCostRecorveryRptExcel(ReportRequestModel request);
    }
}
