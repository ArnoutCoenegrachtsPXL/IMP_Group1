using backend_NET.Models;

namespace backend_NET.ApiModels
{
    public class CreateMeterReadingModel
    {
        public Guid UserId { get; set; }
        public DateTime Time { get; set; }
        public double Value { get; set; }
        public byte[]? MeterImage { get; set; }
    }
}
