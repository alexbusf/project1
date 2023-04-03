import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateProfileDto } from "../dto/create-profile.dto";
import { ProfilesService } from "./profiles.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { User } from "../entities/user.entity";

@Injectable()
export class AuthService {

  constructor(private profilesService: ProfilesService,
    private jwtService: JwtService) {}


  async signin(createProfileDto: CreateProfileDto) {
    const user = await this.validateUser(createProfileDto);
    return this.generateToken(user);
  }

  private async validateUser(createProfileDto: CreateProfileDto) {
    const user = await this.profilesService.findOneByEmail(createProfileDto.email);
    if (!user) {
      throw new UnauthorizedException({message: 'User with that email does not exist'});
    }
    const isMatch = await bcrypt.compare(createProfileDto.password, user.password);
    if (isMatch) {
      return user;
    }
    throw new UnauthorizedException({message: 'Password incorrect'});
  }

  
  async signup(createProfileDto: CreateProfileDto) {
    const candidate = await this.profilesService.findOneByEmail(createProfileDto.email);
    if (candidate) {
      throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(createProfileDto.password, 5);
    const user = await this.profilesService.create({...createProfileDto, password: hashPassword});
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return { access_token: this.jwtService.sign(payload) }
  }
}