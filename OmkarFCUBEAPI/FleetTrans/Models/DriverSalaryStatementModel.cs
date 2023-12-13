

namespace FleetTrans.Models
{
    public class DriverSalaryStatementModel
    {
        public string MasterId { get; set; }
        public string TransDt { get; set; }
       // public string TripFrom { get; set; }

      //  public string TripTo { get; set; }
        public string FromDt { get; set; }
        public string ToDt { get; set; }
        public string Remarks { get; set; }
        public string TotalSalaryAmt { get; set; }
        public string TotalPoolAmt { get; set; }
     //   public string NetPayable { get; set; }
      //  public string CreditAC { get; set; }
    //   public string CheqNo { get; set; }
        public string YearId { get; set; }
        public string LoggedInUser { get; set; }
  
        public List<DriverSalaryStatementDtlModel> DriverSalaryListData { get; set; }

    }
}
