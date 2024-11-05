using DocumentFormat.OpenXml.Office2016.Excel;
using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public class AddCostRecBusiness : IAddCostRecBusiness
    {
        readonly IAddCostRecRepository addCostRecorveryRepository;
        public AddCostRecBusiness(IAddCostRecRepository _addCostRecorveryRepository)
        {
            addCostRecorveryRepository = _addCostRecorveryRepository;
        }

        public async Task<AddCostRecListModel> GetAddCostRecMstList(ReportRequestModel request)
        {
            return await addCostRecorveryRepository.GetAddCostRecMstList(request);
        }
        public async Task<AddCostRecMstModel> GetAddCostRecInnerGridList(RequestModel request)
        {
            return await addCostRecorveryRepository.GetAddCostRecInnerGridList(request);
        }
        public async Task<ResponseModel> AddCostRecSave(AddCostRecMstModel addCostRec)
        {
            return await addCostRecorveryRepository.AddCostRecSave(addCostRec);
        }

        public async Task<ResponseModel> AddCostRecDelete(RequestModel request)
        {
            return await addCostRecorveryRepository.AddCostRecDelete(request);
        }
        public async Task<ResponseModel> GetAddCostRecEntryTranNo(RequestModel requestModel)
        {
            return await addCostRecorveryRepository.GetAddCostRecEntryTranNo(requestModel);
        }
        public async Task<List<DropDownListModel>> GetAddCostRecList()
        {
            return await addCostRecorveryRepository.GetAddCostRecList();
        }
        public async Task<AddCostRecMstModel> GetAddCostRecEntryDocDetails(ReportRequestModel request)
        {
            return await addCostRecorveryRepository.GetAddCostRecEntryDocDetails(request);
        }
        public async Task<AddCostRecMstModel> GetAddCostRecEntrySearchList(ReportRequestModel request)
        {
            return await addCostRecorveryRepository.GetAddCostRecEntrySearchList(request);
        }
        public async Task<List<DropDownListModel>> GetcostCodeList(RequestModel requestModel)
        {
            return await addCostRecorveryRepository.GetcostCodeList(requestModel);
        }
        public async Task<AddCostRecorveryRptListModel> GetAddCostRecorveryRptList(ReportRequestModel request)
        {
            return await addCostRecorveryRepository.GetAddCostRecorveryRptList(request);
        }
        public async Task<ResponseModel> GetAddCostRecorveryRptExcel(ReportRequestModel request)
        {
            return await addCostRecorveryRepository.GetAddCostRecorveryRptExcel(request);
        }
    }
}
