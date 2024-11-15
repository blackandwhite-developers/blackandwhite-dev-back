import HttpException from '@/api/common/exceptions/http.exception';
import { MongooseTerms } from '../../model/terms.schema';
import TermsRepository from './terms.repository';

export default class MongooseTermsRepository implements TermsRepository {
  async findTermsById(id: string): Promise<ITerms> {
    const terms = await MongooseTerms.findById(id);
    if (!terms) throw new HttpException(404, '약관 정보를 찾을 수 없습니다.');
    return terms;
  }
  async createTerms(terms: Omit<ITerms, 'id'>): Promise<ITerms> {
    const newTerms = new MongooseTerms(terms);
    await newTerms.save();
    return newTerms;
  }
  async updateTerms(termsId: string, data: Omit<ITerms, 'id'>): Promise<ITerms> {
    const updatedTerms = await MongooseTerms.findByIdAndUpdate(termsId, data, { new: true });
    if (!updatedTerms) throw new HttpException(404, '약관 정보를 찾을 수 없습니다.');
    return updatedTerms;
  }
  async deleteTerms(id: string): Promise<ITerms> {
    const deletedTerms = await MongooseTerms.findByIdAndDelete(id);
    if (!deletedTerms) throw new HttpException(404, '약관 정보를 찾을 수 없습니다.');
    return deletedTerms;
  }
}
