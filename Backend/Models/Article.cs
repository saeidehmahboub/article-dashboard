using System;

namespace Backend.Models
{
    public class Article
    {
        public int Id { get; set; }
        public int ArticleNumber { get; set; }
        public string Name { get; set; }
        public string ArticleCategory { get; set; }
        public string BicycleCategory { get; set; }
        public string Material { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int NetWeight { get; set; }
    }
}