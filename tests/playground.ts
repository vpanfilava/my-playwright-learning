// Define the Product type structure
type Product = {
  name: string;
  price: number;
  inStock: boolean;
};

// Create Product 1 using the type
const productOne: Product = {
  name: "Wireless Mouse",
  price: 29.99,
  inStock: true
};

// Create Product 2 using the type
const productTwo: Product = {
  name: "Mechanical Keyboard",
  price: 119.50,
  inStock: false
};
const productThree: Product = {
  name: "HD Monitor",
  price: 199.99,
  inStock: true
};
// Helper function to format the price as a string
function formatPrice(price: number): string {
  return `$${price}`;
}
console.log(formatPrice(productOne.price)); // Prints: $29.99
console.log(formatPrice(productTwo.price)); // Prints: $119.50
console.log(formatPrice(productThree.price)); // Prints: $199.99