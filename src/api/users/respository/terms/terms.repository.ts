export default interface TermsRepository {
  findTermsById(id: string): Promise<ITerms>;
  createTerms(terms: Omit<ITerms, 'id'>): Promise<ITerms>;
  updateTerms(termsId: string, data: Omit<ITerms, 'id'>): Promise<ITerms>;
  deleteTerms(id: string): Promise<ITerms>;
}
