using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using MediatR;
using vega.Core.Commands;
using vega.Models;

namespace vega.Core.CommandHandlers
{
    public class DeleteVehicleCommandHandler : IRequestHandler<DeleteVehicleCommand, Task<int>>
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IVehicleRepository vehicleRepository;
        private readonly IMapper mapper;
        private readonly VehicleValidation _validator;
        public DeleteVehicleCommandHandler(IMapper mapper, IVehicleRepository vehicleRepository, IUnitOfWork unitOfWork, VehicleValidation _validator)
        {
            this._validator = _validator;
            this.mapper = mapper;
            this.vehicleRepository = vehicleRepository;
            this.unitOfWork = unitOfWork;

        }
        public async Task<int> Handle(DeleteVehicleCommand request)
        {
            var vehicle = await vehicleRepository.GetVehicle(request.Id, includeRelated: false);

            // var failures = validator.Validate(vehicle).Errors;

            // if (failures.Count > 0) 
            //    throw new ValidationException(failures);

            vehicleRepository.Remove(vehicle);

            await unitOfWork.CompleteAsync();

            return vehicle.Id;
        }
    }

    public class VehicleValidation : AbstractValidator<Vehicle>
    {
        public VehicleValidation()
        {
            RuleFor(x => x.Id).NotNull();
        }
    }
}