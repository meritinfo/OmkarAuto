
namespace Shared.Models
{
    public class EWayAPIConfigurationModel
    {
        public string ApiCheckGstinUrl { get; set; }
        public string ApiAccessTokenUrl { get; set; }
        public string ApiUserName { get; set; }
        public string ApiPassword { get; set; }
        public string ApiClient_id { get; set; }
        public string ApiClient_secret { get; set; }
        public string ApiGrantType { get; set; }
        public string GstUserName { get; set; }
        public string EwayBillApiYN { get; set; }
        public string EwayBillApiGstId { get; set; }
        public string EwayBillApiUid { get; set; }
        public string EwayBillApiPwd { get; set; }
    }
}
