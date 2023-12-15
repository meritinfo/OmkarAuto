using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Models
{
    public class VehicleFltMasterModel
    {
        public string? VehicleMasterID { get; set; }
        public string? VehicleNo { get; set; }
        public string? FleetStation { get; set; }
        public string? RegnDate { get; set; }
        public string? RegdOwner { get; set; }
        public string? ChasisNo { get; set; }
        public string? EngineNo { get; set; }
        public string? VehicleTypeID { get; set; }
        public string? VehicleTypeGroupId { get; set; }
        public string? VehMfrId { get; set; }
        public string? MfrModelName { get; set; }
        public string? FuelType { get; set; }
        public string? MakeYear { get; set; }
        public string? TankCap { get; set; }
        public string? GrossWt { get; set; }
        public string? UnLadenWT { get; set; }
        public string? NoOfTyres { get; set; }
        public string? MileageLt { get; set; }
        public string? VehLength { get; set; }
        public string? VehBreadth { get; set; }
        public string? VehHeight { get; set; }
        public string? VehVolumeCFT { get; set; }
        public string? Remarks { get; set; }
        public string? OwnershipType { get; set; }
        public string? FastTagYN { get; set; }
        public string? FastTagCo { get; set; }
        public string? FastTagNo { get; set; }
        public string? PetroCardYN { get; set; }
        public string? PetroCo { get; set; }
        public string? PetroCardNo { get; set; }
        public string? PetroCardPin { get; set; }
        public string? HappayCardYN { get; set; }
        public string? HappayCardNo { get; set; }
        public string? HappayCardPin { get; set; }
        public string? FipYN { get; set; }
        public string? FipNo { get; set; }
        public string? SoldYN { get; set; }
        public string? SoldTo { get; set; }
        public string? SoldDate { get; set; }
        public string? SoldValue { get; set; }
        public string? TfrYN { get; set; }
        public string? TfrDate { get; set; }
        public string? TfrVehicleNo { get; set; }
        public string? TfrVehicleId { get; set; }
        public string? VehicleLedgerAc { get; set; }
        public string? VehicleAssetAc { get; set; }
        public string? Attach1Desc { get; set; }
        public string? Attach1Link { get; set; }
        public string? Attach2Desc { get; set; }
        public string? Attach2Link { get; set; }
        public string? Attach3Desc { get; set; }
        public string? Attach3Link { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }
        public string? DeleteFlag { get; set; }
    
        public string? LoggedInUser { get; set; }
        public List<VehicleFltDtlsModel> VehiclefltDetailList { get; set; }
    }
}
