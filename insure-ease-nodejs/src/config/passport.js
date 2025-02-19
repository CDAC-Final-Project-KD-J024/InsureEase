const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Serialize & Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [userResult] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    done(null, userResult[0]);
  } catch (err) {
    done(err, null);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [profile.emails[0].value]);
        
        let user = existingUser[0];
        if (!user) {
          await db.query(
            `INSERT INTO users (firstName, lastName, email, role, profilePicture, password) VALUES (?, ?, ?, ?, ?, ?)`,
            [
              profile.name.givenName || 'N/A',
              profile.name.familyName || 'N/A',
              profile.emails[0].value,
              'user',
              profile.photos[0]?.value || '',
              null // No password for Google OAuth
            ]
          );
          const [userResult] = await db.query("SELECT * FROM users WHERE email = ?", [profile.emails[0].value]);
          user = userResult[0];
        }

        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        return done(null, { ...user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
        const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        
        let user = existingUser[0];
        if (!user) {
          await db.query(
            `INSERT INTO users (firstName, lastName, email, role, profilePicture, password) VALUES (?, ?, ?, ?, ?, ?)`,
            [
              profile.username || 'GitHub User',
              '',
              email,
              'user',
              profile.photos[0]?.value || '',
              null // No password for GitHub OAuth
            ]
          );
          const [userResult] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
          user = userResult[0];
        }

        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        return done(null, { ...user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
