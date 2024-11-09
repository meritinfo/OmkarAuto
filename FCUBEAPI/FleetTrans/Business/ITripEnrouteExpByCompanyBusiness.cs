using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public interface ITripEnrouteExpByCompanyBusiness
    {
        Task<ResponseModel> TripEnrouteExpByCompanySave(TripEnrouteExpByCompanyModel tripEnrouteExpByCompanyModel);
        Task<ResponseModel> TripEnrouteExpByCompanyDelete(RequestModel req);

        Task<TripEnrouteExpByCompanyList> GetTripEnrouteExpByCompanyList(ReportRequestModel request);
    }
}
