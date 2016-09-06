using LocationSearch.Domain.Entities;
using LocationSearch.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Xml.Serialization;

namespace LocationSearch.Domain.Repository
{
    /// <summary>
    /// Realisation of ILocationsRepository interface which works with xml storage;
    /// XML is stored in App_Data folder from LocationSearch web project
    /// </summary>
    public class LocationsRepository : ILocationsRepository
    {
        private readonly string _repositoryFileName = @"App_Data\locationsData.xml";
        private readonly string _dataPath;

        public LocationsRepository()
        {
            _dataPath = String.Concat(AppDomain.CurrentDomain.BaseDirectory, _repositoryFileName);
        }

        public IEnumerable<Location> GetLocations()
        {
            XmlSerializer serializer = new XmlSerializer(typeof(List<Location>));
            using (var stream = new FileStream(_dataPath, FileMode.Open))
            {
                var result = serializer.Deserialize(stream);
                return (List<Location>)result;
            }
        }
    }
}
