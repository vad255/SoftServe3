using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    RoleId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "SprintStagesHistory",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Initiated = table.Column<DateTime>(nullable: false),
                    Planned = table.Column<DateTime>(nullable: false),
                    Begined = table.Column<DateTime>(nullable: false),
                    ReviewDone = table.Column<DateTime>(nullable: false),
                    RetrospectiveDone = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SprintStagesHistory", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stories",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 30, nullable: false),
                    Description = table.Column<string>(maxLength: 500, nullable: true),
                    Status = table.Column<int>(nullable: false),
                    AssignedToUserId = table.Column<int>(nullable: true),
                    FeatureId = table.Column<int>(nullable: true),
                    TeamId = table.Column<int>(nullable: true),
                    SprintId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Defects",
                columns: table => new
                {
                    DefectId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DefectName = table.Column<string>(nullable: true),
                    Description = table.Column<string>(maxLength: 500, nullable: true),
                    Priority = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false),
                    AssignedTo = table.Column<string>(nullable: true),
                    Sprint = table.Column<string>(nullable: true),
                    StepsToReproduse = table.Column<string>(nullable: true),
                    ExpectedResults = table.Column<string>(nullable: true),
                    ActualResults = table.Column<string>(nullable: true),
                    FixResults = table.Column<string>(nullable: true),
                    Attachments = table.Column<string>(nullable: true),
                    Blocked = table.Column<int>(nullable: false),
                    Chat = table.Column<string>(nullable: true),
                    StoryId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Defects", x => x.DefectId);
                    table.ForeignKey(
                        name: "FK_Defects_Stories_StoryId",
                        column: x => x.StoryId,
                        principalTable: "Stories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DailyScrumInfo",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false),
                    Сonducted = table.Column<DateTime>(nullable: false),
                    SprintId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyScrumInfo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sprints",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Stage = table.Column<int>(nullable: false),
                    HistoryId = table.Column<int>(nullable: true),
                    Review = table.Column<string>(nullable: true),
                    Retrospective = table.Column<string>(nullable: true),
                    TeamId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sprints", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sprints_SprintStagesHistory_HistoryId",
                        column: x => x.HistoryId,
                        principalTable: "SprintStagesHistory",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    TaskId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NameId = table.Column<int>(nullable: false),
                    PlannedHours = table.Column<int>(nullable: false),
                    RemainingHours = table.Column<int>(nullable: false),
                    ActualHours = table.Column<int>(nullable: false),
                    Type = table.Column<string>(nullable: false),
                    State = table.Column<string>(nullable: true),
                    Blocked = table.Column<string>(maxLength: 500, nullable: true),
                    AssignedToUserId = table.Column<int>(nullable: false),
                    Description = table.Column<string>(maxLength: 500, nullable: false),
                    WorkNotes = table.Column<string>(maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.TaskId);
                    table.ForeignKey(
                        name: "FK_Tasks_Stories_NameId",
                        column: x => x.NameId,
                        principalTable: "Stories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Login = table.Column<string>(maxLength: 20, nullable: false),
                    Password = table.Column<string>(maxLength: 20, nullable: false),
                    TeamId = table.Column<int>(nullable: true),
                    RoleId = table.Column<int>(nullable: false),
                    Activity = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Features",
                columns: table => new
                {
                    FeatureId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FeatureName = table.Column<string>(maxLength: 30, nullable: false),
                    Description = table.Column<string>(maxLength: 500, nullable: true),
                    State = table.Column<int>(nullable: false),
                    OwnerUserId = table.Column<int>(nullable: true),
                    Blocked = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Features", x => x.FeatureId);
                    table.ForeignKey(
                        name: "FK_Features_Users_OwnerUserId",
                        column: x => x.OwnerUserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Teams",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ScrumMasterUserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Teams_Users_ScrumMasterUserId",
                        column: x => x.ScrumMasterUserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DailyScrumInfo_SprintId",
                table: "DailyScrumInfo",
                column: "SprintId");

            migrationBuilder.CreateIndex(
                name: "IX_Defects_StoryId",
                table: "Defects",
                column: "StoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Features_OwnerUserId",
                table: "Features",
                column: "OwnerUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_Name",
                table: "Roles",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Sprints_HistoryId",
                table: "Sprints",
                column: "HistoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Sprints_TeamId",
                table: "Sprints",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_Stories_AssignedToUserId",
                table: "Stories",
                column: "AssignedToUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Stories_FeatureId",
                table: "Stories",
                column: "FeatureId");

            migrationBuilder.CreateIndex(
                name: "IX_Stories_SprintId",
                table: "Stories",
                column: "SprintId");

            migrationBuilder.CreateIndex(
                name: "IX_Stories_TeamId",
                table: "Stories",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_AssignedToUserId",
                table: "Tasks",
                column: "AssignedToUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_NameId",
                table: "Tasks",
                column: "NameId");

            migrationBuilder.CreateIndex(
                name: "IX_Teams_ScrumMasterUserId",
                table: "Teams",
                column: "ScrumMasterUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_TeamId",
                table: "Users",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Stories_Sprints_SprintId",
                table: "Stories",
                column: "SprintId",
                principalTable: "Sprints",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Stories_Users_AssignedToUserId",
                table: "Stories",
                column: "AssignedToUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Stories_Teams_TeamId",
                table: "Stories",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Stories_Features_FeatureId",
                table: "Stories",
                column: "FeatureId",
                principalTable: "Features",
                principalColumn: "FeatureId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DailyScrumInfo_Sprints_SprintId",
                table: "DailyScrumInfo",
                column: "SprintId",
                principalTable: "Sprints",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Sprints_Teams_TeamId",
                table: "Sprints",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Users_AssignedToUserId",
                table: "Tasks",
                column: "AssignedToUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Teams_TeamId",
                table: "Users",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teams_Users_ScrumMasterUserId",
                table: "Teams");

            migrationBuilder.DropTable(
                name: "DailyScrumInfo");

            migrationBuilder.DropTable(
                name: "Defects");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "Stories");

            migrationBuilder.DropTable(
                name: "Features");

            migrationBuilder.DropTable(
                name: "Sprints");

            migrationBuilder.DropTable(
                name: "SprintStagesHistory");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Teams");
        }
    }
}
