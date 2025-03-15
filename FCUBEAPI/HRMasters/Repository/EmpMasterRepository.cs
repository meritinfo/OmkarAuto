
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using HRMasters.Models;
using HRMasters.Repository;
using Shared.Models;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.Vml.Office;
using System.Net.NetworkInformation;
using System.Reflection.Emit;
using System.Reflection;
using DocumentFormat.OpenXml.Office2016.Excel;

namespace HRMasters.Repository
{
    public class EmpMasterRepository : IEmpMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public EmpMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        
        public async Task<ResponseModel> EmpMasterSave(EmpMasterModel empMaster)
        {
            ResponseModel responseModel = new();

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@EmpId",              empMaster.EmpId                 ),
                            new SqlParameter("@EmpPrefix",          empMaster.EmpPrefix             ),
                            new SqlParameter("@EmpNo",              empMaster.EmpNo                 ),
                            new SqlParameter("@EmpCode",            empMaster.EmpCode               ),
                            new SqlParameter("@EmpStatus",          empMaster.EmpStatus             ),
                            new SqlParameter("@BranchCode",         empMaster.BranchCode            ),
                            new SqlParameter("@EmpName",            empMaster.EmpName               ),
                            new SqlParameter("@FSRelation",         empMaster.FsRelation            ),
                            new SqlParameter("@FSName",             empMaster.FsName                ),
                            new SqlParameter("@Gender",             empMaster.Gender                ),
                            new SqlParameter("@DateOfBirth",        empMaster.DateOfBirth           ),
                            new SqlParameter("@Age",                empMaster.Age                   ),
                            new SqlParameter("@PFAcNo",             empMaster.PfAcNo                ),
                            new SqlParameter("@ESIAcNo",            empMaster.EsiAcNo               ),
                            new SqlParameter("@PANAcNo",            empMaster.PanAcNo               ),
                            new SqlParameter("@AadhaarNo",          empMaster.AadhaarNo             ),
                            new SqlParameter("@CurrentBranch",      empMaster.CurrentBranch         ),
                            new SqlParameter("@Remarks",            empMaster.Remarks               ),
                            new SqlParameter("@PresentAdd",         empMaster.PresentAdd            ),
                            new SqlParameter("@AccomodationStatus", empMaster.AccomodationStatus    ),
                            new SqlParameter("@PermanentAdd",       empMaster.PermanentAdd          ),
                            new SqlParameter("@NativePlace",        empMaster.NativePlace           ),
                            new SqlParameter("@Phone",              empMaster.Phone                 ),
                            new SqlParameter("@Mobile",             empMaster.Mobile                ),
                            new SqlParameter("@Mobile1",            empMaster.Mobile1               ),
                            new SqlParameter("@Religion",           empMaster.Religion              ),
                            new SqlParameter("@ClassStatus",        empMaster.ClassStatus           ),
                            new SqlParameter("@MotherTongue",       empMaster.MotherTongue          ),
                            new SqlParameter("@SchoolMedium",       empMaster.SchoolMedium          ),
                            new SqlParameter("@CollegeMedium",      empMaster.CollegeMedium         ),
                            new SqlParameter("@TwoWheelLic",        empMaster.TwoWheelLic           ),
                            new SqlParameter("@TwoWheelLicenceNo",  empMaster.TwoWheelLicenceNo     ),
                            new SqlParameter("@YouOwn2Wheeler",     empMaster.YouOwn2Wheeler        ),
                            new SqlParameter("@FourWheelLic",       empMaster.FourWheelLic          ),
                            new SqlParameter("@FourWheelLicenceNo", empMaster.FourWheelLicenceNo    ),
                            new SqlParameter("@YouOwn4Wheeler",     empMaster.YouOwn4Wheeler        ),
                            new SqlParameter("@DateOfAppoint",      empMaster.DateOfAppoint         ),
                            new SqlParameter("@DesignAtJoining",    empMaster.DesignAtJoining       ),
                            new SqlParameter("@DeptCode",           empMaster.DeptCode              ),
                            new SqlParameter("@BankCode",           empMaster.BankCode              ),
                            new SqlParameter("@BankAcNo",           empMaster.BankAcNo              ),
                            new SqlParameter("@BankIFSC",           empMaster.BankIFSC              ),
                            new SqlParameter("@DateOfJoining",      empMaster.DateOfJoining         ),
                            new SqlParameter("@ManagersUnder",      empMaster.ManagersUnder         ),
                            new SqlParameter("@SupervisorsUnder",   empMaster.SupervisorsUnder      ),
                            new SqlParameter("@OthersUnder",        empMaster.OthersUnder           ),
                            new SqlParameter("@LastGrossSalary",    empMaster.LastGrossSalary       ),
                            new SqlParameter("@LastBasic",          empMaster.LastBasic             ),
                            new SqlParameter("@LastHRA",            empMaster.LastHRA               ),
                            new SqlParameter("@LastOthers",         empMaster.LastOthers            ),
                            new SqlParameter("@LastPerks",          empMaster.LastPerks             ),
                            new SqlParameter("@RemoveDate",         empMaster.RemoveDate            ),
                            new SqlParameter("@FullFinal",          empMaster.FullFinal             ),
                            new SqlParameter("@LoggedInUser",       empMaster.LoggedInUser          )

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_EmployeeMasterSave", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status)
                        {
                            transaction.Commit();
                        }
                        else
                        {
                            transaction.Rollback();
                        }
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }

