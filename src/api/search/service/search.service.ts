import LodgeResponseDto from '@/api/lodge/dto/lodgeResponse.dto';
import { SearchService } from './search.service.type';
import LodgeRepository from '@/api/lodge/repository/lodge.repository';
import SearchKeywordsRepository from '../repository/searchKeywords.repository';
import HttpException from '@/api/common/exceptions/http.exception';

interface WSDWord {
  id: number;
  text: string;
  type: string;
  scode: string;
  weight: number;
  position: number;
  begin: number;
  end: number;
}

interface ETRIResponse {
  return_object: {
    sentence: Array<{
      WSD: WSDWord[];
    }>;
  };
}

export class SearchServiceImpl implements SearchService {
  private readonly _lodgeRepository: LodgeRepository;
  private readonly _searchKeywordsRepository: SearchKeywordsRepository;
  constructor(lodgeRepository: LodgeRepository, searchKeywordsRepository: SearchKeywordsRepository) {
    this._lodgeRepository = lodgeRepository;
    this._searchKeywordsRepository = searchKeywordsRepository;
  }
  async search(keyword: string): Promise<Array<LodgeResponseDto>> {
    await this._searchKeywordsRepository.addSearchKeyword(keyword);

    // 1. 지역명 분리 로직 (2-4 글자 단위로 분리)
    function splitLocation(text: string): string[] {
      const result = new Set<string>();
      result.add(text); // 원본 텍스트 추가

      // 2글자 이상인 경우에만 분리 시도
      if (text.length >= 2) {
        // 문자 단위로 분리
        for (let i = 2; i <= Math.min(4, text.length); i++) {
          for (let j = 0; j <= text.length - i; j++) {
            const part = text.slice(j, j + i);
            if (part.match(/^[가-힣]+$/)) {
              // 한글만 포함된 경우만
              result.add(part);
            }
          }
        }
      }
      return Array.from(result);
    }

    // 기본 키워드 분리
    const baseKeywords = splitLocation(keyword);
    console.log('Base keywords:', baseKeywords);

    // 2. ETRI API 호출
    const parsedKeyword = await fetch(`http://aiopen.etri.re.kr:8000/WiseNLU`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `${process.env.ETRI_API_KEY}`,
      },
      body: JSON.stringify({
        argument: {
          analysis_code: 'wsd',
          text: keyword,
        },
      }),
    });
    const parsedData: ETRIResponse = await parsedKeyword.json();

    const indexableTypes = new Set([
      'NNG',
      'NNP',
      'NNB',
      'NR', // 명사류
      'VV',
      'VA', // 용언류
      'MM',
      'MAG', // 수식언
    ]);

    const words = parsedData.return_object.sentence[0].WSD.filter(word => indexableTypes.has(word.type)).map(word => {
      if (word.type === 'VV' || word.type === 'VA') {
        return word.text + '다';
      }
      return word.text;
    });

    const parsedWords = words.filter(Boolean);

    // 3. 모든 키워드 합치기
    const searchWords = Array.from(
      new Set([
        ...baseKeywords, // 기본 분리 결과
        ...parsedWords, // ETRI 분석 결과
      ]),
    );

    console.log('Search words:', searchWords);

    if (searchWords.length > 0) {
      const result = await this._lodgeRepository.findByKeyword(searchWords);
      return result.map(lodge => new LodgeResponseDto(lodge));
    }
    return [];
  }

  async popularSearch(limit: number): Promise<Array<IPopularSearch>> {
    if (limit < 1) {
      throw new HttpException(400, 'limit은 1 이상이어야 합니다.');
    }
    return this._searchKeywordsRepository.getPopularSearch(limit);
  }
}
