

namespace Consignment.Models
{
    public class ConsignmentDelvAckModel
    {
        public string? AckBranch            { get; set; }
        public string? AckSlNo              { get; set; }
        public string? AckDate              { get; set; }
        public string? DeliveryStatus       { get; set; }
        public string? DelPkgs              { get; set; }
        public string? DelActWt             { get; set; }
        public string? ShExPkgs             { get; set; }
        public string? ShExpActWt           { get; set; }
        public string? ExpectedRptDate      { get; set; }
        public string? ReportingDate        { get; set; }
        public string? DelayDays            { get; set; }
        public string? DeliveryDate         { get; set; }
        public string? DetnDays             { get; set; }
        public string? PodRecdYN            { get; set; }
        public string? PodRecdDate          { get; set; }
        public string? PodDelayDays         { get; set; }
        public string? NetPayable { get; set; }

    }
}
