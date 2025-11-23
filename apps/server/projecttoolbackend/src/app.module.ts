import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TechnologiesController } from './technologies/technologies.controller';

@Module({
  imports: [],
  controllers: [AppController, TechnologiesController],
  providers: [AppService],
})
export class AppModule {}
