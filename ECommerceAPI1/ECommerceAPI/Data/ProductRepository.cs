﻿using ECommerceAPI.DTO;
using ECommerceAPI.Models;
using Microsoft.Data.SqlClient;

namespace ECommerceAPI.Data
{
    public class ProductRepository
    {
        private readonly SqlConnectionFactory _connectionFactory;

        public ProductRepository(SqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<List<Product>> GetAllProductsAsync()
        {
            var products = new List<Product>();
            var query = "SELECT ProductId, Name, Price, Quantity, Description, ImagePath, IsDeleted FROM Products WHERE IsDeleted = 0";

            using (var connection = _connectionFactory.CreateConnection())
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand(query, connection))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            products.Add(new Product
                            {
                                ProductId = reader.GetInt32(reader.GetOrdinal("ProductId")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                                Quantity = reader.GetInt32(reader.GetOrdinal("Quantity")),
                                Description = reader.IsDBNull(reader.GetOrdinal("Description")) ? null : reader.GetString(reader.GetOrdinal("Description")),
                                Category = reader.IsDBNull(reader.GetOrdinal("Description")) ? null : reader.GetString(reader.GetOrdinal("Category")),
                                SubCategory = reader.IsDBNull(reader.GetOrdinal("Description")) ? null : reader.GetString(reader.GetOrdinal("SubCategory")),
                                ImagePath = reader.IsDBNull(reader.GetOrdinal("ImagePath")) ? null : reader.GetString(reader.GetOrdinal("ImagePath")),
                                IsDeleted = reader.GetBoolean(reader.GetOrdinal("IsDeleted"))
                            });
                        }
                    }
                }
            }

            return products;
        }

        public async Task<Product?> GetProductByIdAsync(int productId)
        {
            var query = "SELECT ProductId, Name, Price, Quantity, Description,Category,SubCategory ImagePath,AdditionalImage1,AdditionalImage2,AdditionalImage3, IsDeleted FROM Products WHERE ProductId = @ProductId AND IsDeleted = 0";
            Product? product = null;

            using (var connection = _connectionFactory.CreateConnection())
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@ProductId", productId);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            product = new Product
                            {
                                ProductId = reader.GetInt32(reader.GetOrdinal("ProductId")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                                Quantity = reader.GetInt32(reader.GetOrdinal("Quantity")),
                                Description = reader.IsDBNull(reader.GetOrdinal("Description")) ? null : reader.GetString(reader.GetOrdinal("Description")),
                                Category = reader.IsDBNull(reader.GetOrdinal("Description")) ? null : reader.GetString(reader.GetOrdinal("Category")),
                                SubCategory = reader.IsDBNull(reader.GetOrdinal("Description")) ? null : reader.GetString(reader.GetOrdinal("SubCategory")),
                                ImagePath = reader.IsDBNull(reader.GetOrdinal("ImagePath")) ? null : reader.GetString(reader.GetOrdinal("ImagePath")),
                                AdditionalImage1 = reader.IsDBNull(reader.GetOrdinal("AdditionalImage1")) ? null : reader.GetString(reader.GetOrdinal("AdditionalImage1")),
                                AdditionalImage2 = reader.IsDBNull(reader.GetOrdinal("AdditionalImage2")) ? null : reader.GetString(reader.GetOrdinal("AdditionalImage2")),
                                AdditionalImage3 = reader.IsDBNull(reader.GetOrdinal("AdditionalImage3")) ? null : reader.GetString(reader.GetOrdinal("AdditionalImage3")),
                                IsDeleted = reader.GetBoolean(reader.GetOrdinal("IsDeleted"))
                            };
                        }
                    }
                }
            }

            return product;
        }

        public async Task<int> InsertProductAsync(ProductDTO product)
        {
            var query = @"INSERT INTO Products (Name, Price, Quantity, Description, ImagePath, AdditionalImage1, AdditionalImage2, AdditionalImage3, IsDeleted) 
                  VALUES (@Name, @Price, @Quantity, @Description, @ImagePath, @AdditionalImage1, @AdditionalImage2, @AdditionalImage3, 0);
                  SELECT CAST(SCOPE_IDENTITY() as int);";

            using (var connection = _connectionFactory.CreateConnection())
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Name", product.Name);
                    command.Parameters.AddWithValue("@Price", product.Price);
                    command.Parameters.AddWithValue("@Quantity", product.Quantity);
                    command.Parameters.AddWithValue("@Description", product.Description ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@ImagePath", product.ImagePath ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@AdditionalImage1", product.AdditionalImage1 ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@AdditionalImage2", product.AdditionalImage2 ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@AdditionalImage3", product.AdditionalImage3 ?? (object)DBNull.Value);

                    int productId = (int)await command.ExecuteScalarAsync();
                    return productId;
                }
            }
        }

        public async Task UpdateProductAsync(ProductDTO product)
        {
            var query = @"UPDATE Products 
                  SET Name = @Name, Price = @Price, Quantity = @Quantity, Description = @Description , Category = @Category , SubCategory = @SubCategory 
                  WHERE ProductId = @ProductId";

            using (var connection = _connectionFactory.CreateConnection())
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@ProductId", product.ProductId);
                    command.Parameters.AddWithValue("@Name", product.Name);
                    command.Parameters.AddWithValue("@Price", product.Price);
                    command.Parameters.AddWithValue("@Quantity", product.Quantity);
                    command.Parameters.AddWithValue("@Description", product.Description ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@Category", product.Category ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@SubCategory", product.SubCategory ?? (object)DBNull.Value);

                    await command.ExecuteNonQueryAsync();
                }
            }
        }


        public async Task DeleteProductAsync(int productId)
        {
            var query = "UPDATE Products SET IsDeleted = 1 WHERE ProductId = @ProductId";

            using (var connection = _connectionFactory.CreateConnection())
            {
                await connection.OpenAsync();
                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@ProductId", productId);

                    await command.ExecuteNonQueryAsync();
                }
            }
        }
    }
}
