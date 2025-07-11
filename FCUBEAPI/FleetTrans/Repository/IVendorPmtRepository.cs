using FleetTrans.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FleetTrans.Repository
{
    public interface IVendorPmtRepository
    {
        Task<VendorPmtListModel> GetVendorPmtList(ReportRequestModel request);
        Task<VendorPmtModel> GetVendorPmtSearchList(ReportRequestModel request);
        Task<VendorPmtModel> GetVendorPmtInnerGridList(RequestModel request);
        Task<ResponseModel> VendorPmtDetailsSave(VendorPmtModel vendorPmt);
        Task<ResponseModel> VendorPmtDetailsDelete(RequestModel request);
    }
}
