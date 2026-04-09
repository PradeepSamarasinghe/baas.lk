/**
 * Mock SMS service for Phone OTP Authentication.
 * In a production environment, you would replace this with a real provider 
 * such as Twilio, Vonage, or a local SMS gateway.
 */

export async function sendSms(phoneNumber: string, message: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Log to console for development/testing
  console.log("-----------------------------------------");
  console.log(`[SMS-SERVICE] TO: ${phoneNumber}`);
  console.log(`[SMS-SERVICE] MESSAGE: ${message}`);
  console.log("-----------------------------------------");

  return { success: true, messageId: `mock-${Date.now()}` };
}

export async function sendOtpSms(phoneNumber: string, code: string) {
  const message = `Your BAAS.LK verification code is: ${code}. Valid for 5 minutes.`;
  return sendSms(phoneNumber, message);
}
