using System;
using Backend.DTOs;
using Backend.Interfaces;
using Backend.Models;

namespace Backend.Services
{
    public class ArticleService : IArticleService
    {
        private readonly IArticleRepository _articleRepository;

        public ArticleService(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<PaginationDto<Article>> GetArticlesAsync(int pageNumber, int pageSize)
        {
            return await _articleRepository.GetArticlesAsync(pageNumber, pageSize);
        }

        public async Task<Article> GetArticleByIdAsync(int id)
        {
            return await _articleRepository.GetArticleByIdAsync(id);
        }

        public async Task<Article> CreateArticleAsync(CreateArticleDto articleDto)
        {
            return await _articleRepository.CreateArticleAsync(articleDto);
        }

        public async Task<bool> UpdateArticleAsync(int id, UpdateArticleDto dto)
        {
            return await _articleRepository.UpdateArticleAsync(id, dto);
        }

        public async Task<bool> ArticleExistsAsync(int articleNumber)
        {
            return await _articleRepository.ArticleExistsAsync(articleNumber);
        }
    }
}


