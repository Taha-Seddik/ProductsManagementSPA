using ProductManagementSystem.Application.Common.Interfaces;
using ProductManagementSystem.Infrastructure.Context;
using ProductManagementSystem.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using ProductManagementSystem.Domain.Entities;
using ProductManagementSystem.Infrastructure.Context.Seeding;
using System;

namespace ProductManagementSystem.Infrastructure;

public static class ConfigureServices
{
    public static void ConfigureInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped<IProductsRepository, ProductsRepository>();
        services.AddScoped<ICategoriesRepository, CategoriesRepository>();

        var zut = configuration.GetConnectionString("SQLDatabase");

        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString("SQLDatabase"));
        });

        ConfigureIdentity(services);

        // Register IDbContextSeeder
        services.AddScoped<IDbContextSeeder, IdentityDbContextSeeder>();
    }

    private static void ConfigureIdentity(IServiceCollection services)
    {
        services.AddIdentity<ApplicationUser, IdentityRole>(options =>
        {
            options.Password.RequireDigit = true;
            options.Password.RequiredLength = 8;
            options.Password.RequiredUniqueChars = 1;
            options.Password.RequireLowercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
        })
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddDefaultTokenProviders();
    }


}