using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class VehicleTypeMasterModels
    {
        public string? VehTypeId { get; set; }
        public string? VehTypeDesc { get; set; }
        public string? VehGroup { get; set; }
        public string? TonCap { get; set; }
        public string? RunPerDayKM { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }
        public string? DeleteFlag { get; set; }
    }
}
