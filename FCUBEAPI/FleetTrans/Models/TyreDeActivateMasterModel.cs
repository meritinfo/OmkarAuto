using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class TyreDeActivateMasterModel
    {
        public string? DeActivateMasterID { get; set; }
        public string? DeActivateDate { get; set; }
        public string? RefNo { get; set; }
        public string? VehicleMasterid { get; set; }
        public string? VehicleNo { get; set; }
        public string? Kmr { get; set; }
        public string? InspectedBy { get; set; }
        public string? RemovedBy { get; set; }
        public string? Remarks { get; set; }
        public string? UsableTyreAmt { get; set; }
        public string? Findocid { get; set; }
        public string? BranchCode { get; set; }
        public string? YearID { get; set; }
        public string? LoggedInUser { get; set; }
        public List<TyreDeActivateDtlListmodel>? TyreDeActivateDtlList { get; set; }
    }
    public class TyreDeActivateDtlListmodel
    {
        public string? DeActivateMasterID { get; set; }
        public string? DeActivateDate { get; set; }
        public string? VehicleMasterid { get; set; }
        public string? BrandId { get; set; }
        public string? TyreId { get; set; }
        public string? RemoveStatus { get; set; }
        public string? UsableAmount { get; set; }
        public string? Remarks { get; set; }
    }


}
