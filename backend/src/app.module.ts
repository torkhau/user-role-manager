import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './database/typeorm.config';
import { RoleModule } from './modules/role';
import { UserModule } from './modules/user';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
