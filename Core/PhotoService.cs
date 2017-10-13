using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using vega.Core.Models;
using vega.Models;

namespace vega.Core
{
    public class PhotoService : IPhotoService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IPhotoStorage photoStorage;
        public PhotoService(IUnitOfWork unitOfWork, IPhotoStorage photoStorage)
        {
            this.photoStorage = photoStorage;
            this.unitOfWork = unitOfWork;

        }
        public async Task<Photo> UploadPhoto(Vehicle vehicle, IFormFile file, string uploadsFolderPath)
        {
            // toDo: put all of this on MediatR command bus
            var fileName = await photoStorage.StorePhoto(uploadsFolderPath, file);
            // Write Method to create thumbnail
            var photo = new Photo
            {
                FileName = fileName
            };

            vehicle.Photos.Add(photo);

            await unitOfWork.CompleteAsync();

            return photo;
        }
    }
}