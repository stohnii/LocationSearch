﻿
namespace LocationSearch.Domain.Entities
{
    public class Location
    {
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public int? ParentLocationId { get; set; }
    }
}
