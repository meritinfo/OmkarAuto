using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IFleetBillsMasterBusiness
    {
        Task<BillsListModel> GetFleetBillsMasterList(ReportRequestModel request);
        Task<BillsMasterSearchListModel> GetFleetBillsInnerGridList(RequestModel request);
        Task<BillsMasterSearchListModel> GetFleetBillsMasterSearchList(RequestModel request);
        Task<ResponseModel> GetFleetBillPdf(ReportRequestModel request);
        Task<ResponseModel> GetFleetBillGsrPdf(ReportRequestModel request);

    }
}
