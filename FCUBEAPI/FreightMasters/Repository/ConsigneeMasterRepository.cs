
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Repository
{
    public class ConsigneeMasterRepository : IConsigneeMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public ConsigneeMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save product master details
        /// </summary>
        /// <param name="consigneeMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> ConsigneeMasterSave(ConsigneeMasterModel consigneeMasterModel)
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
                             new SqlParameter("@CnorCneeID " , consigneeMasterModel.CnorCneeID ),
                             new SqlParameter("@CnorCneeName " , consigneeMasterModel.CnorCneeName ),
                             new SqlParameter("@PrintName " , consigneeMasterModel.PrintName ),
                             new SqlParameter("@CnorCneeFlag " , consigneeMasterModel.CnorCneeFlag ),
                             new SqlParameter("@BranchCode " , consigneeMasterModel.BranchCode ),
                             new SqlParameter("@GlobalYN " , consigneeMasterModel.GlobalYN ),
                             new SqlParameter("@Address1 " , consigneeMasterModel.Address1 ),
                             new SqlParameter("@Address2 " , consigneeMasterModel.Address2 ),
                             new SqlParameter("@Address3 " , consigneeMasterModel.Address3 ),
                             new SqlParameter("@StateCode " , consigneeMasterModel.StateCode ),
                             new SqlParameter("@PinCode " , consigneeMasterModel.PinCode ),
                             new SqlParameter("@Phone " , consigneeMasterModel.Phone ),
                             new SqlParameter("@Email " , consigneeMasterModel.Email ),
                             new SqlParameter("@ContactPerson1 " , consigneeMasterModel.ContactPerson1 ),
                             new SqlParameter("@Mobile1 " , consigneeMasterModel.Mobile1 ),
                             new SqlParameter("@ContactPerson2 " , consigneeMasterModel.ContactPerson2 ),
                             new SqlParameter("@Mobile2 " , consigneeMasterModel.Mobile2 ),
                             new SqlParameter("@ContactPerson3 " , consigneeMasterModel.ContactPerson3 ),
                             new SqlParameter("@Mobile3 " , consigneeMasterModel.Mobile3 ),
                             new SqlParameter("@GstNo " , consigneeMasterModel.GstNo ),
                             new SqlParameter("@IsActive " , consigneeMasterModel.IsActive ),
                             new SqlParameter("@InActiveDate " , consigneeMasterModel.InActiveDate ),
                           //  new SqlParameter("@OLD_CnorCnee_ID " , consigneeMasterModel.OLD_CnorCnee_ID ),
                             new SqlParameter("@LoggedInUser " , consigneeMasterModel.LoggedInUser ),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "ConsigneeCnorMaster_Insert", param);

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
        public async Task<ConsigneeCnorList> GetConsigneeCnorList(PageRequest request)
        {
            ConsigneeCnorList consigneeList = new();
            List<ConsigneeMasterModel> consigneecnorList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_GetConsigneeCnorList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            consigneecnorList.Add(new ConsigneeMasterModel
                            {
                                CnorCneeID = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorCneeID"]),
                                CnorCneeName = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorCneeName"]),
                                PrintName = Convert.ToString(dataSet.Tables[0].Rows[i]["PrintName"]),
                                CnorCneeFlag = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorCneeFlag"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                GlobalYN = Convert.ToString(dataSet.Tables[0].Rows[i]["GlobalYN"]),
                                Address1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address1"]),
                                Address2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address2"]),
                                Address3 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address3"]),
                                StateCode = Convert.ToString(dataSet.Tables[0].Rows[i]["StateCode"]),
                                PinCode = Convert.ToString(dataSet.Tables[0].Rows[i]["PinCode"]),
                                Phone = Convert.ToString(dataSet.Tables[0].Rows[i]["Phone"]),
                                Email = Convert.ToString(dataSet.Tables[0].Rows[i]["Email"]),
                                ContactPerson1 = Convert.ToString(dataSet.Tables[0].Rows[i]["ContactPerson1"]),
                                Mobile1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Mobile1"]),
                                ContactPerson2 = Convert.ToString(dataSet.Tables[0].Rows[i]["ContactPerson2"]),
                                Mobile2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Mobile2"]),
                                ContactPerson3 = Convert.ToString(dataSet.Tables[0].Rows[i]["ContactPerson3"]),
                                Mobile3 = Convert.ToString(dataSet.Tables[0].Rows[i]["Mobile3"]),
                                GstNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GstNo"]),
                                IsActive = Convert.ToString(dataSet.Tables[0].Rows[i]["IsActive"]),
                                InActiveDate = Convert.ToString(dataSet.Tables[0].Rows[i]["InActiveDate"]),
                                OLD_CnorCnee_ID = Convert.ToString(dataSet.Tables[0].Rows[i]["OLD_CnorCnee_ID"]),
                               // LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser "]),


                            });
                        }

                        consigneeList.ConsigneeList = consigneecnorList;

                        consigneeList.PageMetaData = new PaginationMetaData
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
            return consigneeList;
        }
        public async Task<ResponseModel> ConsigneeCnorMasterDelete(RequestModel requestModel)
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
                            new SqlParameter("@CnorCneeID", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_CnorCneeMasterDelete", param);

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
