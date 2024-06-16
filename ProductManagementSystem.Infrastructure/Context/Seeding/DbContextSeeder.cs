using ProductManagementSystem.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ProductManagementSystem.Infrastructure.Context.Seeding;

public class DbContextSeeder: IDbContextSeeder
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private HashSet<string> CategoriesIds = new HashSet<string>();

    public DbContextSeeder(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
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
        if (!dbContext.Products.Any())
        {
            // filled during creation of categories
            if(CategoriesIds.Any())
            {
                await SeedProductsAsync(dbContext, CategoriesIds);
            }
            else
            {
                var currentCategories = await dbContext.Categories.ToListAsync();
                var categsSet = currentCategories.Select(x => x.Id).ToHashSet();
                await SeedProductsAsync(dbContext, categsSet);
            }
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
            CategoriesIds.Add(x.Id);
            dbContext.Categories.Add(x);
            await dbContext.SaveChangesAsync();
        }
    }

    private async Task SeedProductsAsync(ApplicationDbContext dbContext, HashSet<string> categoriesIds)
    {
        try
        {
            var categsArr = categoriesIds.ToArray();
            var initialProducts = new List<Product>()
            {
                new Product()
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "DELL Gaming Laptop",
                    ISBN = "978-3-16-148410-0",
                    Price = 3500.99m,
                    CategoryId = categsArr[0],
                    UserId = ""
                },
                new Product()
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "MSI Gaming Laptop",
                    ISBN = "978-1-56619-909-4",
                    Price = 4500.99m,
                    CategoryId = categsArr[0],
                    UserId = ""
                },
                new Product()
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Xiomi",
                    ISBN = "978-0-521-85033-2",
                    Price = 650,
                    CategoryId = categsArr[1],
                    UserId = ""
                },
                new Product()
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = "Table",
                    ISBN = "978-3-16-148910-0",
                    Price = 750.30m,
                    CategoryId = categsArr[2],
                    UserId = ""
                }
            };
            foreach (var x in initialProducts)
            {
                dbContext.Products.Add(x);

                await dbContext.SaveChangesAsync();
            }
        }
        catch (Exception)
        {
            throw;
        }
        
    }
}
