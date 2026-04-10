
using Microsoft.EntityFrameworkCore;

namespace backend_NET.Models
{
    public class MeterReadingDbRepository : IMeterReadingRepository
    {
        private readonly AppDbContext _context;

        public MeterReadingDbRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<MeterReading> AllReadings
        {
            get
            {
                return _context.MeterReadings.Include(c => c.User);
            }
        }

        public void AddReading(MeterReading reading)
        {
            _context.MeterReadings.Add(reading);
            _context.SaveChanges();
        }

        public MeterReading? GetReadingById(Guid readingId)
        {
            return _context.MeterReadings.FirstOrDefault(r => r.MeterReadingID == readingId);
        }

        public IEnumerable<MeterReading> GetReadingsOf(User user)
        {
            return _context.MeterReadings.Include(r => r.User).Where(r =>  r.User == user);
        }
    }
}
