using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public interface ISparesPurchaseMasterRepository
    {
        Task<SparesPurchaseMasterList> GetSparesPurchaseMasterList(PageFromDtToDtRequest request);
        Task<SparesPurchaseMasterModel> GetSparesPurchaseMasterInnerGridList(RequestModel request);
        Task<ResponseModel> SparesPurchaseMasterSave(SparesPurchaseMasterModel sparesPurchaseMasterModel);
        Task<ResponseModel> SparesPurchaseMasterDelete(RequestModel req);
        Task<List<DropDownListModel>> GetSparesBrandList();
        Task<List<DropDownListModel>> GetSparesList();

    }
}
