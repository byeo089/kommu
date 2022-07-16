using Sabio.Models;
using Sabio.Models.Domain.EventInformation;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IEventInfoService
    {
        List<EventInfo> GetAll();
        EventInfo GetById(int id);
        Paged<EventInfo> Paginate(int pageIndex, int pageSize);
        Paged<EventInfo> SearchPaginate(int pageIndex, int pageSize, string query);
    }
}