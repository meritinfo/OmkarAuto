namespace Consignment.Models
{
    public class TruckMastersModel
    {
        public class essentials
        {
            public string vehicleNumber { get; set; }
            public string id { get; set; }
            public string owner { get; set; }
        }
        public class result
        {
            public string regNo { get; set; }
            public string chassis { get; set; }
            public string engine { get; set; }
            public string vehicleManufacturerName { get; set; }
            public string model { get; set; }

        }

    }


    public class Essentials
    {
        public string vehicleNumber { get; set; }
    }

    public class SplitPresentAddress
    {
        public List<string> district { get; set; }
        public List<List<string>> state { get; set; }
        public List<string> city { get; set; }
        public string pincode { get; set; }
        public List<string> country { get; set; }
        public string addressLine { get; set; }
    }

    public class SplitPermanentAddress
    {
        public List<string> district { get; set; }
        public List<List<string>> state { get; set; }
        public List<string> city { get; set; }
        public string pincode { get; set; }
        public List<string> country { get; set; }
        public string addressLine { get; set; }
    }

    public class Result
    {
        public string regNo { get; set; }
        public string @class { get; set; }
        public string chassis { get; set; }
        public string engine { get; set; }
        public string vehicleManufacturerName { get; set; }
        public string model { get; set; }
        public string vehicleColour { get; set; }
        public string type { get; set; }
        public string normsType { get; set; }
        public string bodyType { get; set; }
        public string ownerCount { get; set; }
        public string owner { get; set; }
        public string ownerFatherName { get; set; }
        public string mobileNumber { get; set; }
        public string status { get; set; }
        public string statusAsOn { get; set; }
        public string regAuthority { get; set; }
        public string regDate { get; set; }
        public string vehicleManufacturingMonthYear { get; set; }
        public string rcExpiryDate { get; set; }
        public string vehicleTaxUpto { get; set; }
        public string vehicleInsuranceCompanyName { get; set; }
        public string vehicleInsuranceUpto { get; set; }
        public string vehicleInsurancePolicyNumber { get; set; }
        public string rcFinancer { get; set; }
        public string presentAddress { get; set; }
        public SplitPresentAddress splitPresentAddress { get; set; }
        public string permanentAddress { get; set; }
        public SplitPermanentAddress splitPermanentAddress { get; set; }
        public string vehicleCubicCapacity { get; set; }
        public string grossVehicleWeight { get; set; }
        public string unladenWeight { get; set; }
        public string vehicleCategory { get; set; }
        public string rcStandardCap { get; set; }
        public string vehicleCylindersNo { get; set; }
        public string vehicleSeatCapacity { get; set; }
        public string vehicleSleeperCapacity { get; set; }
        public string vehicleStandingCapacity { get; set; }
        public string wheelbase { get; set; }
        public string vehicleNumber { get; set; }
        public string puccNumber { get; set; }
        public string puccUpto { get; set; }
        public string blacklistStatus { get; set; }
        public List<object> blacklistDetails { get; set; }
        public List<object> challanDetails { get; set; }
        public string permitIssueDate { get; set; }
        public string permitNumber { get; set; }
        public string permitType { get; set; }
        public string permitValidFrom { get; set; }
        public string permitValidUpto { get; set; }
        public string nonUseStatus { get; set; }
        public string nonUseFrom { get; set; }
        public string nonUseTo { get; set; }
        public string nationalPermitNumber { get; set; }
        public string nationalPermitUpto { get; set; }
        public string nationalPermitIssuedBy { get; set; }
        public bool isCommercial { get; set; }
        public string nocDetails { get; set; }
        public string name { get; set; }
        public string typeOfHolder { get; set; }
        public string isValid { get; set; }
        public string number { get; set; }
        public string aadhaarSeedingStatusCode { get; set; }
    }

    public class TruckmasterRt
    {
        public Essentials essentials { get; set; }
        public string id { get; set; }
        public string patronId { get; set; }
        public string task { get; set; }
        public Result result { get; set; }
    }

}
