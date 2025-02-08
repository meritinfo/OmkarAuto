

namespace Shared.Models
{
    public class RepReqModel
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SortColumn { get; set; }
        public string SortOrder { get; set; }
        public string Search { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string FilterStr { get; set; }
        public string FilterStr1 { get; set; }
        public string FilterStr2 { get; set; }
        public string FilterStr3 { get; set; }
        public string FilterStr4 { get; set; }
        public string FilterStr5 { get; set; }
    }
}
