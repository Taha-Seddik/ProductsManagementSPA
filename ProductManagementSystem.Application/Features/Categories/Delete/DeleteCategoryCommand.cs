using MediatR;
using ProductManagementSystem.Application.Common.Interfaces;

namespace ProductManagementSystem.Application.Features.Categories.Delete;

public class DeleteCategoryCommand : IRequest
{
    public string CategoryId { get; set; }
}

public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand>
{
    private readonly ICategoriesRepository _categorysRepo;

    public DeleteCategoryCommandHandler(ICategoriesRepository categorysRepo)
    {
        _categorysRepo = categorysRepo;
    }

    public async Task Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
    {
        var entity = await _categorysRepo.GetByIdAsync(request.CategoryId, cancellationToken);
        await _categorysRepo.DeleteAsync(entity!, cancellationToken);
    }
}