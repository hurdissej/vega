using System.Collections.Generic;
using System.Threading.Tasks;
using vega.Models;

namespace vega.Core
{
    public interface IVehicleRepository
    {
         Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
         Task<IEnumerable<Vehicle>> GetVehicles();
         void Remove(Vehicle vehicle);
         void Add(Vehicle vehicle);
    }
}