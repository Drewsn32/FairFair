using App.BusinessServices.Common;
using App.NewFairFair;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace App.Resolver
{
    public static class DependencyResolver
    {
        public static IServiceCollection AddCustomServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IAccountServices, AccountServices>();
            services.AddScoped<IServiceFairFair>(_ => new ServiceFairFair(string.Empty));

            return services;
        }
    }
}
