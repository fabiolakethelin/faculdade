import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategoryTable1708913171986 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'category',
                columns: [
                    {
                        name: 'Id',
                        type: 'serial',
                        isPrimary: true,
                        primaryKeyConstraintName: 'PK_Category'
                    },
                    {
                        name: 'name',
                        type: 'varchar(50)'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('category')
    }

}
