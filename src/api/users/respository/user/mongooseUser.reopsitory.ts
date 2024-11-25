import mongoose from 'mongoose';
import { UserRepository } from './user.repository';
import { MongooseUser } from '@/api/users/model/user.schema';
import HttpException from '@/api/common/exceptions/http.exception';

export class MongooseUserRepository implements UserRepository {
  /** 유저 저장 */
  async save(user: Omit<IUser, 'id'>): Promise<IUser> {
    const newUser = new MongooseUser({
      ...user,
    });
    await newUser.save();
    return newUser;
  }

  /** 유저 전체 목록 */
  async findAll(): Promise<IUser[]> {
    const values = await MongooseUser.find().populate('profile');
    return values;
  }
  /** 유저 검색(by id) */
  async findById(id: string): Promise<IUser | null> {
    try {
      const findUser = await MongooseUser.findById(id).populate('profile');

      return findUser;
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) {
        return null;
      }
      throw err;
    }
  }
  /** 유저 검색(by email) */
  async findByEmail(email: string): Promise<IUser | null> {
    const findUser = await MongooseUser.findOne({ email }).populate('profile');

    return findUser ?? null;
  }
  /** 유저 업데이트 */
  async update(userId: string, updateUserInfo: Partial<IUser>): Promise<void> {
    await MongooseUser.findByIdAndUpdate(userId, {
      ...updateUserInfo,
    }).populate('profile');
    return;
  }
  /** 유저 삭제 */
  async delete(userId: string): Promise<void> {
    await MongooseUser.deleteOne({ _id: userId });
    return;
  }
  /** 이름과 전화번호로 유저 조회 */
  async getEmailByNameAndPhone(
    name: string,
    phone: string,
  ): Promise<{
    email: string;
    createdAt: Date;
  }> {
    const user = await MongooseUser.findOne({ name }).populate({
      path: 'profile',
      match: { phone },
      select: 'phone',
    });
    if (!user) throw new HttpException(404, '존재 하지 않는 회원입니다.');
    console.log(user);
    return {
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
