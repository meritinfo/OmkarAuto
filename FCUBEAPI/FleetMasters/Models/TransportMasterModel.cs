using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Models
{
    public class TransportMasterModel
    {
        public string?TptCode { get; set; }
        public string?TptName { get; set; }

        public string?Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? Address3 { get; set; }
        public string? Address4 { get; set; }
        public string?StateCode { get; set; }
        public string?PinCode { get; set; }
        public string?Phone { get; set; }
        public string?Email { get; set; }
        public string?ContactPerson1 { get; set; }
        public string?Mobile1 { get; set; }
        public string?ContactPerson2 { get; set; }
        public string?Mobile2 { get; set; }
        public string?PanNo { get; set; }
        public string?GSTNo { get; set; }
        public string?AadharNo { get; set; }
        public string?CancelChq { get; set; }
        public string?AddrProof { get; set; }
        public string?EligibleForBid { get; set; }
        public string?WhatsappMblNo { get; set; }
        public string? BranchCode { get; set; }
        public string?Remarks{ get; set; }
        public string?IsActive { get; set; }
        public string?InActiveDate { get; set; }
        public string? BankAcName { get; set; }
        public string? BankAcType { get; set; }
        public string? BankName { get; set; }
        public string? BankAdd { get; set; }
        public string? BankAcNo { get; set; }
        public string? BankIfsc { get; set; }
        public string? LoggedInUser { get; set; }
        public List<TransportLocationListmodel>? TransportLocationList { get; set; }
        public List<TransportStatesListmodel>? TransportStatesList { get; set; }
        public List<TransportVehTypesListmodel>? TransportVehTypesList { get; set; }


    }
    public class TransportLocationListmodel
    {
        public string? Dtlid { get; set; }
        public string? TptCode { get; set; }
        public string? LocId { get; set; }
    }
    public class TransportStatesListmodel
    {
        public string? Dtlid { get; set; }
        public string? TptCode { get; set; }
        public string? StateCode { get; set; }
    }
    public class TransportVehTypesListmodel
    {
        public string? Dtlid { get; set; }
        public string? TptCode { get; set; }
        public string? VehTypeId { get; set; }
    }
}
