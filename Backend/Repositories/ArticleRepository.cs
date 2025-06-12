using System;
using Backend.Data;
using Backend.DTOs;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly ArticleDbContext _context;

        public ArticleRepository(ArticleDbContext context)
        {
            _context = context;
        }

        public async Task<bool> ArticleExistsAsync(int articleNumber)
        {
             return await _context.Articles.AnyAsync(a => a.ArticleNumber == articleNumber);
        }

        public async Task<Article> CreateArticleAsync(CreateArticleDto article)
        {
            var newArticle = new Article
            {
                ArticleNumber = article.ArticleNumber,
                Name = article.Name,
                ArticleCategory = article.ArticleCategory,
                BicycleCategory = article.BicycleCategory,
                Material = article.Material,
                Length = article.Length,
                Width = article.Width,
                Height = article.Height,
                NetWeight = article.NetWeight
            };
            
            _context.Articles.Add(newArticle);
            await _context.SaveChangesAsync();
            return newArticle;
        }

        public async Task<Article> GetArticleByIdAsync(int id)
        {
            var article = await _context.Articles.FirstOrDefaultAsync(a => a.Id == id);
            if (article == null)
            {
                throw new KeyNotFoundException($"Article with ID {id} not found.");
            }
            return article;
        }

        public async Task<PaginationDto<Article>> GetArticlesAsync(int pageNumber, int pageSize)
        {
            var totalCount = await _context.Articles.CountAsync();
            var totalPages = (int)Math.Ceiling((decimal)totalCount / pageSize);

            var articles = await _context.Articles
                .OrderBy(p => p.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PaginationDto<Article>
            {
                TotalPages = totalPages,
                Result = articles
            };
        }

        public async Task<bool> UpdateArticleAsync(int id, UpdateArticleDto dto)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null) return false;

            article.Name = dto.Name;
            article.ArticleCategory = dto.ArticleCategory;
            article.BicycleCategory = dto.BicycleCategory;
            article.Material = dto.Material;
            article.Length = dto.Length;
            article.Width = dto.Width;
            article.Height = dto.Height;
            article.NetWeight = dto.NetWeight;

            _context.Articles.Update(article);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}


