// models/Profile.ts
import mongoose, { Document, Schema } from 'mongoose';
export interface IProfile extends Document {
  userId: string;
  fullName: string;
  email: string;
  educationLevel: string;
  school?: string;
  preferredSubjects: string[];
  preferredStudyTime: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum EducationLevel {
  ELEMENTARY = 'Elementary School',
  MIDDLE = 'Middle School',
  HIGH_SCHOOL = 'High School',
  UNDERGRADUATE = 'Undergraduate',
  GRADUATE = 'Graduate',
  DOCTORATE = 'Doctorate',
  PROFESSIONAL = 'Professional'
}

export enum StudyTime {
  EARLY_MORNING = 'Early Morning (5-8 AM)',
  MORNING = 'Morning (8-12 PM)',
  AFTERNOON = 'Afternoon (12-5 PM)',
  EVENING = 'Evening (6-9 PM)',
  NIGHT = 'Night (9-12 AM)',
  LATE_NIGHT = 'Late Night (12-3 AM)',
  FLEXIBLE = 'Flexible'
}

const ProfileSchema: Schema<IProfile> = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  educationLevel: {
    type: String,
    required: true,
    enum: Object.values(EducationLevel),
  },
  school: {
    type: String,
    trim: true,
    default: '',
  },
  preferredSubjects: {
    type: [String],
    required: true,
    validate: {
      validator: function(array: string[]): boolean {
        return array.length > 0;
      },
      message: 'At least one preferred subject is required'
    }
  },
  preferredStudyTime: {
    type: String,
    required: true,
    enum: Object.values(StudyTime),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ProfileSchema.pre<IProfile>('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Profile = mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;