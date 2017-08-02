using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Vega.Migrations
{
    public partial class SeedFeatures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Insert Into features (Name) Values ('Feature1')");
            migrationBuilder.Sql("Insert Into features (Name) Values ('Feature2')");
            migrationBuilder.Sql("Insert Into features (Name) Values ('Feature3')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete from features where Name in ('Feature1','Feature2','Feature3')");
        }
    }
}
