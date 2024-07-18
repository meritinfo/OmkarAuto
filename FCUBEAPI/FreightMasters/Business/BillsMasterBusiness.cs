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
    public class BillsMasterBusiness: IBillsMasterBusiness
    {
        readonly IBillsMasterRepository billsRepository;
        public BillsMasterBusiness(IBillsMasterRepository _billsRepository)
        {
            billsRepository = _billsRepository;
        }
        public async Task<BillsMasterSearchListModel> GetBillsMasterSearchList(BillsMasterSearchListRequest request)
        {
            return await billsRepository.GetBillsMasterSearchList(request);
        }
        public async Task<BillsListModel> GetBillsMasterList(PageRequest request)
        {
            return await billsRepository.GetBillsMasterList(request);
        }
        public async Task<BillsMasterSearchListModel> GetBillsInnerGridList(RequestModel request)
        {
            return await billsRepository.GetBillsInnerGridList(request);
        }
        public async Task<ResponseModel> BillsMasterSave(BillsMasterModel billsModel)
        {
            return await billsRepository.BillsMasterSave(billsModel);
        }
        public async Task<ResponseModel> BillsMasterDelete(RequestModel request)
        {
            return await billsRepository.BillsMasterDelete(request);
        }
        public async Task<ResponseModel> LrBillUpdate(RequestModel reqmodel)
        {
            return await billsRepository.LrBillUpdate(reqmodel);
        }
    }
}
