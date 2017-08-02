using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Vega.Migrations
{
    public partial class SeedDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Insert Into Make (Name) VALUES ('Make1')");
            migrationBuilder.Sql("Insert Into Make (Name) VALUES ('Make2')");
            migrationBuilder.Sql("Insert Into Make (Name) VALUES ('Make3')");

            migrationBuilder.Sql("Insert Into Models (Name, MakeID) VALUES ('Make1-ModelA', (SELECT ID FROM Make Where Name = 'Make1'))");
            migrationBuilder.Sql("Insert Into Models (Name, MakeID) VALUES ('Make1-ModelB', (SELECT ID FROM Make Where Name = 'Make1'))");
            migrationBuilder.Sql("Insert Into Models (Name, MakeID) VALUES ('Make1-ModelC', (SELECT ID FROM Make Where Name = 'Make1'))");
            migrationBuilder.Sql("Insert Into Models (Name, MakeID) VALUES ('Make2-ModelA', (SELECT ID FROM Make Where Name = 'Make2'))");
            migrationBuilder.Sql("Insert Into Models (Name, MakeID) VALUES ('Make2-ModelB', (SELECT ID FROM Make Where Name = 'Make2'))");
            migrationBuilder.Sql("Insert Into Models (Name, MakeID) VALUES ('Make2-ModelC', (SELECT ID FROM Make Where Name = 'Make2'))");
            migrationBuilder.Sql("Insert Into Models (Name, MakeID) VALUES ('Make3-ModelA', (SELECT ID FROM Make Where Name = 'Make3'))");
            migrationBuilder.Sql("Insert Into Models (Name, MakeID) VALUES ('Make3-ModelB', (SELECT ID FROM Make Where Name = 'Make3'))");
            migrationBuilder.Sql("Insert Into Models (Name, MakeID) VALUES ('Make3-ModelC', (SELECT ID FROM Make Where Name = 'Make3'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Makes where ID in Where Name in ('Make3', 'Make1', 'Make2'))");
        }
    }
}
