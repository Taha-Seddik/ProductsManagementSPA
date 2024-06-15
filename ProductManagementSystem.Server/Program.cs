using ProductManagementSystem.Infrastructure;
using ProductManagementSystem.Application;
using ProductManagementSystem.Server.Middlewares;
using ProductManagementSystem.Infrastructure.Context.Seeding;
using ProductManagementSystem.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// configure Application services 
builder.Services.RegisterApplicationLayerServices(builder.Configuration);

// configure infrastructure services
builder.Services.ConfigureInfrastructure(builder.Configuration);

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// exception middleware
app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Run migrations on start
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ApplicationDbContext>();
    context.Database.Migrate();

    // Seed the data
    var dbInitializer = scope.ServiceProvider.GetRequiredService<IDbContextSeeder>();
    dbInitializer.SeedAsync(context).Wait();
}

app.MapFallbackToFile("/index.html");

app.Run();
