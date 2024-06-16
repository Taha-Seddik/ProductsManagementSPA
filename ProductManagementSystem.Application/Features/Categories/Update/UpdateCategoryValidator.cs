using FluentValidation;
using ProductManagementSystem.Application.Common.Interfaces;

namespace ProductManagementSystem.Application.Features.Categories.Update;

public class UpdateCategoryValidator : AbstractValidator<UpdateCategoryCommand>
{
    private readonly ICategoriesRepository _categoriesRepo;

    public UpdateCategoryValidator(ICategoriesRepository categoriesRepo)
    {
        _categoriesRepo = categoriesRepo;

        RuleFor(v => v.CategoryId)
          .NotEmpty().WithMessage("CategoryId is required.")
          .MustAsync(CategoryShouldExists).WithMessage("The specified Category Id should exists.");

        RuleFor(model => model.NameEn)
           .NotEmpty().WithMessage("NameEn is required.");

        RuleFor(model => model.NameAr)
           .NotEmpty().WithMessage("NameAr is required.");
    }

    public async Task<bool> CategoryShouldExists(string cId, CancellationToken cancellationToken)
    {
        return await _categoriesRepo.GetByIdAsync(cId, cancellationToken) != null;
    }
}
