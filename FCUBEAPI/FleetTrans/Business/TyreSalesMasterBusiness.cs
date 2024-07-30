using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Office2016.Excel;
using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public class TyreSalesMasterBusiness: ITyreSalesMasterBusiness
    {
        readonly ITyreSalesMasterRepository tyreSalesRepository;
        public TyreSalesMasterBusiness(ITyreSalesMasterRepository _tyreSalesRepository)
        {
            tyreSalesRepository = _tyreSalesRepository;
        }
        public async Task<ResponseModel> TyreSalesMasterSave(TyreSalesMasterModel tyreSalesMasterModel)
        {
            return await tyreSalesRepository.TyreSalesMasterSave(tyreSalesMasterModel);
        }
        public async Task<ResponseModel> TyreSalesMasterDelete(RequestModel req)
        {
            return await tyreSalesRepository.TyreSalesMasterDelete(req);
        }
        public async Task<TyreSalesMasterModel> GetTyreSalesMasterInnerGridList(RequestModel request)
        {
            return await tyreSalesRepository.GetTyreSalesMasterInnerGridList(request);
        }
        public async Task<TyreSalesMasterList> GetTyreSalesMasterList(PageFromDtToDtRequest request)
        {
            return await tyreSalesRepository.GetTyreSalesMasterList(request);
        }
        public async Task<List<DropDownListModel>> GetCustomerList()
        {
            return await tyreSalesRepository.GetCustomerList();
        }

    }
}
