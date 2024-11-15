import mongoose from 'mongoose';

const termsSchema = new mongoose.Schema<ITerms>({
  termsOfService: { type: Boolean, required: true },
  privacyPolicy: { type: Boolean, required: true },
  locationBasedService: { type: Boolean, required: true },
  marketingInfoAgree: { type: Boolean, required: true },
});

export const MongooseTerms = mongoose.model<ITerms>('terms', termsSchema);
