using Consignment.Models;

namespace Consignment.Repository
{
    public interface IConsignmentRepository
    {
        Task<ResponseModel> ConsignmentSave(ConsignmentModel consignmentModel);
    }
}
