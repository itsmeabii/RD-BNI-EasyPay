export interface FormData {
  firstName: string;
  lastName: string;
  chapter: string;
  training: string;
  description: string;
  file: File | null;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const validateFile = (f: File): string | null => {
  if (!["image/jpeg", "image/jpg", "image/png"].includes(f.type))
    return "Invalid file type. Only JPG, JPEG, and PNG are allowed.";
  if (f.size > 2 * 1024 * 1024)
    return "File is too large. Maximum size is 2MB.";
  return null;
};

export const validateForm = (data: FormData): ValidationErrors => {
  const newErrors: ValidationErrors = {};

  if (!data.firstName.trim()) newErrors.firstName = "First name is required";
  if (!data.lastName.trim()) newErrors.lastName = "Last name is required";
  if (!data.chapter) newErrors.chapter = "Please select a chapter";
  if (!data.training) newErrors.training = "Please select a training";
  if (!data.description.trim()) newErrors.description = "Description is required";
  if (!data.file) newErrors.file = "Please upload a formal picture";

  return newErrors;
};