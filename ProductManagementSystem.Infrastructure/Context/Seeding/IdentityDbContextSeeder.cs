using ProductManagementSystem.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace ProductManagementSystem.Infrastructure.Context.Seeding;

public class IdentityDbContextSeeder: IDbContextSeeder
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public IdentityDbContextSeeder(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task SeedAsync(ApplicationDbContext dbContext)
    {
        if (!dbContext.Roles.Any())
        {
            await SeedRolesAsync();
        }
        if (!_userManager.Users.Any())
        {
            await SeedUsersAsync(dbContext);
        }
        if(!dbContext.Categories.Any())
        {
            await SeedCategoriesAsync(dbContext);
        }
    }

    private async Task SeedRolesAsync()
    {
        var roles = new[] { "Admin", "User" };

        foreach (var role in roles)
        {
            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new IdentityRole(role));
            }
        }
    }

    private async Task SeedUsersAsync(ApplicationDbContext dbContext)
    {
        var initialUsers = new[]
       {
            new ApplicationUser
            {
                UserName = "john.doe@example.com",
                Email = "john.doe@example.com",
                FirstName = "John",
                LastName = "Doe"
            },
            new ApplicationUser
            {
                UserName = "jane.smith@example.com",
                Email = "jane.smith@example.com",
                FirstName = "Jane",
                LastName = "Smith"
            },
            new ApplicationUser
            {
                UserName = "bob.jones@example.com",
                Email = "bob.jones@example.com",
                FirstName = "Bob",
                LastName = "Jones"
            },
            new ApplicationUser
            {
                UserName = "alice.rodriguez@example.com",
                Email = "alice.rodriguez@example.com",
                FirstName = "Alice",
                LastName = "Rodriguez"
            },
            new ApplicationUser
            {
                UserName = "samuel.white@example.com",
                Email = "samuel.white@example.com",
                FirstName = "Samuel",
                LastName = "White"
            },
            new ApplicationUser
            {
                UserName = "lisa.miller@example.com",
                Email = "lisa.miller@example.com",
                FirstName = "Lisa",
                LastName = "Miller"
            },
            new ApplicationUser
            {
                UserName = "michael.clark@example.com",
                Email = "michael.clark@example.com",
                FirstName = "Michael",
                LastName = "Clark"
            },
            new ApplicationUser
            {
                UserName = "emily.carter@example.com",
                Email = "emily.carter@example.com",
                FirstName = "Emily",
                LastName = "Carter"
            },
            new ApplicationUser
            {
                UserName = "david.brown@example.com",
                Email = "david.brown@example.com",
                FirstName = "David",
                LastName = "Brown"
            },
            new ApplicationUser
            {
                UserName = "olivia.martin@example.com",
                Email = "olivia.martin@example.com",
                FirstName = "Olivia",
                LastName = "Martin"
            },
        };

        foreach (var user in initialUsers)
        {
            if (_userManager.Users.All(u => u.UserName != user.UserName))
            {
                await _userManager.CreateAsync(user, "NicePwd991!");

                // Assign the user to a role if needed
                await _userManager.AddToRoleAsync(user, "User");
            }
        }

        // Seed Admin
        var admin = new ApplicationUser
        {
            UserName = "system.Admin@example.com",
            Email = "system.Admin@example.com",
            FirstName = "Taha",
            LastName = "Seddik"
        };
        await _userManager.CreateAsync(admin, "NicePwd991!");
        await _userManager.AddToRoleAsync(admin, "Admin");
    }

    private async Task SeedCategoriesAsync(ApplicationDbContext dbContext)
    {
        var initalCategories = new List<Category>()
        {
            new Category()
            {
                Id = Guid.NewGuid().ToString(),
                NameAr = "إلكرتونيات",
                NameEn = "Electronics",
            },
            new Category()
            {
                Id = Guid.NewGuid().ToString(),
                NameAr = "هواتف",
                NameEn = "Smparphones",
            },
            new Category()
            {
                Id = Guid.NewGuid().ToString(),
                NameAr = "أثاث",
                NameEn = "Furnitures",
            }
        };

        foreach (var x in initalCategories)
        {
            dbContext.Categories.Add(x);
            await dbContext.SaveChangesAsync();
        }
    }
}
