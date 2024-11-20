import mongoose from 'mongoose';
import { ProfileRepository } from './profile.repository';
import { MongooseProfile } from '../../model/profile.schema';
import HttpException from '@/api/common/exceptions/http.exception';

export class MongooseProfileRepository implements ProfileRepository {
  async save(profile: Omit<IProfile, 'id'>): Promise<IProfile> {
    const newProfile = new MongooseProfile({
      ...profile,
    });
    await newProfile.save();
    return newProfile;
  }
  async findAll(): Promise<IProfile[]> {
    const profiles = await MongooseProfile.find();
    return profiles;
  }
  async findById(id: string): Promise<IProfile | null> {
    try {
      const profile = await MongooseProfile.findById(id);

      return profile ?? null;
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) {
        return null;
      }
      throw err;
    }
  }
  async findByEmail(email: string): Promise<IProfile | null> {
    try {
      const profile = await MongooseProfile.findOne({ email });
      return profile ?? null;
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) {
        return null;
      }
      throw err;
    }
  }
  async update(profileId: string, updateProfileInfo: Partial<IUser>): Promise<IProfile> {
    const updateProfile = await MongooseProfile.findByIdAndUpdate(
      profileId,
      {
        ...updateProfileInfo,
      },
      { new: true },
    );
    if (!updateProfile) throw new HttpException(404, '프로필을 찾을 수 없습니다.');

    return updateProfile;
  }
  async delete(profileId: string): Promise<void> {
    await MongooseProfile.findByIdAndDelete(profileId);
    return;
  }
}
