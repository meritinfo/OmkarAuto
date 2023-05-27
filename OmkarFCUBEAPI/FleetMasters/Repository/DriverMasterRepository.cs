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
                            new SqlParameter("@LicValidUpto", driverMasterModel.LicValidUpto),
                            new SqlParameter("@LicenseIssuAuth", driverMasterModel.LicenseIssuAuth),
                            new SqlParameter("@IsHazardousLicYN", driverMasterModel.IsHazardousLicYN),
                            new SqlParameter("@HazardousLicNo", driverMasterModel.HazardousLicNo),
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
                            new SqlParameter("@PreviousExpDetails", driverMasterModel.PreviousExpDetails),
                            new SqlParameter("@PreviousExpYears", driverMasterModel.PreviousExpYears),
                            new SqlParameter("@IsActive", driverMasterModel.IsActive),
                            new SqlParameter("@InActiveDate", driverMasterModel.InActiveDate),
                            new SqlParameter("@RemovedDate", driverMasterModel.RemovedDate),
                            new SqlParameter("@Remarks", driverMasterModel.Remarks),
                            new SqlParameter("@GroupName", driverMasterModel.GroupName),
                            new SqlParameter("@DriverAcct", driverMasterModel.DriverAcct),
                            new SqlParameter("@DrPhoto", driverMasterModel.DrPhoto),
                            new SqlParameter("@AttachDrLic", driverMasterModel.AttachDrLic),
                            new SqlParameter("@AttachDrHazLic", driverMasterModel.AttachDrHazLic),
                            new SqlParameter("@AttachDrTempAddProof", driverMasterModel.AttachDrTempAddProof),
                            new SqlParameter("@AttachDrPermAddProof", driverMasterModel.AttachDrPermAddProof),
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
      

    }
}

