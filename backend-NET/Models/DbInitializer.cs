namespace backend_NET.Models
{
    public class DbInitializer
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            AppDbContext context = applicationBuilder.ApplicationServices.CreateScope().ServiceProvider.GetRequiredService<AppDbContext>();

            User user1 = new User();
            user1.Id = new Guid("c6173c50-032a-4137-b437-b966ac00ddc8");
            user1.FullName = "Test";
            user1.Email = "test@test.com";
            user1.PasswordHash = BCrypt.Net.BCrypt.HashPassword("abcdef");
            if (!context.Users.Any())
            {
                context.Users.Add(user1);
                context.SaveChanges();
            }

            if (!context.MeterReadings.Any())
            {
                int endValue = 123456;
                byte[] meterImage = new byte[1];
                DateTime endDate = DateTime.Now.AddDays(-1);
                int n = 30;
                List<int> invalid = new List<int> { 3, 7, 11, 14, 17, 23 };
                Status status;
                int value;
                for (int i = 0; i < n; i++)
                {
                    if (invalid.Contains(i))
                    {
                        status = Status.REJECTED;
                        value = i;
                    }
                    else
                    {
                        value = endValue - 1;
                        if (i < 5)
                        {
                            status = Status.PENDING;
                        }
                        else
                        {
                            status = Status.VERIFIED;
                        }
                    }
                    IList<MeterReading> readings = new List<MeterReading>();
                    readings.Add(new MeterReading()
                    {
                        MeterReadingID = new Guid(),
                        User = user1,
                        Time = endDate.AddDays(-i),
                        Value = value,
                        MeterImage = meterImage,
                        Status = status
                    });
                    context.MeterReadings.AddRange(readings);
                    context.SaveChanges();
                }
            }
        }
    }
}
