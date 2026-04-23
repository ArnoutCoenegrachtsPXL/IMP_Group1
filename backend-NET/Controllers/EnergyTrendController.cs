using Microsoft.AspNetCore.Mvc;
using backend_NET.Models;
using System;
using System.Collections.Generic;

namespace backend_NET.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnergyTrendController : ControllerBase
    {
        [HttpGet("trends")]
        public IActionResult GetEnergyTrends()
        {
            var userUsage = new List<DailyUsage>
            {
                new DailyUsage { Day = "Mon", KWh = 85.2, Date = DateTime.Now.AddDays(-6) },
                new DailyUsage { Day = "Tue", KWh = 72.5, Date = DateTime.Now.AddDays(-5) },
                new DailyUsage { Day = "Wed", KWh = 98.2, Date = DateTime.Now.AddDays(-4) },
                new DailyUsage { Day = "Thu", KWh = 64.8, Date = DateTime.Now.AddDays(-3) },
                new DailyUsage { Day = "Fri", KWh = 55.3, Date = DateTime.Now.AddDays(-2) },
                new DailyUsage { Day = "Sat", KWh = 48.7, Date = DateTime.Now.AddDays(-1) },
                new DailyUsage { Day = "Sun", KWh = 42.1, Date = DateTime.Now }
            };

            var communityUsage = new List<DailyUsage>
            {
                new DailyUsage { Day = "Mon", KWh = 8450, Date = DateTime.Now.AddDays(-6) },
                new DailyUsage { Day = "Tue", KWh = 8200, Date = DateTime.Now.AddDays(-5) },
                new DailyUsage { Day = "Wed", KWh = 8900, Date = DateTime.Now.AddDays(-4) },
                new DailyUsage { Day = "Thu", KWh = 7800, Date = DateTime.Now.AddDays(-3) },
                new DailyUsage { Day = "Fri", KWh = 7500, Date = DateTime.Now.AddDays(-2) },
                new DailyUsage { Day = "Sat", KWh = 7100, Date = DateTime.Now.AddDays(-1) },
                new DailyUsage { Day = "Sun", KWh = 6900, Date = DateTime.Now }
            };

            var trends = new EnergyTrendData
            {
                UserUsage = userUsage,
                CommunityUsage = communityUsage
            };

            return Ok(trends);
        }
    }
}