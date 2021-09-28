import {MigrationInterface, QueryRunner} from "typeorm";

export class uuidUSer1632817738644 implements MigrationInterface {
    name = 'uuidUSer1632817738644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
    }

}
