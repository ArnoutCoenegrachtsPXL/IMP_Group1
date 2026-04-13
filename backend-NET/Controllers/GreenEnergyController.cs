using Microsoft.AspNetCore.Mvc;
using backend_NET.Models;

namespace backend_NET.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GreenEnergyController : ControllerBase
    {
        [HttpGet("stats")]
        public IActionResult GetGreenStats()
        {
            var stats = new GreenEnergyStats
            {
                Community = new CommunityStats
                {
                    Percentage = 68.5,
                    Solar = 45.2,
                    Wind = 15.3,
                    Hydro = 8.0,
                    TotalGreen = 34250,
                    Total = 50000
                },
                User = new UserStats
                {
                    Percentage = 72.3,
                    GreenKWh = 425.5,
                    TotalKWh = 612.8,
                    Rank = 42,
                    TotalUsers = 247,
                    Badge = "Green Leader",
                    BadgeIcon = "⭐"
                }
            };

            return Ok(stats);
        }
    }
}
