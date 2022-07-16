using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Events
{
    public class EventStatusIdUpdateRequest: IModelIdentifier
    {

        [Range(1, int.MaxValue, ErrorMessage = "Please enter valid number")]
        public int Id { get; set; }

    }
}
