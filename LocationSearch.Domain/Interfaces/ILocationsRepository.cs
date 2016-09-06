using LocationSearch.Domain.Entities;
using System.Collections.Generic;

namespace LocationSearch.Domain.Interfaces
{
    public interface ILocationsRepository
    {
        IEnumerable<Location> GetLocations();
    }
}
