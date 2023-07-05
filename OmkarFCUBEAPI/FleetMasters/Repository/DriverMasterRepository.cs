using FleetMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace FleetMasters.Repository
{
    public class DriverMasterRepository : IDriverMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DriverMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save vehicle type master details
        /// </summary>
        /// <param name="TyrePositionMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> DriverMasterSave(DriverMasterModel driverMasterModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DriverMasterID", driverMasterModel.DriverMasterID),
                            new SqlParameter("@DriverName", driverMasterModel.DriverName),
                            new SqlParameter("@FatherName", driverMasterModel.FatherName),
                            new SqlParameter("@DateOfBirth", driverMasterModel.DateOfBirth),
                            new SqlParameter("@Age", driverMasterModel.Age),
                            new SqlParameter("@IntroBy", driverMasterModel.IntroBy),
                            new SqlParameter("@IntroByMobileNo", driverMasterModel.IntroByMobileNo),
                            new SqlParameter("@DateOfAppoint", driverMasterModel.DateOfAppoint),
                            new SqlParameter("@@LicenseNo", driverMasterModel.@LicenseNo),
                            new SqlParameter("@LicValidUpto", driverMasterModel.LicValidUpto),
                            new SqlParameter("@LicenseIssuAuth", driverMasterModel.LicenseIssuAuth),
                            new SqlParameter("@IsHazardousLicYN", driverMasterModel.IsHazardousLicYN),
                            new SqlParameter("@HazardousLicNo", driverMasterModel.HazardousLicNo),
                            new SqlParameter("@@HazLicValidUpto", driverMasterModel.@HazLicValidUpto),
                            new SqlParameter("@HazLicenseIssuAuth", driverMasterModel.HazLicenseIssuAuth),
                            new SqlParameter("@BloodGroup", driverMasterModel.BloodGroup),
                            new SqlParameter("@TypeOfLicence", driverMasterModel.TypeOfLicence),
                            new SqlParameter("@DriverMobile1", driverMasterModel.DriverMobile1),
                            new SqlParameter("@DriverMobile2", driverMasterModel.DriverMobile2),
                            new SqlParameter("@TemporaryAddr", driverMasterModel.TemporaryAddr),
                            new SqlParameter("@TemporaryAddrCity", driverMasterModel.TemporaryAddrCity),
                            new SqlParameter("@TemporaryAddrPin", driverMasterModel.TemporaryAddrPin),
                            new SqlParameter("@TempAddPhone", driverMasterModel.TempAddPhone),
                            new SqlParameter("@PermanentAddr", driverMasterModel.PermanentAddr),
                            new SqlParameter("@PermanentAddrCity", driverMasterModel.PermanentAddrCity),
                            new SqlParameter("@PermanentAddrPin", driverMasterModel.PermanentAddrPin),
                            new SqlParameter("@PermAddPhone", driverMasterModel.PermAddPhone),
                              new SqlParameter("@DriverAadharNo", driverMasterModel.DriverAadharNo),
                            new SqlParameter("@PreviousExpDetails", driverMasterModel.PreviousExpDetails),
                            new SqlParameter("@PreviousExpYears", driverMasterModel.PreviousExpYears),
                            new SqlParameter("@IsActive", driverMasterModel.IsActive),
                            new SqlParameter("@InActiveDate", driverMasterModel.InActiveDate),
                               new SqlParameter("@RemovedYN", driverMasterModel.RemovedYN),
                            new SqlParameter("@RemovedDate", driverMasterModel.RemovedDate),
                            new SqlParameter("@Remarks", driverMasterModel.Remarks),
                            new SqlParameter("@GroupName", driverMasterModel.GroupName),
                            new SqlParameter("@DriverAcct", driverMasterModel.DriverAcct),
                            new SqlParameter("@DrPhoto", driverMasterModel.DrPhoto),
                            new SqlParameter("@AttachDrLic", driverMasterModel.AttachDrLic),
                            new SqlParameter("@AttachDrHazLic", driverMasterModel.AttachDrHazLic),
                            new SqlParameter("@AttachDrAadhar", driverMasterModel.AttachDrAadhar),
                            new SqlParameter("@AttachDrTempAddProof", driverMasterModel.AttachDrTempAddProof),
                            new SqlParameter("@AttachDrPermAddProof", driverMasterModel.AttachDrPermAddProof),
                            new SqlParameter("@AttachDrBankPassBook", driverMasterModel.AttachDrBankPassBook),
                            new SqlParameter("@BankName", driverMasterModel.BankName),
                            new SqlParameter("@DrBankAccountName", driverMasterModel.DrBankAccountName),
                            new SqlParameter("@BankAcNo", driverMasterModel.BankAcNo),
                            new SqlParameter("@BankBranch", driverMasterModel.BankBranch),
                            new SqlParameter("@BankIfsCode", driverMasterModel.BankIfsCode),
                            new SqlParameter("@BankAccountStatus", driverMasterModel.BankAccountStatus),
                            new SqlParameter("@DeleteFlag", driverMasterModel.DeleteFlag),
                            new SqlParameter("@LoggedInUser", driverMasterModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DriverMasterDetails_Insert", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return responseModel;
        }

        public async Task<DriverMasterList> GetDriverMasterList(DriverMasterListRequest request)
        {
            DriverMasterList driverMasterList = new();
            List<DriverMasterModel> driverList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize", request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder", request.SortOrder),
                            new SqlParameter("@Search", request.Search)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DriverMasterList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            driverList.Add(new DriverMasterModel
                            {
                                DriverMasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMasterID"]),
                                DriverName = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverName"]),
                                FatherName = Convert.ToString(dataSet.Tables[0].Rows[i]["FatherName"]),

                                DateOfBirth = Convert.ToString(dataSet.Tables[0].Rows[i]["DateOfBirth"]),
                                Age = Convert.ToString(dataSet.Tables[0].Rows[i]["Age"]),
                                IntroBy = Convert.ToString(dataSet.Tables[0].Rows[i]["IntroBy"]),
                                IntroByMobileNo = Convert.ToString(dataSet.Tables[0].Rows[i]["IntroByMobileNo"]),
                                DateOfAppoint = Convert.ToString(dataSet.Tables[0].Rows[i]["DateOfAppoint"]),
                                LicenseNo = Convert.ToString(dataSet.Tables[0].Rows[i]["LicenseNo"]),
                                LicValidUpto = Convert.ToString(dataSet.Tables[0].Rows[i]["LicValidUpto"]),
                                LicenseIssuAuth = Convert.ToString(dataSet.Tables[0].Rows[i]["LicenseIssuAuth"]),
                                IsHazardousLicYN = Convert.ToString(dataSet.Tables[0].Rows[i]["IsHazardousLicYN"]),
                                HazLicenseIssuAuth = Convert.ToString(dataSet.Tables[0].Rows[i]["HazLicenseIssuAuth"]),

                                HazardousLicNo = Convert.ToString(dataSet.Tables[0].Rows[i]["HazardousLicNo"]),
                                HazLicValidUpto = Convert.ToString(dataSet.Tables[0].Rows[i]["HazLicValidUpto"]),
                                BloodGroup = Convert.ToString(dataSet.Tables[0].Rows[i]["BloodGroup"]),
                                TypeOfLicence = Convert.ToString(dataSet.Tables[0].Rows[i]["TypeOfLicence"]),
                                DriverMobile1 = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMobile1"]),
                                DriverMobile2 = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMobile2"]),
                                TemporaryAddr = Convert.ToString(dataSet.Tables[0].Rows[i]["TemporaryAddr"]),
                                TemporaryAddrCity = Convert.ToString(dataSet.Tables[0].Rows[i]["TemporaryAddrCity"]),
                                TemporaryAddrPin = Convert.ToString(dataSet.Tables[0].Rows[i]["TemporaryAddrPin"]),
                                TempAddPhone = Convert.ToString(dataSet.Tables[0].Rows[i]["TempAddPhone"]),

                                PermanentAddr = Convert.ToString(dataSet.Tables[0].Rows[i]["PermanentAddr"]),
                                PermanentAddrCity = Convert.ToString(dataSet.Tables[0].Rows[i]["PermanentAddrCity"]),
                                PermanentAddrPin = Convert.ToString(dataSet.Tables[0].Rows[i]["PermanentAddrPin"]),
                                PermAddPhone = Convert.ToString(dataSet.Tables[0].Rows[i]["PermAddPhone"]),
                                DriverAadharNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverAadharNo"]),
                                PreviousExpDetails = Convert.ToString(dataSet.Tables[0].Rows[i]["PreviousExpDetails"]),
                                PreviousExpYears = Convert.ToString(dataSet.Tables[0].Rows[i]["PreviousExpYears"]),
                                IsActive = Convert.ToString(dataSet.Tables[0].Rows[i]["IsActive"]),
                                InActiveDate = Convert.ToString(dataSet.Tables[0].Rows[i]["InActiveDate"]),
                                RemovedYN = Convert.ToString(dataSet.Tables[0].Rows[i]["RemovedYN"]),

                                RemovedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["RemovedDate"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                GroupName = Convert.ToString(dataSet.Tables[0].Rows[i]["GroupName"]),
                                DriverAcct = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverAcct"]),

                                AttachDrLic = Convert.ToString(dataSet.Tables[0].Rows[i]["AttachDrLic"]),
                                AttachDrHazLic = Convert.ToString(dataSet.Tables[0].Rows[i]["AttachDrHazLic"]),
                                AttachDrAadhar = Convert.ToString(dataSet.Tables[0].Rows[i]["AttachDrAadhar"]),
                                AttachDrTempAddProof = Convert.ToString(dataSet.Tables[0].Rows[i]["AttachDrTempAddProof"]),
                                AttachDrPermAddProof = Convert.ToString(dataSet.Tables[0].Rows[i]["AttachDrPermAddProof"]),

                                AttachDrBankPassBook = Convert.ToString(dataSet.Tables[0].Rows[i]["AttachDrBankPassBook"]),
                                BankName = Convert.ToString(dataSet.Tables[0].Rows[i]["BankName"]),
                                DrBankAccountName = Convert.ToString(dataSet.Tables[0].Rows[i]["DrBankAccountName"]),
                                BankAcNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BankAcNo"]),
                                BankBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["BankBranch"]),

                                BankIfsCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BankIfsCode"]),
                                BankAccountStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["BankAccountStatus"]),
                                DeleteFlag = Convert.ToString(dataSet.Tables[0].Rows[i]["DeleteFlag"]),
                               

                            });
                        }

                        driverMasterList.DriverList = driverList;

                        driverMasterList.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return driverMasterList;
        }


    }
}

