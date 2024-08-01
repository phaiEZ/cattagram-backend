import { Module } from '@nestjs/common';
import { CatxService } from './catx.service';
import { CatxController } from './catx.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatxRepository } from './catx.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CatxRepository])],
  providers: [CatxService],
  controllers: [CatxController],
})
export class CatxModule {}
