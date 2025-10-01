import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './database/typeorm.config';
import { AuthModule } from './modules/auth';
import { RoleModule } from './modules/role';
import { UserModule } from './modules/user';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), AuthModule, RoleModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
