import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { User } from './entity/auth.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @Post('/signup')
  createUser(
    @Body(ValidationPipe) AuthCredentialDto: AuthCredentialDto,
  ): Promise<User> {
    return this.AuthService.createUser(AuthCredentialDto);
  }
  //   @Post('/signin')
  //   singIn(@Body(ValidationPipe) AuthCredentialDto: AuthCredentialDto) {
  //     return this.AuthService.signIn(AuthCredentialDto);
  //   }
  @Post('/signIn')
  signIn(
    @Body(ValidationPipe) AuthCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.AuthService.signIn(AuthCredentialDto);
  }

  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(@GetUser() user: User) {
  //   console.log(user);
  // }

  @Post('/profile')
  @UseGuards(AuthGuard())
  getProfile(@GetUser() user: User) {
    // Utilisez l'utilisateur récupéré ici
    return user;
  }
}