        public async Task<EmpMasterList> GetEmpMasterList(PageRequest request)
        {
            EmpMasterList empMasterList = new();
            List<EmpMasterModel> empList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmployeeMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            empList.Add(new EmpMasterModel
                            {
                                EmpId                   = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpId"]),
                                EmpPrefix               = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpPrefix"]),
                                EmpNo                   = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpNo"]),
                                EmpCode                 = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpCode"]),
                                EmpStatus               = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpStatus"]),
                                BranchCode              = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                EmpName                 = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpName"]),
                                FsRelation              = Convert.ToString(dataSet.Tables[0].Rows[i]["FSRelation"]),
                                FsName                  = Convert.ToString(dataSet.Tables[0].Rows[i]["FSName"]),
                                Gender                  = Convert.ToString(dataSet.Tables[0].Rows[i]["Gender"]),
                                DateOfBirth             = Convert.ToString(dataSet.Tables[0].Rows[i]["DateOfBirth"]),
                                Age                     = Convert.ToString(dataSet.Tables[0].Rows[i]["Age"]),
                                PfAcNo                  = Convert.ToString(dataSet.Tables[0].Rows[i]["PFAcNo"]),
                                EsiAcNo                 = Convert.ToString(dataSet.Tables[0].Rows[i]["ESIAcNo"]),
                                PanAcNo                 = Convert.ToString(dataSet.Tables[0].Rows[i]["PANAcNo"]),
                                AadhaarNo               = Convert.ToString(dataSet.Tables[0].Rows[i]["AadhaarNo"]),
                                CurrentBranch           = Convert.ToString(dataSet.Tables[0].Rows[i]["CurrentBranch"]),
                                Remarks                 = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                PresentAdd              = Convert.ToString(dataSet.Tables[0].Rows[i]["PresentAdd"]),
                                AccomodationStatus      = Convert.ToString(dataSet.Tables[0].Rows[i]["AccomodationStatus"]),
                                PermanentAdd            = Convert.ToString(dataSet.Tables[0].Rows[i]["PermanentAdd"]),
                                NativePlace             = Convert.ToString(dataSet.Tables[0].Rows[i]["NativePlace"]),
                                Phone                   = Convert.ToString(dataSet.Tables[0].Rows[i]["Phone"]),
                                Mobile                  = Convert.ToString(dataSet.Tables[0].Rows[i]["Mobile"]),
                                Mobile1                 = Convert.ToString(dataSet.Tables[0].Rows[i]["Mobile1"]),
                                Religion                = Convert.ToString(dataSet.Tables[0].Rows[i]["Religion"]),
                                ClassStatus             = Convert.ToString(dataSet.Tables[0].Rows[i]["ClassStatus"]),
                                MotherTongue            = Convert.ToString(dataSet.Tables[0].Rows[i]["MotherTongue"]),
                                SchoolMedium            = Convert.ToString(dataSet.Tables[0].Rows[i]["SchoolMedium"]),
                                CollegeMedium           = Convert.ToString(dataSet.Tables[0].Rows[i]["CollegeMedium"]),
                                TwoWheelLic             = Convert.ToString(dataSet.Tables[0].Rows[i]["TwoWheelLic"]),
                                TwoWheelLicenceNo       = Convert.ToString(dataSet.Tables[0].Rows[i]["TwoWheelLicenceNo"]),
                                YouOwn2Wheeler          = Convert.ToString(dataSet.Tables[0].Rows[i]["YouOwn2Wheeler"]),
                                FourWheelLic            = Convert.ToString(dataSet.Tables[0].Rows[i]["FourWheelLic"]),
                                FourWheelLicenceNo      = Convert.ToString(dataSet.Tables[0].Rows[i]["FourWheelLicenceNo"]),
                                YouOwn4Wheeler          = Convert.ToString(dataSet.Tables[0].Rows[i]["YouOwn4Wheeler"]),
                                DateOfAppoint           = Convert.ToString(dataSet.Tables[0].Rows[i]["DateOfAppoint"]),
                                DesignAtJoining         = Convert.ToString(dataSet.Tables[0].Rows[i]["DesignAtJoining"]),
                                DesignName              = Convert.ToString(dataSet.Tables[0].Rows[i]["DesignName"]),
                                DeptCode                = Convert.ToString(dataSet.Tables[0].Rows[i]["DeptCode"]),
                                DeptName                = Convert.ToString(dataSet.Tables[0].Rows[i]["DeptName"]),
                                BankCode                = Convert.ToString(dataSet.Tables[0].Rows[i]["BankCode"]),
                                BankAcNo                = Convert.ToString(dataSet.Tables[0].Rows[i]["BankAcNo"]),
                                BankIFSC                = Convert.ToString(dataSet.Tables[0].Rows[i]["BankIFSC"]),
                                DateOfJoining           = Convert.ToString(dataSet.Tables[0].Rows[i]["DateOfJoining"]),
                                ManagersUnder           = Convert.ToString(dataSet.Tables[0].Rows[i]["ManagersUnder"]),
                                SupervisorsUnder        = Convert.ToString(dataSet.Tables[0].Rows[i]["SupervisorsUnder"]),
                                OthersUnder             = Convert.ToString(dataSet.Tables[0].Rows[i]["OthersUnder"]),
                                LastGrossSalary         = Convert.ToString(dataSet.Tables[0].Rows[i]["LastGrossSalary"]),
                                LastBasic               = Convert.ToString(dataSet.Tables[0].Rows[i]["LastBasic"]),
                                LastHRA                 = Convert.ToString(dataSet.Tables[0].Rows[i]["LastHRA"]),
                                LastOthers              = Convert.ToString(dataSet.Tables[0].Rows[i]["LastOthers"]),
                                LastPerks               = Convert.ToString(dataSet.Tables[0].Rows[i]["LastPerks"]),
                                RemoveDate              = Convert.ToString(dataSet.Tables[0].Rows[i]["RemoveDate"]),
                                FullFinal               = Convert.ToString(dataSet.Tables[0].Rows[i]["FullFinal"]),
                                EmpAttach1               = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpAttach1"]),
                                EmpAttach2               = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpAttach2"]),
                                LoggedInUser            = ""

                            });
                        }

