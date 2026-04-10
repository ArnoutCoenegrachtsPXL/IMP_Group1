namespace backend_NET.Models
{
    public interface IMeterReadingRepository
    {
        IEnumerable<MeterReading> AllReadings { get; }
        MeterReading? GetReadingById(Guid readingId);
        IEnumerable<MeterReading> GetReadingsOf(User user);
        void AddReading(MeterReading reading);
    }
}
