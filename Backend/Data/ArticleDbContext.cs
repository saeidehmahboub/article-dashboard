using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{ 
    public class ArticleDbContext : DbContext
    {

    
        public ArticleDbContext(DbContextOptions<ArticleDbContext> options)
            : base(options)
        {
        }

        public DbSet<Article> Articles { get; set; }
    
    }
}
