using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using backend_NET.Models;
using backend_NET.ApiModels;

namespace backend_NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeterReadingController : ControllerBase
    {
        private readonly IMeterReadingRepository repository;
        private readonly IUserRepository userRepository;

        public MeterReadingController(IMeterReadingRepository repository, IUserRepository userRepository)
        {
            this.repository = repository;
            this.userRepository = userRepository;
        }

        [HttpPost()]
        public ActionResult<MeterReading> PostMeasurement(CreateMeterReadingModel model)
        {
            MeterReading newMeasurement = new MeterReading();
            newMeasurement.User = userRepository.getUser(model.UserId);
            newMeasurement.Time = model.Time;
            newMeasurement.Value = model.Value;
            newMeasurement.MeterImage = model.MeterImage;
            repository.AddReading(newMeasurement);

            return Created();
        }
    }
}
