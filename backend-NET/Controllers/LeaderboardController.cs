
using backend_NET.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace backend_NET.Controllers
{
    [ApiController]
    [Route("api/leaderboard")]
    public class LeaderboardController : ControllerBase
    {
        private readonly AppDbContext _db;

        public LeaderboardController(AppDbContext db)
        {
            _db = db;
        }
        private async Task<List<HouseholdEntry>> BuildRankedList()
        {
           
            var allReadings = await _db.MeterReadings
                .Where(m => m.Status == Status.VERIFIED)
                .Include(m => m.User)
                .ToListAsync();

            var latestReadings = allReadings
                .GroupBy(m => m.User.Id)
                .Select(g => g.OrderByDescending(m => m.Time).First())
                .ToList();

           
            var ranked = latestReadings
                .Where(m => m.User != null && m.HouseholdSize > 0)
                .Select(m => new HouseholdEntry
                {
                    HouseholdId = m.User.Id,
                    UserName = m.User!.FullName,
                    PostalCode = m.User.PostalCode ?? 0,
                    Value = m.Value,
                    HouseholdSize = m.HouseholdSize,
                    EnergyPerPerson = Math.Round(m.Value / m.HouseholdSize, 2)
                })
                .OrderBy(h => h.EnergyPerPerson)
                .ToList();

            for (int i = 0; i < ranked.Count; i++)
                ranked[i].Rank = i + 1;

            return ranked;
        }

        // GET /api/leaderboard
        [HttpGet]
        public async Task<IActionResult> GetLeaderboard()
        {
            var ranked = await BuildRankedList();

            double communityAverage = ranked.Any()
                ? Math.Round(ranked.Average(h => h.EnergyPerPerson), 2)
                : 0;

            return Ok(new LeaderboardResponse
            {
                TopHouseholds = ranked.Take(50).ToList(),
                CommunityAverage = communityAverage
            });
        }

        // GET /api/leaderboard/user/userId
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserRank(Guid userId)
        {
            var ranked = await BuildRankedList();

            var user = ranked.FirstOrDefault(h => h.HouseholdId == userId);
            if (user == null)
                return NotFound(new { message = "User not found or has no approved readings." });

            double communityAverage = ranked.Any()
                ? Math.Round(ranked.Average(h => h.EnergyPerPerson), 2)
                : 0;

            return Ok(new UserRankResponse
            {
                Rank = user.Rank,
                IsInTopFifty = user.Rank <= 50,
                IsBelowCommunityAverage = user.EnergyPerPerson <= communityAverage,
                EnergyPerPerson = user.EnergyPerPerson,
                CommunityAverage = communityAverage,
                HouseholdData = user
            });
        }
    }
}