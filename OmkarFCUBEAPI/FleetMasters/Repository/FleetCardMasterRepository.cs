using FleetMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;

namespace FleetMasters.Repository
{
    public class FleetCardMasterRepository : IFleetCardMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public FleetCardMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> FleetCardMasterSave(FleetCardMasterModel fleetCardMasterModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@CardId", fleetCardMasterModel.CardId ),
                            new SqlParameter("@CardType", fleetCardMasterModel.CardType),
                            new SqlParameter("@CardCode", fleetCardMasterModel.CardCode),
                            new SqlParameter("@CardNo", fleetCardMasterModel.CardNo),
                            new SqlParameter("@CardPin", fleetCardMasterModel.CardPin),
                            new SqlParameter("@CardLedgerAc", fleetCardMasterModel.CardLedgerAc),
                            new SqlParameter("@VehicleNo", fleetCardMasterModel.VehicleNo),
                            new SqlParameter("@DriverName", fleetCardMasterModel.DriverName),
                            new SqlParameter("@DriverLicNo", fleetCardMasterModel.DriverLicNo),
                            new SqlParameter("@MobileNo", fleetCardMasterModel.MobileNo),
                            new SqlParameter("@IsActive", fleetCardMasterModel.IsActive),
                          new SqlParameter("@LoggedInUser", fleetCardMasterModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "FleetCardMasterMaster_Insert", param);

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
        public async Task<ResponseModel> FleetCardMasterDelete(Request req)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@CardId", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "[usp_FleetCardMasterDelete", param);

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
        public async Task<List<DropDownListModel>> GetCardledgerAcList()
        {
            List<DropDownListModel> cardAcList = new();
            try
            {
                if (dbconnection != null)
                {


                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "CardledgerAcList_Select", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            cardAcList.Add(new DropDownListModel
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
            return cardAcList;
        }
        public async Task<FleetCardMasterList> GetFleetCardMasterList(PageRequest request)
        {
            FleetCardMasterList fleetCardMasterList = new();
            List<FleetCardMasterModel> cardList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "FleetCardMasterList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            cardList.Add(new FleetCardMasterModel
                            {
                                CardId = Convert.ToString(dataSet.Tables[0].Rows[i]["CardId"]),
                                CardType = Convert.ToString(dataSet.Tables[0].Rows[i]["CardType"]),

                                CardCode = Convert.ToString(dataSet.Tables[0].Rows[i]["CardCode"]),
                                CardNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CardNo"]),
                                CardPin = Convert.ToString(dataSet.Tables[0].Rows[i]["CardPin"]),
                                CardLedgerAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CardLedgerAc"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                DriverName = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverName"]),
                                DriverLicNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverLicNo"]),
                                MobileNo = Convert.ToString(dataSet.Tables[0].Rows[i]["MobileNo"]),
                                IsActive = Convert.ToString(dataSet.Tables[0].Rows[i]["IsActive"]),



                            });
                        }

                        fleetCardMasterList.CardList = cardList;

                        fleetCardMasterList.PageMetaData = new PaginationMetaData
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
            return fleetCardMasterList;
        }

    }

}
