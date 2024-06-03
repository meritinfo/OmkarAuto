namespace Consignment.Models
{
    /// <summary>
    ///Eway Bill details parameter
    /// </summary>
    public class PanApiResultModel
    {
        public Reslt result { get; set; }
    }
   
    public class Reslt
    {
        public string? name { get; set; }
        public string? number { get; set; }
        public string? typeOfHolder { get; set; }
        public Boolean? isIndividual { get; set; }
        public Boolean? isValid { get; set; }
        public string? firstName { get; set; }
        public string? middleName { get; set; }
        public string? lastName { get; set; }
        public string? panStatus { get; set; }
        public string? title { get; set; }
        public string? panStatusCode { get; set; }
        public string? aadhaarSeedingStatus { get; set; }
        public string? aadhaarSeedingStatusCode { get; set; }
        public string? lastUpdatedOn { get; set; }
    }

    public class ApiRoot
    {
        public essentials essentials { get; set; }
        public string? id { get; set; }
        public string? patronId { get; set; }
        public string? task { get; set; }
        public Reslt result { get; set; }
    }

    public class essentials
    {
        public string? number { get; set; }
    }
}
