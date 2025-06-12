using System;

namespace Backend.DTOs
{
    public class PaginationDto<T>
    {
        public int TotalPages { get; set; }
        public ICollection<T> Result { get; set; }
    }
}