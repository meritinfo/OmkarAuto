using Microsoft.Extensions.Options;
using FreightMasters.Models;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using Shared.Repository;

namespace FreightMasters.Repository
{
    public class DriverLicRptRepository: IDriverLicRptRepository
    {

        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public DriverLicRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<DriverLicRptListModel> GetDriverLicRptList(ReportRequestModel request)
        {
            DriverLicRptListModel driverLicRpt = new();
            List<DriverLicRptModel> driverLicRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@Active",     request.FilterStr),
                            new SqlParameter("@ExpiryLic",  request.FilterStr1),
                            new SqlParameter("@DriverName", request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDriverLicRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            driverLicRptList.Add(new DriverLicRptModel
                            {
                                DriverName = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverName"]),
                                FatherName = Convert.ToString(dataSet.Tables[0].Rows[i]["FatherName"]),
                                DateOfBirth = Convert.ToString(dataSet.Tables[0].Rows[i]["DateOfBirth"]),
                                IntroBy = Convert.ToString(dataSet.Tables[0].Rows[i]["IntroBy"]),
                                IntroByMobileNo = Convert.ToString(dataSet.Tables[0].Rows[i]["IntroByMobileNo"]),
                                DateOfAppoint = Convert.ToString(dataSet.Tables[0].Rows[i]["DateOfAppoint"]),
                                LicenseNo = Convert.ToString(dataSet.Tables[0].Rows[i]["LicenseNo"]),
                                LicenseIssuAuth= Convert.ToString(dataSet.Tables[0].Rows[i]["LicenseIssuAuth"]),
                                LicValidUpto = Convert.ToString(dataSet.Tables[0].Rows[i]["LicValidUpto"]),
                                BloodGroup = Convert.ToString(dataSet.Tables[0].Rows[i]["BloodGroup"]),
                                DriverMobile1 = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMobile1"]),
                                DriverMobile2 = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMobile2"]),
                                TempAddPhone = Convert.ToString(dataSet.Tables[0].Rows[i]["TempAddPhone"]),
                                PermanentAddr = Convert.ToString(dataSet.Tables[0].Rows[i]["PermanentAddr"]),
                                PermAddPhone = Convert.ToString(dataSet.Tables[0].Rows[i]["PermAddPhone"]),
                                DriverAadharNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverAadharNo"]),
                                IsActive = Convert.ToString(dataSet.Tables[0].Rows[i]["IsActive"]),
                                GroupName = Convert.ToString(dataSet.Tables[0].Rows[i]["GroupName"]),
                                DrBankAccountName = Convert.ToString(dataSet.Tables[0].Rows[i]["DrBankAccountName"]),
                                BankName = Convert.ToString(dataSet.Tables[0].Rows[i]["BankName"]),
                                BankAcNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BankAcNo"]),
                                BankIfsCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BankIfsCode"]),

                            });
                        }

                        driverLicRpt.DriverLicRptList = driverLicRptList;

                        driverLicRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                
            }
            return driverLicRpt;
        }
        public async Task<ResponseModel> ExcelDriverLicRptList(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {   
                            new SqlParameter("@Active",     request.FilterStr),
                            new SqlParameter("@ExpiryLic",  request.FilterStr1),
                            new SqlParameter("@DriverName", request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDriverLicRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "";
                       
                        if (request.FilterStr1 == "V")
                        {
                            filter = filter  + " Drivers Having Valid License ";
                        }
                        else if (request.FilterStr1 == "E")
                        {
                            filter = filter  + " Drivers Having Expired License ";
                        }
                        else if (request.FilterStr1 == "M")
                        {
                            filter = filter  + " Drivers with License Expire in 1 Month  ";
                        }
                        else 
                        {
                            filter = filter  + " All Drivers";
                        }

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Driver License Report", filter);
              
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
    }
}
