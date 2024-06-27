using FleetMasters.Models;
using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public interface ITyrePurchaseMasterRepository
    {
        Task<ResponseModel> TyrePurchaseMasterSave(TyrePurchaseMasterModel tyrePurchaseMasterModel);
        Task<ResponseModel> TyrePurchaseMasterDelete(RequestModel req);
        Task<TyrePurchaseMasterList> GetTyrePurchaseMasterList(PageRequest request);
        Task<TyrePurchaseMasterInnerGridModel> GetTyrePurchaseMasterInnerGridList(RequestModel request);
    }
}
