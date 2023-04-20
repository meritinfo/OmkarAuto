using AdminMasters.Models;
using Consignment.Model;
namespace Consignment.Business
{
    public interface IConsignmentBusiness
    {
        Task<ResponseModel> ConsignmentSave(ConsignmentModel consignmentModel);
    }

}
