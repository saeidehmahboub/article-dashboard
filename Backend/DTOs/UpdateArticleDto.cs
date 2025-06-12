using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public class UpdateArticleDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string ArticleCategory { get; set; }
        [Required]
        public string BicycleCategory { get; set; }
        [Required]
        public string Material { get; set; }
        [Required]
        public int Length { get; set; }
        [Required]
        public int Width { get; set; }
        [Required]
        public int Height { get; set; }
        [Required]
        public int NetWeight { get; set; }
    }

}

