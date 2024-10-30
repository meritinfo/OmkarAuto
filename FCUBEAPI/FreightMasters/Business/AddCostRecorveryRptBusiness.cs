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
    public class AddCostRecorveryRptBusiness : IAddCostRecorveryRptBusiness
    {
        readonly IAddCostRecorveryRptRepository addCostRecorveryRptRepository;
        public AddCostRecorveryRptBusiness(IAddCostRecorveryRptRepository _addCostRecorveryRptRepository)
        {
            addCostRecorveryRptRepository = _addCostRecorveryRptRepository;
        }
        public async Task<AddCostRecorveryRptListModel> GetAddCostRecorveryRptList(ReportRequestModel request)
        {
            return await addCostRecorveryRptRepository.GetAddCostRecorveryRptList(request);
        }
        public async Task<ResponseModel> GetAddCostRecorveryRptExcel(ReportRequestModel request)
        {
            return await addCostRecorveryRptRepository.GetAddCostRecorveryRptExcel(request);
        }
    }
}
