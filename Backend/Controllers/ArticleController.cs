using Backend.DTOs;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService _articleService;
        public ArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        /// <summary>
        /// Retrieves a paginated list of articles with optional filtering.
        /// </summary>
        /// <param name="pageNumber">Page number (default 1).</param>
        /// <param name="pageSize">Page size (default 10).</param>
        /// <returns>Paginated list of articles.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PaginationDto<Article>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetArticlesAsync([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var articles = await _articleService.GetArticlesAsync(pageNumber, pageSize);

            if (articles == null || !articles.Result.Any())
                return NotFound("No articles found.");

            return Ok(articles);
        }

        /// <summary>
        /// Retrieves a single article by its ID.
        /// </summary>
        /// <param name="id">The ID of the article.</param>
        /// <returns>The requested article if found.</returns>
        [HttpGet("{id}", Name = "GetArticleById")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Article))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetArticleByIdAsync(int id)
        {
            if (id <= 0)
                return BadRequest("Invalid article ID.");

            try
            {
                var article = await _articleService.GetArticleByIdAsync(id);
                return Ok(article);
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Article with ID {id} not found.");
            }
        }

        /// <summary>
        /// Creates a new article.
        /// </summary>
        /// <param name="articleDto">The article data to create.</param>
        /// <returns>The created article.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Article))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> CreateArticleAsync([FromBody] CreateArticleDto articleDto)
        {
            if (articleDto == null)
                return BadRequest("Article data is null.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (await _articleService.ArticleExistsAsync(articleDto.ArticleNumber))
                return Conflict($"Article with ArticleNumber {articleDto.ArticleNumber} already exists.");


            var createdArticle = await _articleService.CreateArticleAsync(articleDto);
            return CreatedAtRoute("GetArticleById", new { id = createdArticle.Id }, createdArticle);
        }

        /// <summary>
        /// Updates an existing article by its ID.
        /// </summary>
        /// <param name="id">The ID of the article to update.</param>
        /// <param name="dto">The updated article data.</param>
        /// <returns>No content if update is successful, or not found if the article does not exist.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateArticleAsync(int id, [FromBody] UpdateArticleDto dto)
        {
            if (id <= 0 || !ModelState.IsValid)
                return BadRequest("Invalid article ID or data.");

            var updated = await _articleService.UpdateArticleAsync(id, dto);
            if (!updated)
                return NotFound($"Article with ID {id} not found.");

            return NoContent();
        }
    }
}


