// Define the Credentials type
type Credentials = {
  email: string;
  password: string;
  role?: string; // The '?' makes this property optional
};
// Create the validUser object using the Credentials type
export const validUser: Credentials = {
  email: "testuser@example.com",
  password: "Password123!",
  role: "tester" // You can include or omit this since it's optional!
};
// Function to generate a dynamic login URL based on the environment
export function getLoginUrl(env: string): string {
  return `https://${env}.example.com/login`;
}
