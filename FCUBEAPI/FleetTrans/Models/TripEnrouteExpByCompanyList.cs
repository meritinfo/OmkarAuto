using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FleetTrans.Models
{
    public class TripEnrouteExpByCompanyList
    {
        public List<TripEnrouteExpByCompanyModel> CompanyList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}
