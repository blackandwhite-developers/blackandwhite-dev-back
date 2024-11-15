export default class Terms implements ITerms {
  id: string;
  termsOfService: boolean;
  privacyPolicy: boolean;
  locationBasedService: boolean;
  marketingInfoAgree: boolean;

  constructor(terms: ITerms) {
    this.id = terms.id;
    this.termsOfService = terms.termsOfService;
    this.privacyPolicy = terms.privacyPolicy;
    this.locationBasedService = terms.locationBasedService;
    this.marketingInfoAgree = terms.marketingInfoAgree;
  }
}
