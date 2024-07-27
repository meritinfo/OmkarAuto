using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class FleetLoadEntryModel
    {
        public string? LoadId { get; set; }
        public string? LoadBranch { get; set; }
        public string? LoadDate { get; set; }
        public string? LoadType { get; set; }
        public string? VehicleMasterId { get; set; }
        public string? LoadFor { get; set; }
        public string? LoadMemoNo { get; set; }
        public string? LoadingFrom { get; set; }
        public string? ConsignorName { get; set; }
        public string? ConsignorAdd { get; set; }
        public string? LoadingTo { get; set; }
        public string? ConsigneeName { get; set; }
        public string? ConsigneeAdd { get; set; }
        public string? ProductId { get; set; }
        public string? QtyWt { get; set; }
        public string? QtyPkgs { get; set; }
        public string? RatePerTon { get; set; }
        public string? HireAmt { get; set; }
        public string? AdvAmt { get; set; }
        public string? Remarks { get; set; }
        public string? AttachMemocopy { get; set; }
        public string? TripAdjYN { get; set; }
        public string? TripId { get; set; }
        public string? TripBrName { get; set; }
        public string? VehicleNo { get; set; }
        public string? LoggedInUser { get; set; }
    }
}
