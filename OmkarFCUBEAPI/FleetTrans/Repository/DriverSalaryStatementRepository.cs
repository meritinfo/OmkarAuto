

//using FleetTrans.Models;
//using Microsoft.Extensions.Options;
//using SqlHelper.Models;
//using System.Data.Common;
//using System.Data.SqlClient;

//namespace FleetTrans.Repository
//{
   
//        public class DriverSalaryStatementRepository : IDriverSalaryStatementRepository
//    {
//            private readonly IOptions<DBModel> dbconnection;

//            public DriverSalaryStatementRepository(IOptions<DBModel> _dbconnection)
//            {
//                dbconnection = _dbconnection;
//            }
//            public async Task<DriverSalaryStatementList> GetDriverSalaryStatementList(DieselStatementListRequest request)
//        {
//            DriverSalaryStatementList driverSalaryStatementList = new();
//            List<DriverSalaryStatementModel> driverSalaryList = new();
//            try
//            {
//                if (dbconnection != null)
//                {
//                    SqlParameter[] param =
//                        {
//                            new SqlParameter("@PageNumber", request.PageNumber),
//                            new SqlParameter("@PageSize", request.PageSize),
//                            new SqlParameter("@SortColumn", request.SortColumn),
//                            new SqlParameter("@SortOrder", request.SortOrder),
//                        new SqlParameter("@Search", request.Search)
//                        };
//                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DriverSalaryStatementList_Select", param);

//                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
//                    {
//                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
//                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
//                        {
//                            driverSalaryList.Add(new DriverSalaryStatementModel
//                            {
//                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
//                                TripFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["TripFrom"]),
//                                TripTo = Convert.ToString(dataSet.Tables[0].Rows[i]["BillStmtDate"]),

//                                PmtType = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),

//                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
//                                TotalSalary = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalSalary"]),
//                                TotalPoolAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalPoolAmt"]),
//                                NetPayable = Convert.ToString(dataSet.Tables[0].Rows[i]["NetPayable"]),
//                                CreditAC = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAC"]),

//                                CheqNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CheqNo"]),
                        





//                            });
//                        }

//                        driverSalaryStatementList.DriverSalaryList = driverSalaryList;

//                        driverSalaryStatementList.PageMetaData = new PaginationMetaData
//                        {
//                            TotalCount = totalRecords,
//                            CurrentPage = request.PageNumber
//                        };
//                    }
//                }
//            }
//            catch (Exception ex)
//            {
//                // Log exception on database
//                //ExceptionModel exceptionModel = new()
//                //{
//                //    ExceptionMessage = Convert.ToString(ex.Message),
//                //    ExceptionType = Convert.ToString(ex.GetType().Name),
//                //    ExceptionSource = Convert.ToString(ex.StackTrace)
//                //};

//                //ExceptionRepository exception = new(dbconnection);
//                //await exception.SaveExceptionDetails(exceptionModel);
//            }
//            return driverSalaryStatementList;
//        }

//    }
//}
