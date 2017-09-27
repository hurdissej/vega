using System.Threading.Tasks;
using MediatR;

namespace vega.Core.Commands
{
    public class DeleteVehicleCommand: IRequest<Task<int>>
    {
        public int Id { get; set; }
    }
}