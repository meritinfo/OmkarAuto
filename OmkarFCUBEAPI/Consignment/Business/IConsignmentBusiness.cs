using Consignment.Models;
namespace Consignment.Business
{
    /// <summary>
    /// Consignment business interface methods
    /// </summary>
    public interface IConsignmentBusiness
    {
        Task<ResponseModel> ConsignmentSave(ConsignmentModel consignmentModel);
    }

}
