using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;

namespace FleetTrans.Business
{
    public class DriverSalaryStatementBusiness : IDriverSalaryStatementBusiness
    {
        readonly IDriverSalaryStatementRepository driverSalaryStatementRepository;
        public DriverSalaryStatementBusiness(IDriverSalaryStatementRepository _driverSalaryStatementRepository)
        {
            driverSalaryStatementRepository = _driverSalaryStatementRepository;
        }
        /// <summary>
        /// Business method for Get Diesel Statement Search List
        /// </summary>
        /// <param name="DieselStatementSearchListRequest"></param>
        public async Task<DriverSalaryStatementList> GetDriverSalaryStatementList(PageRequest request)
        {
            return await driverSalaryStatementRepository.GetDriverSalaryStatementList(request);
        }
    }
}