
namespace ProductManagementSystem.Application.Features.Products.GetOneOrMany
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string JobTitle { get; set; }
        public DateTimeOffset JoiningDate { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
}
