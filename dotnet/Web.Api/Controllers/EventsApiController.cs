using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Events;
using Sabio.Models.Requests.Events;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/events")]
    [ApiController]
    public class EventsApiController : BaseApiController
    {
        private IEventService _service = null;

        public EventsApiController(IEventService service, IAuthenticationService<int> authService, ILogger<EventsApiController> logger) : base(logger)
        {
            _service = service;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(EventAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int id = _service.Add(model);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> Update(EventUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.Update(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }


        [HttpPut("eventstatus/{id:int}")]
        public ActionResult<SuccessResponse> Delete(EventStatusIdUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(iCode, response);
        }

        [HttpGet("paginate")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Paged<Event>>> Pagination(int pageIndex, int pageSize)
        {
            ActionResult result = null;
            try
            {
                Paged<Event> paged = _service.Paginate(pageIndex, pageSize);

                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Events Not Found"));
                }
                else
                {
                    ItemResponse<Paged<Event>> response = new ItemResponse<Paged<Event>>();
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


        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Event>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                Event aEvent = _service.GetById(id);

                if (aEvent == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Event not found.");
                }
                else
                {
                    response = new ItemResponse<Event> { Item = aEvent };
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