import { UserRepository } from '../respository/user/user.repository';
import { ProfileRepository } from '../respository/profile/profile.repository';

import { UserService } from './user.service.type';

import { GetUserResponseDTO } from '../dto/getUserResponse.dto';
import { GetUsersResponseDTO } from '../dto/getUsersResponse.dto';
import { UserResponseDTO } from '../dto/userResponse.dto';
import HttpException from '@/api/exceptions/http.exception';
import nodemailer from 'nodemailer';
import { CryptoService } from '@/api/common/services/crypto.service';

export class UsersServiceImpl implements UserService {
  // profile 추가 해야함
  constructor(
    private readonly _mongooseUserRepository: UserRepository,
    private readonly _mongooseProfileRepository: ProfileRepository,
  ) {}

  async getEmailByNameAndPhone(email: string, phone: string): Promise<string | null> {
    const id = await this._mongooseUserRepository.getEmailByNameAndPhone(email, phone);
    return id;
  }

  async getUsers(): Promise<{ results: GetUsersResponseDTO[] }> {
    const users = await this._mongooseUserRepository.findAll();
    return { results: users.map(user => new GetUsersResponseDTO(user)) };
  }

  async getUserDetail(id: string): Promise<GetUserResponseDTO | null> {
    const user = await this._mongooseUserRepository.findById(id);

    if (!user) throw new HttpException(404, '유저를 찾을 수 없습니다.');

    const dtoUser = new GetUserResponseDTO(user);

    return dtoUser;
  }
  async createUser(
    params: Omit<IUser, 'id' | 'role' | 'profile'> & { profile: Omit<IProfile, 'id'> } & { terms: Omit<ITerms, 'id'> },
  ): Promise<UserResponseDTO> {
    const profile = await this._mongooseProfileRepository.save(params.profile);
    const saltedPassword = CryptoService.encryptPassword(params.password);
    if (saltedPassword === null) throw new HttpException(500, '비밀번호 암호화에 실패했습니다.');
    const user = await this._mongooseUserRepository.save({
      ...params,
      profile,
      password: saltedPassword.hashedPassword || '',
      role: 'user',
    });

    return new UserResponseDTO(user);
  }
  async updateUser(userId: string, params: Partial<IUser>): Promise<void> {
    const findUser = await this._mongooseUserRepository.findById(userId);
    if (!findUser) throw new HttpException(404, '유저를 찾을 수 없습니다.');

    const updateProfile = await this._mongooseProfileRepository.update(findUser.profile.id, params?.profile || {});

    await this._mongooseUserRepository.update(userId, {
      ...params,
      profile: updateProfile,
    });

    return;
  }
  async deleteUser(id: string): Promise<void> {
    const findUser = await this._mongooseUserRepository.findById(id);

    if (!findUser) throw new HttpException(404, '유저를 찾을 수 없습니다.');

    await this._mongooseProfileRepository.delete(findUser.profile.id);

    await this._mongooseUserRepository.delete(id);

    return;
  }

  async authNameAndEmail(name: string, email: string): Promise<void> {
    const user = await this._mongooseUserRepository.findByEmail(email);
    if (!user) throw new HttpException(404, '존재하지 않는 회원입니다.');
    if (user.name !== name) throw new HttpException(400, '이름 혹은 이메일이 일치하지 않습니다.');
    /** 이메일 송신 */
    const transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const encryptedName = CryptoService.encryptString(name);
    if (!encryptedName) throw new HttpException(500, '이름 암호화에 실패했습니다.');
    const encryptedEmail = CryptoService.encryptString(email);
    if (!encryptedEmail) throw new HttpException(500, '이메일 암호화에 실패했습니다.');

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: '비밀번호 찾기 링크를 전달드립니다.',
      text: `비밀번호 찾기 링크: http://localhost:3000/reset-password?name=${encryptedName}&email=${encryptedEmail}`,
    };

    await transporter.sendMail(mailOptions, (err: Error | null, info: nodemailer.SentMessageInfo) => {
      if (err) {
        throw new HttpException(500, '이메일 전송에 실패했습니다.');
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  async resetPassword(name: string, email: string, newPassword: string): Promise<void> {
    const decryptedName = CryptoService.decryptString(name);
    if (!decryptedName) throw new HttpException(400, '이름 복호화에 실패했습니다.');
    const decryptedEmail = CryptoService.decryptString(email);
    if (!decryptedEmail) throw new HttpException(400, '이메일 복호화에 실패했습니다.');
    const user = await this._mongooseUserRepository.findByEmail(decryptedEmail);
    if (!user) throw new HttpException(404, '존재하지 않는 회원입니다.');
    if (!CryptoService.compareString(name, decryptedName))
      throw new HttpException(400, '이름 혹은 이메일이 일치하지 않습니다.');
    const saltedPassword = CryptoService.encryptPassword(newPassword);
    if (saltedPassword === null) throw new HttpException(500, '비밀번호 암호화에 실패했습니다.');
    await this._mongooseUserRepository.update(user.id, { password: saltedPassword.hashedPassword });
  }
}
