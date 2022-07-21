using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.Events;
using Sabio.Models.Requests.Events;
using Sabio.Services.Interfaces;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Sabio.Services.Events
{

    public class EventService : IEventService
    {
        private IDataProvider _data = null;

        public EventService(IDataProvider data)
        {
            _data = data;
        }


        public int Add(EventAddRequest model)
        {
            string procName = "[dbo].[Events_Insert]";
            int id = 0;

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCol)
            {
                object oId = returnCol["@Id"].Value;
                int.TryParse(oId.ToString(), out id);
            });
            return id;
        }


        public void Update(EventUpdateRequest model)
        {
            string procName = "[dbo].[Events_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@Id", model.Id);

            }, returnParameters: null);
        }


        public void Delete(EventStatusIdUpdateRequest model)
        {
            string procName = "[dbo].[Events_Delete_ById]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", model.Id);


            }, returnParameters: null);
        }

        public Event GetById(int id)
        {
            string procName = "[dbo].[Events_Select_ById]";
            Event eventById = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@Id", id);
            }
            , delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                eventById = MapSingleEvent(reader, ref startingIndex);
            });
            return eventById;
        }



        public Paged<Event> Paginate(int pageIndex, int pageSize)
        {
            Paged<Event> pagedList = null;
            List<Event> eventList = null;
            int totalCount = 0;

            string procName = "[dbo].[Events_SelectAll]";
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Event aEvent = MapSingleEvent(reader, ref startingIndex);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }
                if (eventList == null)
                {
                    eventList = new List<Event>();
                }
                eventList.Add(aEvent);
            });

            if (eventList != null)
            {
                pagedList = new Paged<Event>(eventList, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        private static Event MapSingleEvent(IDataReader reader, ref int startingIndex)
        {
            Event aEvent = new Event();
            aEvent.Id = reader.GetSafeInt32(startingIndex++);
            aEvent.EventTypeId = reader.GetSafeInt32(startingIndex++);
            aEvent.Name = reader.GetSafeString(startingIndex++);
            aEvent.Summary = reader.GetSafeString(startingIndex++);
            aEvent.ShortDescription = reader.GetSafeString(startingIndex++);
            aEvent.VenueId = reader.GetSafeInt32(startingIndex++);
            aEvent.EventStatusId = reader.GetSafeInt32(startingIndex++);
            aEvent.ImageUrl = reader.GetSafeString(startingIndex++);
            aEvent.ExternalSiteUrl = reader.GetSafeString(startingIndex++);
            aEvent.IsFree = reader.GetSafeBool(startingIndex++);
            aEvent.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aEvent.DateModified = reader.GetSafeDateTime(startingIndex++);
            aEvent.DateStart = reader.GetSafeDateTime(startingIndex++);
            aEvent.DateEnd = reader.GetSafeDateTime(startingIndex++);
            return aEvent;
        }


        private static void AddCommonParams(EventAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@EventTypeId", model.EventTypeId);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Summary", model.Summary);
            col.AddWithValue("@ShortDescription", model.ShortDescription);
            col.AddWithValue("@VenueId", model.VenueId);
            col.AddWithValue("@EventStatusId", model.EventStatusId);
            col.AddWithValue("@ImageUrl", model.ImageUrl);
            col.AddWithValue("@ExternalSiteUrl", model.ExternalSiteUrl);
            col.AddWithValue("@IsFree", model.IsFree);
            col.AddWithValue("@DateStart", model.DateStart);
            col.AddWithValue("@DateEnd", model.DateEnd);
        }

    }

}

