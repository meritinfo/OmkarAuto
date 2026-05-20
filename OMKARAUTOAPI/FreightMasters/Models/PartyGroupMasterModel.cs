using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{

   
        public class PartyGroupMasterModel
        {
            public string? PartyGroupId { get; set; }
            public string? PartyGroupDesc { get; set; }
            public string? DeleteFlag { get; set; }
            public string? LoggedInUser { get; set; }
            public List<PartyGroupDetailModel> PartyGroupDetailModellist { get; set; }
        }
    

}
