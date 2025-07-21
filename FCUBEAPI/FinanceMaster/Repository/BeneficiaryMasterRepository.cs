using FinanceMaster.Models;
using FinanceMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System.Data.SqlClient;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace FinanceMaster.Repository
{
    public class BeneficiaryMasterRepository: IBeneficiaryMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public BeneficiaryMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> BeneficiaryMasterSave(BeneficiaryMasterModel beneficiaryMasterModel)
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
                             new SqlParameter("@MasterId" , beneficiaryMasterModel.MasterId),
                             new SqlParameter("@BenType" , beneficiaryMasterModel.BenType),
                             new SqlParameter("@BenCode" , beneficiaryMasterModel.BenCode),
                             new SqlParameter("@BenName" , beneficiaryMasterModel.BenName),
                             new SqlParameter("@BenCoAcName" , beneficiaryMasterModel.BenCoAcName),
                             new SqlParameter("@BenAdd1" , beneficiaryMasterModel.BenAdd1),
                             new SqlParameter("@BenAdd2" , beneficiaryMasterModel.BenAdd2),
                             new SqlParameter("@BenAdd3 " , beneficiaryMasterModel.BenAdd3 ),
                             new SqlParameter("@PinCode" , beneficiaryMasterModel.PinCode),
                             new SqlParameter("@StateCode" , beneficiaryMasterModel.StateCode),
                             new SqlParameter("@BenPhone" , beneficiaryMasterModel.BenPhone),
                             new SqlParameter("@BenMobile" , beneficiaryMasterModel.BenMobile),
                             new SqlParameter("@BenEmail" , beneficiaryMasterModel.BenEmail),
                             new SqlParameter("@BankId" , beneficiaryMasterModel.BankId),
                             new SqlParameter("@BenBankBranch" , beneficiaryMasterModel.BenBankBranch),
                             new SqlParameter("@BenBankAcNo" , beneficiaryMasterModel.BenBankAcNo),
                             new SqlParameter("@BenBankIfsc" , beneficiaryMasterModel.BenBankIfsc),
                             new SqlParameter("@AmountLimit" , beneficiaryMasterModel.AmountLimit),
                             new SqlParameter("@Remarks" , beneficiaryMasterModel.Remarks),
                             new SqlParameter("@CancelCheqAttach" , beneficiaryMasterModel.CancelCheqAttach),
                             new SqlParameter("@VendorAttachedfile" , beneficiaryMasterModel.VendorAttachedfile),
                             new SqlParameter("@BenRefByEmployeeId" , beneficiaryMasterModel.BenRefByEmployeeId),
                             new SqlParameter("@ApprovedYN" , beneficiaryMasterModel.ApprovedYN),
                             new SqlParameter("@ApprovedRemarks" , beneficiaryMasterModel.ApprovedRemarks),
                             new SqlParameter("@BlockYN" , beneficiaryMasterModel.BlockYN),
                             new SqlParameter("@BlockReason" , beneficiaryMasterModel.BlockReason),
                             new SqlParameter("@PanNo" , beneficiaryMasterModel.PanNo),
                             new SqlParameter("@GlobalYN" , beneficiaryMasterModel.GlobalYN),
                             new SqlParameter("@BranchCode" , beneficiaryMasterModel.BranchCode),
                             new SqlParameter("@LoggedInUserID" , beneficiaryMasterModel.LoggedInUserID),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BeneficiaryMasterSave", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]))
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
                responseModel.Status =  false;
                responseModel.Message = ex.Message;

                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<ResponseModel> BeneficiaryMasterDelete(RequestModel requestModel)
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
                            new SqlParameter("@MasterId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BeneficiaryMasterDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status) { transaction.Commit(); }
                        else { transaction.Rollback(); }
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
        public async Task<BeneficiaryMasterList> GetBeneficiaryMasterList(PageRequest request)
        {
            BeneficiaryMasterList beneficiaryMasterList = new();
            List<BeneficiaryMasterModel> beneficiaryList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber"  , request.PageNumber),
                            new SqlParameter("@PageSize"    , request.PageSize),
                            new SqlParameter("@SortColumn"  , request.SortColumn),
                            new SqlParameter("@SortOrder"   , request.SortOrder),
                            new SqlParameter("@Search"      , request.Search)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBeneficiaryMasterlist", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            beneficiaryList.Add(new BeneficiaryMasterModel
                            {
                                MasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterId"]),
                                BenType = Convert.ToString(dataSet.Tables[0].Rows[i]["BenType"]),
                                BenCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BenCode"]),
                                BenName = Convert.ToString(dataSet.Tables[0].Rows[i]["BenName"]),
                                BenCoAcName = Convert.ToString(dataSet.Tables[0].Rows[i]["BenCoAcName"]),
                                BenAdd1 = Convert.ToString(dataSet.Tables[0].Rows[i]["BenAdd1"]),
                                BenAdd2 = Convert.ToString(dataSet.Tables[0].Rows[i]["BenAdd2"]),
                                BenAdd3 = Convert.ToString(dataSet.Tables[0].Rows[i]["BenAdd3"]),
                                PinCode = Convert.ToString(dataSet.Tables[0].Rows[i]["PinCode"]),
                                StateCode = Convert.ToString(dataSet.Tables[0].Rows[i]["StateCode"]),
                                BenPhone = Convert.ToString(dataSet.Tables[0].Rows[i]["BenPhone"]),
                                BenMobile = Convert.ToString(dataSet.Tables[0].Rows[i]["BenMobile"]),
                                BenEmail = Convert.ToString(dataSet.Tables[0].Rows[i]["BenEmail"]),
                                BankId = Convert.ToString(dataSet.Tables[0].Rows[i]["BankId"]),
                                BenBankBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["BenBankBranch"]),
                                BenBankAcNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BenBankAcNo"]),
                                BenBankIfsc = Convert.ToString(dataSet.Tables[0].Rows[i]["BenBankIfsc"]),
                                AmountLimit = Convert.ToString(dataSet.Tables[0].Rows[i]["AmountLimit"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                CancelCheqAttach = Convert.ToString(dataSet.Tables[0].Rows[i]["CancelCheqAttach"]),
                                VendorAttachedfile = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorAttachedfile"]),
                                BenRefByEmployeeId = Convert.ToString(dataSet.Tables[0].Rows[i]["BenRefByEmployeeId"]),
                                ApprovedYN = Convert.ToString(dataSet.Tables[0].Rows[i]["ApprovedYN"]),
                                ApprovedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ApprovedBy"]),
                                ApprovedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ApprovedDate"]),
                                ApprovedRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["ApprovedRemarks"]),
                                BlockYN = Convert.ToString(dataSet.Tables[0].Rows[i]["BlockYN"]),
                                BlockDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BlockDate"]),
                                BlockBy = Convert.ToString(dataSet.Tables[0].Rows[i]["BlockBy"]),
                                BlockReason = Convert.ToString(dataSet.Tables[0].Rows[i]["BlockReason"]),
                                PanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["PanNo"]),
                                GlobalYN = Convert.ToString(dataSet.Tables[0].Rows[i]["GlobalYN"]),
                            });
                        }

                        beneficiaryMasterList.BeneficiaryList = beneficiaryList;

                        beneficiaryMasterList.PageMetaData = new PaginationMetaData
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
            return beneficiaryMasterList;
        }
        public async Task<ResponseModel> GetBenCode(RequestModel requestModel)
        {
            ResponseModel responseModel = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BenType", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBenCode", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }
        public async Task<ResponseModel> GetUserBenApproveBlock(RequestModel requestModel)
        {
            ResponseModel responseModel = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@UserId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getUserBenApproveBlock", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }        
        public async Task<ResponseModel> GetBankAccountVerify(ReportRequestModel request)
        {
            ResponseModel responseModel = new();
            ResponseModel responseSave = new();
            try
            {
                string baseUrl = "http://www.fcube.net/bankapi/api.php";

                string UrlParam = "?account=" + request.FilterStr1 +
                                    "&ifsc=" + request.FilterStr2;

                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.GetAsync(UrlParam).Result;

                if (response.IsSuccessStatusCode)
                {
                    responseSave = await APILogBenificiarySave(request);

                    var result = await response.Content.ReadAsStringAsync();
                    dynamic data = JsonConvert.DeserializeObject(result);
                    int statusCode = data.status;
                    if (statusCode == 200)
                    {
                        var res = JsonConvert.DeserializeObject<BenBankResult>(result);

                        responseModel.Status = true;
                        responseModel.Message = res.Name.ToString();
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = data;
                    }


                    client.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }
        public async Task<ResponseModel> APILogBenificiarySave(ReportRequestModel request)
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
                             new SqlParameter("@BenId" ,    request.FilterStr),
                             new SqlParameter("@BankAcNo",  request.FilterStr1),
                             new SqlParameter("@BankIfsc" , request.FilterStr2),
                             new SqlParameter("@LogUserId", request.FilterStr3),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ApiLogBenSave", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]))
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
                responseModel.Status =  false;
                responseModel.Message = ex.Message;

                transaction.Rollback();
            }
            return responseModel;

        }
        public async Task<List<DropDownListModel>> GetBenBankList()
        {
            List<DropDownListModel> contentList = new();
            try
            {
                if (dbconnection != null)
                {
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBenBankList", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            contentList.Add(new DropDownListModel
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
            return contentList;
        }
        public async Task<List<DropDownListModel>> GetBeneficiaryList()
        {
            List<DropDownListModel> contentList = new();
            try
            {
                if (dbconnection != null)
                {
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBeneficiaryList", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            contentList.Add(new DropDownListModel
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
            return contentList;
        }
        public async Task<ResponseModel> CheckDuplicateBenAccountNo(RequestModel requestModel)
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
                            new SqlParameter("@BenBankAcNo", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_CheckDuplicateBenAccNo", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status) { transaction.Commit(); }
                        else { transaction.Rollback(); }
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



    }
}
