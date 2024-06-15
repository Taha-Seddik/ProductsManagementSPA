using Microsoft.AspNetCore.Identity;

namespace ProductManagementSystem.Domain.Entities;

public class ApplicationUser : IdentityUser
{
    // Add your custom properties here
    public string FirstName { get; set; }
    public string LastName { get; set; }
   
}
