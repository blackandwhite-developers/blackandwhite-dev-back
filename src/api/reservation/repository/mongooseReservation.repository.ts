import HttpException from '@/api/common/exceptions/http.exception';
import { MongooseReservation } from '@/api/reservation/model/reservation.schema';
import { ReservationRepository } from '@/api/reservation/repository/reservation.repository';

export class MongooseReservationRepository implements ReservationRepository {
  async save(info: Omit<IReservation, 'id' | 'payment' | 'user'>, user: IUser): Promise<IReservation> {
    const reservation = {
      ...info,
      payment: null,
      user,
    };
    const newReservation = new MongooseReservation(reservation);

    await newReservation.save();
    return newReservation;
  }

  async findAll(): Promise<IReservation[]> {
    const values = await MongooseReservation.find()

      .populate('userId')
      .populate({
        path: 'information',
        select: 'id name image adult child maximum price discount additionalPrice checkin checkout',
      });

    return values;
  }

  async findById(id: string): Promise<IReservation | null> {
    const values = await MongooseReservation.findById(id)

      .populate('userId')
      .populate({
        path: 'information',
        select: 'id name image adult child maximum price discount additionalPrice checkin checkout',
      });

    return values;
  }

  async findByUserId(userId: string): Promise<IReservation[]> {
    const values = await MongooseReservation.find({ userId })

      .populate('userId');

    return values || [];
  }

  async update(reservationId: string, updateReservationInfo: Partial<IReservation>): Promise<IReservation> {
    const results = await MongooseReservation.findByIdAndUpdate(reservationId, updateReservationInfo);

    if (!results) {
      throw new HttpException(404, '예약을 찾을 수 없습니다.');
    }

    return results;
  }

  async delete(id: string): Promise<void> {
    await MongooseReservation.deleteOne({ _id: id });

    return;
  }

  async cancel(id: string): Promise<IReservation> {
    const reservation = await MongooseReservation.findById(id);

    if (!reservation) {
      throw new HttpException(404, '예약을 찾을 수 없습니다.');
    }

    reservation.status = 'cancel';

    try {
      await reservation.save();
    } catch (error) {
      console.error('Error saving reservation:', error);
      throw new HttpException(500, '예약 상태를 업데이트하는 도중 오류가 발생했습니다.');
    }

    return reservation;
  }
}
