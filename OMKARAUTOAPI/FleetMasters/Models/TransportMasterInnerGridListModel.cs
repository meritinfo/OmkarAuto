using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Models
{
    public class TransportMasterInnerGridListModel
    {
        public List<TransportLocationListmodel>? TransportLocationList { get; set; }
        public List<TransportStatesListmodel>? TransportStatesList { get; set; }
        public List<TransportVehTypesListmodel>? TransportVehTypesList { get; set; }

    }
}
