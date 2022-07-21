using Sabio.Models;
using Sabio.Models.Domain.Events;
using Sabio.Models.Requests.Events;


namespace Sabio.Services.Interfaces
{
    public interface IEventService
    {
        int Add(EventAddRequest model);
        void Update(EventUpdateRequest model);
        void Delete(EventStatusIdUpdateRequest model);
        Event GetById(int id);
        Paged<Event> Paginate(int pageIndex, int pageSize);
    }
}