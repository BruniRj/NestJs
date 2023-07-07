import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  async createUser(AuthCredentialDto: AuthCredentialDto): Promise<User> {
    const { username, password } = AuthCredentialDto;
    const user = new User();
    const salt = bcrypt.genSalt();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      return await this.UserRepository.save(user);
    } catch (error) {
      if (error === '23505') {
        //Duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }


  async signIn(AuthCredentialDto: AuthCredentialDto){
    const {username} = AuthCredentialDto; 
    const user = await this.UserRepository.findOne({where: {username}})
    if(!user){
        throw new UnauthorizedException("credential invalide pr eee");
    }else{
        // remarque kely oe ato isika no mretourner nleh user miaraka am JWT 
        return user.username;
    }
  }



  private hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }



//   ito fonction eto ambany ito SignIn ian sady mande fa otran lava lotra 

//   async signIn(AuthCredentialDto: AuthCredentialDto) {
//     const username = await this.ValidateUserPassword(AuthCredentialDto);
//     if (!username) {
//       throw new UnauthorizedException('Invalide credentials');
//     } else{
//         return username;
//     }
//   }

//   async ValidateUserPassword(
//     AuthCredentialDto: AuthCredentialDto,
//   ): Promise<string> {
//     const { username, password } = AuthCredentialDto;
//     const user = await this.UserRepository.findOne({ where: { username } });
//     if (user && (await user.validatePassword(password))) {
//       return user.username;
//     } else {
//       return null;
//     }
//   }
}
