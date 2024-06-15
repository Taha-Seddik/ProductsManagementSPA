using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using ProductManagementSystem.Domain.Entities;
using ProductManagementSystem.Application.Common.Interfaces;

namespace ProductManagementSystem.Application.Features.Categories.Create;

public class CreateCategoryCommand : IRequest<int>
{
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Password { get; set; }
    public string JobTitle { get; set; }
    public DateTimeOffset JoiningDate { get; set; }
}

public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, int>
{
    private readonly IMapper _mapper;
    private readonly ICategoriesRepository _categorysRepo;
    private readonly UserManager<ApplicationUser> _userManager;

    public CreateCategoryCommandHandler(ICategoriesRepository categorysRepo, IMapper mapper, UserManager<ApplicationUser> userManager)
    {
        _categorysRepo = categorysRepo;
        _mapper = mapper;
        _userManager = userManager;
    }

    public async Task<int> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        throw new InvalidOperationException("Not implemented");
        /*// add user infos
        var newUser = new ApplicationUser
        {
            UserName = request.Email,
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName
        };
        var result = await _userManager.CreateAsync(newUser, request.Password);
        if (!result.Succeeded)
        {
            var msg = string.Join(", ", result.Errors.Select(x => x.Description));
            throw new InvalidOperationException(msg);
        }
        await _userManager.AddToRoleAsync(newUser, "User");

        // create category
        var newCategory = _mapper.Map<Category>(request);
        newCategory.UserId = newUser.Id; // setup userId
        newCategory = await _categorysRepo.AddAsync(newCategory, cancellationToken);

        return newCategory.Id;*/
    }
}

