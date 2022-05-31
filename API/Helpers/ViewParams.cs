namespace API.Helpers
{
    public class ViewParams : PaginationParams
    {
        public int UserId { get; set; }
        public string Predicate { get; set; }
        public string OrderBy { get; set; } = "LastVisit";
    }
}