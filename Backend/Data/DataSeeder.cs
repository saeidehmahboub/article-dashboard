using System;
using Backend.Models;

namespace Backend.Data
{
    public class DataSeeder
    {
        public static void SeedArticles(ArticleDbContext dbContext)
        {
            if (dbContext.Articles.Any())
                return;

            dbContext.Articles.AddRange(
                new Article
                {
                    ArticleNumber = 100291,
                    Name = "e-Cargo bike hub speed 10x",
                    ArticleCategory = "Hub",
                    BicycleCategory = "e-Cargo bike",
                    Material = "Aluminium",
                    Length = 110,
                    Width = 100,
                    Height = 20,
                    NetWeight = 210
                },
                new Article
                {
                    ArticleNumber = 100292,
                    Name = "Road hub flex",
                    ArticleCategory = "Hub",
                    BicycleCategory = "Road",
                    Material = "Steel",
                    Length = 100,
                    Width = 90,
                    Height = 20,
                    NetWeight = 300
                },
                new Article
                {
                    ArticleNumber = 100293,
                    Name = "Gravel hub speed pro",
                    ArticleCategory = "Hub",
                    BicycleCategory = "Gravel",
                    Material = "Alloy",
                    Length = 90,
                    Width = 80,
                    Height = 30,
                    NetWeight = 120
                },
                new Article
                {
                    ArticleNumber = 100294,
                    Name = "e-Trekking hub speed flex",
                    ArticleCategory = "Hub",
                    BicycleCategory = "e-Trekking",
                    Material = "Carbon",
                    Length = 130,
                    Width = 80,
                    Height = 20,
                    NetWeight = 200
                },
                new Article
                {
                    ArticleNumber = 100295,
                    Name = "e-City cranks vario",
                    ArticleCategory = "Crank arm",
                    BicycleCategory = "e-City",
                    Material = "Aluminium",
                    Length = 170,
                    Width = 10,
                    Height = 30,
                    NetWeight = 100
                }
            );

            dbContext.SaveChanges();
        }
    }
}


