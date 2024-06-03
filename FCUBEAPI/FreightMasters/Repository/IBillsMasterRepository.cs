using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public interface IBillsMasterRepository
    {
        Task<BillsListModel> GetBillsMasterList(PageRequest request);
        Task<BillsMasterModel> GetBillsInnerGridList(RequestModel request);
        Task<ResponseModel> BillsMasterSave(BillsMasterModel challanModel);
        Task<ResponseModel> BillsMasterDelete(RequestModel requestModel);
        Task<BillsMasterSearchListModel> GetBillsMasterSearchList(BillsMasterSearchListRequest request);

    }
}
