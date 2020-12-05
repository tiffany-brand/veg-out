import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
// Entity Imports
import { User } from './users/user.entity';
import { Veggie } from './veggies/veggie.entity';
import { MealLog } from './meallog/meallog.entity';
import { Challenge } from './challenges/challenge.entity';
// Module Imports
import { UsersModule } from './users/users.module';
import { VeggiesModule } from './veggies/veggies.module';
import { MeallogModule } from './meallog/meallog.module';
import { ChallengesModule } from './challenges/challenges.module';


@Global()
@Module({
  imports: [
  TypeOrmModule.forRoot({
    type: "mysql",
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Veggie, MealLog, Challenge],
    synchronize: true
  }), UsersModule, VeggiesModule, MeallogModule, ChallengesModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
  exports: [AppGateway]
  
})
export class AppModule {
  constructor(private connection: Connection) { }
}

//  We need to turn "synchronize" to false before production.
