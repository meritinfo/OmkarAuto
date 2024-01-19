using FleetMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;

namespace FleetMasters.Repository
{
    public class DocRenewalMasterRepository : IDocRenewalMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DocRenewalMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save vehicle type master details
        /// </summary>
        /// <param name="DocRenewalMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> DocRenewalMasterSave(DocRenewalMasterModel docRenewalMasterModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@DocRenewalID"        , docRenewalMasterModel.DocRenewalID),
                        new SqlParameter("@DocCode"             , docRenewalMasterModel.DocCode),
                        new SqlParameter("@DocDescription"      , docRenewalMasterModel.DocDescription),
                        new SqlParameter("@ReminderDays"        , docRenewalMasterModel.ReminderDays),
                        new SqlParameter("@DebitType"           , docRenewalMasterModel.DebitType),
                        new SqlParameter("@DebitAc"             , docRenewalMasterModel.DebitAc),
                        new SqlParameter("@IsActive"            , docRenewalMasterModel.IsActive),
                        new SqlParameter("@Recurring_Onetime"   , docRenewalMasterModel.Recurring_Onetime),
                        new SqlParameter("@LoggedInUser"        , docRenewalMasterModel.LoggedInUser)
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_DocRenewalMasterDetailsSave", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status    = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message   = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
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

        public async Task<ResponseModel> DocRenewalMasterDetailsDelete(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@DocRenewalID", request.strRequest),                       
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_DocRenewalMasterDetailsDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status    = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message   = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
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

        public async Task<DocRenewalMasterList> GetDocRenewalMasterList(PageRequest request)
        {
            DocRenewalMasterList RenewalMasterList = new();
            List<DocRenewalMasterModel> docRenewalMasterList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDocRenewalMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            docRenewalMasterList.Add(new DocRenewalMasterModel
                            {
                                DocRenewalID        = Convert.ToString(dataSet.Tables[0].Rows[i]["DocRenewalID"]),
                                DocCode             = Convert.ToString(dataSet.Tables[0].Rows[i]["DocCode"]),
                                DocDescription      = Convert.ToString(dataSet.Tables[0].Rows[i]["DocDescription"]),
                                ReminderDays        = Convert.ToString(dataSet.Tables[0].Rows[i]["ReminderDays"]),
                                DebitType           = Convert.ToString(dataSet.Tables[0].Rows[i]["DebitType"]),
                                DebitAc             = Convert.ToString(dataSet.Tables[0].Rows[i]["DebitAc"]),
                                IsActive            = Convert.ToString(dataSet.Tables[0].Rows[i]["IsActive"]),
                                Recurring_Onetime   = Convert.ToString(dataSet.Tables[0].Rows[i]["Recurring_Onetime"]),
                            });
                        }

                        RenewalMasterList.docRenewalMasterList = docRenewalMasterList;

                        RenewalMasterList.PageMetaData = new PaginationMetaData
                        {
                            TotalCount  = totalRecords,
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
            return RenewalMasterList;
        }
        public async Task<List<DropDownListModel>> GetDebitAcList()
        {
            List<DropDownListModel> DebitAcList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDebitAccountList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            DebitAcList.Add(new DropDownListModel
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
            return DebitAcList;
        }


    }
}
