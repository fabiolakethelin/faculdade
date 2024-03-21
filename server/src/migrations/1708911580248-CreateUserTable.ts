import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserTable1708911580248 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'Id',
                        type: 'uuid',
                        isPrimary: true,
                        primaryKeyConstraintName: 'PK_User',
                        default: `uuid_generate_v4()`
                    },
                    {
                        name: 'name',
                        type: 'varchar(50)'
                    },
                    {
                        name: 'email',
                        type: 'varchar(250)'
                    },
                    {
                        name: 'password',
                        type: 'varchar(250)'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user')
    }

}
