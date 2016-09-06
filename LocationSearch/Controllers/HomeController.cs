using LocationSearch.Domain.Entities;
using LocationSearch.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LocationSearch.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILocationsRepository _locationsRepository;
        private List<Location> _locations;

        public HomeController(ILocationsRepository locationsRepository)
        {
            _locationsRepository = locationsRepository;
        }

        public JsonResult Get()
        {
            var model = _locationsRepository.GetLocations();
            return new JsonResult { Data = model, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public ActionResult Index()
        {
            _locations = _locationsRepository.GetLocations().ToList();
            
            List<Location> result = new List<Location>();
            SearchLocationsByParentId(result, 1);
            
            result = new List<Location>();
            SearchLocationsByParentId(result, 2);

            result = new List<Location>();
            SearchLocationsByParentId(result, 11);

            result = new List<Location>();
            SearchLocationsByParentId(result, 12);

            result = new List<Location>();
            SearchLocationsByParentId(result, 112);
            return View();
        }

        private List<Location> SearchLocationsByParentId(List<Location> result, int id)
        {
            for (var i = 0; i < _locations.Count; i++)
            {
                if (_locations[i].ParentLocationId == id)
                {
                    if (GetChildrenCount(_locations[i].LocationId) == 0)
                    {
                        result.Add(_locations[i]);
                    }
                    else
                    {
                        SearchLocationsByParentId(result, _locations[i].LocationId);
                    }
                }
                else if (_locations[i].LocationId == id && GetChildrenCount(_locations[i].LocationId) == 0)
                {
                    result.Add(_locations[i]);
                }
            }

            return result;
        }

        private int GetChildrenCount(int id)
        {
            int result = 0;

            for (var i = 0; i < _locations.Count; i++)
            {
                if (_locations[i].ParentLocationId == id)
                {
                    result++;
                }
            }

            return result;
        }
    }
}
