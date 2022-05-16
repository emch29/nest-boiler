import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @ApiCreatedResponse()
  @Get()
  @ApiOperation({ summary: 'Returns current user.' })
  async getController() {
    return 'this is user controller';
  }

  @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
  @ApiCreatedResponse()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Returns current user.' })
  async getProfile(@Request() req) {
    return this.userService.getProfile(req.user);
  }
}
