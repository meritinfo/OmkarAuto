using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using HRMasters.Models;
using Shared.Models;
using DocumentFormat.OpenXml.Drawing;

namespace HRMasters.Repository
{
    public class EmpSalaryRepository : IEmpSalaryRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public EmpSalaryRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        
        public async Task<EmpSalaryMstList> GetEmpSalaryMstList(PageRequest request)
        {
            EmpSalaryMstList empSalaryList = new();
            List<EmpSalaryMstModel> salList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpSalaryMstList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            salList.Add(new EmpSalaryMstModel
                            {
                                MasterId    = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterId"]),
                                EmpId       = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpId"]),
                                EmpCode     = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpCode"]),
                                EmpName     = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpName"]),
                                FromDate    = Convert.ToString(dataSet.Tables[0].Rows[i]["FromDate"]),
                                GrossSalary = Convert.ToString(dataSet.Tables[0].Rows[i]["GrossSalary"]),
                            });
                        }

                        empSalaryList.EmpSalaryList = salList;

                        empSalaryList.PageMetaData = new PaginationMetaData
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
            return empSalaryList;
        }
          
        public async Task<EmpSalaryMstModel> GetEmpSalaryEarnList(RequestModel request)
        {
            EmpSalaryMstModel empSalary = new()
            {
                empSalaryDtlList  = new List<EmpSalaryDtlModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@MasterId", request.strRequest)
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpSalaryDtlEarningList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            empSalary.empSalaryDtlList.Add(new EmpSalaryDtlModel
                            {
                                MasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                                EdCode = Convert.ToString(dataSet.Tables[0].Rows[i]["EdCode"]),
                                EdAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["EdAmt"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
               
            }
            return empSalary;
            
        }

        public async Task<EmpSalaryMstModel> GetEmpSalaryDedList(RequestModel request)
        {
            EmpSalaryMstModel empSalary = new()
            {
                empSalaryDtlList  = new List<EmpSalaryDtlModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@MasterId", request.strRequest)
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpSalaryDtlDeductionList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            empSalary.empSalaryDtlList.Add(new EmpSalaryDtlModel
                            {
                                MasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                                EdCode = Convert.ToString(dataSet.Tables[0].Rows[i]["EdCode"]),
                                EdAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["EdAmt"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return empSalary;

        }
        public async Task<List<DropDownListModel>> GetSalaryEarningList()
        {
            List<DropDownListModel> earnList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getSalaryEarningList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            earnList.Add(new DropDownListModel
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
            return earnList;
        }

        public async Task<List<DropDownListModel>> GetSalaryDeductionList()
        {
            List<DropDownListModel> earnList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getSalaryDeductionList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            earnList.Add(new DropDownListModel
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
            return earnList;
        }

        public async Task<ResponseModel> EmpSalaryMasterSave(EmpSalaryMstModel empSalaryMst)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterId",       empSalaryMst.MasterId),
                            new SqlParameter("@EmpId",          empSalaryMst.EmpId),
                            new SqlParameter("@FromDate",       empSalaryMst.FromDate),
                            new SqlParameter("@GrossSalary",    empSalaryMst.GrossSalary),
                            new SqlParameter("@LoggedInUser",   empSalaryMst.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_EmpSalaryMstSave", param);
                    string MasterID = "0";

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        MasterID = Convert.ToString(responseModel.Message);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
                    }
                    if (responseModel.Status)
                    {
                        for (int i = 0; i < empSalaryMst.empSalaryDtlList.Count; i++)
                        {
                            empSalaryMst.empSalaryDtlList[i].MasterId   = MasterID.ToString();
                            empSalaryMst.empSalaryDtlList[i].EmpId      = empSalaryMst.EmpId;
                            empSalaryMst.empSalaryDtlList[i].FromDate   = empSalaryMst.FromDate;
                            responseModel = await EmpSalaryDetailSave(empSalaryMst.empSalaryDtlList[i]);
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }
        public async Task<ResponseModel> EmpSalaryDetailSave(EmpSalaryDtlModel empSalaryDtl)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterID",   empSalaryDtl.MasterId),
                            new SqlParameter("@EmpId",      empSalaryDtl.EmpId),
                            new SqlParameter("@FromDate",   empSalaryDtl.FromDate),
                            new SqlParameter("@EdType",     empSalaryDtl.EdType),
                            new SqlParameter("@EdCode",     empSalaryDtl.EdCode),
                            new SqlParameter("@EdAmt",      empSalaryDtl.EdAmt),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_EmpSalaryDtlsSave", param);

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
               
            }
            return responseModel;
        }


        public async Task<ResponseModel> EmpSalaryMasterDelete(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterId", request.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_EmpSalaryMstDelete", param);

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
                
            }
            return responseModel;
        }



    }

   
}
