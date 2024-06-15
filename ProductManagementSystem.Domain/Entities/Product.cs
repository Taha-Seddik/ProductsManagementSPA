using ProductManagementSystem.Domain.Common;

namespace ProductManagementSystem.Domain.Entities;

public enum EmployeeDepartment
{
    Development,
    Design,
    Testing,
    HR
}

public class Product : BaseEntity
{
    public string Name { get; set; }
    public decimal Price { get; set;}
    public string ISBN { get; set; }
    public string UserId { get; set; }
    public ApplicationUser CreatedBy { get; set; }
    public ApplicationUser UpdatedBy { get; set; }
    public string CategoryId { get; set; }
    public Category Category { get; set; }

}
