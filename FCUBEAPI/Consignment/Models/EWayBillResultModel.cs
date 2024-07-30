namespace Consignment.Models
{
    /// <summary>
    ///Eway Bill details parameter
    /// </summary>
    public class EWayBillResultModel
    {
        public Results result { get; set; }
    }

    public class Message
    {
        public long ewayBillNo { get; set; }
        public DateTime updatedDate { get; set; }
        public string validUpto { get; set; }
        public bool error { get; set; }
        public string url { get; set; }
    }

    public class Results
    {
        public Message message { get; set; }
        public string status { get; set; }
        public int code { get; set; }
    }

    public class Root
    {
        public Results results { get; set; }
    }
}
