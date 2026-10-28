export interface ServiceOption {
  id: string;
  name: string;
  priceTag: string;
  badge?: string;
  description: string;
  popular?: boolean;
}

export interface IssueOption {
  id: string;
  label: string;
  iconName: string;
  urgency: 'high' | 'medium' | 'low';
}

export interface TimeSlot {
  id: string;
  label: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
  availability: string;
  isPopular?: boolean;
}

export interface BookingFormData {
  serviceId: string;
  selectedIssue: string;
  dateType: 'today' | 'tomorrow' | 'custom';
  selectedDate: string;
  selectedTimeSlot: string;
  fullName: string;
  phoneNumber: string;
  zipCode: string;
  notes?: string;
}

export interface ZipValidationResult {
  isValid: boolean;
  territoryName?: string;
  isScottsdale: boolean;
  message: string;
}
