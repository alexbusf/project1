import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from '../services/auth.service';
import { CreateProfileDto } from "../dto/create-profile.dto";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signin(@Body() createProfileDto: CreateProfileDto) {
    return this.authService.signin(createProfileDto);
  }

  @Post('/signup')
  signup(@Body() createProfileDto: CreateProfileDto) {
    return this.authService.signup(createProfileDto);
  }
}