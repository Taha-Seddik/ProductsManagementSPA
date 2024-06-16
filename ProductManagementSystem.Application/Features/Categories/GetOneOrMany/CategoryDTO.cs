
namespace ProductManagementSystem.Application.Features.Categories.GetOneOrMany;


public class CategoryProductDTO
{
    public string Id { get; set; }
    public string Name { get; set; }
}

public class CategoryDTO
{
    public string Id { get; set; }
    public string NameEn { get; set; }
    public string NameAr { get; set; }
}

public class CategoryFilledDTO : CategoryDTO
{
    public IEnumerable<CategoryProductDTO> Products { get; set; }
}
