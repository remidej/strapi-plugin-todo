module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '5167bf0bfaac36cb69d44158cc24170b'),
  },
});
