import { Module } from '@nestjs/common';
import { ShoolService } from './shool.service';
import { ShoolController } from './shool.controller';

@Module({
  providers: [ShoolService],
  controllers: [ShoolController]
})
export class ShoolModule {}
