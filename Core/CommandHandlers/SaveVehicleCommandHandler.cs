using System;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using vega.Controllers.Resources;
using vega.Core.Commands;
using vega.Models;

namespace vega.Core.CommandHandlers
{
    public class SaveVehicleCommandHandler : IRequestHandler<SaveVehicleCommand, Task<int>>
    {
        private readonly IVehicleRepository vehicleRepository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        public SaveVehicleCommandHandler(IVehicleRepository vehicleRepository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.vehicleRepository = vehicleRepository;

        }
        public async Task<int> Handle(SaveVehicleCommand request)
        {
            var vehicle = mapper.Map<SaveVehicleCommand, Vehicle>(request);
            vehicle.LastUpdate = DateTime.Now;
            vehicleRepository.Add(vehicle);
            await unitOfWork.CompleteAsync();
            return vehicle.Id;
        }
    }
}