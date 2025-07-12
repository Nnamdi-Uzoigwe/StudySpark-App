// import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongodb';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/authOptions';
// import Profile, { IProfile } from '@/models/Profile';

// interface ApiResponse {
//   success: boolean;
//   data?: IProfile | null;
//   message?: string;
//   error?: string;
//   details?: string;
// }

// interface ProfileRequestBody {
//   fullName: string;
//   email: string;
//   educationLevel: string;
//   school?: string;
//   preferredSubjects: string[];
//   preferredStudyTime: string;
// }

// export async function GET(_request: NextRequest): Promise<NextResponse<ApiResponse>> {
//   await dbConnect();
  
//   try {
//     const session = await getServerSession(authOptions);
    
//     if (!session?.user?.id) {
//       return NextResponse.json({ 
//         success: false, 
//         error: 'Authentication required' 
//       }, { status: 401 });
//     }

//     const profile = await Profile.findOne({ userId: session.user.id });
    
//     if (!profile) {
//       return NextResponse.json({ 
//         success: false, 
//         error: 'Profile not found',
//         data: null
//       }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       data: profile
//     });
//   } catch (error: unknown) {
//     console.error('GET Profile Error:', error);
//     return NextResponse.json({
//       success: false,
//       error: 'Failed to fetch profile'
//     }, { status: 500 });
//   }
// }

// export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
//   await dbConnect();
  
//   try {
//     const session = await getServerSession(authOptions);
    
//     if (!session?.user?.id) {
//       return NextResponse.json({
//         success: false,
//         error: 'Authentication required'
//       }, { status: 401 });
//     }

//     const {
//       fullName,
//       email,
//       educationLevel,
//       school,
//       preferredSubjects,
//       preferredStudyTime
//     }: ProfileRequestBody = await request.json();

//     if (!fullName || !email || !educationLevel || !preferredSubjects || !preferredStudyTime) {
//       return NextResponse.json({
//         success: false,
//         error: 'Missing required fields'
//       }, { status: 400 });
//     }

//     const existingProfile = await Profile.findOne({ userId: session.user.id });
//     if (existingProfile) {
//       return NextResponse.json({
//         success: false,
//         error: 'Profile already exists for this user'
//       }, { status: 409 });
//     }

//     const newProfile = new Profile({
//       userId: session.user.id,
//       fullName,
//       email,
//       educationLevel,
//       school: school || '',
//       preferredSubjects: Array.isArray(preferredSubjects) ? preferredSubjects : [preferredSubjects],
//       preferredStudyTime,
//     });

//     const savedProfile = await newProfile.save();

//     return NextResponse.json({
//       success: true,
//       data: savedProfile,
//       message: 'Profile created successfully'
//     }, { status: 201 });
//   } catch (error: unknown) {
//     console.error('POST Profile Error:', error);

//     if (error instanceof Error && error.name === 'ValidationError') {
//       return NextResponse.json({
//         success: false,
//         error: 'Validation error',
//         details: error.message
//       }, { status: 400 });
//     }

//     return NextResponse.json({
//       success: false,
//       error: 'Failed to create profile'
//     }, { status: 500 });
//   }
// }

// export async function PUT(request: NextRequest): Promise<NextResponse<ApiResponse>> {
//   await dbConnect();
  
//   try {
//     const session = await getServerSession(authOptions);
    
//     if (!session?.user?.id) {
//       return NextResponse.json({
//         success: false,
//         error: 'Authentication required'
//       }, { status: 401 });
//     }

//     const {
//       fullName,
//       email,
//       educationLevel,
//       school,
//       preferredSubjects,
//       preferredStudyTime
//     }: ProfileRequestBody = await request.json();

//     if (!fullName || !email || !educationLevel || !preferredSubjects || !preferredStudyTime) {
//       return NextResponse.json({
//         success: false,
//         error: 'Missing required fields'
//       }, { status: 400 });
//     }

//     const updatedProfile = await Profile.findOneAndUpdate(
//       { userId: session.user.id },
//       {
//         fullName,
//         email,
//         educationLevel,
//         school: school || '',
//         preferredSubjects: Array.isArray(preferredSubjects) ? preferredSubjects : [preferredSubjects],
//         preferredStudyTime,
//         updatedAt: new Date(),
//       },
//       { 
//         new: true,
//         runValidators: true,
//         upsert: true
//       }
//     );

//     return NextResponse.json({
//       success: true,
//       data: updatedProfile,
//       message: 'Profile updated successfully'
//     });
//   } catch (error: unknown) {
//     console.error('PUT Profile Error:', error);

