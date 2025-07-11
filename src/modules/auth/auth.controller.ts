import { Controller, Post, Body, Res, HttpCode, HttpStatus, Get, UseGuards, Req } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { ApiTags, ApiOperation, ApiSecurity } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login with email and password' })
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
        const result = await this.authService.login(loginDto);

        // Set JWT as an HTTP-only cookie
        response.cookie('jwt', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: parseInt(process.env.JWT_COOKIE_EXPIRES_IN || '1') * 24 * 60 * 60 * 1000,
        });

        return {
            user: result.user,
            message: 'Login successful'
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    @ApiOperation({ summary: 'Get the current user profile' })
    @ApiSecurity('cookie-auth')
    async getProfile(@Req() req: Request & { user: User }) {
        return this.authService.getProfile(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Logout the current user' })
    @ApiSecurity('cookie-auth')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');
        return { message: 'Logout successful' };
    }
}
