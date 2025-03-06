using Consignment.Models;
using Shared.Models;
using System.Threading.Tasks;

namespace Consignment.Repository
{
    public interface IConsignmentRepository
    {
        Task<ConsignmentList> GetConsignmentList(ReportRequestModel request);
        Task<ConsignmentModel> GetLrInnerGridList(RequestModel request);
        Task<ResponseModel> ConsignmentDelete(RequestModel requestModel);
        Task<ResponseModel> ConsignmentSave(ConsignmentModel consignmentModel);
        Task<ResponseModel> GetLrNo(RequestModel req);
        Task<ResponseModel> CheckEwaybillExits(RequestModel req);
        Task<ResponseModel> CheckDuplicateLr(RequestModel request);
        Task<ResponseModel> GenerateLrNo(RequestModel request);
        Task<ResponseModel> CheckVehicleNo(RequestModel request);
        Task<List<DropDownListModel>> GetRateList();
        Task<List<DropDownListModel>> GetLocationList();
        Task<List<DropDownListModel>> GetContentList();
        Task<List<DropDownListModel>> GetVehicleNoList();
        Task<List<DropDownListModel>> GetVehicleIdList();
        Task<List<DropDownListModel>> GetClassList();
        Task<ResponseModel> GetBillSeries(RequestModel request);
        Task<ConsignmentModel> GetConsignmentUpdateDetails(RequestModel req);
        Task<ResponseModel> ConsignmentUpdate(ConsignmentUpdateModel ConsignmentModel);
        Task<ConsignmentModel> GetCnEnqDetails(RequestModel req);
        Task<CnEnqDocModel> GetCnEnqDoc(RequestModel req);
        Task<ConsignmentModel> GetCnEnqInnerGridList(RequestModel request);
        Task<ResponseModel> GetBillSubmitSeries(RequestModel request);
        Task<List<DropDownListModel>> GetGstByList();
        Task<ResponseModel> GetLRPrint(ReportRequestModel request);
        Task<List<DropDownListModel>> GetFreightList();
        Task<ConsignmentGstModel> GetFreightGstDetails(RequestModel request);
        Task<ResponseModel> GetLrNoLLP(RequestModel req);
        Task<ResponseModel> CheckDuplicateLrLLP(ReportRequestModel request);
    }
}
