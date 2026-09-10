const Notification = require('../models/Notification');
exports.createNotification = async (userId, type, title, message, link) => {
  return await Notification.create({ user: userId, type, title, message, link });
};
