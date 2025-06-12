using System;
using Backend.DTOs;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface IArticleService
    {
        Task<PaginationDto<Article>> GetArticlesAsync(int pageNumber, int pageSize);
        Task<Article> GetArticleByIdAsync(int id);
        Task<Article> CreateArticleAsync(CreateArticleDto articleDto);
        Task<bool> UpdateArticleAsync(int id, UpdateArticleDto dto);
        Task<bool> ArticleExistsAsync(int articleNumber);
    }
}
