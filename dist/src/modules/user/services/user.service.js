"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const nodemailer = require("nodemailer");
const data_source_1 = require("../../../data-source");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const user_entity_1 = require("../entities/user.entity");
const config_1 = require("../../../../config");
const email_token_entity_1 = require("../entities/email-token.entity");
const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
const tokenRepository = data_source_1.AppDataSource.getRepository(email_token_entity_1.EmailToken);
let UserService = class UserService {
    async hashPassword(password) {
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);
        return hashedPassword;
    }
    async sendEmail(email, email_token) {
        const user = await userRepository.findOneBy({ email });
        const oAuthClient = new googleapis_1.google.auth.OAuth2(config_1.config.email.CLIENT_ID, config_1.config.email.CLIENT_SECRET, config_1.config.email.REDIRECT_URI);
        oAuthClient.setCredentials({ refresh_token: config_1.config.email.REFRESH_TOKEN });
        const sendMail = async () => {
            try {
                const accessToken = await oAuthClient.getAccessToken();
                const transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: 'OAuth2',
                        user: 'luckyangelo.rabosa@cvsu.edu.ph',
                        clientId: config_1.config.email.CLIENT_ID,
                        clientSecret: config_1.config.email.CLIENT_SECRET,
                        refreshToken: config_1.config.email.REFRESH_TOKEN,
                        accessToken: accessToken.token,
                    },
                });
                const mailOption = {
                    from: 'DDPS <ddps.cvsu.edu.ph>',
                    to: email,
                    subject: 'DDPS Verify Your Email',
                    text: `
            <h1>Hello ${user.firstName}</h1>
            <p>Please click the link below to verify your email.</p>
            <p>${config_1.config.client_url}verify/${email_token}</p>
          `,
                    html: `
          <h1>Hello ${user.firstName}!</h1>
          <p>Please click the link below to verify your email.</p>
          <p>${config_1.config.client_url}verify/${email_token}</p>
          <button><h2><a href="${config_1.config.client_url}verify/${email_token}">Verify Email</a></h2></button>
          `,
                };
                const result = await transport.sendMail(mailOption);
                return result;
            }
            catch (error) {
                return error;
            }
        };
        sendMail()
            .then((result) => console.log('Email sent', result))
            .catch((error) => console.log(error.message));
    }
    async getAllUser() {
        return await userRepository.find();
    }
    async register(user) {
        const hashPassword = await this.hashPassword(user.password);
        const email_token = crypto.randomBytes(64).toString('hex');
        user.password = hashPassword;
        user.emailToken = email_token;
        const isUsernameNotAvailable = await userRepository.findOneBy({
            username: user.username,
        });
        const isEmailNotAvailable = await userRepository.findOneBy({
            email: user.email,
        });
        if (isUsernameNotAvailable) {
            throw new common_1.UnauthorizedException('Username already taken');
        }
        if (isEmailNotAvailable) {
            throw new common_1.UnauthorizedException('Email already used');
        }
        try {
            await userRepository.save(user);
            await this.sendEmail(user.email, email_token);
            const userData = await userRepository.findOneBy({ email: user.email });
            return userData;
        }
        catch (_a) {
            throw new common_1.UnauthorizedException('Response error');
        }
    }
    async login(username, password) {
        const user = await userRepository.findOneBy({ username });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (await bcrypt.compare(password, user.password)) {
            if (user.verified) {
                return user;
            }
            else {
                throw new common_1.UnauthorizedException('Please verify your email first');
            }
        }
        throw new common_1.UnauthorizedException('Invalid email or password');
    }
    async updateProfile(id, profileDto) {
        const user = await userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.UnauthorizedException('Cant find user');
        }
        const updatedProfile = Object.assign(Object.assign({}, user), profileDto);
        return await userRepository.save(updatedProfile);
    }
    async deleteProfile(id) {
        const user = await userRepository.findOneBy({ id });
        return await userRepository.remove(user);
    }
    async verifyEmail(token) {
        const user = await userRepository.findOneBy({ emailToken: token });
        if (!user) {
            throw new common_1.UnauthorizedException('Not existing');
        }
        user.emailToken = '';
        user.verified = true;
        await userRepository.save(user);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map