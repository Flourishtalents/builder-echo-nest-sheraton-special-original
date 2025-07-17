import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Crown,
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  MapPin,
  CreditCard,
  Star,
  Shield,
  CheckCircle,
  Eye,
  EyeOff,
  Settings,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import { Badge } from "../components/ui/badge";

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState<
    "info" | "preferences" | "verification" | "complete"
  >("info");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    // Address
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    // Preferences
    roomPreferences: {
      bedType: "",
      floor: "",
      view: "",
      smokingPreference: "non-smoking",
    },
    dietaryRestrictions: "",
    specialRequests: "",
    interests: [] as string[],
    // Communication
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    loyaltyProgram: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const interestOptions = [
    "Fine Dining",
    "Spa & Wellness",
    "Business Travel",
    "Fitness & Recreation",
    "Local Experiences",
    "Shopping",
    "Entertainment",
    "Family Activities",
    "Romantic Getaways",
    "Adventure Tours",
  ];

  const validateStep = (currentStep: string) => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === "info") {
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      switch (step) {
        case "info":
          setStep("preferences");
          break;
        case "preferences":
          setStep("verification");
          break;
        case "verification":
          setStep("complete");
          break;
      }
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-sheraton-navy mb-2">
          Create Your Special Account
        </h2>
        <p className="text-gray-600">
          Join the Sheraton Special family and unlock exclusive privileges
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">First Name *</label>
          <Input
            value={formData.firstName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, firstName: e.target.value }))
            }
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Last Name *</label>
          <Input
            value={formData.lastName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, lastName: e.target.value }))
            }
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Email Address *
        </label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Phone Number *
          </label>
          <Input
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Date of Birth
          </label>
          <Input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Password *</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className={errors.password ? "border-red-500" : ""}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      {/* Address Section */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-sheraton-navy mb-4">
          Address Information
        </h3>
        <div className="space-y-4">
          <Input
            placeholder="Street Address"
            value={formData.address}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
          />
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, city: e.target.value }))
              }
            />
            <Input
              placeholder="State/Province"
              value={formData.state}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, state: e.target.value }))
              }
            />
            <Input
              placeholder="ZIP/Postal Code"
              value={formData.zipCode}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, zipCode: e.target.value }))
              }
            />
          </div>
          <Input
            placeholder="Country"
            value={formData.country}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, country: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-sheraton-navy mb-2">
          Personalize Your Experience
        </h2>
        <p className="text-gray-600">
          Help us tailor your stay to your preferences
        </p>
      </div>

      {/* Room Preferences */}
      <div className="bg-sheraton-cream rounded-lg p-6">
        <h3 className="text-lg font-semibold text-sheraton-navy mb-4">
          Room Preferences
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Bed Type</label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={formData.roomPreferences.bedType}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  roomPreferences: {
                    ...prev.roomPreferences,
                    bedType: e.target.value,
                  },
                }))
              }
            >
              <option value="">Select preference</option>
              <option value="king">King Bed</option>
              <option value="queen">Queen Bed</option>
              <option value="twin">Twin Beds</option>
              <option value="suite">Suite</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Floor Preference
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={formData.roomPreferences.floor}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  roomPreferences: {
                    ...prev.roomPreferences,
                    floor: e.target.value,
                  },
                }))
              }
            >
              <option value="">No preference</option>
              <option value="high">High Floor</option>
              <option value="low">Low Floor</option>
              <option value="penthouse">Penthouse Level</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              View Preference
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={formData.roomPreferences.view}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  roomPreferences: {
                    ...prev.roomPreferences,
                    view: e.target.value,
                  },
                }))
              }
            >
              <option value="">No preference</option>
              <option value="city">City View</option>
              <option value="ocean">Ocean View</option>
              <option value="garden">Garden View</option>
              <option value="pool">Pool View</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Smoking Preference
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={formData.roomPreferences.smokingPreference}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  roomPreferences: {
                    ...prev.roomPreferences,
                    smokingPreference: e.target.value,
                  },
                }))
              }
            >
              <option value="non-smoking">Non-Smoking</option>
              <option value="smoking">Smoking</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dietary Preferences */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Dietary Restrictions or Allergies
        </label>
        <Textarea
          placeholder="Please specify any dietary restrictions, allergies, or special dietary needs..."
          value={formData.dietaryRestrictions}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              dietaryRestrictions: e.target.value,
            }))
          }
        />
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium mb-4">
          Interests & Activities
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              onClick={() => handleInterestToggle(interest)}
              className={`p-2 text-sm rounded-lg border transition-colors ${
                formData.interests.includes(interest)
                  ? "bg-sheraton-gold text-sheraton-navy border-sheraton-gold"
                  : "bg-white text-gray-700 border-gray-200 hover:border-sheraton-gold"
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Special Requests
        </label>
        <Textarea
          placeholder="Any special requests or preferences for your stay..."
          value={formData.specialRequests}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              specialRequests: e.target.value,
            }))
          }
        />
      </div>

      {/* Communication Preferences */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-sheraton-navy mb-4">
          Communication Preferences
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Email Notifications</span>
              <p className="text-sm text-gray-600">
                Booking confirmations and updates
              </p>
            </div>
            <Switch
              checked={formData.emailNotifications}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  emailNotifications: checked,
                }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">SMS Notifications</span>
              <p className="text-sm text-gray-600">
                Important alerts and reminders
              </p>
            </div>
            <Switch
              checked={formData.smsNotifications}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, smsNotifications: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Marketing Emails</span>
              <p className="text-sm text-gray-600">
                Special offers and promotions
              </p>
            </div>
            <Switch
              checked={formData.marketingEmails}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, marketingEmails: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Loyalty Program</span>
              <p className="text-sm text-gray-600">
                Earn points and exclusive benefits
              </p>
            </div>
            <Switch
              checked={formData.loyaltyProgram}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, loyaltyProgram: checked }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderVerification = () => (
    <div className="space-y-6 text-center">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-sheraton-navy mb-2">
          Verify Your Account
        </h2>
        <p className="text-gray-600">
          We've sent a verification code to {formData.email}
        </p>
      </div>

      <div className="bg-sheraton-cream rounded-lg p-6">
        <h3 className="text-lg font-semibold text-sheraton-navy mb-4">
          Enter Verification Code
        </h3>
        <div className="flex justify-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Input
              key={i}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center text-lg font-bold"
            />
          ))}
        </div>
        <Button variant="outline" className="mt-4">
          Resend Code
        </Button>
      </div>

      <div className="text-sm text-gray-600">
        <p>Didn't receive the code? Check your spam folder or</p>
        <button className="text-sheraton-navy underline hover:no-underline">
          use a different email address
        </button>
      </div>
    </div>
  );

  const renderComplete = () => (
    <div className="space-y-6 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-sheraton-navy mb-2">
          Welcome to Sheraton Special!
        </h2>
        <p className="text-gray-600">
          Your account has been created successfully
        </p>
      </div>

      <div className="bg-sheraton-gold/10 border border-sheraton-gold rounded-lg p-6">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Crown className="h-6 w-6 text-sheraton-gold" />
          <span className="text-lg font-semibold text-sheraton-navy">
            Gold Special Status
          </span>
        </div>
        <p className="text-gray-700 mb-4">
          Congratulations! You've been enrolled in our loyalty program and start
          with Gold Special status.
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-sheraton-gold" />
            <span>1,000 Welcome Points</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-sheraton-gold" />
            <span>Priority Support</span>
          </div>
          <div className="flex items-center space-x-2">
            <CreditCard className="h-4 w-4 text-sheraton-gold" />
            <span>Room Upgrades</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-sheraton-gold" />
            <span>Late Checkout</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Link to="/profile">
          <Button className="w-full bg-sheraton-gold hover:bg-sheraton-gold/90 text-sheraton-navy">
            View My Profile
          </Button>
        </Link>
        <Link to="/book">
          <Button variant="outline" className="w-full">
            Book Your First Stay
          </Button>
        </Link>
      </div>
    </div>
  );

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {[
        { id: "info", label: "Account Info", icon: User },
        { id: "preferences", label: "Preferences", icon: Settings },
        { id: "verification", label: "Verification", icon: Shield },
        { id: "complete", label: "Complete", icon: CheckCircle },
      ].map((stepItem, index) => {
        const isActive = step === stepItem.id;
        const isCompleted =
          (step === "preferences" && stepItem.id === "info") ||
          (step === "verification" &&
            ["info", "preferences"].includes(stepItem.id)) ||
          (step === "complete" &&
            ["info", "preferences", "verification"].includes(stepItem.id));

        return (
          <div key={stepItem.id} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isCompleted
                  ? "bg-green-500 text-white"
                  : isActive
                    ? "bg-sheraton-gold text-sheraton-navy"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              <stepItem.icon className="h-5 w-5" />
            </div>
            <span
              className={`ml-2 text-sm font-medium ${
                isActive ? "text-sheraton-navy" : "text-gray-500"
              }`}
            >
              {stepItem.label}
            </span>
            {index < 3 && (
              <div
                className={`w-8 h-0.5 mx-4 ${
                  isCompleted ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sheraton-cream via-white to-sheraton-pearl">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {step !== "complete" && renderStepIndicator()}

          <div className="bg-white rounded-xl shadow-lg p-8">
            {step === "info" && renderPersonalInfo()}
            {step === "preferences" && renderPreferences()}
            {step === "verification" && renderVerification()}
            {step === "complete" && renderComplete()}

            {step !== "complete" && (
              <div className="flex space-x-4 mt-8">
                {step !== "info" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      switch (step) {
                        case "preferences":
                          setStep("info");
                          break;
                        case "verification":
                          setStep("preferences");
                          break;
                      }
                    }}
                    className="flex-1"
                  >
                    Back
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-sheraton-gold hover:bg-sheraton-gold/90 text-sheraton-navy"
                >
                  {step === "verification"
                    ? "Complete Registration"
                    : "Continue"}
                </Button>
              </div>
            )}
          </div>

          {step === "info" && (
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-sheraton-navy underline hover:no-underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
