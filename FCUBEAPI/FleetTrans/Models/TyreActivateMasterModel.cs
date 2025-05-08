using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class TyreActivateMasterModel
    {
        public string? ActivateMasterID { get; set; }
        public string? ActivateDate{ get; set; }
        public string? RefNo { get; set; }
        public string? VehicleMasterid { get; set; }
        public string? VehicleNo { get; set; }
        public string? Kmr { get; set; }
        public string? InspectedBy { get; set; }
        public string? FittedBy { get; set; }
        public string? TyreAmt { get; set; }
        public string? OthAmt { get; set; }
        public string? NetAmt { get; set; }
        public string? Remarks { get; set; }
        public string? BranchCode { get; set; }
        public string? Findocid { get; set; }
        public string? YearID { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }

        public string? LoggedInUser { get; set; }
        public List<TyreActivateDtlmodel>? TyreActivateDtlList { get; set; }

    }
    public class TyreActivateDtlmodel
    {
        public string? ActivateMasterID { get; set; }
        public string? ActivateDate { get; set; }
        public string? VehicleMasterid { get; set; }
        public string? BrandId { get; set; }
        public string? TyreId { get; set; }
        public string? TyrePosID { get; set; }
        public string? TyreCostAmt { get; set; }
        public string? Remarks { get; set; }
       }
    }


