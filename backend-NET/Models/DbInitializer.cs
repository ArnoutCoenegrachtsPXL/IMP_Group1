using System.Text;

namespace backend_NET.Models
{
    public class DbInitializer
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            AppDbContext context = applicationBuilder.ApplicationServices.CreateScope().ServiceProvider.GetRequiredService<AppDbContext>();

            
            if (/*!context.Users.Any() && */!context.MeterReadings.Any())
            {
                Console.WriteLine("Seeding database...");
                Console.WriteLine("  Seeding users...");

                DateTime date = DateTime.Now;
                while (date.DayOfWeek > 0)
                {
                    date = date.AddDays(-1);
                }
                string notifTitle = "Reached weekly goal";
                string notifDescription = "Congratulations, you've reached your weekly meterreading upload goal! Keep it up!";
                NotificationType type = NotificationType.SUCCESS;


                var userParser = new Microsoft.VisualBasic.FileIO.TextFieldParser("userdata.csv");
                userParser.TextFieldType = Microsoft.VisualBasic.FileIO.FieldType.Delimited;
                userParser.SetDelimiters(new string[] { "," });

                Dictionary<int,int> userCounter = new Dictionary<int, int>();
                Dictionary<int,List<User>> userDict = new Dictionary<int,List<User>>();
                Dictionary<User, double> valueDict = new Dictionary<User, double>();
                Dictionary<User, int> dateCounter = new Dictionary<User, int>();
                for (int i = 1; i <= 6; i++)
                {
                    userCounter[i] = 0;
                    userDict[i] = new List<User>();
                }

                while (!userParser.EndOfData)
                {
                    string[] row = userParser.ReadFields();
                    if (row != null)
                    {
                        if (row[0].Equals("full_name"))
                        {
                            continue;
                        }
                        string fullName = row[0];
                        string email = row[1];
                        string passwordHash = BCrypt.Net.BCrypt.HashPassword(row[2]);
                        int postalCode = Convert.ToInt16(row[3]);
                        int householdSize = Convert.ToInt16(row[4]);
                        User newUser = User.CreateNewUser(fullName, email, passwordHash, postalCode, householdSize);
                        userDict[householdSize].Add(newUser);
                        valueDict[newUser] = 0;
                        dateCounter[newUser] = 0;
                        context.Add(newUser);

                        Notification newNotif = Notification.CreateNewNotification(newUser, notifTitle, notifDescription, type);
                        newNotif.Date = date;
                        context.Add(newNotif);
                    }
                }

                Console.WriteLine("  Finished seeding users");
                context.SaveChanges();
                Console.WriteLine("  Seeding readings...");

                var meterReadingParser = new Microsoft.VisualBasic.FileIO.TextFieldParser("household_energy_consumption.csv");
                meterReadingParser.TextFieldType = Microsoft.VisualBasic.FileIO.FieldType.Delimited;
                meterReadingParser.SetDelimiters(new string[] { "," });

                while (!meterReadingParser.EndOfData)
                {
                    string[] row = meterReadingParser.ReadFields();
                    string houseId = "";
                    if (row != null)
                    {
                        if (row[2].Equals("Energy_Consumption_kWh"))
                        {
                            continue;
                        }
                        double value = Convert.ToDouble(row[2], System.Globalization.CultureInfo.InvariantCulture);
                        int householdSize = Convert.ToInt16(row[3], System.Globalization.CultureInfo.InvariantCulture);

                        if (!houseId.Equals(row[0]))
                        {
                            houseId = row[0];
                            userCounter[householdSize] += 1;
                            if (userCounter[householdSize] >= userDict[householdSize].Count)
                            {
                                userCounter[householdSize] = 0;
                            }
                        }
                        int index = userCounter[householdSize];
                        User user = userDict[householdSize][index];
                        if (valueDict[user] == 0)
                        {
                            valueDict[user] = 12345 * value;
                        }
                        valueDict[user] -= value;
                        dateCounter[user] -= 1;
                        Status status = dateCounter[user] > -6 ? Status.PENDING : Status.VERIFIED;
                        MeterReading newMeterReading = MeterReading.CreateMeterReading(user, DateTime.Today.AddDays(dateCounter[user]), valueDict[user], status, householdSize);
                        context.MeterReadings.Add(newMeterReading);
                    }
                }
                Console.WriteLine("  Finished seeding readings");
                context.SaveChanges();
                Console.WriteLine("Finished seeding data");
            }
        }
    }
}