//     if (error instanceof Error && error.name === 'ValidationError') {
//       return NextResponse.json({
//         success: false,
//         error: 'Validation error',
//         details: error.message
//       }, { status: 400 });
//     }

//     return NextResponse.json({
//       success: false,
//       error: 'Failed to update profile'
//     }, { status: 500 });
//   }
// }

// export async function DELETE(_request: NextRequest): Promise<NextResponse<ApiResponse>> {
//   await dbConnect();
  
//   try {
//     const session = await getServerSession(authOptions);
    
//     if (!session?.user?.id) {
//       return NextResponse.json({
//         success: false,
//         error: 'Authentication required'
//       }, { status: 401 });
//     }

//     const deletedProfile = await Profile.findOneAndDelete({ userId: session.user.id });

//     if (!deletedProfile) {
//       return NextResponse.json({
//         success: false,
//         error: 'Profile not found'
//       }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       message: 'Profile deleted successfully'
//     });
//   } catch (error: unknown) {
//     console.error('DELETE Profile Error:', error);
//     return NextResponse.json({
//       success: false,
//       error: 'Failed to delete profile'
//     }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import Profile, { IProfile } from '@/models/Profile';

interface ApiResponse {
  success: boolean;
  data?: IProfile | null;
  message?: string;
  error?: string;
  details?: string;
}

interface ProfileRequestBody {
  fullName: string;
  email: string;
  educationLevel: string;
  school?: string;
  preferredSubjects: string[];
  preferredStudyTime: string;
}

export async function GET(): Promise<NextResponse<ApiResponse>> {
  await dbConnect();
  
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ 
        success: false, 
        error: 'Authentication required' 
      }, { status: 401 });
    }

    const profile = await Profile.findOne({ userId: session.user.id });
    
    if (!profile) {
      return NextResponse.json({ 
        success: false, 
        error: 'Profile not found',
        data: null
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: profile
    });
  } catch (error: unknown) {
    console.error('GET Profile Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch profile'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  await dbConnect();
  
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required'
      }, { status: 401 });
    }

    const {
      fullName,
      email,
      educationLevel,
      school,
      preferredSubjects,
      preferredStudyTime
    }: ProfileRequestBody = await request.json();

    if (!fullName || !email || !educationLevel || !preferredSubjects || !preferredStudyTime) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 });
    }

    const existingProfile = await Profile.findOne({ userId: session.user.id });
    if (existingProfile) {
      return NextResponse.json({
        success: false,
        error: 'Profile already exists for this user'
      }, { status: 409 });
    }

    const newProfile = new Profile({
      userId: session.user.id,
      fullName,
      email,
      educationLevel,
      school: school || '',
      preferredSubjects: Array.isArray(preferredSubjects) ? preferredSubjects : [preferredSubjects],
      preferredStudyTime,
    });

    const savedProfile = await newProfile.save();

    return NextResponse.json({
      success: true,
      data: savedProfile,
      message: 'Profile created successfully'
    }, { status: 201 });
  } catch (error: unknown) {
    console.error('POST Profile Error:', error);

    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        details: error.message
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to create profile'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  await dbConnect();
  
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required'
      }, { status: 401 });
    }

    const {
      fullName,
      email,
      educationLevel,
      school,
      preferredSubjects,
      preferredStudyTime
    }: ProfileRequestBody = await request.json();

    if (!fullName || !email || !educationLevel || !preferredSubjects || !preferredStudyTime) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: session.user.id },
      {
        fullName,
        email,
        educationLevel,
        school: school || '',
        preferredSubjects: Array.isArray(preferredSubjects) ? preferredSubjects : [preferredSubjects],
        preferredStudyTime,
        updatedAt: new Date(),
      },
      { 
        new: true,
        runValidators: true,
        upsert: true
      }
    );

    return NextResponse.json({
      success: true,
      data: updatedProfile,
      message: 'Profile updated successfully'
    });
  } catch (error: unknown) {
    console.error('PUT Profile Error:', error);

    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        details: error.message
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to update profile'
    }, { status: 500 });
  }
}

export async function DELETE(): Promise<NextResponse<ApiResponse>> {
  await dbConnect();
  
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required'
      }, { status: 401 });
    }

    const deletedProfile = await Profile.findOneAndDelete({ userId: session.user.id });

    if (!deletedProfile) {
      return NextResponse.json({
        success: false,
        error: 'Profile not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Profile deleted successfully'
    });
  } catch (error: unknown) {
    console.error('DELETE Profile Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete profile'
    }, { status: 500 });
  }
}
