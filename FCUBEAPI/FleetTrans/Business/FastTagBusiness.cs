using DocumentFormat.OpenXml.Office2016.Excel;
using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;

namespace FleetTrans.Business
{
    public class FastTagBusiness : IFastTagBusiness
    {
        readonly IFastTagRepository fastTagRepository;
        public FastTagBusiness(IFastTagRepository _fastTagRepository)
        {
            fastTagRepository = _fastTagRepository;
        }
        public async Task<ResponseModel> FastTagDelete(RequestModel request)
        {
            return await fastTagRepository.FastTagDelete(request);
        }
        public async Task<ResponseModel> FastTagSave(FastTagModel fasttag)
        {
            return await fastTagRepository.FastTagSave(fasttag);
        }
        public async Task<FastTagListModel> GetFastTagList(ReportRequestModel request)
        {
            return await fastTagRepository.GetFastTagList(request);
        }
        public async Task<FastTagModel> GetFastTagInnerGridList(RequestModel request)
        {
            return await fastTagRepository.GetFastTagInnerGridList(request);
        }
   
    } 
}
