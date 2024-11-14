using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public interface ITripEnrouteExpByCompanyRepository
    {
        Task<ResponseModel> TripEnrouteExpByCompanySave(TripEnrouteExpByCompanyModel tripEnrouteExpByCompanyModel);
        Task<ResponseModel> TripEnrouteExpByCompanyDelete(RequestModel req);

        Task<TripEnrouteExpByCompanyList> GetTripEnrouteExpByCompanyList(ReportRequestModel request);
        Task<List<DropDownListModel>> GetExpTypeList();
    }
}
