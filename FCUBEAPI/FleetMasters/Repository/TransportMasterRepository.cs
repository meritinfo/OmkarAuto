using FleetMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Repository
{
    public class TransportMasterRepository: ITransportMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public TransportMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save vehicle type group master details
        /// </summary>
        /// <param name="vehicleTypeGroupMasterModel"></param>
        /// <returns>ResponseModel</returns>
        /// 
        public async Task<ResponseModel> TransportMasterSave(TransportMasterModel tranportMasterModel)
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
                            new SqlParameter("@TptCode", tranportMasterModel.TptCode),
                            new SqlParameter("@TptName", tranportMasterModel.TptName),
                            new SqlParameter("@Address1", tranportMasterModel.Address1),
                            new SqlParameter("@Address2", tranportMasterModel.Address2),
                            new SqlParameter("@Address3", tranportMasterModel.Address3),
                            new SqlParameter("@Address4", tranportMasterModel.Address4),
                            new SqlParameter("@StateCode", tranportMasterModel.StateCode),
                            new SqlParameter("@PinCode", tranportMasterModel.PinCode),
                            new SqlParameter("@Phone", tranportMasterModel.Phone),
                            new SqlParameter("@Email", tranportMasterModel.Email),
                            new SqlParameter("@ContactPerson1", tranportMasterModel.ContactPerson1),
                            new SqlParameter("@Mobile1", tranportMasterModel.Mobile1),
                            new SqlParameter("@ContactPerson2", tranportMasterModel.ContactPerson2),
                            new SqlParameter("@Mobile2", tranportMasterModel.Mobile2),
                            new SqlParameter("@PanNo", tranportMasterModel.PanNo),
                            new SqlParameter("@GSTNo", tranportMasterModel.GSTNo),
                            new SqlParameter("@AadharNo", tranportMasterModel.AadharNo),
                            new SqlParameter("@CancelChq", tranportMasterModel.CancelChq),
                            new SqlParameter("@AddrProof", tranportMasterModel.AddrProof),
                            new SqlParameter("@EligibleForBid", tranportMasterModel.EligibleForBid),
                            new SqlParameter("@WhatsappMblNo", tranportMasterModel.WhatsappMblNo),
                            new SqlParameter("@BranchCode", tranportMasterModel.BranchCode),
                            new SqlParameter("@Remarks", tranportMasterModel.Remarks),
                            new SqlParameter("@IsActive", tranportMasterModel.IsActive),
                            new SqlParameter("@InActiveDate", tranportMasterModel.InActiveDate)
                           
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "TransportMaster_Insert", param);

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
        public async Task<TransportMasterList> GetTransportMasterList(PageRequest request)
        {
            TransportMasterList tranportMastersList = new();
            List<TransportMasterModel> transportList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TransportMasterList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            transportList.Add(new TransportMasterModel
                            {
                                TptCode = Convert.ToString(dataSet.Tables[0].Rows[i]["TptCode"]),
                                TptName = Convert.ToString(dataSet.Tables[0].Rows[i]["TptName"]),

                                Address1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address1"]),
                                Address2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address2"]),
                                Address3 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address3"]),
                                Address4 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address4"]),
                                StateCode = Convert.ToString(dataSet.Tables[0].Rows[i]["StateCode"]),
                                PinCode = Convert.ToString(dataSet.Tables[0].Rows[i]["PinCode"]),
                                Phone = Convert.ToString(dataSet.Tables[0].Rows[i]["Phone"]),
                                Email = Convert.ToString(dataSet.Tables[0].Rows[i]["Email"]),
                                ContactPerson1 = Convert.ToString(dataSet.Tables[0].Rows[i]["ContactPerson1"]),
                                Mobile1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Mobile1"]),
                                ContactPerson2 = Convert.ToString(dataSet.Tables[0].Rows[i]["ContactPerson2"]),
                                Mobile2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Mobile2"]),
                                PanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["PanNo"]),
                                GSTNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GSTNo"]),
                                AadharNo = Convert.ToString(dataSet.Tables[0].Rows[i]["AadharNo"]),
                                CancelChq = Convert.ToString(dataSet.Tables[0].Rows[i]["CancelChq"]),
                                AddrProof = Convert.ToString(dataSet.Tables[0].Rows[i]["AddrProof"]),
                                EligibleForBid = Convert.ToString(dataSet.Tables[0].Rows[i]["EligibleForBid"]),
                                WhatsappMblNo = Convert.ToString(dataSet.Tables[0].Rows[i]["WhatsappMblNo"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                IsActive = Convert.ToString(dataSet.Tables[0].Rows[i]["IsActive"]),
                                InActiveDate = Convert.ToString(dataSet.Tables[0].Rows[i]["InActiveDate"]),
                            
                            });
                        }

                        tranportMastersList.TransportMastersList = transportList;

                        tranportMastersList.PageMetaData = new PaginationMetaData
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
            return tranportMastersList;
        }

    }


}
