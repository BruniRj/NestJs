import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { User } from './entity/auth.entity';

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
  signIn(@Body(ValidationPipe) AuthCredentialDto: AuthCredentialDto) {
    return this.AuthService.signIn(AuthCredentialDto);
  }
}
