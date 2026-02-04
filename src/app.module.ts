import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentModule } from './modules/content/content.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './shared/db/database.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    DatabaseModule,
    SharedModule,
    ContentModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
