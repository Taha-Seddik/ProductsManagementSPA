using FluentValidation;
using ProductManagementSystem.Application.Common.Interfaces;

namespace ProductManagementSystem.Application.Features.Categories.Delete;

public class DeleteCategoryValidator : AbstractValidator<DeleteCategoryCommand>
{
    private readonly ICategoriesRepository _categorysRepo;

    public DeleteCategoryValidator(ICategoriesRepository categorysRepo)
    {
        _categorysRepo = categorysRepo;

        RuleFor(v => v.CategoryId)
            .NotEmpty().WithMessage("CategoryId is required.")
            .MustAsync(CategoryShouldExists).WithMessage("The specified Category Id should exists.");
    }

    public async Task<bool> CategoryShouldExists(string categId, CancellationToken cancellationToken)
    {
        return await _categorysRepo.GetByIdAsync(categId, cancellationToken) != null;
    }
}