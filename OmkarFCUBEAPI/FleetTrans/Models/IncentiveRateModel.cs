using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class IncentiveRateModel
    {
        public string Transdate { get; set; }
        public string TripKms { get; set; }
        public string FromPlace { get; set; }
        public string ToPlace { get; set; }

    }
}
