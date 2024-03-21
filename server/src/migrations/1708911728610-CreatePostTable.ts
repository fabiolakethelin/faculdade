import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePostTable1708911728610 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'post',
                columns: [
                    {
                        name: 'Id',
                        type: 'serial',
                        isPrimary: true,
                        primaryKeyConstraintName: 'PK_Post'
                    },
                    {
                        name: 'title',
                        type: 'varchar(255)'
                    },
                    {
                        name: 'description',
                        type: 'text'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: `now()`
                    },
                    {
                        name: 'userId',
                        type: 'uuid'
                    },
                    {
                        name: 'author',
                        type: 'varchar(50)'
                    },
                    {
                        name: 'categories',
                        type: 'text'
                    }
                ]
            })
        )

        await queryRunner.createForeignKey(
            'post',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['Id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                name: 'FK_Post_UserId'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('post')
        await queryRunner.dropForeignKey('post', 'FK_Post_UserId')
    }

}
