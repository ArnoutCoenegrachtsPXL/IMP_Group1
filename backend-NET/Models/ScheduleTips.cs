namespace backend_NET.Models
{

    public class ScheduleTips
    {
        public string TimeFrom { get; set; } = "08:00";
        public string TimeTo { get; set; } = "22:00";
    }

    public class PersonalisedTip
    {
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string Category { get; set; } = "";
        public string Impact { get; set; } = "";
        public string Icon { get; set; } = "";
        public string TimeLabel { get; set; } = "";
        public string Saving { get; set; } = "";
    }

    public class ScheduleResponse
    {
        public string ScheduleSummary { get; set; } = "";
        public string PotentialSaving { get; set; } = "";
        public int TipCount { get; set; }
        public List<PersonalisedTip> Tips { get; set; } = new();
    }




    //public class ScheduleTips
    //{
    //    public int MorningFrom { get; set; }   // e.g. 6
    //    public int MorningTo { get; set; }     // e.g. 9
    //    public int EveningFrom { get; set; }   // e.g. 18
    //    public int EveningTo { get; set; }     // e.g. 22
    //}

    //public class ScheduledTip
    //{
    //    public string Title { get; set; }
    //    public string Message { get; set; }
    //    public string Icon { get; set; }
    //    public string Badge { get; set; }       // "Act now", "Peak Alert", "Later today"
    //    public string BadgeType { get; set; }   // "now", "peak", "later"
    //    public string Saving { get; set; }      // "Saves R4.50 today"
    //    public string SavingIcon { get; set; }  // "payments" or "trending_up"
    //    public string ActionLabel { get; set; } // "Remind me" or "Plan for 8:15pm"
    //    public string Section { get; set; }     // "now" or "later"
    //}

    //public class ScheduleResponse
    //{
    //    public string ScheduleSummary { get; set; }
    //    public int ActNowCount { get; set; }
    //    public int LaterTodayCount { get; set; }
    //    public string PotentialSaving { get; set; }
    //    public List<ScheduledTip> NowTips { get; set; }
    //    public List<ScheduledTip> LaterTips { get; set; }
    //}
}
