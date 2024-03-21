import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCommentTable1710812328600 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'comment',
                columns: [
                    {
                        name: 'Id',
                        type: 'serial',
                        isPrimary: true,
                        primaryKeyConstraintName: 'PK_Comment'
                    },
                    {
                        name: 'description',
                        type: 'text'
                    },
                    {
                        name: 'star_rating',
                        type: 'int'
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
                        type: 'varchar(100)'
                    },
                    {
                        name: 'postId',
                        type: 'int'
                    }
                ]
            })
        )

        await queryRunner.createForeignKey(
            'comment',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['Id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                name: 'FK_Comment_UserId'
            })
        )

        await queryRunner.createForeignKey(
            'comment',
            new TableForeignKey({
                columnNames: ['postId'],
                referencedColumnNames: ['Id'],
                referencedTableName: 'post',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                name: 'FK_Comment_PostId'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('comment', 'FK_Comment_UserId')
        await queryRunner.dropForeignKey('comment', 'FK_Comment_PostId')
        await queryRunner.dropTable('comment')
    }

}
