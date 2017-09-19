using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using vega.Controllers.Resources;

namespace vega.Core.Commands
{
    public class SaveVehicleCommand : IRequest<Task<int>>
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public bool IsRegistered { get; set; }
        public ContactResource Contact { get; set; }
        public ICollection<int> Features { get; set; }
    }
}