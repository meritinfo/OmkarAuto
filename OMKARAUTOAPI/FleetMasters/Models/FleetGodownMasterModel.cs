using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Models
{
    public class FleetGodownMasterModel
    {
        public string? GodownId {  get; set; }
        public string? GodownShortCode {  get; set; }
        public string? GodownDesc {  get; set; }
        public string? GodownAddress {  get; set; }
        public string? ControllingBranch {  get; set; }
        public string? GodownIncharge {  get; set; }
        public string? InchargeMobile {  get; set; }
        public string? IsActive {  get; set; }
        public string? CreatedDate {  get; set; }
        public string? LoggedInUser {  get; set; }
    }
}
