﻿
namespace ProductManagementSystem.Application.Features.Categories.GetOneOrMany
{
    public class CategoryDTO
    {
        public int Id { get; set; }
        public string JobTitle { get; set; }
        public DateTimeOffset JoiningDate { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
}