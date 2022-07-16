using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.EventInformation;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/eventsinfo")]
    [ApiController]
    public class EventsInfoApiController : BaseApiController
    {
        private  IEventInfoService _service = null;
        private IAuthenticationService<int> _authService = null;

        public EventsInfoApiController(IEventInfoService service, IAuthenticationService<int> authService, ILogger<EventsInfoApiController> logger) : base(logger)
        {
            _service = service;
            _authService = authService;
        }


        [HttpGet("paginate")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Paged<EventInfo>>> Pagination(int pageIndex, int pageSize)
        {
            ActionResult result = null;
            try
            {
                Paged<EventInfo> paged = _service.Paginate(pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Events Not Found"));
                }
                else
                {
                   ItemResponse<Paged<EventInfo>> response = new ItemResponse<Paged<EventInfo>>();
                   response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

        [HttpGet("search")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Paged<EventInfo>>> SearchPaginate(int pageIndex, int pageSize, string query)
        {
            ActionResult result = null;
            try
            {
                Paged<EventInfo> paged = _service.SearchPaginate(pageIndex, pageSize, query);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Events Not Found"));
                }
                else
                {
                    ItemResponse<Paged<EventInfo>> response = new ItemResponse<Paged<EventInfo>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult<ItemsResponse<EventInfo>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<EventInfo> list = _service.GetAll();
                {
                    if (list == null)
                    {
                        code = 404;
                        response = new ErrorResponse("App Resource Not Found");
                    }
                    else { response = new ItemsResponse<EventInfo> { Items = list }; }
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<EventInfo>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                EventInfo aEventInfo = _service.GetById(id);

                if (aEventInfo == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Event not found.");
                }
                else
                {
                    response = new ItemResponse<EventInfo> { Item = aEventInfo };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Errors: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }


    }
}
