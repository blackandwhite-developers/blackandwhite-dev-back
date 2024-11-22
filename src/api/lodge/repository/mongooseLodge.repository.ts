import HttpException from '@/api/common/exceptions/http.exception';
import { MongooseLodge } from '../model/lodge.schema';
import LodgeRepository from './lodge.repository';
import mongoose from 'mongoose';
export default class MongooseLodgeRepository implements LodgeRepository {
  async findByCategory(categoryId: string): Promise<ILodge[]> {
    const lodge = await MongooseLodge.find({ category: categoryId  });
    return lodge;
  }

  async findById(id: string): Promise<ILodge> {
    const lodge = await MongooseLodge.findById(id).populate('category');
    if (!lodge) {
      throw new Error('숙소를 찾을 수 없습니다.');
    }
    return lodge;
  }

  async save(data: Omit<ILodge, 'id'>): Promise<ILodge> {
    const lodge = new MongooseLodge(data);
    await lodge.save();
    return lodge;
  }

  async edit(id: string, data: Partial<ILodge>): Promise<void> {
    if (!MongooseLodge.findById(id)) {
      throw new HttpException(404, '숙소를 찾을 수 없습니다.');
    }
    await MongooseLodge.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<void> {
    if (!MongooseLodge.findById(id)) {
      throw new HttpException(404, '숙소를 찾을 수 없습니다.');
    }
    await MongooseLodge.findByIdAndDelete(id);
  }

  async addRoomType(id: string, room: IRoom, count: number): Promise<void> {
    const lodge = await MongooseLodge.findById(id);
    if (!lodge) {
      throw new HttpException(404, '숙소를 찾을 수 없습니다.');
    }
    if (lodge.room.some(r => r.roomType.name === room.name)) {
      throw new HttpException(400, '이미 등록된 객실입니다.');
    }
    const newTypeAndStock: IRoomTypeAndStock = {
      roomType: room,
      stock: count,
    };
    lodge.room = [...lodge.room, newTypeAndStock];
    console.log(lodge.room);
    await lodge.save();
  }

  async checkIn(id: string, roomName: string): Promise<void> {
    const lodge = await MongooseLodge.findById(id).populate('room.roomType');
    if (!lodge) {
      throw new HttpException(404, '숙소를 찾을 수 없습니다.');
    }
    const room = lodge.room.find(r => r.roomType.name === roomName);
    if (!room) {
      throw new HttpException(404, '객실을 찾을 수 없습니다.');
    }
    room.stock -= 1;
    await lodge.save();
  }
  async checkOut(id: string, roomName: string): Promise<void> {
    const lodge = await MongooseLodge.findById(id);
    if (!lodge) {
      throw new HttpException(404, '숙소를 찾을 수 없습니다.');
    }
    const room = lodge.room.find(r => r.roomType.name === roomName);
    if (!room) {
      throw new HttpException(404, '객실을 찾을 수 없습니다.');
    }
    room.stock += 1;
    await lodge.save();
  }
  async findByRoomId(roomId: string): Promise<ILodge> {
    try {
      const lodge = await MongooseLodge.findOne({
        'room.roomType': new mongoose.Types.ObjectId(roomId),
      })
        .populate('room.roomType')
        .populate('category');

      if (!lodge) {
        throw new HttpException(404, '해당 객실이 있는 숙소를 찾을 수 없습니다.');
      }

      return lodge;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error finding lodge by roomId:', error);
      throw new HttpException(500, '서버 에러가 발생했습니다.');
    }
  }
  async findByKeyword(keywords: Array<string>): Promise<ILodge[]> {
    try {
      // 각 키워드에 대해 부분 일치 검색 조건 생성
      const searchConditions = keywords.map(keyword => ({
        $or: [
          { name: { $regex: keyword, $options: 'i' } }, // 숙소명 매치
          { address: { $regex: keyword, $options: 'i' } }, // 주소 매치
          { description: { $regex: keyword, $options: 'i' } }, // 설명 매치
          { distance: { $regex: keyword, $options: 'i' } }, // 거리 정보 매치
        ],
      }));

      // 검색 결과 가져오기
      const results = await MongooseLodge.find({
        $or: searchConditions,
      })
        .populate('category')
        .populate('room.roomType');

      // 검색 결과에 점수 부여
      const scoredResults = results.map(lodge => {
        let score = 0;
        const lodgeDoc = lodge.toObject();

        keywords.forEach(keyword => {
          const regex = new RegExp(keyword, 'i');

          // 숙소명 매치 (가장 높은 가중치)
          if (regex.test(lodgeDoc.name)) {
            score += 100;
          }

          // 주소 매치 (두 번째 높은 가중치)
          if (regex.test(lodgeDoc.address)) {
            score += 50;
          }

          // 상세주소 매치
          if (regex.test(lodgeDoc.addressDetail)) {
            score += 30;
          }

          // 거리 정보 매치
          if (regex.test(lodgeDoc.distance)) {
            score += 20;
          }

          // 설명 매치 (낮은 가중치)
          if (regex.test(lodgeDoc.description)) {
            score += 10;
          }
        });

        // 별점 보너스 (0-5점 추가)
        score += lodgeDoc.rating || 0;

        return {
          ...lodgeDoc,
          searchScore: score,
        };
      });

      // 점수순 정렬 후 상위 10개만 반환
      return scoredResults.sort((a, b) => b.searchScore - a.searchScore).slice(0, 10);
    } catch (error) {
      console.error('Error finding lodge by keyword:', error);
      throw new HttpException(500, '서버 에러가 발생했습니다.');
    }
  }
}
