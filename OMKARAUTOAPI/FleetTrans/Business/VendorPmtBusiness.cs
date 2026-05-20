using DocumentFormat.OpenXml.Drawing;
using FleetTrans.Business;
using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;

namespace FleetTrans.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class VendorPmtBusiness : IVendorPmtBusiness
    {
        readonly IVendorPmtRepository vendorPmtRepository;
        public VendorPmtBusiness(IVendorPmtRepository _vendorPmtRepository)
        {
            vendorPmtRepository = _vendorPmtRepository;
        }

        public async Task<VendorPmtListModel> GetVendorPmtList(ReportRequestModel request)
        {
            return await vendorPmtRepository.GetVendorPmtList(request);
        }
        public async Task<VendorPmtModel> GetVendorPmtSearchList(ReportRequestModel request)
        {
            return await vendorPmtRepository.GetVendorPmtSearchList(request);
        }
        public async Task<VendorPmtModel> GetVendorPmtInnerGridList(RequestModel request)
        {
            return await vendorPmtRepository.GetVendorPmtInnerGridList(request);
        }
        public async Task<ResponseModel> VendorPmtDetailsSave(VendorPmtModel vendorPmt)
        {
            return await vendorPmtRepository.VendorPmtDetailsSave(vendorPmt);
        }
        public async Task<ResponseModel> VendorPmtDetailsDelete(RequestModel request)
        {
            return await vendorPmtRepository.VendorPmtDetailsDelete(request);
        }

    }
}
