export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
});
