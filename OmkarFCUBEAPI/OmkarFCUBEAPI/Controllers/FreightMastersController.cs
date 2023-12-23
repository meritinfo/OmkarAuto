using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using FreightMasters.Models;
using FreightMasters.Business;
using Microsoft.AspNetCore.Authorization;
using Shared.Models;
using FleetMasters.Business;

namespace OmkarFCUBEAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class FreightMastersController : ControllerBase
    {

        readonly IDestinationMasterBusiness freightMastersBusiness;
        readonly IBranchMasterBusiness branchMastersBusiness;
        readonly IProductGroupMasterBusiness productGroupMastersBusiness;
        readonly IProductMasterBusiness productMasterBusiness;
        readonly ILR_Bill_SeriesBusiness lr_Bill_SeriesBusiness;
        readonly IRatetypesBusiness ratetypesBusiness;
        readonly IFreightRatesMstBusiness freightRatesMstBusiness;
        readonly IDistanceMasterFrtBusiness distanceMasterFrtBusiness;
        readonly IDistanceMasterTripBusiness distanceMasterTripBusiness;

        readonly IDistanceDetailFrtBusiness distanceDetailFrtBusiness;
        readonly IDistanceDetailTripBusiness distanceDetailTripBusiness;

        readonly IConsigneeMasterBusiness consigneeMasterBusiness;
        


        public FreightMastersController(IDestinationMasterBusiness _freightMastersBusiness, IBranchMasterBusiness _branchMastersBusiness, IProductGroupMasterBusiness _productGroupMasterBusiness, IProductMasterBusiness _productMasterBusiness, ILR_Bill_SeriesBusiness _lr_Bill_SeriesBusiness, IRatetypesBusiness _ratetypesBusiness, IFreightRatesMstBusiness _freightRatesMstBusiness,IDistanceMasterFrtBusiness _distanceMasterFrtBusiness , IDistanceMasterTripBusiness _distanceMasterTripBusiness, IDistanceDetailFrtBusiness _distanceDetailFrtBusiness, IDistanceDetailTripBusiness _distanceDetailTripBusiness, IConsigneeMasterBusiness _consigneeMasterBusiness)
        {
            branchMastersBusiness = _branchMastersBusiness;
            freightMastersBusiness = _freightMastersBusiness;
            productGroupMastersBusiness = _productGroupMasterBusiness;
            productMasterBusiness = _productMasterBusiness;
            lr_Bill_SeriesBusiness = _lr_Bill_SeriesBusiness;
            ratetypesBusiness = _ratetypesBusiness;
            freightRatesMstBusiness = _freightRatesMstBusiness;
            distanceDetailFrtBusiness = _distanceDetailFrtBusiness;
            distanceDetailTripBusiness = _distanceDetailTripBusiness;
            distanceMasterFrtBusiness = _distanceMasterFrtBusiness;
            distanceMasterTripBusiness = _distanceMasterTripBusiness;
            consigneeMasterBusiness = _consigneeMasterBusiness;
        }

        /// <summary>
        /// Controller method for DESTINATION MASTER
        /// </summary>
        /// <param name="destinationMasterModel"></param>
        [HttpPost("DestinationMasterDetailsSave")]
        public async Task<IActionResult> DestinationMasterDetailsSave(DestinationMasterModel destinationMasterModel)
        {
            if (destinationMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightMastersBusiness.DestinationMasterDetailsSave(destinationMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Controller method for DESTINATION MASTER
        /// </summary>
        /// <param name="Request"></param>
        [HttpPost("DestinationDetailsDelete")]
        public async Task<IActionResult> DestinationDetailsDelete(Request req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightMastersBusiness.DestinationDetailsDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPost("BranchMasterDetailsSave")]
        public async Task<IActionResult> BranchMasterDetailsSave(BranchMasterModel branchMasterModel)
        {
            if (branchMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await branchMastersBusiness.BranchMasterDetailsSave(branchMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Controller method for DESTINATION MASTER
        /// </summary>
        /// <param name="Request"></param>
        [HttpPost("BranchMasterDetailsDelete")]
        public async Task<IActionResult> BranchMasterDetailsDelete(Request req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await branchMastersBusiness.BranchMasterDetailsDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("ChkCodeExits")]
        public async Task<IActionResult> ChkCodeExits(Request req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await branchMastersBusiness.ChkCodeExits(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("LR_Bill_SeriesDetailsSave")]
        public async Task<IActionResult> LR_Bill_SeriesDetailsSave(LR_Bill_SeriesModel lr_Bill_SeriesModel)
        {
            if (lr_Bill_SeriesModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await lr_Bill_SeriesBusiness.LR_Bill_SeriesDetailsSave(lr_Bill_SeriesModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        /// <summary>
        /// Controller method for PRODUCT GROUP MASTER
        /// </summary>
        /// <param name="productGroupMasterModel"></param>
        [HttpPost("ProductGroupMasterDetailsSave")]
        public async Task<IActionResult> ProductGroupMasterDetailsSave(ProductGroupMasterModel productGroupMasterModel)
        {
            if (productGroupMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await productGroupMastersBusiness.ProductGroupMasterDetailsSave(productGroupMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// Controller method for PRODUCT GROUP MASTER
        /// </summary>
        /// <param name="productMasterModel"></param>
        [HttpPost("ProductMasterSave")]
        public async Task<IActionResult> ProductMasterSave(ProductMasterModel productMasterModel)
        {
            if (productMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await productMasterBusiness.ProductMasterSave(productMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("DistanceMasterFrtSave")]
        public async Task<IActionResult> DistanceMasterFrtSave(DistanceMasterFrtModel distanceMasterFrtModel)
        {
            if (distanceMasterFrtModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterFrtBusiness.DistanceMasterFrtSave(distanceMasterFrtModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ChkdistanceFrtValidity")]
        public async Task<IActionResult> ChkdistanceFrtValidity(DistanceMasterFrtModel distanceMasterFrtModel)
        {
            if (distanceMasterFrtModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterFrtBusiness.ChkdistanceFrtValidity(distanceMasterFrtModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ChkdistanceTripValidity")]
        public async Task<IActionResult> ChkdistanceTripValidity(DistanceMasterTripModel distanceMasterTripModel)
        {
            if (distanceMasterTripModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterTripBusiness.ChkdistanceTripValidity(distanceMasterTripModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("DistanceMasterTripSave")]
        public async Task<IActionResult> DistanceMasterTripSave(DistanceMasterTripModel distanceMasterTripModel)
        {
            if (distanceMasterTripModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterTripBusiness.DistanceMasterTripSave(distanceMasterTripModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("DistanceDetailFrtSave")]
        public async Task<IActionResult> DistanceDetailFrtSave(DistanceDetailFrtModel distanceDetailFrtModel)
        {
            if (distanceDetailFrtModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceDetailFrtBusiness.DistanceDetailFrtSave(distanceDetailFrtModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("DistanceMasterTripDelete")]
        public async Task<IActionResult> DistanceMasterTripDelete(Request request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterTripBusiness.DistanceMasterTripDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("DistanceMasterFrtDelete")]
        public async Task<IActionResult> DistanceMasterFrtDelete(Request request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceMasterFrtBusiness.DistanceMasterFrtDelete(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("DistanceDetailTripSave")]
        public async Task<IActionResult> DistanceDetailTripSave(DistanceDetailTripModel distanceDetailTripModel)
        {
            if (distanceDetailTripModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await distanceDetailTripBusiness.DistanceDetailTripSave(distanceDetailTripModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetFreightTripInnerGridList")]
        public async Task<IActionResult> GetFreightTripInnerGridList(FreightTripInnerGridListRequest request)
        {
            try
            {
                var result = await distanceMasterTripBusiness.GetFreightTripInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetFreightRateInnerGridList")]
        public async Task<IActionResult> GetFreightRateInnerGridList(Request request)
        {
            try
            {
                var result = await freightRatesMstBusiness.GetFreightRateInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetFreightInnerGridList")]
        public async Task<IActionResult> GetFreightInnerGridList(FreightTripInnerGridListRequest request)
        {
            try
            {
                var result = await distanceMasterFrtBusiness.GetFreightInnerGridList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("FreightRatesMstSave")]
        public async Task<IActionResult> FreightRatesMstSave(FreightRatesMstModel freightRatesMstModel)
        {
            if (freightRatesMstModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRatesMstBusiness.FreightRatesMstSave(freightRatesMstModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ConsigneeMasterSave")]
        public async Task<IActionResult> ConsigneeMasterSave(ConsigneeMasterModel consigneeMasterModel)
        {
            if (consigneeMasterModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await consigneeMasterBusiness.ConsigneeMasterSave(consigneeMasterModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Controller method for Branch List
        /// </summary>
        [HttpPost("GetBranchList")]
        public async Task<IActionResult> GetBranchList()
        {
            try
            {
                var result = await branchMastersBusiness.GetBranchList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetStateList")]
        public async Task<IActionResult> GetStateList()
        {
            try
            {
                var result = await freightMastersBusiness.GetStateList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetProductGroupList")]
        public async Task<IActionResult> GetProductGroupList()
        {
            try
            {
                var result = await productMasterBusiness.GetProductGroupList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
      


        /// <summary>
        /// Controller method for PRODUCT GROUP MASTER
        /// </summary>
        /// <param name="ratetypesModel"></param>
        [HttpPost("RatetypesDetailsSave")]
        public async Task<IActionResult> RatetypesDetailsSave(RatetypesModel ratetypesModel)
        {
            if (ratetypesModel == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await ratetypesBusiness.RatetypesDetailsSave(ratetypesModel);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDestinationMasterList")]
        public async Task<IActionResult> GetDestinationMasterList(PageRequest request)
        {
            try
            {
                var result = await freightMastersBusiness.GetDestinationMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDistanceMasterFrtList")]
        public async Task<IActionResult> GetDistanceMasterFrtList(PageRequest request)
        {
            try
            {
                var result = await distanceMasterFrtBusiness.GetDistanceMasterFrtList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetFreightRatesList")]
        public async Task<IActionResult> GetFreightRatesList(PageRequest request)
        {
            try
            {
                var result = await freightRatesMstBusiness.GetFreightRatesList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("FreightRatesMasterDetailsDelete")]
        public async Task<IActionResult> FreightRatesMasterDetailsDelete(Request req)
        {
            if (req == null)
            {
                return BadRequest("Invalid request data");
            }
            try
            {
                var result = await freightRatesMstBusiness.FreightRatesMasterDetailsDelete(req);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("GetDistanceMasterTripList")]
        public async Task<IActionResult> GetDistanceMasterTripList(PageRequest request)
        {
            try
            {
                var result = await distanceMasterTripBusiness.GetDistanceMasterTripList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetBranchMasterList")]
        public async Task<IActionResult> GetBranchMasterList(PageRequest request)
        {
            try
            {
                var result = await branchMastersBusiness.GetBranchMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetproductMasterList")]
        public async Task<IActionResult> GetProductMasterList(PageRequest request)
        {
            try
            {
                var result = await productMasterBusiness.GetProductMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetProductGroupMasterList")]
        public async Task<IActionResult> GetProductGroupMasterList(PageRequest request)
        {
            try
            {
                var result = await productGroupMastersBusiness.GetProductGroupMasterList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("LRBillSeriesList")]
        public async Task<IActionResult> LrBillSeriesList(PageRequest request)
        {
            try
            {
                var result = await lr_Bill_SeriesBusiness.LRBillSeriesList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GetRateTypesList")]
        public async Task<IActionResult> GetRateTypesList(PageRequest request)
        {
            try
            {
                var result = await ratetypesBusiness.GetRateTypesList(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
