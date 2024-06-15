using ProductManagementSystem.Domain.Common;

namespace ProductManagementSystem.Domain.Entities;

public class Category : BaseEntity
{
    public string NameEn { get; set; }
    public string NameAr { get; set; }
    public IEnumerable<Product> Products { get; set; }
}
