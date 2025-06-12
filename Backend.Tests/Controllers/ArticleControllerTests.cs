using Xunit;
using Moq;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Backend.Controllers;
using Backend.Interfaces;
using Backend.Models;
using Backend.DTOs;

namespace Backend.Tests.Controllers
{
    public class ArticleControllerTests
    {
        private readonly ArticleController _controller;
        private readonly Mock<IArticleService> _articleServiceMock;

        public ArticleControllerTests()
        {
            _articleServiceMock = new Mock<IArticleService>();
            _controller = new ArticleController(_articleServiceMock.Object);
        }

        [Fact]
        public async Task GetArticleByIdAsync_ShouldReturnOk_WhenArticleExists()
        {
            // Arrange
            var articleId = 1;
            var expectedArticle = new Article
            {
                Id = articleId,
                Name = "Test Article",
                ArticleNumber = 12345
            };

            _articleServiceMock
                .Setup(service => service.GetArticleByIdAsync(articleId))
                .ReturnsAsync(expectedArticle);

            // Act
            var result = await _controller.GetArticleByIdAsync(articleId);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult!.Value.Should().BeEquivalentTo(expectedArticle);
        }

        [Fact]
        public async Task GetArticleByIdAsync_ShouldReturnNotFound_WhenArticleDoesNotExist()
        {
            // Arrange
            var articleId = 99;

            _articleServiceMock
                .Setup(service => service.GetArticleByIdAsync(articleId))
                .ThrowsAsync(new KeyNotFoundException());

            // Act
            var result = await _controller.GetArticleByIdAsync(articleId);

            // Assert
            result.Should().BeOfType<NotFoundObjectResult>();
        }

        [Fact]
        public async Task GetArticlesAsync_ShouldReturnOk_WhenArticlesExist()
        {
            // Arrange
            var paginationDto = new PaginationDto<Article>
            {
                TotalPages = 1,
                Result = new List<Article>
                {
                    new Article { Id = 1, Name = "Article 1", ArticleNumber = 1001 },
                    new Article { Id = 2, Name = "Article 2", ArticleNumber = 1002 }
                }
            };

            _articleServiceMock
                .Setup(service => service.GetArticlesAsync(1, 10))
                .ReturnsAsync(paginationDto);

            // Act
            var result = await _controller.GetArticlesAsync(1, 10);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult!.Value.Should().BeEquivalentTo(paginationDto);
        }

        [Fact]
        public async Task GetArticlesAsync_ShouldReturnNotFound_WhenNoArticlesExist()
        {
            // Arrange
            var paginationDto = new PaginationDto<Article>
            {
                TotalPages = 0,
                Result = new List<Article>()
            };

            _articleServiceMock
                .Setup(service => service.GetArticlesAsync(1, 10))
                .ReturnsAsync(paginationDto);

            // Act
            var result = await _controller.GetArticlesAsync( 1, 10);

            // Assert
            result.Should().BeOfType<NotFoundObjectResult>();
        }

        [Fact]
        public async Task CreateArticleAsync_ShouldReturnCreated_WhenArticleIsValid()
        {
            // Arrange
            var articleDto = new CreateArticleDto
            {
                ArticleNumber = 1005,
                Name = "New Article",
                ArticleCategory = "Hub",
                BicycleCategory = "Road",
                Material = "Steel",
                Length = 100,
                Width = 80,
                Height = 20,
                NetWeight = 300
            };

            var createdArticle = new Article
            {
                Id = 5,
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

            _articleServiceMock
                .Setup(service => service.ArticleExistsAsync(articleDto.ArticleNumber))
                .ReturnsAsync(false);

            _articleServiceMock
                .Setup(service => service.CreateArticleAsync(articleDto))
                .ReturnsAsync(createdArticle);

            // Act
            var result = await _controller.CreateArticleAsync(articleDto);

            // Assert
            result.Should().BeOfType<CreatedAtRouteResult>();
            var createdResult = result as CreatedAtRouteResult;
            createdResult!.Value.Should().BeEquivalentTo(createdArticle);
        }

        [Fact]
        public async Task CreateArticleAsync_ShouldReturnConflict_WhenArticleNumberExists()
        {
            // Arrange
            var articleDto = new CreateArticleDto
            {
                ArticleNumber = 1005,
                Name = "Duplicate Article"
            };

            _articleServiceMock
                .Setup(service => service.ArticleExistsAsync(articleDto.ArticleNumber))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.CreateArticleAsync(articleDto);

            // Assert
            result.Should().BeOfType<ConflictObjectResult>();
        }

        [Fact]
        public async Task UpdateArticleAsync_ShouldReturnNoContent_WhenUpdateIsSuccessful()
        {
            // Arrange
            int articleId = 1;
            var updateDto = new UpdateArticleDto
            {
                Name = "Updated Article",
                ArticleCategory = "Updated Category",
                BicycleCategory = "Updated Bicycle",
                Material = "Updated Material",
                Length = 120,
                Width = 100,
                Height = 30,
                NetWeight = 250
            };

            _articleServiceMock
                .Setup(service => service.UpdateArticleAsync(articleId, updateDto))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.UpdateArticleAsync(articleId, updateDto);

            // Assert
            result.Should().BeOfType<NoContentResult>();
        }

        [Fact]
        public async Task UpdateArticleAsync_ShouldReturnNotFound_WhenArticleDoesNotExist()
        {
            // Arrange
            int articleId = 99;
            var updateDto = new UpdateArticleDto
            {
                Name = "Non-existent Article"
            };

            _articleServiceMock
                .Setup(service => service.UpdateArticleAsync(articleId, updateDto))
                .ReturnsAsync(false);

            // Act
            var result = await _controller.UpdateArticleAsync(articleId, updateDto);

            // Assert
            result.Should().BeOfType<NotFoundObjectResult>();
        }
    }
}
