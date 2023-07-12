import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret:'topsecret51',
      signOptions: {
        expiresIn:3600,
      }
    }),
    PassportModule.register({
      defaultStrategy:'jwt',
    }),
    TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports:[
    JwtStrategy,
    PassportModule,
  ]
})
export class AuthModule {}
