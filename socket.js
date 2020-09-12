/**
 * Project: Read Count System
 * Description: Read Count system for stories(Pratilipi Test Project)
 * Author: AK Hanish <akhanish7@gmail.com>
 */

let io;
module.exports = {
  init: (httpServer) => {
    io = require('socket.io')(httpServer);
    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error('Socket Connection not Initialized!');
    }
    return io;
  },
};
