using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Repository
{
    public interface IFastTagRepository
    {
        Task<ResponseModel> FastTagDelete(RequestModel request);
        Task<ResponseModel> FastTagSave(FastTagModel fasttag);
        Task<FastTagListModel> GetFastTagList(ReportRequestModel request);
        Task<FastTagModel> GetFastTagInnerGridList(RequestModel request);
    }
}
