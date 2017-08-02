using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Persistence;
using vega.Models;

namespace vega.Controllers
{
    public class FeaturesController : Controller
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;
        public FeaturesController(VegaDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet("/api/features")]
        public async Task<IEnumerable<Feature>> GetFeatures()
        {
            return await context.Feature.ToListAsync();
        }
    }
}