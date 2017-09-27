using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Models;
using vega.Persistence;
using vega.Core;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;
using vega.Core.Models;
using MediatR;
using vega.Core.Commands;

namespace vega.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper mapper;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitofwork;
        private readonly IMediator mediator;

        public VehiclesController(IMapper mapper, IVehicleRepository repository, IUnitOfWork unitofwork, IMediator mediator)
        {
            this.mediator = mediator;
            this.unitofwork = unitofwork;
            this.repository = repository;
            this.mapper = mapper;

        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody]SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var command = mapper.Map<SaveVehicleResource, SaveVehicleCommand>(vehicleResource);

            var id  = await mediator.Send(command);

            var vehicle = await repository.GetVehicle(id.Result);

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody]SaveVehicleResource vehicleResource)
        {
            var vehicle = await repository.GetVehicle(id);

            if (vehicle == null)
            {
                return NotFound();
            }
            //To Do: come back and sort this out 

            var command  = mapper.Map<SaveVehicleResource, SaveVehicleCommand>(vehicleResource);
            mapper.Map<SaveVehicleCommand, Vehicle>(command, vehicle);
            vehicle.LastUpdate = DateTime.Now;

            await unitofwork.CompleteAsync();

            vehicle = await repository.GetVehicle(vehicle.Id);
            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var command = new DeleteVehicleCommand{
                Id = id
            };

            var result = await mediator.Send(command);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicleByID(int id)
        {
            var vehicle = await repository.GetVehicle(id);

            if (vehicle == null)
            {
                return NotFound();
            }

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }

        [HttpGet]
        public async Task<QueryResultResource<VehicleResource>> GetVehicles(VehicleQueryResource filterResource)
        {
            var filter = mapper.Map<VehicleQueryResource, VehicleQuery>(filterResource);
            var queryResult = await repository.GetVehicles(filter);

            return mapper.Map<QueryResult<Vehicle>, QueryResultResource<VehicleResource>>(queryResult);
        }
    }
}