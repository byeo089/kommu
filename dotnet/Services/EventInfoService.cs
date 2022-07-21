using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.EventInformation;
using Sabio.Models.Domain.Events;
using Sabio.Models.Domain.Venues;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Events
{

    public class EventInfoService : IEventInfoService
    {
        private IDataProvider _data = null;

        public EventInfoService(IDataProvider data)
        {
            _data = data;
        }


        public EventInfo GetById(int id)
        {
            string procName = "[dbo].[EventInformation_SelectByIdV2]";
            EventInfo eventById = null;

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

        public List<EventInfo> GetAll()
        {
            List<EventInfo> list = null;
            string procName = "[dbo].[EventInformation_SelectAllV2]";
            _data.ExecuteCmd(
                procName,
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    EventInfo aEventInfo = MapSingleEvent(reader, ref startingIndex);

                    if (list == null)
                    { list = new List<EventInfo>(); }
                    list.Add(aEventInfo);
                });
            return list;
        }


        public Paged<EventInfo> Paginate(int pageIndex, int pageSize)
        {
            Paged<EventInfo> pagedList = null;
            List<EventInfo> eventList = null;
            int totalCount = 0;

            string procName = "[dbo].[EventInformation_SelectAll_PaginatedV2]";
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                EventInfo aEventInfo = MapSingleEvent(reader, ref startingIndex);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }
                if (eventList == null)
                {
                    eventList = new List<EventInfo>();
                }
                eventList.Add(aEventInfo);
            });

            if (eventList != null)
            {
                pagedList = new Paged<EventInfo>(eventList, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<EventInfo> SearchPaginate(int pageIndex, int pageSize, string query)
        {
            Paged<EventInfo> pagedList = null;
            List<EventInfo> searchResult = null;
            int totalCount = 0;

            string procName = "[dbo].[EventInformation_SelectAll_Search_PaginatedV2]";
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@Query", query);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                EventInfo aEventInfo = MapSingleEvent(reader, ref startingIndex);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }
                if (searchResult == null)
                {
                    searchResult = new List<EventInfo>();
                }
                searchResult.Add(aEventInfo);
            });

            if (searchResult != null)
            {
                pagedList = new Paged<EventInfo>(searchResult, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }


        private static EventInfo MapSingleEvent(IDataReader reader, ref int startingIndex)
        {
            EventInfo aEventInfo = new EventInfo();
            aEventInfo.EventType = new LookUp();
            aEventInfo.EventStatus = new LookUp();
            aEventInfo.Venue = new Venue();
            aEventInfo.Location = new Locations();
            aEventInfo.State = new LookUp();

            aEventInfo.Id = reader.GetSafeInt32(startingIndex++);
            aEventInfo.EventType.Id = reader.GetSafeInt32(startingIndex++);
            aEventInfo.EventType.Name = reader.GetSafeString(startingIndex++);
            aEventInfo.Name = reader.GetSafeString(startingIndex++);
            aEventInfo.Summary = reader.GetSafeString(startingIndex++);
            aEventInfo.ShortDescription = reader.GetSafeString(startingIndex++);
            aEventInfo.EventStatus.Id = reader.GetSafeInt32(startingIndex++);
            aEventInfo.EventStatus.Name = reader.GetSafeString(startingIndex++);
            aEventInfo.ImageUrl = reader.GetSafeString(startingIndex++);
            aEventInfo.ExternalSiteUrl = reader.GetSafeString(startingIndex++);
            aEventInfo.IsFree = reader.GetSafeBool(startingIndex++);
            aEventInfo.DateStart = reader.GetSafeDateTime(startingIndex++);
            aEventInfo.DateEnd = reader.GetSafeDateTime(startingIndex++);
            aEventInfo.Venue.Id = reader.GetSafeInt32(startingIndex++);
            aEventInfo.Venue.ImageUrl = reader.GetSafeString(startingIndex++);
            aEventInfo.Venue.Name = reader.GetSafeString(startingIndex++);
            aEventInfo.Venue.Description = reader.GetSafeString(startingIndex++);
            aEventInfo.Venue.Url = reader.GetSafeString(startingIndex++);
            aEventInfo.Location.Id = reader.GetSafeInt32(startingIndex++);
            aEventInfo.Location.LineOne = reader.GetSafeString(startingIndex++);
            aEventInfo.Location.LineTwo = reader.GetSafeString(startingIndex++);
            aEventInfo.Location.City = reader.GetSafeString(startingIndex++);
            aEventInfo.State.Id = reader.GetSafeInt32(startingIndex++);
            aEventInfo.State.Code = reader.GetSafeString(startingIndex++);
            aEventInfo.State.Name = reader.GetSafeString(startingIndex++);
            aEventInfo.Location.Zip = reader.GetSafeString(startingIndex++);
            aEventInfo.Location.Latitude = reader.GetSafeDouble(startingIndex++);
            aEventInfo.Location.Longitude = reader.GetSafeDouble(startingIndex++);
            return aEventInfo;
        }
    }


}
