using FleetTrans.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public  class TyreDeActivateMasterList
    {
        public List<TyreDeActivateMasterModel> TyreDeActivateList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
