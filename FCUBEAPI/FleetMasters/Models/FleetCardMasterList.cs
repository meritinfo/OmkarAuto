using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FleetMasters.Models
{
    public class FleetCardMasterList
    {
        public List<FleetCardMasterModel> CardList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
