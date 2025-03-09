import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SigninDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private config: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const { email, password, firstName, lastName } = dto;
    const user = await this.userRepository.findBy({ email });
    console.log(user.length > 0);
    if (user.length > 0)
      throw new ConflictException(
        'An Account is already registered with the given email. please Log in or register using a different email',
      );

    const passwordHash = await this.hashData(password);

    const newUser = this.userRepository.create({
      email,
      firstName,
      lastName,
      password: passwordHash,
    });
    const savedUser = await this.userRepository.save(newUser);

    if (!savedUser) throw new ConflictException('Failed to create user');

    const token = await this.generateTokens(
      savedUser.id,
      savedUser.email,
      savedUser.firstName,
      savedUser.lastName,
    );

    return token;
  }

  async signin(dto: SigninDto) {
    const { email, password } = dto;
    const user = await this.userRepository.findBy({ email });
    if (user.length !== 1)
      throw new ForbiddenException('Incorrect Credentials');

    const pwMatches = await argon.verify(user[0].password, password);
    if (!pwMatches) throw new ForbiddenException('Incorrect Credentials');

    const token = await this.generateTokens(
      user[0].id,
      user[0].email,
      user[0].firstName,
      user[0].lastName,
    );

    return token;
  }

  async hashData(data: string): Promise<string> {
    return await argon.hash(data);
  }

  async generateTokens(
    userId: string,
    email: string,
    firstName: string,
    lastName: string,
  ) {
    try {
      const at = this.jwtService.sign(
        { sub: userId, email, firstName, lastName },
        {
          secret: this.config.get('AT_SECRET'),
          expiresIn: this.config.get('AT_EXPIRESIN'),
        },
      );

      return { access_token: at };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Failed to generate tokens');
    }
  }
}
