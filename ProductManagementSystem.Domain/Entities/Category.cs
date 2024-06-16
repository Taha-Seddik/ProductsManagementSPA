using ProductManagementSystem.Domain.Common;
using System.Text.Json.Serialization;

namespace ProductManagementSystem.Domain.Entities;

public class Category : BaseEntity
{
    public string NameEn { get; set; }
    public string NameAr { get; set; }
    [JsonIgnore] // Add this attribute to avoid circular reference
    public IEnumerable<Product> Products { get; set; }
}
