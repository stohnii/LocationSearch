using LocationSearch.Domain.Interfaces;
using LocationSearch.Domain.Repository;
using Ninject;
using System;
using System.Web.Mvc;
using System.Web.Routing;

namespace LocationSearch.DI
{
    public class DiControllerFactory : DefaultControllerFactory
    {
        private readonly IKernel _kernel;

        public DiControllerFactory()
        {
            _kernel = new StandardKernel();
            AddBindings();
        }

        protected override IController GetControllerInstance(RequestContext requestContext, Type controllerType)
        {
            return controllerType == null ? null : (IController) _kernel.Get(controllerType);
        }

        private void AddBindings()
        {
            _kernel.Bind<ILocationsRepository>().To<LocationsRepository>();
        }
    }
}