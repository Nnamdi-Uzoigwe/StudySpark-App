"use client";
import { useState, ChangeEvent, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  User,
  Edit3,
  Save,
  X,
  Clock,
  BookOpen,
  GraduationCap,
  Mail,
  Building2,
} from "lucide-react";
import Sidebar from "../Sidebar";

interface ProfileData {
  fullName: string;
  email: string;
  educationLevel: string;
  school: string;
  preferredSubjects: string[];
  preferredStudyTime: string;
}

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<string | null>(null);
  const inputRefs = useRef<{
    [key: string]: HTMLInputElement | HTMLSelectElement | null;
  }>({});
  const { data: session } = useSession();
  const initialProfileData: ProfileData = {
    fullName: "",
    email: "",
    educationLevel: "",
    school: "",
    preferredSubjects: [],
    preferredStudyTime: "",
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.id) return;

      setIsFetching(true);
      try {
        const response = await fetch(`/api/profile?userId=${session.user.id}`);
        const result = await response.json();

        if (response.ok && result.data) {
          setFormData({
            fullName: result.data.fullName,
            email: result.data.email,
            educationLevel: result.data.educationLevel,
            school: result.data.school || "",
            preferredSubjects: result.data.preferredSubjects || [],
            preferredStudyTime: result.data.preferredStudyTime,
          });
        } else if (response.status !== 404) {
          throw new Error(result.error || "Failed to fetch profile");
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load profile"
        );
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfile();
  }, [session]);

  const [formData, setFormData] = useState<ProfileData>(initialProfileData);

  const educationLevels = [
    "Elementary School",
    "Middle School",
    "High School",
    "Undergraduate",
    "Graduate",
    "Doctorate",
    "Professional",
  ];

  const studyTimeOptions = [
    "Early Morning (5-8 AM)",
    "Morning (8-12 PM)",
    "Afternoon (12-5 PM)",
    "Evening (6-9 PM)",
    "Night (9-12 AM)",
    "Late Night (12-3 AM)",
    "Flexible",
  ];

  useEffect(() => {
    if (activeField && inputRefs.current[activeField]) {
      inputRefs.current[activeField]?.focus();
    }
  }, [formData, activeField]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setActiveField(name);
    setError(null);
  };

  const addSubject = (subject: string) => {
    if (subject.trim() && !formData.preferredSubjects.includes(subject.trim())) {
      setFormData((prev) => ({
        ...prev,
        preferredSubjects: [...prev.preferredSubjects, subject.trim()],
      }));
    }
  };

  const removeSubject = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      preferredSubjects: prev.preferredSubjects.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubjectKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      const subject = input.value.trim();
      if (subject) {
        addSubject(subject);
        input.value = '';
      }
    }
  };

  const handleInputFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.educationLevel) {
      setError("Education level is required");
      return false;
    }
    if (formData.preferredSubjects.length === 0) {
      setError("At least one preferred subject is required");
      return false;
    }
    if (!formData.preferredStudyTime) {
      setError("Preferred study time is required");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (!session?.user?.id) {
        throw new Error("User not authenticated");
      }

      const profilePayload = {
        ...formData,
        userId: session.user.id,
      };

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profilePayload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save profile");
      }

      setIsEditing(false);
      console.log("Profile saved successfully:", result.message);
    } catch (error) {
      console.error("Error saving profile:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialProfileData);
    setIsEditing(false);
    setError(null);
    setActiveField(null);
  };

  const ProfileCard = () => (
    <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 lg:w-16 h-12 lg:h-16 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-6 lg:w-8 h-6 lg:h-8 text-[#398378]" />
          </div>
          <div>
            <h1 className="text-lg lg:text-2xl font-bold text-gray-600">
              {formData.fullName || "Your Name"}
            </h1>
            {formData.educationLevel && (
              <p className="text-gray-600">{formData.educationLevel}</p>
            )}
          </div>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#398378] hover:bg-[#376059] cursor-pointer text-white rounded-lg transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          {formData.fullName ? "Edit Profile" : "Create Profile"}
        </button>
      </div>

      <div className="space-y-4">
        {formData.email ? (
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">{formData.email}</span>
          </div>
        ) : null}

        {formData.educationLevel ? (
          <div className="flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">{formData.educationLevel}</span>
          </div>
        ) : null}

        {formData.school ? (
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">{formData.school}</span>
          </div>
        ) : null}

        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <p className="text-gray-700 font-medium">Preferred Subjects:</p>
            {formData.preferredSubjects.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.preferredSubjects.map((subject, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-[#398378] rounded-full text-sm"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-1">No subjects selected</p>
            )}
          </div>
        </div>

        {formData.preferredStudyTime ? (
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-gray-700 font-medium">Preferred Study Time:</p>
              <p className="text-gray-600">{formData.preferredStudyTime}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );

  const ProfileForm = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-md lg:text-2xl font-bold text-gray-800">
          {formData.fullName ? "Edit Profile" : "Create Profile"}
        </h2>
        <button
          onClick={handleCancel}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("fullName")}
            ref={(el) => {
              inputRefs.current["fullName"] = el;
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#398378]"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("email")}
            ref={(el) => {
              inputRefs.current["email"] = el;
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#398378]"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Education Level *
          </label>
          <select
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("educationLevel")}
            ref={(el) => {
              inputRefs.current["educationLevel"] = el;
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#398378]"
            required
          >
            <option value="">Select your education level</option>
            {educationLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            School/Institution (Optional)
          </label>
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("school")}
            ref={(el) => {
              inputRefs.current["school"] = el;
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#398378]"
            placeholder="Enter your school or institution"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Subjects *
          </label>
          
          {/* Display current subjects as removable tags */}
          {formData.preferredSubjects.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.preferredSubjects.map((subject, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-green-100 text-[#398378] rounded-full text-sm"
                >
                  {subject}
                  <button
                    type="button"
                    onClick={() => removeSubject(index)}
                    className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                    aria-label={`Remove ${subject}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <input
            type="text"
            name="preferredSubjects"
            onKeyPress={handleSubjectKeyPress}
            onFocus={() => handleInputFocus("preferredSubjects")}
            ref={(el) => {
              inputRefs.current["preferredSubjects"] = el;
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#398378]"
            placeholder="Type a subject and press Enter (e.g., Mathematics, Physics, Chemistry)"
          />
          <p className="text-sm text-gray-500 mt-1">
            Type a subject name and press Enter to add it. Click the X to remove subjects.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Study Time *
          </label>
          <select
            name="preferredStudyTime"
            value={formData.preferredStudyTime}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("preferredStudyTime")}
            ref={(el) => {
              inputRefs.current["preferredStudyTime"] = el;
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#398378]"
            required
          >
            <option value="">Select your preferred study time</option>
            {studyTimeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2 bg-[#398378] cursor-pointer text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isLoading ? "Saving..." : "Save Profile"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-300 cursor-pointer text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 flex justify-between">
     
      <Sidebar />

      <div className="flex-1 ml-0 lg:ml-[300px] mt-[80px] lg:mt-0 flex justify-center">
        <div className="w-full max-w-4xl px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#398378] mb-2">
              StudySpark Profile
            </h1>
            <p className="text-gray-600">
              Manage your learning profile and preferences
            </p>
          </div>

           {isFetching ? (
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#398378]"></div>
              </div>
            </div>
          ) : (
            isEditing ? <ProfileForm /> : <ProfileCard />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;