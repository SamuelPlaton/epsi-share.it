import {MigrationInterface, QueryRunner} from "typeorm";

export class db1632900536800 implements MigrationInterface {
    name = 'db1632900536800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "link" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL DEFAULT 'active', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "dataId" uuid, CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "identifier" character varying NOT NULL, "email" character varying NOT NULL, "token" character varying NOT NULL, "name" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'not-confirmed', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workspace" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "identifier" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_ca86b6f9b3be5fe26d307d09b49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_2533602bd9247937e3a4861e173" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workspace_users_user" ("workspaceId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_e838ab3e6c445c5c091f252b716" PRIMARY KEY ("workspaceId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e560bebe0dad802fbb036ba878" ON "workspace_users_user" ("workspaceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ff70af68685d8a5d6b588dfdc5" ON "workspace_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "link" ADD CONSTRAINT "FK_77c55c2f607c672cf9e1666a242" FOREIGN KEY ("dataId") REFERENCES "data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workspace" ADD CONSTRAINT "FK_b48532fc84800d41cfee110682c" FOREIGN KEY ("userId") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "data" ADD CONSTRAINT "FK_4ee98a297a032944fb052144963" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workspace_users_user" ADD CONSTRAINT "FK_e560bebe0dad802fbb036ba8788" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "workspace_users_user" ADD CONSTRAINT "FK_ff70af68685d8a5d6b588dfdc5b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workspace_users_user" DROP CONSTRAINT "FK_ff70af68685d8a5d6b588dfdc5b"`);
        await queryRunner.query(`ALTER TABLE "workspace_users_user" DROP CONSTRAINT "FK_e560bebe0dad802fbb036ba8788"`);
        await queryRunner.query(`ALTER TABLE "data" DROP CONSTRAINT "FK_4ee98a297a032944fb052144963"`);
        await queryRunner.query(`ALTER TABLE "workspace" DROP CONSTRAINT "FK_b48532fc84800d41cfee110682c"`);
        await queryRunner.query(`ALTER TABLE "link" DROP CONSTRAINT "FK_77c55c2f607c672cf9e1666a242"`);
        await queryRunner.query(`DROP INDEX "IDX_ff70af68685d8a5d6b588dfdc5"`);
        await queryRunner.query(`DROP INDEX "IDX_e560bebe0dad802fbb036ba878"`);
        await queryRunner.query(`DROP TABLE "workspace_users_user"`);
        await queryRunner.query(`DROP TABLE "data"`);
        await queryRunner.query(`DROP TABLE "workspace"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "link"`);
    }

}
