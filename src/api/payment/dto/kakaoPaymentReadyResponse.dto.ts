export default class KakaoPaymentReadyResponseDto {
  tid: string;
  next_redirect_pc_url: string;
  created_at: string;
  constructor(kakaoPaymentReadyResponse: IKakaoPayReadyResponse) {
    this.tid = kakaoPaymentReadyResponse.tid;
    this.next_redirect_pc_url = kakaoPaymentReadyResponse.next_redirect_pc_url;
    this.created_at = kakaoPaymentReadyResponse.created_at;
  }
}
