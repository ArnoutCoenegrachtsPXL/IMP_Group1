namespace backend_NET.Models
{
    public class MeterReading
    {
        public Guid MeterReadingID { get; set; }
        public User User { get; set; } = default!;
        public DateTime Time { get; set; }
        public double Value { get; set; }
        public byte[]? MeterImage { get; set; }
    }
}
