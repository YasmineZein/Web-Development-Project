﻿using Microsoft.Data.SqlClient;
using System.Data.SqlClient;

namespace ECommerceAPI.Data
{
    public class SqlConnectionFactory
    {
        private readonly IConfiguration _configuration;

        public SqlConnectionFactory(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public SqlConnection CreateConnection()
            => new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
    }
}