                        empMasterList.EmpList = empList;

                        empMasterList.PageMetaData = new PaginationMetaData
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
            return empMasterList;
        }

        public async Task<ResponseModel> EmpMasterDelete(RequestModel request)
        {
            ResponseModel responseModel = new();

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@EmpId",  request.strRequest),                           
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_EmployeeMasterDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status)
                        {
                            transaction.Commit();
                        }
                        else
                        {
                            transaction.Rollback();
                        }
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }
       
        public async Task<List<DropDownListModel>> GetBankList()
        {
            List<DropDownListModel> bankList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBankList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            bankList.Add(new DropDownListModel
                            {
                                DataId = Convert.ToString(statusData.Tables[0].Rows[i]["DataId"]),
                                DataName = Convert.ToString(statusData.Tables[0].Rows[i]["DataName"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
               
            }
            return bankList;
        }
        public async Task<List<DropDownListModel>> GetPrefixList()
        {
            List<DropDownListModel> preList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getPrefixList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            preList.Add(new DropDownListModel
                            {
                                DataId = Convert.ToString(statusData.Tables[0].Rows[i]["DataId"]),
                                DataName = Convert.ToString(statusData.Tables[0].Rows[i]["DataName"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return preList;
        }


        public async Task<List<DropDownListModel>> GetDepartmentList()
        {
            List<DropDownListModel> deptList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDepartmentList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            deptList.Add(new DropDownListModel
                            {
                                DataId = Convert.ToString(statusData.Tables[0].Rows[i]["DataId"]),
                                DataName = Convert.ToString(statusData.Tables[0].Rows[i]["DataName"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return deptList;
        }

        public async Task<List<DropDownListModel>> GetDesignationList()
        {
            List<DropDownListModel> deptList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDesignationList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            deptList.Add(new DropDownListModel
                            {
                                DataId = Convert.ToString(statusData.Tables[0].Rows[i]["DataId"]),
                                DataName = Convert.ToString(statusData.Tables[0].Rows[i]["DataName"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return deptList;
        }
        public async Task<List<DropDownListModel>> GetMotherTongueList()
        {
            List<DropDownListModel> langList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getMotherTongueList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            langList.Add(new DropDownListModel
                            {
                                DataId = Convert.ToString(statusData.Tables[0].Rows[i]["DataId"]),
                                DataName = Convert.ToString(statusData.Tables[0].Rows[i]["DataName"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return langList;
        }
        public async Task<List<DropDownListModel>> GetEmployeeList()
        {
            List<DropDownListModel> empList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmployeeList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            empList.Add(new DropDownListModel
                            {
                                DataId = Convert.ToString(statusData.Tables[0].Rows[i]["DataId"]),
                                DataName = Convert.ToString(statusData.Tables[0].Rows[i]["DataName"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return empList;
        }

        public async Task<ResponseModel> GetMaxEmpNo(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@EmpPrefix",  request.strRequest),
                        };
                        var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getMaxEmpCode", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }


    }


}
