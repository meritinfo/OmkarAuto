using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Models
{
    public class GodownStockModel
    {
        public string? SpareLubId {get;set;}
        public string? BrandId { get;set;}
        public string? OpeningQty { get;set;}
        public string? OpeningValue { get;set;}
        public string? GodownId { get;set;}
        public List<GodownStockModel>?GodownStockModellst { get; set; }
    }
}
