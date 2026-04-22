using DocumentFormat.OpenXml.Drawing;
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
    public class FleetBillsMasterBusiness: IFleetBillsMasterBusiness
    {
        readonly IFleetBillsMasterRepository billsRepository;
        public FleetBillsMasterBusiness(IFleetBillsMasterRepository _billsRepository)
        {
            billsRepository = _billsRepository;
        }
        public async Task<BillsMasterSearchListModel> GetFleetBillsMasterSearchList(RequestModel request)
        {
            return await billsRepository.GetFleetBillsMasterSearchList(request);
        }
        public async Task<BillsListModel> GetFleetBillsMasterList(ReportRequestModel request)
        {
            return await billsRepository.GetFleetBillsMasterList(request);
        }
        public async Task<BillsMasterSearchListModel> GetFleetBillsInnerGridList(RequestModel request)
        {
            return await billsRepository.GetFleetBillsInnerGridList(request);
        }
        public async Task<ResponseModel> GetFleetBillPdf(ReportRequestModel request)
        {
            return await billsRepository.GetFleetBillPdf(request);
        }
        public async Task<ResponseModel> GetFleetBillGsrPdf(ReportRequestModel request) 
        {
            return await billsRepository.GetFleetBillGsrPdf(request);
        }
    }
}
