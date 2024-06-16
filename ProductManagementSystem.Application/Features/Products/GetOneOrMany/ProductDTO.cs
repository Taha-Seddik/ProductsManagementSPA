
using ProductManagementSystem.Domain.Entities;

namespace ProductManagementSystem.Application.Features.Products.GetOneOrMany
{
    public class ProductDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string ISBN { get; set; }
        public Category Category { get; set; }
    }
}
