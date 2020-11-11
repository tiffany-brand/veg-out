import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "root",
    "database": "plant_power",
    "entities": [User],
    "synchronize": true
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}

// The ormconfig.json file in root should connect to the TypeOrmModule 
// which creates the database connection.  We need to turn "synchronize" to false before production.
