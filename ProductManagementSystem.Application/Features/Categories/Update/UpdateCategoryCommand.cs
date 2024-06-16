using MediatR;
using Microsoft.AspNetCore.Identity;
using ProductManagementSystem.Application.Common.Interfaces;
using ProductManagementSystem.Domain.Entities;

namespace ProductManagementSystem.Application.Features.Categories.Update;

public class UpdateCategoryCommand : IRequest
{
    public string CategoryId { get; set; }
    public string NameEn { get; set; }
    public string NameAr { get; set; }
}

public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand>
{
    private readonly ICategoriesRepository _categoriesRepo;

    public UpdateCategoryCommandHandler(ICategoriesRepository categoriesRepo)
    {
        _categoriesRepo = categoriesRepo;
    }

    public async Task Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        // Update categ infos
        var entity = await _categoriesRepo.GetByIdAsync(request.CategoryId, cancellationToken);
        if (entity == null)
        {
            throw new InvalidOperationException("Category not found");
        }
        await _categoriesRepo.UpdateAsync(entity, cancellationToken);
    }
}