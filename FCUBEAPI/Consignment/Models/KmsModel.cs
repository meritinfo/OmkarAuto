namespace Consignment.Models
{
    /// <summary>
    /// Response class model for response
    /// </summary>
    public class KmsModel
    {

      

        public string? TransDate { get; set; }
        public string? FromLocation { get; set; }
        public string? ToLocation { get; set; }
        public string? VehicleTypeGroupId { get; set; }
        public string? LoadOrEmpty{ get; set; }
        //  public bool Status { get; set; }
        //   public string Message { get; set; }
        //   public string kms { get; set; }
    }
}
