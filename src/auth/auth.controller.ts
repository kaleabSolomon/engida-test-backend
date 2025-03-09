import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NoAuth } from 'src/common/decorators';
import { SignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @NoAuth()
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  async localSignup(@Body() dto: SignupDto) {
    const tokens = await this.authService.signup(dto);
    return tokens;
  }
}
