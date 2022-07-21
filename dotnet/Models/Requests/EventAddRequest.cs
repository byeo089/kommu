using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Events
{
    public class EventAddRequest
    {
        [Required]
        public int EventTypeId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Summary { get; set; }
        [Required]
        public string ShortDescription { get; set; }
        [Required]
        public int VenueId { get; set; }
        [Required]
        public int EventStatusId { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        [Required]
        public string ExternalSiteUrl { get; set; }
        [Required]
        public bool IsFree { get; set; }
 
        //Nullable Field
        public DateTime DateStart { get; set; }
        //Nullable Field
        public DateTime DateEnd { get; set; }
    }
}
