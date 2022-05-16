import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

export async function createTestModule(): Promise<TestingModule> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      UserModule,
      TypeOrmModule.forRoot({
        type: 'postgres',
        url: process.env.TYPEORM_URL_TEST,
        synchronize: false,
        dropSchema: true,
        logging: false,
        migrations: [process.env.TYPEORM_MIGRATIONS],
        migrationsRun: true,
        extra: process.env.TYPEORM_DRIVER_EXTRA ? JSON.parse(process.env.TYPEORM_DRIVER_EXTRA) : undefined,
        autoLoadEntities: true,
        keepConnectionAlive: true,
      }),
    ],
  }).compile();
  return moduleFixture;
}

export const createApp = async () => {
  const moduleFixture: TestingModule = await createTestModule();
  const app = moduleFixture.createNestApplication();
  return app.init();
};
