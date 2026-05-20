using DocumentFormat.OpenXml.Drawing;
using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public class TripEnrouteExpByCompanyBusiness: ITripEnrouteExpByCompanyBusiness
    {
        readonly ITripEnrouteExpByCompanyRepository tripEnrouteExpByCompanyRepository;
        public TripEnrouteExpByCompanyBusiness(ITripEnrouteExpByCompanyRepository _tripEnrouteExpByCompanyRepository)
        {
            tripEnrouteExpByCompanyRepository = _tripEnrouteExpByCompanyRepository;
        }
        public async Task<ResponseModel> TripEnrouteExpByCompanySave(TripEnrouteExpByCompanyModel tripEnrouteExpByCompanyModel)
        {
            return await tripEnrouteExpByCompanyRepository.TripEnrouteExpByCompanySave(tripEnrouteExpByCompanyModel);
        }
        public async Task<TripEnrouteExpByCompanyList> GetTripEnrouteExpByCompanyList(ReportRequestModel request)
        {
            return await tripEnrouteExpByCompanyRepository.GetTripEnrouteExpByCompanyList(request);
        }
        public async Task<ResponseModel> TripEnrouteExpByCompanyDelete(RequestModel req)
        {
            return await tripEnrouteExpByCompanyRepository.TripEnrouteExpByCompanyDelete(req);
        }
        public async Task<List<DropDownListModel>> GetExpTypeList()
         {
            return await tripEnrouteExpByCompanyRepository.GetExpTypeList();
         }




}
}
