using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Models
{
    public class ChallanReleaseModel
    {
        public string? ChReleaseId { get; set; }
        public string? ChYear { get; set; }
        public string? ChallanBranch { get; set; }
        public string? ChallanNo { get; set; }
        public string? ChallanId { get; set; }
        public string? ReleaseForPmt { get; set; }
        public string? Year { get; set; }
        public string? Branch { get; set; }
        public string? LoggedInUser { get; set; }
       // public string? ReleasedBy { get; set; }
        //public string?ReleasedDate { get; set; }
    }
}
