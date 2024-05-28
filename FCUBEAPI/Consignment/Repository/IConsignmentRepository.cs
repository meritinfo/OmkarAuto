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
        Task<ResponseModel> CheckVehicleNo(RequestModel request);
        Task<ResponseModel> GetKms(KmsModel request);
        Task<List<DropDownListModel>> GetRateList();
        Task<List<DropDownListModel>> GetLocationList();
        Task<List<DropDownListModel>> GetContentList();
        Task<List<DropDownListModel>> GetVehicleNoList();
        Task<List<DropDownListModel>> GetClassList();
    }
}
