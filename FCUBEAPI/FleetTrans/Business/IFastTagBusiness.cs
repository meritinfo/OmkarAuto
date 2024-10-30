using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface IFastTagBusiness
    {
        Task<ResponseModel> FastTagDelete(RequestModel request);
        Task<ResponseModel> FastTagSave(FastTagModel fasttag);
        Task<FastTagListModel> GetFastTagList(ReportRequestModel request);
        Task<FastTagModel> GetFastTagInnerGridList(RequestModel request);
    }
}
