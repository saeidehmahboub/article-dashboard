using System.Threading.Tasks;
using Xunit;
using Moq;
using FluentAssertions;
using Backend.Services;
using Backend.Interfaces;
using Backend.Models;
using Backend.DTOs;
using System.Collections.Generic;

namespace Backend.Tests.Services
{
    public class ArticleServiceTests
    {
        private readonly ArticleService _articleService;
        private readonly Mock<IArticleRepository> _articleRepositoryMock;

        public ArticleServiceTests()
        {
            _articleRepositoryMock = new Mock<IArticleRepository>();
            _articleService = new ArticleService(_articleRepositoryMock.Object);
        }

        [Fact]
        public async Task GetArticleByIdAsync_ShouldReturnArticle_WhenArticleExists()
        {
            // Arrange
            var articleId = 1;
            var expectedArticle = new Article { Id = articleId, Name = "Test Article" };

            _articleRepositoryMock.Setup(r => r.GetArticleByIdAsync(articleId))
                                  .ReturnsAsync(expectedArticle);

            // Act
            var result = await _articleService.GetArticleByIdAsync(articleId);

            // Assert
            result.Should().NotBeNull();
            result.Id.Should().Be(articleId);
            result.Name.Should().Be(expectedArticle.Name);
        }

        [Fact]
        public async Task GetArticlesAsync_ShouldReturnPaginatedArticles()
        {
            // Arrange
            var paginationDto = new PaginationDto<Article>
            {
                TotalPages = 1,
                Result = new List<Article>
                {
                    new Article { Id = 1, ArticleNumber = 1001, Name = "Article 1", ArticleCategory = "Hub", BicycleCategory = "Road", Material = "Steel", Length = 100, Width = 80, Height = 20, NetWeight = 300 },
                    new Article { Id = 2, ArticleNumber = 1002, Name = "Article 2", ArticleCategory = "Crank", BicycleCategory = "City", Material = "Aluminium", Length = 120, Width = 85, Height = 25, NetWeight = 200 }
                }
            };

            _articleRepositoryMock
                .Setup(repo => repo.GetArticlesAsync( 1, 10))
                .ReturnsAsync(paginationDto);

            // Act
            var result = await _articleService.GetArticlesAsync(1, 10);

            // Assert
            result.Should().NotBeNull();
            result.TotalPages.Should().Be(1);
            result.Result.Count.Should().Be(2);
            result.Result.First().Name.Should().Be("Article 1");
        }

        [Fact]
        public async Task CreateArticleAsync_ShouldReturnCreatedArticle()
        {
            // Arrange
            var articleDto = new CreateArticleDto
            {
                ArticleNumber = 1003,
                Name = "New Article",
                ArticleCategory = "Hub",
                BicycleCategory = "Road",
                Material = "Steel",
                Length = 100,
                Width = 80,
                Height = 20,
                NetWeight = 300
            };

            var expectedArticle = new Article
            {
                Id = 3,
                ArticleNumber = articleDto.ArticleNumber,
                Name = articleDto.Name,
                ArticleCategory = articleDto.ArticleCategory,
                BicycleCategory = articleDto.BicycleCategory,
                Material = articleDto.Material,
                Length = articleDto.Length,
                Width = articleDto.Width,
                Height = articleDto.Height,
                NetWeight = articleDto.NetWeight
            };

            _articleRepositoryMock
                .Setup(repo => repo.CreateArticleAsync(articleDto))
                .ReturnsAsync(expectedArticle);

            // Act
            var result = await _articleService.CreateArticleAsync(articleDto);

            // Assert
            result.Should().NotBeNull();
            result.Id.Should().Be(3);
            result.Name.Should().Be(articleDto.Name);
            result.ArticleNumber.Should().Be(articleDto.ArticleNumber);
        }

        [Fact]
        public async Task UpdateArticleAsync_ShouldReturnTrue_WhenArticleIsUpdated()
        {
            // Arrange
            int articleId = 1;
            var updateDto = new UpdateArticleDto
            {
                Name = "Updated Name",
                ArticleCategory = "Updated Category",
                BicycleCategory = "Updated Bicycle",
                Material = "Updated Material",
                Length = 120,
                Width = 100,
                Height = 30,
                NetWeight = 250
            };

            _articleRepositoryMock
                .Setup(repo => repo.UpdateArticleAsync(articleId, updateDto))
                .ReturnsAsync(true);

            // Act
            var result = await _articleService.UpdateArticleAsync(articleId, updateDto);

            // Assert
            result.Should().BeTrue();
        }

        [Fact]
        public async Task UpdateArticleAsync_ShouldReturnFalse_WhenArticleNotFound()
        {
            // Arrange
            int articleId = 99; 
            var updateDto = new UpdateArticleDto
            {
                Name = "Non-existing Article",
                ArticleCategory = "Hub",
                BicycleCategory = "Road",
                Material = "Aluminium",
                Length = 100,
                Width = 80,
                Height = 20,
                NetWeight = 300
            };

            _articleRepositoryMock
                .Setup(repo => repo.UpdateArticleAsync(articleId, updateDto))
                .ReturnsAsync(false);

            // Act
            var result = await _articleService.UpdateArticleAsync(articleId, updateDto);

            // Assert
            result.Should().BeFalse();
        }

        [Fact]
        public async Task ArticleExistsAsync_ShouldReturnTrue_WhenArticleExists()
        {
            // Arrange
            int articleNumber = 100291;

            _articleRepositoryMock
                .Setup(repo => repo.ArticleExistsAsync(articleNumber))
                .ReturnsAsync(true);

            // Act
            var result = await _articleService.ArticleExistsAsync(articleNumber);

            // Assert
            result.Should().BeTrue();
        }

        [Fact]
        public async Task ArticleExistsAsync_ShouldReturnFalse_WhenArticleDoesNotExist()
        {
            // Arrange
            int articleNumber = 999999;

            _articleRepositoryMock
                .Setup(repo => repo.ArticleExistsAsync(articleNumber))
                .ReturnsAsync(false);

            // Act
            var result = await _articleService.ArticleExistsAsync(articleNumber);

            // Assert
            result.Should().BeFalse();
        }

    } 
}
