using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using vega.Core;
using vega.Extensions;
using vega.Core.Models;
using vega.Models;
using System.Linq.Expressions;
using System;

namespace vega.Persistence
{
    public class VehicleRepository: IVehicleRepository
    {
        private readonly VegaDbContext context;

        public VehicleRepository(VegaDbContext context)
        {
            this.context = context;

        }
        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if(!includeRelated)
                return await context.Vehicles.FindAsync(id).ConfigureAwait(false);

            return await context.Vehicles
                            .Include(v => v.Features)
                            .ThenInclude(vf => vf.Feature)
                            .Include(m => m.Model)
                            .ThenInclude(m => m.Make)
                            .SingleOrDefaultAsync(v => v.Id == id);
        }
        public async Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery queryObj)
        {
            var result = new QueryResult<Vehicle>();
            var query = context.Vehicles
                            .Include(m => m.Model)
                            .ThenInclude(m => m.Make)
                            .AsQueryable();

            if(queryObj.MakeId.HasValue)
                query = query.Where(vega => vega.Model.MakeId == queryObj.MakeId);
            
            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
            {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.name,
                ["contactName"] = v => v.ContactName
            };

            query = query.ApplyOrdering(queryObj,columnsMap);
            result.TotalItems = await query.CountAsync();
            query = query.ApplyPaging(queryObj);
            
            result.Items = await query.ToListAsync();

            return result;
        }

        public void Add(Vehicle vehicle ) 
        {
            context.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle){
            context.Vehicles.Remove(vehicle);
        }
    }
}