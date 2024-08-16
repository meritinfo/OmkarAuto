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
        Task<BillsListModel> GetBillsMasterList(PageFromDtToDtRequest request);
        Task<BillsMasterSearchListModel> GetBillsInnerGridList(RequestModel request);
        Task<ResponseModel> BillsMasterSave(BillsMasterModel challanModel);
        Task<ResponseModel> BillsMasterDelete(RequestModel requestModel);
        Task<ResponseModel> LrBillUpdate(RequestModel reqmodel);
        Task<BillsMasterSearchListModel> GetBillsMasterSearchList(RequestModel request);
       

    }
}
